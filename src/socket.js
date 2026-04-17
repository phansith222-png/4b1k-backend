import { Server } from "socket.io";
// แก้ path ให้ตรงกับที่ตรวจเจอในเครื่องคุณ (service.js)
import chatService from "./service.js/chat.service.js"; 

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: { 
      origin: "http://localhost:5173", // ระบุ URL หน้าบ้านไปเลยจะชัวร์กว่า *
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("join_room", (roomId) => {
      // ตรวจสอบว่า roomId ถูกส่งมาจริง (ต้องเป็นตัวเลขหรือ string ที่ไม่ใช่ null)
      if (roomId) {
        socket.join(String(roomId));
        console.log(`👤 User joined room: ${roomId}`);
      }
    });

    socket.on("send_message", async (data) => {
      try {
        const { chatRoomId, senderId, content } = data;
        
        // 1. บันทึกลง Database
        const newMessage = await chatService.saveMessage(chatRoomId, senderId, content);
        
        // 2. ส่งกลับไปหาทุกคนในห้อง (ต้องมั่นใจว่า roomId ตรงกับตอน join)
        io.to(String(chatRoomId)).emit("receive_message", newMessage);
      } catch (error) {
        console.error("❌ Socket Error:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });

  return io;
};

export default setupSocket; // เปลี่ยนจาก module.exports