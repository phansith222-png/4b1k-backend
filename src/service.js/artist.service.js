import { prisma } from '../lib/prisma.js'
import createHttpError from 'http-errors'

export const getAllArtists = async () => {
    const result = await prisma.artist.findMany({
        orderBy: { createdAt: 'desc' },
        // ถ้าอยากให้หน้าเว็บดึง Genres และ Agency ได้จากคำสั่งนี้เลย ให้เปิดคอมเมนต์ตรงนี้ครับ
        include: {
            agency: true,
            genres: {
                include: { genre: true }
            }
        }
    })
    return result
}

export const getArtist = async (artistId) => {
    const artist = await prisma.artist.findUnique({
        where: { id: artistId },
        include: {
            agency: true,
            genres: { include: { genre: true } },
            songs: { orderBy: { popularity: 'desc' } },
            events: {
                include: {
                    event: { include: { venue: true } }
                }
            }
        }
    })

    if (!artist) return null

    const isProduction = process.env.NODE_ENV === 'production'

    return {
        ...artist,
        songs: artist.songs.map(song => ({
            ...song,
            streamUrl: (song.isDemo && isProduction) ? null : song.streamUrl,
        }))
    }
}

export const createArtistPage = async (data) => {
    const { artistName, profileImage, biography, agencyId, genreId, songs, userId } = data

    // เตรียมโครงสร้างข้อมูลที่จะสร้าง (Data payload)
    const prismaData = {
        artistName: artistName,
        profileImage: profileImage || null,
        biography: biography || null,
        createdByUser: {
            connect: { id: userId }
        }
    }

    if (agencyId) {
        prismaData.agency = {
            connect: { id: agencyId }
        };
    }

    if (genreId) {
        prismaData.genres = {
            create: [
                { genre: { connect: { id: genreId } } }
            ]
        };
    }

    // ถ้ามีข้อมูลเพลงส่งมาด้วย
    if (songs && Array.isArray(songs) && songs.length > 0) {
        prismaData.songs = {
            create: songs.map((song) => ({
                title: song.title,
                coverImage: song.coverImage || null,
                duration: song.duration ? Number(song.duration) : null,
                streamUrl: song.streamUrl || null,
                releaseDate: song.releaseDate ? new Date(song.releaseDate) : null
            }))
        };
    }

    const result = await prisma.artist.create({
        data: prismaData,
        include: {
            agency: true,
            genres: {
                include: { genre: true }
            },
            songs: true,
            createdByUser: {
                select: { id: true, username: true }
            }
        }
    })

    return result
}

export const updateArtistPage = async (data) => {
    const { artistName, artistId, profileImage, biography, agencyId, genreId, songs, userId } = data
    
    const foundArtist = await prisma.artist.findUnique({
        where: { id: artistId }
    })

    if (!foundArtist) {
        // แก้ไข: ใช้ throw และวงเล็บที่ถูกต้อง
        throw createHttpError(404, 'Artist not found')
    }

    const prismaData = {
        artistName: artistName,
        profileImage: profileImage !== undefined ? profileImage : undefined,
        biography: biography !== undefined ? biography : undefined,
        // (ส่วนนี้อาจไม่ต้องอัปเดต createdByUser ตลอดเวลาที่แก้ไข แต่อิงตามโค้ดเดิมของคุณ)
        createdByUser: {
            connect: { id: userId }
        }
    }

    if (agencyId) {
        prismaData.agency = {
            connect: { id: agencyId }
        }
    }

    if (genreId) {
        prismaData.genres = {
            deleteMany: {},
            create: [
                { genre: { connect: { id: genreId } } }
            ]
        };
    }

    if (songs && Array.isArray(songs) && songs.length > 0) {
        prismaData.songs = {
            create: songs.map((song) => ({
                title: song.title,
                coverImage: song.coverImage || null,
                duration: song.duration ? Number(song.duration) : null,
                streamUrl: song.streamUrl || null,
                releaseDate: song.releaseDate ? new Date(song.releaseDate) : null
            }))
        };
    }

    const result = await prisma.artist.update({
        where: { id: artistId },
        data: prismaData,
        include: {
            agency: true,
            genres: { include: { genre: true } },
            songs: true,
            createdByUser: {
                select: { id: true, username: true }
            }
        }
    });

    return result
}

export const deleteArtistPage = async (artistId) => {
    const foundArtist = await prisma.artist.findUnique({
        where: { id: artistId }
    })

    if (!foundArtist) {
        throw createHttpError(404, 'Artist not found')
    }

    // กรณีศิลปินถูกลบ Prisma อาจจะติดเรื่อง Relation 
    // ตรวจสอบ schema ด้วยว่า ArtistGenre, Song ตั้งค่า onDelete: Cascade ไว้หรือไม่
    const result = await prisma.artist.delete({
        where: { id: artistId }
    })

    return result
}

export const likeArtist = async (data) => {
    const { userId, artistId } = data

    const foundArtist = await prisma.artist.findUnique({
        where: { id: artistId }
    })

    if (!foundArtist) {
        throw createHttpError(404, 'Artist Not Found')
    }

    const haveLike = await prisma.favArtist.findUnique({
        where: {
            userId_artistId: {
                userId: userId,
                artistId: artistId
            }
        }
    })

    if (haveLike) {
        throw createHttpError(400, 'Already liked this artist')
    }

    const result = await prisma.favArtist.create({
        data: { userId: userId, artistId: artistId }
    })

    return result
}

export const unlikeArtist = async (data) => {
    const { userId, artistId } = data

    const likeData = await prisma.favArtist.findUnique({
        where: {
            userId_artistId: { userId, artistId }
        }
    })

    if (!likeData) {
        throw createHttpError(401, 'Cannot unlike this artist, or not liked yet')
    }

    const result = await prisma.favArtist.delete({
        where: {
            userId_artistId: { userId, artistId }
        }
    })

    return result
}

// ดึงเพลง
export const getSongsByArtist = async (artistId) => {
    const songs = await prisma.song.findMany({
        where: { artistId: Number(artistId) },
        orderBy: { popularity: 'desc' }
    })

    const isProduction = process.env.NODE_ENV === 'production'
    return songs.map(song => ({
        ...song,
        streamUrl: (song.isDemo && isProduction) ? null : song.streamUrl,
    }))
}

// ดึงอีเวนต์
export const getEventsByArtist = async (artistId) => {
    // เนื่องจากตารางเป็น ArtistEvent เราต้อง Include ไปหา Event และ Venue
    return await prisma.artistEvent.findMany({
        where: { artistId: Number(artistId) },
        include: {
            event: {
                include: {
                    venue: true // เพื่อให้หน้าเว็บดึงชื่อสถานที่ (evt.venue.name) ได้
                }
            }
        }
    });
}