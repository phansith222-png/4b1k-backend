import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import chatService from "./service.js/chat.service.js";

const PORT = process.env.PORT || 8000;

// 1. สร้าง HTTP Server
const server = http.createServer(app);

// 2. ประกาศใช้งาน Socket.io พร้อมตั้งค่า CORS ให้ครอบคลุม
const io = new Server(server, {
  cors: {
    // ใส่ให้ครบทุก Port ที่คุณใช้งานจริง
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5000"], 
    methods: ["GET", "POST"],
    credentials: true
  }
});

// 3. Socket Logic
io.on("connection", (socket) => {
  console.log("🟢 [Socket] Connected:", socket.id);

  // เมื่อ user เข้าห้องแชท (Force เป็น String เพื่อความแม่นยำของ Room name)
  socket.on("join_room", (roomId) => {
    if (!roomId) return;
    const roomName = String(roomId);
    socket.join(roomName);
    console.log(`👤 [Socket] User ${socket.id} joined room: ${roomName}`);
  });

  // เมื่อ user ส่งข้อความ
  socket.on("send_message", async (data) => {
    console.log("📩 [Socket] Received message data:", data);
    
    try {
      const { chatRoomId, senderId, content } = data;

      // Validation เบื้องต้นป้องกันการพังที่ Database
      if (!chatRoomId || !senderId || !content) {
        console.warn("⚠️ [Socket] Missing required fields in message data");
        return;
      }

      // 1. บันทึกลง Database ผ่าน Service
      // Service จะทำการ Number(chatRoomId) และ Number(senderId) ให้เองตามโค้ดที่คุณส่งมา
      const newMessage = await chatService.saveMessage(chatRoomId, senderId, content);
      
      console.log("💾 [Socket] Message saved to DB:", newMessage.id);

      // 2. ส่งข้อความให้ทุกคนในห้องเห็น (รวมถึงคนส่งด้วย)
      // ใช้ io.to() ส่งไปยัง Room name ที่เป็น String
      const roomName = String(chatRoomId);
      io.to(roomName).emit("receive_message", newMessage);
      
      console.log(`📤 [Socket] Broadcasted message to room: ${roomName}`);

    } catch (error) {
      // ดักจับ Error เพื่อไม่ให้ Server ล่ม
      console.error("❌ [Socket] Error in send_message:", error.message);
      
      // ส่ง Error กลับไปหาคนส่ง (ถ้าต้องการทำแจ้งเตือนที่ UI)
      socket.emit("error_message", { message: "Failed to send message" });
    }
  });

  socket.on("disconnect", (reason) => {
    console.log(`🔴 [Socket] Disconnected: ${socket.id} (Reason: ${reason})`);
  });
});

// 4. รัน Server (ใช้ server.listen)
server.listen(PORT, () => {
    console.log(`🚀 Server with Socket.io is running at => http://localhost:${PORT}`);
});