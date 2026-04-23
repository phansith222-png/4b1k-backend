import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

export default function setupChatSocket(io) {
  // Middleware ตรวจสอบ Token
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token || socket.handshake.headers?.token;
    if (!token) return next(new Error("Authentication error: No token"));
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = payload;
      next();
    } catch (err) {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on('connection', (socket) => {
    console.log(`🟢 User Online: ${socket.user.id}`);

    // เข้าห้องแชท
    socket.on('join_room', (roomId) => {
      if (!roomId) return;
      const roomStr = String(roomId);
      socket.rooms.forEach(room => { if (room !== socket.id) socket.leave(room); });
      socket.join(roomStr);
      console.log(`🏠 User ${socket.user.id} joined room: ${roomStr}`);
    });

    // ส่งข้อความ (Broadcast ให้ทุกคนในห้องเห็น)
    socket.on('send_message', async (data) => {
      const { content, chatRoomId } = data;
      if (!content || !chatRoomId) return;

      try {
        const newMessage = await prisma.message.create({
          data: {
            content,
            senderId: socket.user.id,
            chatRoomId: Number(chatRoomId)
          },
          include: { 
            sender: { select: { id: true, username: true, profileImage: true } } 
          }
        });

        // 🔥 ส่งหาทุกคนในห้อง (รวมคนส่งด้วย) หน้าจอจะอัปเดตพร้อมกันทันที
        io.to(String(chatRoomId)).emit('receive_message', newMessage);

      } catch (error) {
        console.error("🔥 DB Error:", error);
      }
    });

    // ลบกลุ่ม (เฉพาะคนสร้าง)
    socket.on('delete_group', async ({ roomId, userId }) => {
      try {
        const group = await prisma.chatRoom.findUnique({ where: { id: Number(roomId) } });
        
        if (group && Number(group.creatorId) === Number(userId)) {
          await prisma.chatRoom.delete({ where: { id: Number(roomId) } });
          
          io.to(String(roomId)).emit("group_deleted", { roomId });
          io.in(String(roomId)).socketsLeave(String(roomId));
          console.log(`🗑️ Group ${roomId} deleted by user ${userId}`);
        } else {
          socket.emit("error", { message: "คุณไม่มีสิทธิ์ลบกลุ่มนี้" });
        }
      } catch (error) {
        console.error("🔥 Error deleting group:", error);
      }
    });

    socket.on('disconnect', () => console.log(`🔴 User Offline: ${socket.user.id}`));
  });
}