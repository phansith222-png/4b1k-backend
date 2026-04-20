import createHttpError from 'http-errors'
import { createEvent, deleteEvent, getAllEvents, getEvent, updateEvent } from '../service.js/event.service.js'
import { prisma } from '../lib/prisma.js' // 📌 อย่าลืม import prisma ให้ถูกต้องตาม path ของคุณ

export async function getAllEventsController (req,res,next) {
    try {
        const events = await prisma.event.findMany({
            orderBy: {
                startTime: 'asc' // เรียงจากวันที่ใกล้สุด
            },
            include: {
                venue: true,
                artists: {   
                    include: {
                        artist: {
                            include: {
                                genres: {  // 📌 แก้ตรงนี้! เปลี่ยนจาก artistGenres เป็น genres ตาม Schema ของคุณ
                                    include: { genre: true }
                                }
                            }
                        }
                    }
                }
            }
        });

        // Loop เพื่อสร้างฟิลด์ type และ mainArtistName ให้ Frontend ไปทำ Filter ง่ายๆ
        const formattedEvents = events.map(event => {
            let eventType = "Concert"; 
            let eventArtistName = "Various Artists";

            if (event.artists && event.artists.length > 0) {
                // เช็คโครงสร้างการดึงข้อมูล
                const mainArtist = event.artists[0].artist ? event.artists[0].artist : event.artists[0];
                
                if (mainArtist) {
                    eventArtistName = mainArtist.artistName || "Unknown Artist";
                    
                    // 📌 เปลี่ยนมาเรียกใช้ .genres ให้ตรงกัน
                    const genreList = mainArtist.genres;
                    
                    if (genreList && genreList.length > 0) {
                        const firstGenre = genreList[0].genre ? genreList[0].genre : genreList[0];
                        const genreName = firstGenre?.name?.toLowerCase() || "";
                        
                        // จัดกลุ่มแนวเพลงให้เป็นคำสั้นๆ สำหรับทำปุ่ม Filter
                        if (genreName.includes('pop')) eventType = "Pop";
                        else if (genreName.includes('rock')) eventType = "Rock";
                        else if (genreName.includes('r&b') || genreName.includes('rnb') || genreName.includes('classic')) eventType = "R&B / Classic";
                        else if (genreName.includes('hip') || genreName.includes('rap')) eventType = "Hip Hop";
                        else if (genreName.includes('edm') || genreName.includes('electronic')) eventType = "EDM";
                        else eventType = firstGenre?.name || "Concert"; 
                    }
                }
            }

            return {
                ...event,
                type: eventType,
                mainArtistName: eventArtistName 
            };
        });

        res.status(200).json({ events: formattedEvents });
    } catch (err) {
        console.error("❌ Error in getAllEventsController:", err.message);
        next(err);
    }
}

export async function getEventController (req,res,next) {
    try {
        const {eventId} = req.params

        const getAnEvent = await getEvent(Number(eventId))

        res.status(200).json({
            message : 'Get event successfully',
            event : getAnEvent
        })

    }catch(error) {
        next(error)
    }
}

export async function createEventController (req,res,next) {
    try {
        if (req.user.role !== 'ADMIN') {
            return (createHttpError[403],'Access denied, Admin only')
        }

         const userId = req.user.id

         const { 
            eventName, 
            description, 
            posterImage, 
            status, 
            ticketLink, 
            startTime, 
            endTime, 
            venueId, 
            artistIds // รับเป็น Array ของ ID ศิลปิน เพื่อเอาไปผูกกับตาราง ArtistEvent
        } = req.body

        if (!eventName || eventName.trim() === '') {
            throw createHttpError(400, 'Event name is required');
        }
        if (!startTime) {
            throw createHttpError(400, 'Start time is required');
        }
        if (!venueId || isNaN(Number(venueId))) {
            throw createHttpError(400, 'Valid Venue ID is required');
        }

         // ส่งข้อมูลเข้า Service
        const newEvent = await createEvent({
            eventName: eventName.trim(),
            description,
            posterImage,
            status,
            ticketLink,
            startTime,
            endTime,
            venueId: Number(venueId), // แปลงเป็นตัวเลขก่อนลง Database
            artistIds: artistIds ? artistIds : [], //ส่งเป็น Array
            userId // ส่ง ID แอดมินไปบันทึกใน createdByUserId
        });
 
         res.status(201).json({
            message : 'create Event successfully',
            event : newEvent
         })
    }catch(error) {
        next(error)
    }
}

export async function updateEventController (req,res,next) {
    try {
        if (req.user.role !== 'ADMIN') {
            return (createHttpError[403],'Access denied, Admin only')
        }

        const {eventId} = req.params

         const userId = req.user.id

         const { 
            eventName, 
            description, 
            posterImage, 
            status, 
            ticketLink, 
            startTime, 
            endTime, 
            venueId, 
            artistIds // รับเป็น Array ของ ID ศิลปิน เพื่อเอาไปผูกกับตาราง ArtistEvent
        } = req.body

        if (!eventName || eventName.trim() === '') {
            throw createHttpError(400, 'Event name is required');
        }
        if (!startTime) {
            throw createHttpError(400, 'Start time is required');
        }
        if (!venueId || isNaN(Number(venueId))) {
            throw createHttpError(400, 'Valid Venue ID is required');
        }


        const updatedEvent = await updateEvent({
            eventName :eventName.trim(),
            eventId : Number(eventId), 
            description, 
            posterImage, 
            status, 
            ticketLink, 
            startTime, 
            endTime, 
            venueId, 
            artistIds,
            userId
        })

        res.status(200).json({
            message : 'Updated Event successfully',
            event : updatedEvent
        })
    }catch(error) {
        next(error)
    }
}

export async function deleteEventController (req,res,next) {
    try {
        if (req.user.role !== 'ADMIN') {
            return (createHttpError[403],'Access denied, Admin only')
        }

        const {eventId} = req.params

        const adminId = req.user.id

        const adminName = req.user.username || "Admin"
        
        if (!eventId) {
            return (createHttpError[400],'Invalid event ID')
        }

        const removeEvent = await deleteEvent(Number(eventId))

        res.status(200).json({
            message : 'deleted event successfully',
            actionBy: {
                adminId: adminId,
                adminName: adminName
            },
            deletedData : removeEvent
        })
    }catch(error) {
        next(error)
    }
}