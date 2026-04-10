import bcrypt from 'bcrypt'
import { prisma } from '../src/lib/prisma.js'

const hashPassword = () => bcrypt.hashSync('@Concert123456',8)

// 1. Users (4 Users + 2 Admins = 6 คน)
const usersData = [
  // Admins (2)
  { username: "admin_ben", email: "admin.ben@concert.com", firstName: "Ben", lastName: "Admin", password: hashPassword(), role: "ADMIN", gender: "FEMALE" },
  { username: "admin_lisa", email: "lisa.admin@concert.com", firstName: "Lisa", lastName: "Admin", password: hashPassword(), role: "ADMIN", gender: "MALE" },
  // Users (4)
  { username: "fanboy01", email: "fanboy@gmail.com", firstName: "Somchai", lastName: "Jaidee", password: hashPassword(), role: "USER", gender: "MALE" },
  { username: "fangirl99", email: "fangirl@gmail.com", firstName: "Somsri", lastName: "Rakdee", password: hashPassword(), role: "USER", gender: "FEMALE" },
  { username: "musiclover", email: "music@yahoo.com", firstName: "John", lastName: "Doe", password: hashPassword(), role: "USER", gender: "OTHER" },
  { username: "concertgoer", email: "goer@hotmail.com", firstName: "Jane", lastName: "Smith", password: hashPassword(), role: "USER", gender: "FEMALE" },
];

// 2. Genres (5 แนวเพลง)
const genresData = [
  { name: "Pop" },
  { name: "Rock" },
  { name: "Hip Hop" },
  { name: "R&B" },
  { name: "EDM" }
];

// 3. Agencies (5 ค่ายเพลง)
const agenciesData = [
  { name: "GMM Grammy", description: "ค่ายเพลงอันดับ 1 ของไทย" },
  { name: "YG Entertainment", description: "K-Pop Global Agency" },
  { name: "Universal Music", description: "International Label" },
  { name: "High Cloud Entertainment", description: "Thai Hip Hop Label" },
  { name: "Independent", description: "ศิลปินอิสระ" }
];

// 4. Artists (25 ศิลปิน - ผสมไทยและสากล)
const artistsData = [
  // Pop (1-5)
  { artistName: "NONT TANONT", agencyId: 1, biography: "นักร้องเสียงนุ่มแนวหน้าของไทย" },
  { artistName: "INK WARUNTORN", agencyId: 1, biography: "เจ้าหญิงซินธ์ป็อป" },
  { artistName: "Taylor Swift", agencyId: 3, biography: "Global Pop Icon" },
  { artistName: "Ariana Grande", agencyId: 3, biography: "Vocal Queen" },
  { artistName: "Ed Sheeran", agencyId: 3, biography: "Pop Acoustic Master" },
  // Rock (6-10)
  { artistName: "Bodyslam", agencyId: 1, biography: "วงร็อคอันดับ 1 ของไทย" },
  { artistName: "TaitosmitH", agencyId: 1, biography: "ร็อคเพื่อชีวิตยุคใหม่" },
  { artistName: "Coldplay", agencyId: 3, biography: "Legendary Brit Rock" },
  { artistName: "Arctic Monkeys", agencyId: 3, biography: "Indie Rock" },
  { artistName: "Lomosonic", agencyId: 1, biography: "Energetic Rock Band" },
  // Hip Hop (11-15)
  { artistName: "URBOYTJ", agencyId: 5, biography: "Thai Hip Hop Star" },
  { artistName: "MILLI", agencyId: 1, biography: "Global Thai Rapper" },
  { artistName: "F.HERO", agencyId: 4, biography: "Hip Hop Legend" },
  { artistName: "Kendrick Lamar", agencyId: 3, biography: "Rap God" },
  { artistName: "Travis Scott", agencyId: 3, biography: "Trap Master" },
  // R&B (16-20)
  { artistName: "The Weeknd", agencyId: 3, biography: "King of Dark R&B" },
  { artistName: "Jeff Satur", agencyId: 5, biography: "R&B and Pop Fusion" },
  { artistName: "SZA", agencyId: 3, biography: "R&B Sensation" },
  { artistName: "NIKI", agencyId: 3, biography: "88rising R&B Star" },
  { artistName: "BOWKYLION", agencyId: 1, biography: "Thai R&B/Pop" },
  // EDM (21-25)
  { artistName: "Martin Garrix", agencyId: 3, biography: "World No.1 DJ" },
  { artistName: "Zedd", agencyId: 3, biography: "Melodic EDM" },
  { artistName: "Calvin Harris", agencyId: 3, biography: "EDM Hitmaker" },
  { artistName: "DJ Snake", agencyId: 3, biography: "Trap/EDM Producer" },
  { artistName: "Illenium", agencyId: 3, biography: "Future Bass King" }
];

