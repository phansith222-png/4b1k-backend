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
    const { artistName, profileImage, biography, agencyId, genreId, songs } = data

    const prismaData = {
        artistName: artistName,
        profileImage: profileImage || null,
        biography: biography || null,
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
            songs: true
        }
    })

    return result
}


