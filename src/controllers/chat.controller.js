import prisma from "../lib/prisma.js"; // หรือ path ที่คุณเก็บตัวแปร prisma ไว้


const getRooms = async (req, res, next) => {
  try {
    const userId = req.user.id; // ได้มาจาก authenticateMiddleware

    const rooms = await prisma.chatRoom.findMany({
      where: {
        users: {
          some: { userId: userId },
        },
      },
      include: {
        users: {
          include: { user: true },
        },
        messages: {
          take: 1,
          orderBy: { createdAt: "desc" },
        },
      },
    });

    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { roomId } = req.params;

    const messages = await prisma.message.findMany({
      where: { chatRoomId: Number(roomId) },
      orderBy: { createdAt: "asc" },
      include: { sender: true },
    });

    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// ✅ แก้บรรทัดนี้ให้เป็น export default
export default {
  getRooms,
  getMessages,
};