// 5. ArtistGenres (เชื่อมความสัมพันธ์ ศิลปิน x แนวเพลง)
// id ของ Artist จะเริ่มที่ 1-25 และ Genre เริ่ม 1-5
const artistGenresData = [
  // นำศิลปินมาผูกแนวเพลง (บางคนมีมากกว่า 1 แนว)
  { artistId: 1, genreId: 1 }, { artistId: 1, genreId: 4 }, // NONT (Pop, R&B)
  { artistId: 2, genreId: 1 }, // INK (Pop)
  { artistId: 6, genreId: 2 }, // Bodyslam (Rock)
  { artistId: 12, genreId: 3 }, { artistId: 12, genreId: 1 }, // MILLI (Hip Hop, Pop)
  { artistId: 16, genreId: 4 }, { artistId: 16, genreId: 1 }, // The Weeknd (R&B, Pop)
  { artistId: 21, genreId: 5 }, // Martin Garrix (EDM)
];

// 6. Songs (อย่างน้อย 5 เพลง)
const songsData = [
  { title: "รักแรก (First Love)", artistId: 1, duration: 250, popularity: 9500 },
  { title: "ดีใจด้วยนะ (Glad)", artistId: 2, duration: 215, popularity: 8200 },
  { title: "ความเชื่อ", artistId: 6, duration: 280, popularity: 9900 },
  { title: "Mirror Mirror", artistId: 12, duration: 230, popularity: 8800 },
  { title: "Blinding Lights", artistId: 16, duration: 200, popularity: 15000 },
];

// 7. Venues (อย่างน้อย 5 สถานที่)
const venuesData = [
  { name: "Impact Arena", address: "Muang Thong Thani", lat: 13.9133, lng: 100.5480 },
  { name: "Rajamangala Stadium", address: "Hua Mak", lat: 13.7552, lng: 100.6225 },
  { name: "Thunder Dome", address: "Muang Thong Thani", lat: 13.9211, lng: 100.5466 },
  { name: "Bitec Bangna", address: "Bang Na", lat: 13.6705, lng: 100.6105 },
  { name: "Lido Connect", address: "Siam Square", lat: 13.7455, lng: 100.5315 }
];

// 8. Events (อย่างน้อย 5 คอนเสิร์ต)
const eventsData = [
  { eventName: "Bodyslam Fest 2026", venueId: 2, startTime: new Date("2026-06-15T18:00:00Z"), status: "UPCOMING", ticketLink: "https://thaiticketmajor.com/bodyslam" },
  { eventName: "The Weeknd After Hours Asia Tour", venueId: 1, startTime: new Date("2026-08-20T19:30:00Z"), status: "UPCOMING" },
  { eventName: "Indie Pop Night", venueId: 5, startTime: new Date("2026-05-10T19:00:00Z"), status: "UPCOMING" },
  { eventName: "Hip Hop Festival", venueId: 4, startTime: new Date("2025-12-01T17:00:00Z"), status: "FINISHED" }, // จบไปแล้ว
  { eventName: "EDM Countdown", venueId: 3, startTime: new Date("2026-12-31T20:00:00Z"), status: "UPCOMING" }
];

// 9. ArtistEvents (เชื่อมศิลปินเข้ากับคอนเสิร์ต)
const artistEventsData = [
  { artistId: 6, eventId: 1 }, // Bodyslam แสดง Bodyslam Fest
  { artistId: 16, eventId: 2 }, // The Weeknd แสดงคอนเสิร์ตเดี่ยว
  { artistId: 2, eventId: 3 }, { artistId: 20, eventId: 3 }, // INK & BOWKYLION แสดง Indie Pop
  { artistId: 11, eventId: 4 },{ artistId: 12, eventId: 4 }, // URBOYTJ & MILLI แสดง Hip Hop Fest
  { artistId: 21, eventId: 5 }, // Martin Garrix แสดง EDM
];

// 10. FavArtist (User Follow ศิลปิน)
const favArtistsData = [
  { userId: 3, artistId: 1 }, { userId: 3, artistId: 2 }, // fanboy01 ตาม NONT, INK
  { userId: 4, artistId: 16 }, // fangirl99 ตาม The Weeknd
  { userId: 5, artistId: 6 },  // musiclover ตาม Bodyslam
  { userId: 6, artistId: 12 }  // concertgoer ตาม MILLI
];

