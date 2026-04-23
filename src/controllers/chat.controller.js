import prisma from "../lib/prisma.js";

const getRooms = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // คืนค่าห้องทั้งหมดที่เป็น Group (Community) หรือห้องที่ User เป็นสมาชิก
    const rooms = await prisma.chatRoom.findMany({
      where: {
        OR: [{ isGroup: true }, { users: { some: { userId: userId } } }],
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                profileImage: true,
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
                username: true,
                profileImage: true,
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

const createRoom = async (req, res, next) => {
  try {
    const { name, type } = req.body;
    const userId = req.user.id;

    const room = await prisma.chatRoom.create({
      data: {
        name,
        isGroup: type === "community",
        creatorId: userId,
        users: {
          create: {
            userId: userId,
          },
        },
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json(room);
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;

    // ตรวจสอบว่ามีห้องนี้อยู่จริงไหม และ User อยู่ในห้องไหม
    const room = await prisma.chatRoom.findUnique({
      where: { id: Number(roomId) },
      include: { users: { where: { userId: userId } } },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // ถ้าเป็น Community (isGroup: true) แล้ว User ยังไม่อยู่ในห้อง ให้ Join อัตโนมัติ
    if (room.isGroup && room.users.length === 0) {
      await prisma.chatRoomUser.create({
        data: {
          userId: userId,
          chatRoomId: Number(roomId),
        },
      });
    }

    const messages = await prisma.message.findMany({
      where: { chatRoomId: Number(roomId) },
      orderBy: { createdAt: "asc" },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            profileImage: true,
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
  createRoom,
};