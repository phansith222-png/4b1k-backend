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