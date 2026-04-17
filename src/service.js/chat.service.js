// 1. เปลี่ยน require เป็น import
import prisma from "../lib/prisma.js"; 

class ChatService {
  // 1. ดึงห้องแชททั้งหมดของ User คนนั้น
  async getUserChatRooms(userId) {
    return await prisma.chatRoom.findMany({
      where: {
        users: { some: { userId: Number(userId) } }
      },
      include: {
        users: {
          include: { user: { select: { id: true, username: true, profileImage: true } } }
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1 
        }
      },
      orderBy: { updatedAt: 'desc' } 
    });
  }

  // 2. ดึงประวัติแชทในห้องนั้นๆ
  async getMessagesByRoom(chatRoomId) {
    return await prisma.message.findMany({
      where: { chatRoomId: Number(chatRoomId) },
      orderBy: { createdAt: 'asc' }, 
      include: {
        sender: { select: { id: true, username: true, profileImage: true } }
      }
    });
  }

  // 3. บันทึกข้อความใหม่ลง Database
  async saveMessage(chatRoomId, senderId, content) {
    const [newMessage] = await prisma.$transaction([
      prisma.message.create({
        data: {
          chatRoomId: Number(chatRoomId),
          senderId: Number(senderId),
          content: content
        },
        include: { sender: { select: { id: true, username: true, profileImage: true } } }
      }),
      prisma.chatRoom.update({
        where: { id: Number(chatRoomId) },
        data: { updatedAt: new Date() }
      })
    ]);
    return newMessage;
  }
}

// 2. เปลี่ยน module.exports เป็น export default
const chatService = new ChatService();
export default chatService;