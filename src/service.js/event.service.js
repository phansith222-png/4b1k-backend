import {prisma} from '../lib/prisma.js'
import createHttpError from 'http-errors'

export const getAllEvents = async() => {
    const result = await prisma.event.findMany({
        orderBy: { 
            startTime: 'asc' 
        },
        //ดึงข้อมูลสถานที่และศิลปินที่มาร่วมงานไปให้หน้าบ้านด้วยเลย
        include: {
            venue: true, // ดึงชื่อสถานที่ แผนที่
            artists: {   // ดึงรายชื่อศิลปินที่มาร่วมงานนี้
                include: {
                    artist: {
                        select: { id: true, artistName: true, profileImage: true } // ดึงมาแค่ชื่อกับรูปก็พอ ถ้า frontend อยากได้เพิ่มค่อยมาแก้
                    }
                }
            }
        }

    })

    return result
}

export const getEvent = async(eventId) => {
    const result = await prisma.event.findUnique({
        where : { id : eventId},
        include: {
            // 1. ดึงข้อมูลสถานที่จัดงาน (Venue) มาด้วย
            venue: true, 

            // 2. ดึงข้อมูลศิลปินที่มาร่วมงาน
            artists: {
                include: {
                    artist: {
                        // (Optional) เลือกเฉพาะฟิลด์ที่อยากโชว์ เพื่อไม่ให้ข้อมูลรกเกินไป
                        select: {
                            id: true,
                            artistName: true,
                            profileImage: true,
                            agency: { select: { name: true } } // ดึงชื่อค่ายเพลงมาด้วยก็ยังได้!
                        }
                    }
                }
            }
        }

    })

    return result
}

export const createEvent = async(data) => {
    const { 
        eventName, 
        description, 
        posterImage, 
        status, 
        ticketLink, 
        startTime, 
        endTime, 
        venueId, 
        artistIds, 
        userId
    } = data

    console.log('userId in create service',userId)
    //จัดเตรียมข้อมูลให้ตรงกับชื่อฟิลด์ใน Prisma Schema
    const prismaData = {
        eventName: eventName,
        description: description || null,
        posterImage: posterImage || null,
        status: status || 'UPCOMING', 
        ticketLink: ticketLink || null,
        createdByUserId: userId,
        
        // Prisma บังคับให้วันที่ต้องเป็น Date Object
        startTime: new Date(startTime), 
        endTime: endTime ? new Date(endTime) : null,
        
        //ใส่ ID ของสถานที่ และ ID ของแอดมินคนสร้าง
        venueId: venueId, 
    }

    // ถ้าหน้าบ้านส่ง artistIds มา (เช่น [1, 2, 5]) ให้วนลูปสร้างความสัมพันธ์
    if (artistIds && Array.isArray(artistIds) && artistIds.length > 0) {
        prismaData.artists = {
            create: artistIds.map((id) => ({
                artist: { connect: { id: id } }
            }))
        };
    }


    // 4. สั่งให้ Prisma สร้างข้อมูลลง Database
    const result = await prisma.event.create({
        data: prismaData,
        // (Optional) สั่งให้ดึงข้อมูลสถานที่และชื่อแอดมินกลับมาโชว์ใน Response ด้วยเลย
        include: {
            venue: true,
            artists: { 
                include: { artist: { select: { id: true, artistName: true } } } 
            },
            createdByUser: { 
                select: { id: true, username: true } 
            }
        }
    })

    return result
}

export const updateEvent = async(data) => {

    const { eventName,
            eventId, 
            description, 
            posterImage, 
            status, 
            ticketLink, 
            startTime, 
            endTime, 
            venueId, 
            artistIds,
            userId} = data
    
    const foundEvent = await prisma.event.findUnique({
        where : { id : eventId}
    })

    if(!foundEvent) {
        return (createHttpError[404],'Not Found Event')
    }

    const prismaData = {
        eventName : eventName,
        description : description || null,
        posterImage : posterImage || null,
        status : status || 'UPCOMING',
        ticketLink : ticketLink || null,
        createdByUserId : userId,

        startTime : new Date(startTime),
        endTime : endTime ? new Date(endTime) : null,
        venueId : venueId
    }

    if (artistIds && Array.isArray(artistIds)) {
        prismaData.artists = {
            deleteMany: {}, // ลบข้อมูลในตารางเชื่อมของ Event นี้ทิ้งก่อน
            create: artistIds.map((id) => ({
                artist: { connect: { id: Number(id) } }
            }))
        }
    }
    const result = await prisma.event.update({
        where : {id : eventId},
        data: prismaData,
        // (Optional) สั่งให้ดึงข้อมูลสถานที่และชื่อแอดมินกลับมาโชว์ใน Response ด้วยเลย
        include: {
            venue: true,
            artists: { 
                include: { artist: { select: { id: true, artistName: true } } } 
            },
            createdByUser: { 
                select: { id: true, username: true } 
            }
        }
    })

    return result
}

export const deleteEvent = async(eventId) => {
    const foundEvent = await prisma.event.findUnique({
        where : { id : eventId}
    })

    if (!foundEvent) {
        return (createHttpError[404],('Event not found'))
    }

    const result = await prisma.event.delete({
        where : { id : eventId}
    })

    return result
}