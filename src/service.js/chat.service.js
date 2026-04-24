import { prisma as db } from "../lib/prisma.js";

class ChatService {
  // 1. ดึงห้องแชททั้งหมดของ User
  async getUserChatRooms(userId) {
    // เปลี่ยนจาก prisma เป็น db
    return await db.chatRoom.findMany({
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

  // 2. ดึงประวัติแชท
  async getMessagesByRoom(chatRoomId) {
    // เปลี่ยนจาก prisma เป็น db
    return await db.message.findMany({
      where: { chatRoomId: Number(chatRoomId) },
      orderBy: { createdAt: 'asc' }, 
      include: {
        sender: { select: { id: true, username: true, profileImage: true } }
      }
    });
  }

  // 3. อัปเดต ID ข้อความล่าสุดที่อ่านแล้ว
  async markMessagesAsRead(chatRoomId, userId, lastMessageId) {
    if (!lastMessageId) return null;
    
    // ตรวจสอบว่าผู้ใช้เป็นสมาชิกของห้องหรือไม่ก่อนอัปเดต
    const member = await db.chatRoomUser.findUnique({
      where: {
        userId_chatRoomId: {
          userId: Number(userId),
          chatRoomId: Number(chatRoomId)
        }
      }
    });

    if (!member) return null;

    return await db.chatRoomUser.update({
      where: {
        userId_chatRoomId: {
          userId: Number(userId),
          chatRoomId: Number(chatRoomId)
        }
      },
      data: {
        // อัปเดตเฉพาะเมื่อ lastMessageId ใหม่มากกว่าเดิม
        lastReadMessageId: Math.max(member.lastReadMessageId || 0, Number(lastMessageId))
      }
    });
  }

  // 4. บันทึกข้อความใหม่ (ใช้ Transaction)
  async saveMessage(chatRoomId, senderId, content) {
    // เปลี่ยนจาก prisma เป็น db ทั้งหมดในนี้
    const [newMessage] = await db.$transaction([
      db.message.create({
        data: {
          chatRoomId: Number(chatRoomId),
          senderId: Number(senderId),
          content: content
        },
        include: { sender: { select: { id: true, username: true, profileImage: true } } }
      }),
      db.chatRoom.update({
        where: { id: Number(chatRoomId) },
        data: { updatedAt: new Date() }
      })
    ]);
    return newMessage;
  }
}

const chatService = new ChatService();
export default chatService;