// 11. Posts (โพสต์ใน Community)
const postsData = [
  // ---------------------------------------------------------
  // กลุ่มที่ 1: โพสต์ที่พูดถึงศิลปินโดยตรง (มี artistId)
  // ---------------------------------------------------------
  { 
    title: "เตรียมตัวให้พร้อม! รอกดบัตรคอนเสิร์ต NONT TANONT",
    content: "รอกดบัตรคอนเสิร์ตพี่นนท์ไม่ไหวแล้ววว มีใครพอจะแนะนำเว็บซ้อมกดบัตรได้บ้างไหมครับ กลัวนกมาก", 
    userId: 3, 
    artistId: 1 
  },
  { 
    title: "ตามหาบัตร Bodyslam โซน A คอนเสิร์ตใหญ่",
    content: "ใครมีบัตร Bodyslam โซน A ปล่อยบ้างครับ ทักแชทที นัดรับหน้างานได้เลย ขอราคาไม่บวกแรงนะ", 
    userId: 5, 
    artistId: 6 
  },
  { 
    title: "ข่าวลือ! The Weeknd อาจจะมาไทยปลายปีนี้?",
    content: "The Weeknd มาไทยรอบนี้จัดเต็มแน่! เห็นตารางทัวร์เอเชียหลุดออกมา มีลุ้นราชมังฯ ไหมทุกคน?", 
    userId: 4, 
    artistId: 16 
  },
  { 
    title: "รีวิวเพลงใหม่ MILLI ฟังแล้วหยุดโยกไม่ได้",
    content: "เพลงใหม่ MILLI คือดีย์มากแม่ บีทมันส์สุดๆ รอไปเต้นหน้าเวทีเทศกาลดนตรีเลย", 
    userId: 6, 
    artistId: 12 
  },
  { 
    title: "รวมรูป อิงค์ วรันธร จากงาน Music Fest เมื่อวาน",
    content: "อิงค์ วรันธร น่ารักมากก งานเมื่อวาน ใครมีรูปมุมอื่นมาแปะแชร์กันได้เลยน้าาา", 
    userId: 3, 
    artistId: 2 
  },

  // ---------------------------------------------------------
  // กลุ่มที่ 2: โพสต์เรื่องทั่วไปเกี่ยวกับคอนเสิร์ต/ดนตรี (ไม่มี artistId)
  // ---------------------------------------------------------
  {
    title: "เตือนภัย! ระวังมิจฉาชีพหลอกขายบัตรทิพย์ใน Twitter",
    content: "ช่วงนี้คอนเสิร์ตเยอะมาก ระวังคนที่ให้โอนเงินก่อนแล้วไม่ยอมนัดรับนะครับ เช็คเครดิตกันดีๆ ด้วยความหวังดีจากแอดมิน",
    userId: 1,
    // ไม่ใส่ artistId (ในฐานข้อมูลจะเป็น null อัตโนมัติ)
  },
  {
    title: "[CR] รีวิวผังที่นั่ง อิมแพ็ค อารีน่า โซนไหนคุ้มสุด?",
    content: "รวบรวมมุมมองจากที่นั่งโซนต่างๆ ในอิมแพ็คครับ สำหรับคนที่กำลังตัดสินใจว่าจะกดบัตรราคาไหนดี เข้ามาดูกันได้",
    userId: 2,
    artistId: null // ระบุเป็น null ชัดเจนไปเลยก็ได้เช่นกัน
  },
  {
    title: "แชร์ไอเทมลับ! ของที่ต้องพกไปดูคอนเสิร์ตหน้าฝน",
    content: "ใครจะไปงาน Outdoor ช่วงนี้ อย่าลืมพกเสื้อกันฝนแบบพกพา ซองกันน้ำใส่โทรศัพท์ แล้วก็รองเท้าแตะสำรองไปด้วยนะ ลำบากจริงยืนยัน",
    userId: 4,
  }
];

// 12. Likes (กดไลก์โพสต์)
const likesData = [
  { userId: 4, postId: 1 },
  { userId: 6, postId: 1 },
  { userId: 3, postId: 2 },
  { userId: 5, postId: 3 },
  { userId: 4, postId: 4 }
];

// 13. Comments (คอมเมนต์โพสต์)
const commentsData = [
  { content: "กดให้ทันนะค๊าา คู่แข่งเยอะมาก", userId: 4, postId: 1 },
  { content: "หาด้วยคนครับ โซน A", userId: 6, postId: 2 },
  { content: "เตรียมตังค์พร้อมแล้ว!", userId: 3, postId: 3 },
  { content: "ท่อนแร็ปคือสุด", userId: 5, postId: 4 },
  { content: "โดนตกไปเต็มๆ", userId: 6, postId: 5 }
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
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Like`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Comment`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Event`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `ArtistEvent`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Venue`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `ChatRoom`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Message`;'),
        prisma.$executeRawUnsafe('TRUNCATE TABLE `Song`;'),
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
        data: artistEventsData ,
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

        await prisma.like.createMany({
        data: likesData,
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

}

resetData().then(async ()=> {
    await prisma.$disconnect()
}).catch(async (err)=> {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
})