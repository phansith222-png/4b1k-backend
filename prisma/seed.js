import { prisma } from '../src/lib/prisma.js'

import { agenciesData } from './data/agencyData.js';
import { artistsData } from './data/artistData.js';
import { artistGenresData } from './data/artistGenresData.js';
import { artistsEventsData } from './data/artistsEvents.js';
import { commentsData } from './data/commentsData.js';
import { eventsData } from './data/eventData.js';
import { favArtistsData } from './data/favArtistsData.js';
import { genresData } from './data/genresData.js';
import { likePostData } from './data/likePostData.js';
import { newsArtistsData } from './data/newsArtistsData.js';
import { newsData } from './data/newsData.js';
import { postArtistsData } from './data/postsArtists.js';
import { postsData } from './data/postsData.js';
import { usersData } from './data/userData.js';
import { venuesData } from './data/venuesData.js';


// 6. Songs (อย่างน้อย 5 เพลง)
const songsData = [
  { title: "รักแรก (First Love)", artistId: 1, duration: 250, popularity: 9500 },
  { title: "ดีใจด้วยนะ (Glad)", artistId: 2, duration: 215, popularity: 8200 },
  { title: "ความเชื่อ", artistId: 6, duration: 280, popularity: 9900 },
  { title: "Mirror Mirror", artistId: 12, duration: 230, popularity: 8800 },
  { title: "Blinding Lights", artistId: 16, duration: 200, popularity: 15000 },
];

// 14. ChatRooms (ห้องแชท)
const chatRoomsData = [
  { isGroup: false }, // แชทระหว่าง User 3 & 4
  { isGroup: false }, // แชทระหว่าง User 5 & 6
  { isGroup: false },
  { isGroup: false },
  { isGroup: false }
];

// 15. ChatRoomUsers (ใครอยู่ในห้องแชทไหนบ้าง)
const chatRoomUsersData = [
  { userId: 3, chatRoomId: 1 }, { userId: 4, chatRoomId: 1 },
  { userId: 5, chatRoomId: 2 }, { userId: 6, chatRoomId: 2 },
  { userId: 3, chatRoomId: 3 }, { userId: 5, chatRoomId: 3 },
  { userId: 4, chatRoomId: 4 }, { userId: 6, chatRoomId: 4 },
  { userId: 3, chatRoomId: 5 }, { userId: 6, chatRoomId: 5 }
];

// 16. Messages (ข้อความในแชท)
const messagesData = [
  { content: "เธอๆ กดบัตรพี่นนท์ทันไหม", senderId: 3, chatRoomId: 1 },
  { content: "ไม่ทันอะ นกเลยยย", senderId: 4, chatRoomId: 1 },
  { content: "นายมีบัตร Bodyslam ปล่อยป่าว", senderId: 5, chatRoomId: 2 },
  { content: "ไม่มีเลย หาอยู่เหมือนกัน", senderId: 6, chatRoomId: 2 },
  { content: "ไว้ไปคอนด้วยกันนะ!", senderId: 3, chatRoomId: 3 }
];

async function resetData() {
    console.log('Clean table')

   await prisma.$transaction([
        prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 0;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `User`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Artist`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Agency`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Genre`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `ArtistGenre`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `FavArtist`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Post`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `PostArtist`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Like`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Comment`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Event`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `ArtistEvent`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Venue`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `ChatRoom`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Message`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Song`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `News`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `NewsArtist`;'),
        prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1;'),
    ]);
    console.log('Start seeding')

     await prisma.user.createMany({
        data: usersData,
        skipDuplicates: true,
    })

     await prisma.genre.createMany({
        data: genresData,
        skipDuplicates: true,
    })

       await prisma.agency.createMany({
        data: agenciesData,
        skipDuplicates: true,
    })
    
        await prisma.artist.createMany({
        data: artistsData,
        skipDuplicates: true,
    })

        await prisma.artistGenre.createMany({
        data: artistGenresData,
        skipDuplicates: true,
    })

        await prisma.song.createMany({
        data: songsData ,
        skipDuplicates: true,
    })

        await prisma.venue.createMany({
        data: venuesData ,
        skipDuplicates: true,
    })    

        await prisma.event.createMany({
        data: eventsData ,
        skipDuplicates: true,
    })   

        await prisma.artistEvent.createMany({
        data: artistsEventsData ,
        skipDuplicates: true,
    })    

        await prisma.favArtist.createMany({
        data: favArtistsData ,
        skipDuplicates: true,
    }) 

        await prisma.post.createMany({
        data: postsData,
        skipDuplicates: true,
    })   

        await prisma.postArtist.createMany({
        data: postArtistsData,
        skipDuplicates: true,
    })   

        await prisma.like.createMany({
        data: likePostData,
        skipDuplicates: true,
    })

        await prisma.comment.createMany({
        data: commentsData,
        skipDuplicates: true,
    })

        await prisma.chatRoom.createMany({
        data: chatRoomsData  ,
        skipDuplicates: true,
    })

        await prisma.chatRoomUser.createMany({
        data: chatRoomUsersData,
        skipDuplicates: true,
    })

        await prisma.message.createMany({
        data: messagesData,
        skipDuplicates: true,
    })

        await prisma.news.createMany({
        data: newsData,
        skipDuplicates: true,
    })

        await prisma.newsArtist.createMany({
        data: newsArtistsData,
        skipDuplicates: true,
    })


}

resetData().then(async ()=> {
    await prisma.$disconnect()
}).catch(async (err)=> {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
})