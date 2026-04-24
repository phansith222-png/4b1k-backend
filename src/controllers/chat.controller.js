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

    const roomsWithUnread = await Promise.all(rooms.map(async (room) => {
      const myUserRecord = room.users.find((u) => u.userId === userId);
      let unreadCount = 0;

      if (myUserRecord) {
        unreadCount = await prisma.message.count({
          where: {
            chatRoomId: room.id,
            senderId: { not: userId }, // ไม่นับข้อความของตัวเอง
            id: {
              gt: myUserRecord.lastReadMessageId || 0,
            },
          },
        });
      }

      return {
        ...room,
        unreadCount,
      };
    }));

    res.json(roomsWithUnread);
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

    // อัปเดต lastReadMessageId ทันทีเมื่อดึงข้อความ (เพื่อแก้ปัญหา socket mark_read ไม่ทำงานบางกรณี)
    if (messages.length > 0) {
      const lastMessageId = messages[messages.length - 1].id;
      
      const member = await prisma.chatRoomUser.findUnique({
        where: {
          userId_chatRoomId: {
            userId: Number(userId),
            chatRoomId: Number(roomId)
          }
        }
      });

      if (member) {
        await prisma.chatRoomUser.update({
          where: {
            userId_chatRoomId: {
              userId: Number(userId),
              chatRoomId: Number(roomId)
            }
          },
          data: {
            lastReadMessageId: Math.max(member.lastReadMessageId || 0, lastMessageId)
          }
        });
      }
    }

    res.json(messages);
  } catch (error) {
    next(error);
  }
};


const getOrCreatePersonalRoom = async (req, res, next) => {
  try {
    const { friendId } = req.body;
    const userId = req.user.id;

    if (!friendId) {
      return res.status(400).json({ message: "Friend ID is required" });
    }

    // 1. หาห้องแชทส่วนตัว (isGroup: false) ที่มีทั้งเราและเพื่อนอยู่ด้วยกัน
    // เราหาห้องที่สมาชิกในห้องมี userId เป็นเรา และ สมาชิกในห้องมี userId เป็นเพื่อน
    const existingRoom = await prisma.chatRoom.findFirst({
      where: {
        isGroup: false,
        AND: [
          { users: { some: { userId: userId } } },
          { users: { some: { userId: Number(friendId) } } },
        ],
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

    if (existingRoom) {
      return res.json(existingRoom);
    }

    // 2. ถ้ายังไม่มีห้อง ให้สร้างห้องใหม่
    const newRoom = await prisma.chatRoom.create({
      data: {
        isGroup: false,
        users: {
          create: [
            { userId: userId },
            { userId: Number(friendId) },
          ],
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

    res.status(201).json(newRoom);
  } catch (error) {
    next(error);
  }
};

const deleteRoom = async (req, res, next) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;

    const room = await prisma.chatRoom.findUnique({
      where: { id: Number(roomId) },
      include: { users: true },
    });

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // สำหรับ Group: เฉพาะคนสร้างถึงลบได้
    // สำหรับ Personal: ใครลบก็ได้แต่ต้องเป็นสมาชิกในห้องนั้น
    const isMember = room.users.some((u) => u.userId === userId);
    if (room.isGroup) {
      if (room.creatorId !== userId) {
        return res.status(403).json({ message: "Only creator can delete this group" });
      }
    } else {
      if (!isMember) {
        return res.status(403).json({ message: "You are not a member of this chat" });
      }
    }

    await prisma.chatRoom.delete({
      where: { id: Number(roomId) },
    });

    res.json({ message: "Chat deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export default {
  getRooms,
  getMessages,
  createRoom,
  getOrCreatePersonalRoom,
  deleteRoom,
};