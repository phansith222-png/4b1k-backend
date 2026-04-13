import {prisma} from '../lib/prisma.js'
import createHttpError from 'http-errors'

export const getAllArtists = async() => {
    const result = await prisma.artist.findMany({
        orderBy : {createdAt : 'desc'},
    })
    return result
}

export const getArtist = async(artistId) => {
    const result = await prisma.artist.findUnique({
        where : {id : artistId},
        include: {
            // 1. ดึงข้อมูล Agency (ต้นสังกัด)
            agency: true, 
            // 2. ดึงรายการเพลงทั้งหมดของศิลปินนี้
            songs: {
                orderBy: { releaseDate: 'desc' } // (ตัวเลือกเพิ่มเติม) เรียงเพลงใหม่ล่าสุดขึ้นก่อน
            },
            // 3. ดึงข้อมูลแนวเพลง (เนื่องจากเป็น Many-to-Many ต้อง nested include)
            genres: {
                include: {
                    genre: true // เข้าไปหยิบชื่อแนวเพลงจากตาราง Genre
                }
            }
        }
    })
    return result
}

export const createArtistPage = async(data) => {
    const { artistName, profileImage, biography, agencyId, genreId, songs,userId } = data

    const prismaData = {
        artistName: artistName,
        profileImage: profileImage || null,
        biography: biography || null,
        createdByUser: {
            connect : {id : userId}
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

    //ถ้ามีข้อมูลเพลงส่งมาด้วย -> ให้สร้างเพลงใหม่ลงตาราง Song (Nested Create)
    if (songs && Array.isArray(songs) && songs.length > 0) {
        prismaData.songs = {
            create: songs.map((song) => ({
                title: song.title,
                coverImage: song.coverImage || null,
                duration: song.duration ? Number(song.duration) : null,
                streamUrl: song.streamUrl || null,
                // แปลงวันที่ String ให้เป็น DateTime เพื่อให้เซฟลง Database ได้
                releaseDate: song.releaseDate ? new Date(song.releaseDate) : null
            }))
        };
    }

    const result = await prisma.artist.create({
        data: prismaData,
        // ดึงข้อมูลที่เพิ่งสร้าง/ผูกเสร็จ กลับไปให้ Controller ด้วย
        include: {
            agency: true,
            genres: { 
                include: { genre: true } 
            },
            songs: true,
            createdByUser: {
                select: { id: true, username: true } // ดึงมาแค่ ID กับชื่อก็พอ
            }
        }
    })

    return result
}

export const updateArtistPage = async(data) => {

    const { artistName,artistId, profileImage, biography, agencyId, genreId, songs,userId } = data
    const foundArtist = await prisma.artist.findUnique({
        where : {id : artistId}
    })

    if(!foundArtist) {
        return (createHttpError[404]('Not found Artist'))
    }

    // เตรียมข้อมูลที่จะอัปเดต
    const prismaData = {
        artistName: artistName,
        profileImage: profileImage !== undefined ? profileImage : undefined,
        biography: biography !== undefined ? biography : undefined,
        createdByUser: {
            connect : {id : userId}
        }
    }

    // console.log(prismaData)
    //ถ้ามีการเปลี่ยนค่ายเพลง (agencyId)
    if (agencyId) {
        prismaData.agency = { 
            connect: { id: agencyId } 
        }
    }

    if (genreId) {
        prismaData.genres = {
            deleteMany: {}, // ลบแนวเพลงเดิมของศิลปินคนนี้ออกทั้งหมด เพิ่มได้ทีละหลายแนว ไม่ค้อเียนโค้ดดักว่า แนวเพลงนี้มีซ้ำหรือยัง
            create: [
                { genre: { connect: { id: genreId } } } // ผูกกับแนวเพลงใหม่
            ]
        };
    }

    // ถ้าส่งเพลงใหม่มาด้วย (สมมติว่าเป็นการ "เพิ่มเพลงใหม่" เข้าไป ไม่ใช่ลบเพลงเก่า)
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

    //อัปเดตลง Database
    const result = await prisma.artist.update({
        where: { id: artistId },
        data: prismaData,
        include: {
            agency: true,
            genres: { include: { genre: true } },
            songs: true,
            createdByUser: {
                select: { id: true, username: true } // ดึงมาแค่ ID กับชื่อก็พอ
            }
        }
    });

    return result
}

export const deleteArtistPage = async(artistId) => {

    const foundArtist = await prisma.artist.findUnique({
          where : { id : artistId}
    })

    if(!foundArtist) {
        return (createHttpError[404]('Artist not found'))
    }

    const result = await prisma.artist.delete({
        where : { id : artistId}
    })

    return result
}

export const likeArtist = async(data) => {

    const {userId,artistId} = data

    // console.log('artistId at likeArtist',artistId)

    const foundArtist = await prisma.artist.findUnique({
        where : {id : artistId}
    })

    if(!foundArtist) {
        return (createHttpError(404),'Artist Not Found')
    }

    const haveLike = await prisma.favArtist.findUnique({
        where: {
            userId_artistId: {
                userId: userId,
                artistId: artistId
            }
        }
    })

    if(haveLike) {
        return (createHttpError[400],('already like this artist'))
    }

    const result = await prisma.favArtist.create({
        data : {userId : userId, artistId : artistId}
    })

    return result
}

export const unlikeArtist = async(data) => {
    const {userId,artistId} = data

    const likeData = await prisma.favArtist.findUnique({
        where : {
            userId_artistId : {userId,artistId}
        }
    })

    if(!likeData) {
        return (createHttpError[401]('Cannot unlike this artist'))
    }

    const result = await prisma.favArtist.delete({
        where : {
            userId_artistId : {userId,artistId}
        }
    })

    return result
}