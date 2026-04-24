import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import chatService from "./service.js/chat.service.js";
import prisma from "./lib/prisma.js";

const PORT = process.env.PORT || 8000;

// 1. สร้าง HTTP Server
const server = http.createServer(app);

// 2. ประกาศใช้งาน Socket.io พร้อมตั้งค่า CORS ให้ครอบคลุม
const io = new Server(server, {
  cors: {
    // ใส่ให้ครบทุก Port ที่คุณใช้งานจริง
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5000",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// 3. Socket Logic
io.on("connection", (socket) => {
  console.log("🟢 [Socket] Connected:", socket.id);

  // --- 1. การจัดการห้อง (Join Room) ---
  socket.on("join_room", (roomId) => {
    if (!roomId) return;
    const roomName = String(roomId);
    socket.join(roomName);
    console.log(`👤 [Socket] User ${socket.id} joined room: ${roomName}`);
  });

  // --- 2. ระบบสถานะ "อ่านแล้ว" (Read Receipt) ---
  socket.on("mark_read", async ({ chatRoomId, userId }) => {
    if (!chatRoomId || !userId) return;
    const roomName = String(chatRoomId);
    try {
      if (chatService.markMessagesAsRead) {
        await chatService.markMessagesAsRead(chatRoomId, userId);
      }
      // กระจายบอกคนอื่นในห้องว่า "อ่านแล้ว"
      io.to(roomName).emit("message_read", { chatRoomId: roomName, readByUserId: userId });
    } catch (error) {
      console.error("❌ [Socket] Error in mark_read:", error.message);
    }
  });

  // --- 3. ระบบ "กำลังพิมพ์..." (Typing Indicator) ---
 io.on("connection", (socket) => {
  // ... join_room, send_message ...

  // ตรวจสอบว่ามี 2 บล็อกนี้อยู่แยกออกมาไหม:
  socket.on("typing", (data) => {
    console.log("Someone is typing in room:", data.chatRoomId);

    socket.to(String(data.chatRoomId)).emit("display_typing", {
      user: data.userName,
      roomId: data.chatRoomId
    });
  });

  socket.on("stop_typing", (data) => {
    socket.to(String(data.chatRoomId)).emit("hide_typing");
  });
});

  socket.on("stop_typing", (data) => {
    const roomName = String(data.chatRoomId);
    socket.to(roomName).emit("hide_typing", { isTyping: false });
  });

  // --- 4. การรับ-ส่งข้อความหลัก (Send Message) ---
  socket.on("send_message", async (data) => {
    try {
      const { chatRoomId, senderId, content } = data;
      if (!chatRoomId || !senderId || !content) return;

      // 1. บันทึกลง Database
      const newMessage = await chatService.saveMessage(chatRoomId, senderId, content);

      // 2. ส่งข้อความให้ทุกคนในห้อง (รวมคนส่ง)
      const roomName = String(chatRoomId);
      io.to(roomName).emit("receive_message", newMessage);

    } catch (error) {
      console.error("❌ [Socket] Error in send_message:", error.message);
      socket.emit("error_message", { message: "Failed to send message" });
    }
  });

  // --- 5. ลบกลุ่ม (เฉพาะคนสร้าง) ---
  socket.on("delete_group", async ({ roomId, userId }) => {
    try {
      const group = await prisma.chatRoom.findUnique({ where: { id: Number(roomId) } });
      
      if (group && Number(group.creatorId) === Number(userId)) {
        await prisma.chatRoom.delete({ where: { id: Number(roomId) } });
        
        io.to(String(roomId)).emit("group_deleted", { roomId });
        io.in(String(roomId)).socketsLeave(String(roomId));
        console.log(`🗑️ Group ${roomId} deleted by user ${userId}`);
      } else {
        socket.emit("error_message", { message: "คุณไม่มีสิทธิ์ลบกลุ่มนี้" });
      }
    } catch (error) {
      console.error("❌ [Socket] Error deleting group:", error.message);
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(`🔴 [Socket] Disconnected: ${socket.id} (Reason: ${reason})`);
  });
});

// 4. รัน Server (ใช้ server.listen)
server.listen(PORT, () => {
  console.log(
    `🚀 Server with Socket.io is running at => http://localhost:${PORT}`,
  );
});
