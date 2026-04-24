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
      if (roomId) {
        socket.join(String(roomId));
        console.log(`👤 User joined room: ${roomId}`);
      }
    });

    socket.on("send_message", async (data) => {
      try {
        const { chatRoomId, senderId, content, id } = data;
        
        // 1. บันทึกลง Database
        const newMessage = await chatService.saveMessage(chatRoomId, senderId, content);
        
        // 2. ส่งกลับไปหาทุกคนในห้อง (รวมคนส่งด้วย)
        io.to(String(chatRoomId)).emit("receive_message", {
          ...newMessage,
          optimisticId: id // ให้ฝั่ง frontend ใช้จับคู่
        });
      } catch (error) {
        console.error("Error saving/sending message:", error);
      }
    });

    socket.on("mark_read", async ({ chatRoomId, userId, lastMessageId }) => {
      try {
        if (lastMessageId) {
          await chatService.markMessagesAsRead(chatRoomId, userId, lastMessageId);
        }
        
        io.to(String(chatRoomId)).emit("message_read", { 
          chatRoomId: String(chatRoomId), 
          readByUserId: userId,
          lastReadMessageId: lastMessageId
        });
      } catch (error) {
        console.error("Error marking messages as read:", error);
      }
    });

    socket.on("typing", ({ chatRoomId, userName }) => {
      socket.to(String(chatRoomId)).emit("display_typing", { roomId: chatRoomId, user: userName });
    });

    socket.on("stop_typing", ({ chatRoomId }) => {
      socket.to(String(chatRoomId)).emit("hide_typing");
    });
    
    socket.on("delete_group", ({ roomId, userId }) => {
      io.to(String(roomId)).emit("group_deleted", { roomId, deletedBy: userId });
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.id);
    });
  });

  return io;
};

export default setupSocket;