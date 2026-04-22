import prisma from "../lib/prisma.js";

const getRooms = async (req, res, next) => {
  try {
    const userId = req.user.id;

  // ใน src/controllers/chat.controller.js
const rooms = await prisma.chatRoom.findMany({
  where: {
    users: { some: { userId: userId } },
  },
  include: {
    users: {
      include: {
        user: {
          select: {
            id: true,
            username: true,     // เปลี่ยนจาก name เป็น username
            profileImage: true, // เปลี่ยนจาก avatarUrl เป็น profileImage
          },
        },
      },
    },
    messages: {
      take: 1,
      orderBy: { createdAt: "desc" },
      include: {
        sender: {
          select: {
            username: true,     // เปลี่ยนตรงนี้ด้วย
            profileImage: true, // เพิ่มตรงนี้ด้วยถ้าต้องการรูปคนส่งล่าสุด
          },
        },
      },
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
      include: {
        sender: {
          select: {
            id: true,
            username: true,     // เปลี่ยนจาก name เป็น username
            profileImage: true, // เปลี่ยนจาก avatarUrl เป็น profileImage
          },
        },
      },
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

export default {
  getRooms,
  getMessages,
};