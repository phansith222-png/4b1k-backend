import bcrypt from 'bcrypt'
import { prisma } from '../src/lib/prisma.js' // เช็ค path ให้ตรงกับโปรเจกต์ของคุณ
import { postArtistsData } from './data/postsArtists.js';
import { postsData } from './data/postsData.js';
import { likePostData } from './data/likePostData.js';
import { commentsData } from './data/commentsData.js';
import { usersData } from './data/userData.js';
import { venuesData } from './data/venuesData.js';
import { eventsData } from './data/eventData.js';
import { artistsEventsData } from './data/artistsEvents.js';
import { postImagesData } from './data/postImageData.js';

// 2. Genres (5 แนวเพลง)
const genresData = [
  { name: "Pop" }, { name: "Rock" }, { name: "Hip Hop" }, { name: "R&B" }, { name: "EDM" }
];

// 3. Agencies (5 ค่ายเพลง)
const agenciesData = [
  { name: "GMM Grammy", description: "ค่ายเพลงอันดับ 1 ของไทย" },
  { name: "YG Entertainment", description: "K-Pop Global Agency" },
  { name: "Universal Music", description: "International Label" },
  { name: "High Cloud Entertainment", description: "Thai Hip Hop Label" },
  { name: "Independent", description: "ศิลปินอิสระ" }
];

// 4. Artists (25 ศิลปิน) - 🔴 แก้ไข profileImage ให้แปะรูปจริงได้ง่าย
const artistsData = [
  // --- POP (1-5) ---
  { artistName: "NONT TANONT", agencyId: 1, profileImage: "https://www.myband.co.th/uploads/20250116/82ff19bfa9053ee0a431ca41d570ad1a.jpg", biography: "ธนนท์ จำเริญ (นนท์) ผู้ชนะจากรายการ The Voice Thailand Season 1..." },
  { artistName: "INK WARUNTORN", agencyId: 1, profileImage: "https://i.scdn.co/image/ab67616d00001e026a0020916947bb631a5578c2", biography: "อิ้งค์ วรันธร เปานิล เจ้าหญิงแห่งวงการซินธ์ป๊อป (Synth-Pop)..." },
  { artistName: "Taylor Swift", agencyId: 3, profileImage: "https://cdn.britannica.com/37/252437-050-F21BD210/Taylor-Swift-performs-The-Eras-Tour-Sao-Paulo-Brazil-2023.jpg", biography: "Taylor Swift is a globally recognized pop icon and singer-songwriter." },
  { artistName: "Ariana Grande", agencyId: 3, profileImage: "https://m.media-amazon.com/images/M/MV5BM2JhZWJmMDEtNTU5MS00YmQ3LTk1NjMtOGFlMjM2MjZlNjg5XkEyXkFqcGc@._V1_.jpg", biography: "Ariana Grande is an American singer, songwriter, and actress." },
  { artistName: "Ed Sheeran", agencyId: 3, profileImage: "https://s.isanook.com/jo/0/ud/489/2446249/ed.jpg?ip/crop/w1200h700/q80/webp", biography: "Edward Christopher Sheeran is an English singer-songwriter." },
  // --- ROCK (6-10) ---
  { artistName: "Bodyslam", agencyId: 1, profileImage: "https://t2.genius.com/unsafe/899x0/https%3A%2F%2Fimages.genius.com%2Ff9be36f783b806eeeb3fbeb4daa77952.640x640x1.jpg", biography: "Bodyslam วงร็อคอันดับ 1 ของประเทศไทย นำโดย ตูน อาทิวราห์" },
  { artistName: "TaitosmitH", agencyId: 1, profileImage: "https://s.isanook.com/jo/0/ud/483/2417049/t6.jpg?ip/resize/w728/q80/jpg", biography: "ไททศมิตร (TaitosmitH) วงร็อคอินดี้เพื่อชีวิตยุคใหม่" },
  { artistName: "Coldplay", agencyId: 3, profileImage: "https://imagenes.elpais.com/resizer/v2/AHK4UHCHQ5EJJMOJISB4XF6C7E.jpg?auth=2a2fbbae9a847fdaf0ea0ce87f996ad96513d4cee708570128a8254570f0f1ce&width=1960&height=1470&smart=true", biography: "Coldplay is a British rock band formed in London." },
  { artistName: "Arctic Monkeys", agencyId: 3, profileImage: "https://www.meer.com/attachments/c197c99f7e75f340df337940d8eb518014bda493/store/fill/1090/613/25c5247fb68a977aa9347d4a17cfe97bff97a0e412020ed8d845977af6a7/The-Arctic-Monkeys-band-members.jpg", biography: "Arctic Monkeys are an English rock band formed in Sheffield." },
  { artistName: "Lomosonic", agencyId: 1, profileImage: "https://i.ytimg.com/vi/H6cFWr5c1zk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB4GRX7Bx7E64cpB6nxo_CSeXgzDg", biography: "Lomosonic วงร็อคพลังงานล้นเหลือ โด่งดังจากการแสดงสดที่บ้าคลั่ง" },
  // --- HIP HOP (11-15) ---
  { artistName: "URBOYTJ", agencyId: 5, profileImage: "https://cdn-images.dzcdn.net/images/cover/699bbaf79b77bf78e282dd094cca8fc4/0x1900-000000-80-0-0.jpg", biography: "URBOYTJ (เต๋า - จิรายุทธ) ศิลปินฮิปฮอปแถวหน้าของไทย" },
  { artistName: "MILLI", agencyId: 1, profileImage: "https://viberate-upload.ams3.cdn.digitaloceanspaces.com/prod/entity/artist/milli-123-6d4FD", biography: "MILLI (มิลลิ) แรปเปอร์สาวชาวไทยผู้สร้างประวัติศาสตร์บนเวที Coachella" },
  { artistName: "F.HERO", agencyId: 4, profileImage: "https://i.scdn.co/image/ab6761610000e5ebcf6dc7909f08fd4c42c59a24", biography: "F.HERO (กอล์ฟ - ฟักกลิ้ง ฮีโร่) ตำนานแรปเปอร์ของเมืองไทย" },
  { artistName: "Kendrick Lamar", agencyId: 3, profileImage: "https://cdn-images.dzcdn.net/images/artist/be0a7c550567f4af0ed202d7235b74d6/1900x1900-000000-80-0-0.jpg", biography: "Kendrick Lamar is an American rapper and songwriter." },
  { artistName: "Travis Scott", agencyId: 3, profileImage: "https://media.gq.com/photos/654866eb710360665d544892/4:3/w_1604,h_1203,c_limit/GQ1223_Scott_D_10.jpg", biography: "Travis Scott is an American rapper and record producer." },
  // --- R&B (16-20) ---
  { artistName: "The Weeknd", agencyId: 3, profileImage: "https://i.pinimg.com/736x/98/58/21/985821e798645022a1634e152567c91f.jpg", biography: "The Weeknd is a Canadian singer, songwriter, and record producer." },
  { artistName: "Jeff Satur", agencyId: 5, profileImage: "https://f.ptcdn.info/382/088/000/mc4ixmm6iS0g874WHaW-o.jpg", biography: "Jeff Satur ศิลปินหนุ่มลูกครึ่งไทย-อังกฤษ ผู้ผสมผสานดนตรี R&B และ Pop" },
  { artistName: "SZA", agencyId: 3, profileImage: "https://s.isanook.com/jo/0/ud/490/2454237/sza-sosalbumcover.jpg?ip/resize/w728/q80/jpg", biography: "SZA is an American R&B singer-songwriter celebrated for her raw songwriting." },
  { artistName: "NIKI", agencyId: 3, profileImage: "https://s.isanook.com/jo/0/ud/489/2449909/niki01.jpg?ip/crop/w1200h700/q80/jpg", biography: "NIKI is an Indonesian singer, songwriter, and producer signed to 88rising." },
  { artistName: "BOWKYLION", agencyId: 1, profileImage: "https://www.myband.co.th/uploads/20240907/dd43a92bfc4a2624cdc4e7d192acb785.jpeg", biography: "โบกี้ไลอ้อน (BOWKYLION) ศิลปินหญิงมากความสามารถ เจ้าของเสียงร้องทรงพลัง" },
  // --- EDM (21-25) ---
  { artistName: "Martin Garrix", agencyId: 3, profileImage: "https://cdn-images.dzcdn.net/images/artist/4cab1c0cbe0edc1b3d2234873abc485e/1900x1900-000000-80-0-0.jpg", biography: "Martin Garrix is a Dutch DJ and record producer." },
  { artistName: "Zedd", agencyId: 3, profileImage: "https://lewishowes.com/wp-content/uploads/2024/12/DSC08550-1024x683.png", biography: "Zedd is a Russian-German DJ and producer known for melodic electronic music." },
  { artistName: "Calvin Harris", agencyId: 3, profileImage: "https://s.isanook.com/jo/0/ud/489/2448837/calvin-harris.jpg?ip/crop/w670h402/q80/jpg", biography: "Calvin Harris is a Scottish DJ, record producer, and singer." },
  { artistName: "DJ Snake", agencyId: 3, profileImage: "https://photos.bandsintown.com/large/18404475.jpeg", biography: "DJ Snake is a French record producer and DJ." },
  { artistName: "Illenium", agencyId: 3, profileImage: "https://i8.amplience.net/i/naras/ILLENIUM-9506A-3.5.21-jpg-credit-Brian-Ziff", biography: "Illenium is an American DJ and producer known for future bass tracks." }
];

// 5. ArtistGenres
const artistGenresData = [
  // 1-5 Pop
  { artistId: 1, genreId: 1 }, { artistId: 2, genreId: 1 }, { artistId: 3, genreId: 1 }, { artistId: 4, genreId: 1 }, { artistId: 5, genreId: 1 },
  // 6-10 Rock
  { artistId: 6, genreId: 2 }, { artistId: 7, genreId: 2 }, { artistId: 8, genreId: 2 }, { artistId: 9, genreId: 2 }, { artistId: 10, genreId: 2 },
  // 11-15 Hip Hop
  { artistId: 11, genreId: 3 }, { artistId: 12, genreId: 3 }, { artistId: 13, genreId: 3 }, { artistId: 14, genreId: 3 }, { artistId: 15, genreId: 3 },
  // 16-20 R&B
  { artistId: 16, genreId: 4 }, { artistId: 17, genreId: 4 }, { artistId: 18, genreId: 4 }, { artistId: 19, genreId: 4 }, { artistId: 20, genreId: 4 },
  // 21-25 EDM
  { artistId: 21, genreId: 5 }, { artistId: 22, genreId: 5 }, { artistId: 23, genreId: 5 }, { artistId: 24, genreId: 5 }, { artistId: 25, genreId: 5 }
];

// 6. Songs - 🔴 เพิ่ม `coverImage` ในทุกเพลง ให้ใส่รูปปกอัลบั้มได้อิสระ
const songsData = [];
const songsList = [
  // 1: NONT TANONT
  [
    { title: "รักแรก", url: "https://youtu.be/M4lX_Vtl9gg?si=jFK0ZO_3oBemh1cP", coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop" },
    { title: "พิง", url: "https://youtu.be/eCKkmpRryIw?si=E63eJ0tcZupBG0Yp", coverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=400&auto=format&fit=crop" },
    { title: "โต๊ะริม", url: "https://youtu.be/xXGyjNvv1n4?si=QgQogTk3YCKSZk1k", coverImage: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=400&auto=format&fit=crop" },
    { title: "วันครบเลิก", url: "https://youtu.be/VC_XM70n4FA?si=YUjkOeLehpMb6kbl", coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop" },
    { title: "มีผลต่อหัวใจ", url: "https://youtu.be/aCGsYFkb9ac?si=zJL_wlxfr0WJZ2pY", coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop" }
  ],
  // 2: INK WARUNTORN
  [
    { title: "ดีใจด้วยนะ", url: "https://youtu.be/faDOxPdGRlc?si=_0pA6ybzdm9pVixI", coverImage: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=400&auto=format&fit=crop" },
    { title: "ลบไม่ได้ช่วยให้ลืม", url: "https://youtu.be/i-BCLeZOs3c?si=STK3UIjZFeB6CUfV", coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop" },
    { title: "อยากเริ่มต้นใหม่กับคนเดิม", url: "https://youtu.be/VJRiTgPd_Jg?si=QZe66cdEONbGWLh_", coverImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400&auto=format&fit=crop" },
    { title: "สายตาหลอกกันไม่ได้", url: "https://youtu.be/KZ9RCyVyCNA?si=sgwSQsXOPi7f4wJ4", coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop" },
    { title: "เกี่ยวกันไหม", url: "https://youtu.be/RSNiUJucfyY?si=OU_3i1YGqK3QT9V2", coverImage: "https://images.unsplash.com/photo-1470229722913-7c090be5c57d?q=80&w=400&auto=format&fit=crop" }
  ],
  // 3: Taylor Swift
  [
    { title: "Cruel Summer", url: "https://www.youtube.com/watch?v=ic8j13piAhQ", coverImage: "https://images.unsplash.com/photo-1540039120624-973056ce7ca6?q=80&w=400&auto=format&fit=crop" },
    { title: "Blank Space", url: "https://www.youtube.com/watch?v=e-ORhEE9VVg", coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop" },
    { title: "Anti-Hero", url: "https://www.youtube.com/watch?v=b1kbLwvqugk", coverImage: "https://images.unsplash.com/photo-1533174072545-e68f8ba81232?q=80&w=400&auto=format&fit=crop" },
    { title: "Shake It Off", url: "https://www.youtube.com/watch?v=nfWlot6h_JM", coverImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=400&auto=format&fit=crop" },
    { title: "Lover", url: "https://www.youtube.com/watch?v=-BjZmE2gtdo", coverImage: "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=400&auto=format&fit=crop" }
  ],
  // 4: Ariana Grande
  [
    { title: "7 rings", url: "https://youtu.be/uDAjINEp8H8?si=2QqEip7GVqUmyDty", coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop" },
    { title: "thank u, next", url: "https://youtu.be/EEhZAHZQyf4?si=-NsOMMUbazcud5_g", coverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=400&auto=format&fit=crop" },
    { title: "positions", url: "https://youtu.be/xuOOAQoDKN0?si=jSSX8R0OrPghYmzz", coverImage: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=400&auto=format&fit=crop" },
    { title: "Into You", url: "https://youtu.be/GB2aPHTDaqU?si=J9M4AlGWmounkTjW", coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop" },
    { title: "God is a woman", url: "https://youtu.be/RQTgJRwMdKQ?si=jC8GFGMIAoSyB8aH", coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop" }
  ],
  // 5: Ed Sheeran
  [
    { title: "Shape of You", url: "https://www.youtube.com/watch?v=JGwWNGJdvx8", coverImage: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=400&auto=format&fit=crop" },
    { title: "Perfect", url: "https://www.youtube.com/watch?v=2Vv-BfVoq4g", coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop" },
    { title: "Thinking Out Loud", url: "https://www.youtube.com/watch?v=lp-EO5I60KA", coverImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400&auto=format&fit=crop" },
    { title: "Photograph", url: "https://www.youtube.com/watch?v=nSDgHBxUbVQ", coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop" },
    { title: "Bad Habits", url: "https://youtu.be/ho1RzYneMtM?si=TfZYGFq9QgwSyPy-", coverImage: "https://images.unsplash.com/photo-1470229722913-7c090be5c57d?q=80&w=400&auto=format&fit=crop" }
  ],
  // 6: Bodyslam
  [
    { title: "ความเชื่อ", url: "https://youtu.be/ff7ao5s0heQ?si=pip6P9i7MV91Go86", coverImage: "https://images.unsplash.com/photo-1540039120624-973056ce7ca6?q=80&w=400&auto=format&fit=crop" },
    { title: "แสงสุดท้าย", url: "https://youtu.be/SZ6p1Pe-2do?si=epw6fID53o1eUfwG", coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop" },
    { title: "เรือเล็กควรออกจากฝั่ง", url: "https://youtu.be/VmNs1McZtg4?si=fkjJoC4nImfWhh2X", coverImage: "https://images.unsplash.com/photo-1533174072545-e68f8ba81232?q=80&w=400&auto=format&fit=crop" },
    { title: "ยาพิษ", url: "https://youtu.be/tn7_CFkr6Oo?si=NVByMNEqsrf4ZM3s", coverImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=400&auto=format&fit=crop" },
    { title: "ชีวิตยังคงสวยงาม", url: "https://youtu.be/q4Nagt1oBW0?si=84rcIOEWs9avwall", coverImage: "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=400&auto=format&fit=crop" }
  ],
  // 7: TaitosmitH
  [
    { title: "แดงกับเขียว", url: "https://youtu.be/DFEVA5-INzM?si=fXFSRihRP4s555CK", coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop" },
    { title: "โคตรเท่", url: "https://youtu.be/r-EH6RFyGEM?si=R0SaxlhJd8sBdcqv", coverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=400&auto=format&fit=crop" },
    { title: "นักเลงเก่า", url: "https://youtu.be/DkKr8fGIrCM?si=Y1_Agr177ZNya7xt", coverImage: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=400&auto=format&fit=crop" },
    { title: "เพื่อชีวิตกู", url: "https://youtu.be/3SFjnjBDrnI?si=MnUWbtuUxjtApheQ", coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop" },
    { title: "ฮัลโหลเตง", url: "https://youtu.be/uefcQzHmA_Y?si=XWWYIKwQA_7q-991", coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop" }
  ],
  // 8: Coldplay
  [
    { title: "Yellow", url: "https://www.youtube.com/watch?v=yKNxeF4KMsY", coverImage: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=400&auto=format&fit=crop" },
    { title: "Viva La Vida", url: "https://youtu.be/dvgZkm1xWPE?si=_pFAgNxvCPzzhRW1", coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop" },
    { title: "Fix You", url: "https://www.youtube.com/watch?v=k4V3Mo61fJM", coverImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400&auto=format&fit=crop" },
    { title: "The Scientist", url: "https://www.youtube.com/watch?v=RB-RcX5DS5A", coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop" },
    { title: "A Sky Full of Stars", url: "https://www.youtube.com/watch?v=VPRjCeoBqrI", coverImage: "https://images.unsplash.com/photo-1470229722913-7c090be5c57d?q=80&w=400&auto=format&fit=crop" }
  ],
  // 9: Arctic Monkeys
  [
    { title: "Do I Wanna Know?", url: "https://www.youtube.com/watch?v=bpOSxM0rNPM", coverImage: "https://images.unsplash.com/photo-1540039120624-973056ce7ca6?q=80&w=400&auto=format&fit=crop" },
    { title: "505", url: "https://youtu.be/MrmPDUvKyLs?si=gGyWQBlBdmuaGkyT", coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop" },
    { title: "R U Mine?", url: "https://www.youtube.com/watch?v=VQH8ZTgna3Q", coverImage: "https://images.unsplash.com/photo-1533174072545-e68f8ba81232?q=80&w=400&auto=format&fit=crop" },
    { title: "Fluorescent Adolescent", url: "https://www.youtube.com/watch?v=ma9I9VBKPiw", coverImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=400&auto=format&fit=crop" },
    { title: "Mardy Bum", url: "https://youtu.be/dO368WjwyFs?si=amZO67KsGizEQT1m", coverImage: "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=400&auto=format&fit=crop" }
  ],
  // 10: Lomosonic
  [
    { title: "ขอ", url: "https://youtu.be/tUuqWFExZgY?si=WAFvGgjzuvft7WAh", coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop" },
    { title: "ความรู้สึกของวันนี้", url: "https://youtu.be/KtpnQGbpqWo?si=LEmNL1ivJzhmxbEv", coverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=400&auto=format&fit=crop" },
    { title: "ถึงเวลา", url: "https://youtu.be/apljdslXJks?si=uPzjc3DXUZw5wH_8", coverImage: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=400&auto=format&fit=crop" },
    { title: "หลงทาง", url: "https://youtu.be/E3jnixZeh_A?si=pd0Z4Veo_LB7Ikn2", coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop" },
    { title: "ส่งมือ", url: "https://youtu.be/-8LM2Gdpm68?si=j723fg6yXhqmrQ_9", coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop" }
  ],
  // 11: URBOYTJ
  [
    { title: "เค้าก่อน", url: "https://youtu.be/ApXsKExKQIM?si=2PI7dZZzap4Lo0we", coverImage: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=400&auto=format&fit=crop" },
    { title: "วายร้าย", url: "https://youtu.be/ndLC2tPFmg4?si=9YKK7Qa073a0c9MJ", coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop" },
    { title: "รังเกียจกันไหม", url: "https://youtu.be/xnBc6Ahl_TQ?si=uHO7iPMlJySGRw4e", coverImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400&auto=format&fit=crop" },
    { title: "เป็นได้ทุกอย่าง", url: "https://youtu.be/sPBjONugxj4?si=6znD2ZLjb2dZQXFE", coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop" },
    { title: "ถามคำ", url: "https://youtu.be/E0IfcXBxyic?si=QyN2M5ivBmVi2i3V", coverImage: "https://images.unsplash.com/photo-1470229722913-7c090be5c57d?q=80&w=400&auto=format&fit=crop" }
  ],
  // 12: MILLI
  [
    { title: "Mirror Mirror", url: "https://youtu.be/FZlBKl-spfY?si=6XO9PnKEY4gof59b", coverImage: "https://images.unsplash.com/photo-1540039120624-973056ce7ca6?q=80&w=400&auto=format&fit=crop" },
    { title: "พักก่อน", url: "https://youtu.be/rUAuEo3t0-o?si=WPmbw7mDa8goiXjK", coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop" },
    { title: "สุดปัง", url: "https://youtu.be/bHbnedbt6G4?si=BWGlCN3_MhBBOET4", coverImage: "https://images.unsplash.com/photo-1533174072545-e68f8ba81232?q=80&w=400&auto=format&fit=crop" },
    { title: "17 นาที", url: "https://youtu.be/qDrMDFhTdTw?si=fqGvdAehFduaKZ1r", coverImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=400&auto=format&fit=crop" },
    { title: "Mango Sticky Rice", url: "https://youtu.be/YvgyNBoO41U?si=EL7wY7fbhLum4-LQ", coverImage: "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=400&auto=format&fit=crop" }
  ],
  // 13: F.HERO
  [
    { title: "เสือสิ้นลาย", url: "https://youtu.be/47hae1Xw_Xw?si=O8YbR-1KKogWqqDW", coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop" },
    { title: "จำเก่ง", url: "https://youtu.be/7iSia7rb1PY?si=7S9dqYrUFkBh8VNw", coverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=400&auto=format&fit=crop" },
    { title: "F.HERO", url: "https://youtu.be/ArYW19f52_Y?si=YS5RBK6jZSG6TYIq", coverImage: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=400&auto=format&fit=crop" },
    { title: "ยันเช้า", url: "https://youtu.be/7bkHtMw620M?si=4Z_ec4GeFSCmL-28", coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop" },
    { title: "Do You", url: "https://youtu.be/Ra6NiSd3OgU?si=LV1Olwu7XrUlhUzV", coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop" }
  ],
  // 14: Kendrick Lamar
  [
    { title: "HUMBLE.", url: "https://youtu.be/tvTRZJ-4EyI?si=zpGFRWVkmScJ9N9d", coverImage: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=400&auto=format&fit=crop" },
    { title: "DNA.", url: "https://www.youtube.com/watch?v=NLZRYQMLDW4", coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop" },
    { title: "Alright", url: "https://www.youtube.com/watch?v=Z-48u_uWMHY", coverImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400&auto=format&fit=crop" },
    { title: "N95", url: "https://youtu.be/zI383uEwA6Q?si=0o2Aj4ALE28855Na", coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop" },
    { title: "Swimming Pools", url: "https://www.youtube.com/watch?v=B5YNiCfWC3A", coverImage: "https://images.unsplash.com/photo-1470229722913-7c090be5c57d?q=80&w=400&auto=format&fit=crop" }
  ],
  // 15: Travis Scott
  [
    { title: "SICKO MODE", url: "https://youtu.be/6ONRf7h3Mdk?si=iz3INSqip_sOWAnz", coverImage: "https://images.unsplash.com/photo-1540039120624-973056ce7ca6?q=80&w=400&auto=format&fit=crop" },
    { title: "goosebumps", url: "https://www.youtube.com/watch?v=Dst9gZkq1a8", coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop" },
    { title: "HIGHEST IN THE ROOM", url: "https://www.youtube.com/watch?v=tfSS1e3kYeo", coverImage: "https://images.unsplash.com/photo-1533174072545-e68f8ba81232?q=80&w=400&auto=format&fit=crop" },
    { title: "FE!N", url: "https://youtu.be/B9synWjqBn8?si=1wi6fLHPEBo2EKPp", coverImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=400&auto=format&fit=crop" },
    { title: "STARGAZING", url: "https://youtu.be/2a8PgqWrc_4?si=Uw4rbRgPdyHA2gPx", coverImage: "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=400&auto=format&fit=crop" }
  ],
  // 16: The Weeknd
  [
    { title: "Blinding Lights", url: "https://www.youtube.com/watch?v=4NRXx6U8ABQ", coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop" },
    { title: "Starboy", url: "https://youtu.be/plnfIj7dkJE?si=idTFJsO2dc3ory87", coverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=400&auto=format&fit=crop" },
    { title: "Save Your Tears", url: "https://www.youtube.com/watch?v=XXYlFuWEuKI", coverImage: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=400&auto=format&fit=crop" },
    { title: "The Hills", url: "https://youtu.be/yzTuBuRdAyA?si=s-8Mi-p6NGfSGfN8", coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop" },
    { title: "Die For You", url: "https://youtu.be/QLCpqdqeoII?si=EZF8uO_kp26n7gNr", coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop" }
  ],
  // 17: Jeff Satur
  [
    { title: "ลืมไปแล้วว่าลืมยังไง", url: "https://youtu.be/6f5sozKp0R0?si=ScelwI-BTvEz1xTl", coverImage: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=400&auto=format&fit=crop" },
    { title: "Fade", url: "https://youtu.be/85NWn-k1p58?si=X548PQAzRNyNIg57", coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop" },
    { title: "Dum Dum", url: "https://youtu.be/xjh-mb9IuzU?si=gBnsIDHkZazMSiCg", coverImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400&auto=format&fit=crop" },
    { title: "วันนี้คือพรุ่งนี้ของเมื่อวาน", url: "https://youtu.be/AfeEOrQHBAo?si=EyJtnkkN7bhcImDo", coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop" },
    { title: "แค่เธอ", url: "https://youtu.be/aVKJrJbHUV0?si=xufA_wyTTiqWwWA_", coverImage: "https://images.unsplash.com/photo-1470229722913-7c090be5c57d?q=80&w=400&auto=format&fit=crop" }
  ],
  // 18: SZA
  [
    { title: "Kill Bill", url: "https://www.youtube.com/watch?v=SQnc1QibapQ", coverImage: "https://images.unsplash.com/photo-1540039120624-973056ce7ca6?q=80&w=400&auto=format&fit=crop" },
    { title: "Good Days", url: "https://youtu.be/0BdlKkvjEgA?si=N8hFKxS2XFIv4nBu", coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop" },
    { title: "Snooze", url: "https://youtu.be/LDY_XyxBu8A?si=bPJsMVM5hUEzpvfG", coverImage: "https://images.unsplash.com/photo-1533174072545-e68f8ba81232?q=80&w=400&auto=format&fit=crop" },
    { title: "The Weekend", url: "https://youtu.be/PALMMqZLAQk?si=OAMXz3kZnoZ2PW6m", coverImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=400&auto=format&fit=crop" },
    { title: "Broken Clocks", url: "https://youtu.be/0Exxu8lsGYE?si=Yh2D_Ze9-DtEDLeU", coverImage: "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=400&auto=format&fit=crop" }
  ],
  // 19: NIKI
  [
    { title: "Every Summertime", url: "https://youtu.be/a0OHkWX7B-E?si=ydL-FyVorwWjkHNk", coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop" },
    { title: "lowkey", url: "https://youtu.be/mxyucLe9YE4?si=FQpO9uZ7hZ4K3Opr", coverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=400&auto=format&fit=crop" },
    { title: "High School in Jakarta", url: "https://youtu.be/d4CF4km1rUQ?si=vcftFSwq9SiPYbSg", coverImage: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=400&auto=format&fit=crop" },
    { title: "Indigo", url: "https://youtu.be/5e6F1VA6WG4?si=wkB1PhiT1wXdCP6G", coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop" },
    { title: "La La Lost You", url: "https://youtu.be/ErmgY5GX_wI?si=vGm3HI8tcXdRnFjv", coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop" }
  ],
  // 20: BOWKYLION
  [
    { title: "ลงใจ", url: "https://youtu.be/tXp_eT_-1EI?si=hgE5Di9-VW9CjNiK", coverImage: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=400&auto=format&fit=crop" },
    { title: "วาดไว้", url: "https://youtu.be/a0M_QUS3kC0?si=4k85YlC_N9fmyTIc", coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop" },
    { title: "ทราบแล้วเปลี่ยน", url: "https://youtu.be/OPGzqDVz2T8?si=81LTN0fPP2EDxJbZ", coverImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400&auto=format&fit=crop" },
    { title: "ยิ้มลา", url: "https://youtu.be/ukGjGHr1Ft8?si=GB3OF89kpVA9mJco", coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop" },
    { title: "บานปลาย", url: "https://youtu.be/RzttASVRHAI?si=1Dzgz9a3abRE6RvW", coverImage: "https://images.unsplash.com/photo-1470229722913-7c090be5c57d?q=80&w=400&auto=format&fit=crop" }
  ],
  // 21: Martin Garrix
  [
    { title: "Animals", url: "https://www.youtube.com/watch?v=gCYcHz2k5x0", coverImage: "https://images.unsplash.com/photo-1540039120624-973056ce7ca6?q=80&w=400&auto=format&fit=crop" },
    { title: "In The Name Of Love", url: "https://www.youtube.com/watch?v=RnBT9uUYb1w", coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop" },
    { title: "Scared To Be Lonely", url: "https://www.youtube.com/watch?v=e2vBLd5Egnk", coverImage: "https://images.unsplash.com/photo-1533174072545-e68f8ba81232?q=80&w=400&auto=format&fit=crop" },
    { title: "Summer Days", url: "https://youtu.be/LdvvPtIfR8w?si=jBsRxEpZ8sU6vtTk", coverImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=400&auto=format&fit=crop" },
    { title: "High On Life", url: "https://www.youtube.com/watch?v=Lpjcm1F8tY8", coverImage: "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=400&auto=format&fit=crop" }
  ],
  // 22: Zedd
  [
    { title: "Clarity", url: "https://www.youtube.com/watch?v=IxxstCcJlsc", coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop" },
    { title: "The Middle", url: "https://www.youtube.com/watch?v=M3mJkSqZbX4", coverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=400&auto=format&fit=crop" },
    { title: "Stay", url: "https://youtu.be/h--P8HzYZ74?si=19zqrlyOxm3sIgMQ", coverImage: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=400&auto=format&fit=crop" },
    { title: "Beautiful Now", url: "https://youtu.be/n1a7o44WxNo?si=Cc0exlUMPBlACdTP", coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop" },
    { title: "Spectrum", url: "https://youtu.be/wEp9MCQlAa4?si=7xI0DGhmH3usUkBF", coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop" }
  ],
  // 23: Calvin Harris
  [
    { title: "Summer", url: "https://www.youtube.com/watch?v=ebXbLfLACGM", coverImage: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=400&auto=format&fit=crop" },
    { title: "This Is What You Came For", url: "https://youtu.be/kOkQ4T5WO9E?si=etZRMvKHmkaM4XDF", coverImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=400&auto=format&fit=crop" },
    { title: "Feel So Close", url: "https://www.youtube.com/watch?v=dGghkjpNCQ8", coverImage: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400&auto=format&fit=crop" },
    { title: "One Kiss", url: "https://www.youtube.com/watch?v=DkeiKbqa02g", coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop" },
    { title: "Slide", url: "https://youtu.be/8Ee4QjCEHHc?si=8A28y0neQXVYXZxz", coverImage: "https://images.unsplash.com/photo-1470229722913-7c090be5c57d?q=80&w=400&auto=format&fit=crop" }
  ],
  // 24: DJ Snake
  [
    { title: "Let Me Love You", url: "https://www.youtube.com/watch?v=euCqAq6BRa4", coverImage: "https://images.unsplash.com/photo-1540039120624-973056ce7ca6?q=80&w=400&auto=format&fit=crop" },
    { title: "Taki Taki", url: "https://youtu.be/ixkoVwKQaJg?si=-ONMLBj3EMC_RS4S", coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=400&auto=format&fit=crop" },
    { title: "Lean On", url: "https://www.youtube.com/watch?v=YqeW9_5kURI", coverImage: "https://images.unsplash.com/photo-1533174072545-e68f8ba81232?q=80&w=400&auto=format&fit=crop" },
    { title: "SG", url: "https://youtu.be/tJXPfNDVF4I?si=L3XcJ8D7BsEZmoYa", coverImage: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=400&auto=format&fit=crop" },
    { title: "Turn Down for What", url: "https://www.youtube.com/watch?v=HMUDVMiITOU", coverImage: "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=400&auto=format&fit=crop" }
  ],
  // 25: Illenium
  [
    { title: "Good Things Fall Apart", url: "https://youtu.be/XpmeVNxZ-Ks?si=ZRKqMzRslx8tMcd5", coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop" },
    { title: "Takeaway", url: "https://youtu.be/lzkKzZmRZk8?si=-krtrcRMOEeddNDH", coverImage: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=400&auto=format&fit=crop" },
    { title: "Crawl Outta Love", url: "https://youtu.be/gbxxpSNE5o4?si=RKj_EsJ9uP8INnUu", coverImage: "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=400&auto=format&fit=crop" },
    { title: "Feel Something", url: "https://youtu.be/pp4YQPykBMM?si=nYy2_bfVS9RXoslU", coverImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=400&auto=format&fit=crop" },
    { title: "Fractures", url: "https://youtu.be/ZCu2gwLj9ok?si=O8MjSocKk3zYEqV8", coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop" }
  ]
];

//LNGSHOT
[
   { title: "Moonwalkin'", url: "https://www.youtube.com/watch?v=HJgdT15UT4k&start_radio=1", coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop" },
   { title: "Never Let Go", url: "https://www.youtube.com/watch?v=sOsh_GKOny4&start_radio=1", coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop" },
   { title: "Saucin", url: "https://www.youtube.com/watch?v=bdkxg83ICAA&list=RDbdkxg83ICAA&start_radio=1", coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop" },
   { title: "FaceTime", url: "https://www.youtube.com/watch?v=GGe5OkNgZjQ&list=RDGGe5OkNgZjQ&start_radio=1", coverImage: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=400&auto=format&fit=crop" },
]

[
 { artistName: "LNGSHOT", agencyId: 3, profileImage: "https://media.discordapp.net/attachments/1466412045325959189/1497109846447624192/74d4a9f73a91b20842b2b8caa6f0c0ad.1000x1000x1.png?ex=69ef9f72&is=69ee4df2&hm=eaa1a7dfd4dadd9aeecf6764a69019f5b2ede4644e2ff3c928ae174f9e096aaa&=&format=webp&quality=lossless&width=1400&height=1400", biography: "Illenium is an American DJ and producer known for future bass tracks." }
]


songsList.forEach((artistSongs, artistIndex) => {
  artistSongs.forEach((song, songIndex) => {
    songsData.push({
      title: song.title,
      artistId: artistIndex + 1,
      duration: Math.floor(Math.random() * 100) + 180, 
      popularity: Math.floor(Math.random() * 50000000) + 10000000, 
      coverImage: song.coverImage, 
      streamUrl: song.url,
      releaseDate: new Date(new Date().setFullYear(2020 + Math.floor(Math.random() * 5)))
    });
  });
});


const artistEventsData = [];

const getRandomConcertImage = (index) => {
  const themes = ['concert', 'live+music', 'dj', 'band', 'stage+lights', 'crowd', 'singer', 'festival', 'neon+lights', 'guitar'];
  const theme = themes[index % themes.length];
  // ใส่ signature มั่วๆ เข้าไปเพื่อบังคับให้รูปไม่ซ้ำกันในแต่ละใบ
  return `https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop&sig=${Math.random()}`; 
};

// ข้อมูลรูปภาพโปสเตอร์ (รับประกันรูปขึ้น 100%)
const eventPostersByArtist = [
  // 1: NONT TANONT
  [
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540039120624-973056ce7ca6?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470229722913-7c090be5c57d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop"
  ],
  // 2: INK WARUNTORN
  [
    "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1533174072545-e68f8ba81232?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop"
  ],
  // 3: Taylor Swift
  [
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=800&auto=format&fit=crop"
  ],
  // 4: Ariana Grande
  [
    "https://images.unsplash.com/photo-1540039120624-973056ce7ca6?q=80&w=800&auto=format&fit=crop&sig=1",
    "https://images.unsplash.com/photo-1470229722913-7c090be5c57d?q=80&w=800&auto=format&fit=crop&sig=2",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop&sig=3",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop&sig=4",
    "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=800&auto=format&fit=crop&sig=5"
  ],
  // 5: Ed Sheeran
  [
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop&sig=6",
    "https://images.unsplash.com/photo-1533174072545-e68f8ba81232?q=80&w=800&auto=format&fit=crop&sig=7",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop&sig=8",
    "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=800&auto=format&fit=crop&sig=9",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop&sig=10"
  ],
  // 6: Bodyslam
  [
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=800&auto=format&fit=crop&sig=11",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop&sig=12",
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop&sig=13",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop&sig=14",
    "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=800&auto=format&fit=crop&sig=15"
  ],
  // 7: TaitosmitH
  [
    "https://images.unsplash.com/photo-1540039120624-973056ce7ca6?q=80&w=800&auto=format&fit=crop&sig=16",
    "https://images.unsplash.com/photo-1470229722913-7c090be5c57d?q=80&w=800&auto=format&fit=crop&sig=17",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop&sig=18",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop&sig=19",
    "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=800&auto=format&fit=crop&sig=20"
  ],
  // 8: Coldplay
  [
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop&sig=21",
    "https://images.unsplash.com/photo-1533174072545-e68f8ba81232?q=80&w=800&auto=format&fit=crop&sig=22",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop&sig=23",
    "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=800&auto=format&fit=crop&sig=24",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop&sig=25"
  ],
  // 9: Arctic Monkeys
  [
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=800&auto=format&fit=crop&sig=26",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop&sig=27",
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop&sig=28",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop&sig=29",
    "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=800&auto=format&fit=crop&sig=30"
  ],
  // 10: Lomosonic
  [
    "https://images.unsplash.com/photo-1540039120624-973056ce7ca6?q=80&w=800&auto=format&fit=crop&sig=31",
    "https://images.unsplash.com/photo-1470229722913-7c090be5c57d?q=80&w=800&auto=format&fit=crop&sig=32",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop&sig=33",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop&sig=34",
    "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=800&auto=format&fit=crop&sig=35"
  ],
  // 11: URBOYTJ
  [
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop&sig=36",
    "https://images.unsplash.com/photo-1533174072545-e68f8ba81232?q=80&w=800&auto=format&fit=crop&sig=37",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop&sig=38",
    "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=800&auto=format&fit=crop&sig=39",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop&sig=40"
  ],
  // 12: MILLI
  [
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=800&auto=format&fit=crop&sig=41",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop&sig=42",
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop&sig=43",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop&sig=44",
    "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=800&auto=format&fit=crop&sig=45"
  ],
  // 13: F.HERO
  [
    "https://images.unsplash.com/photo-1540039120624-973056ce7ca6?q=80&w=800&auto=format&fit=crop&sig=46",
    "https://images.unsplash.com/photo-1470229722913-7c090be5c57d?q=80&w=800&auto=format&fit=crop&sig=47",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop&sig=48",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop&sig=49",
    "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=800&auto=format&fit=crop&sig=50"
  ],
  // 14: Kendrick Lamar
  [
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop&sig=51",
    "https://images.unsplash.com/photo-1533174072545-e68f8ba81232?q=80&w=800&auto=format&fit=crop&sig=52",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop&sig=53",
    "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=800&auto=format&fit=crop&sig=54",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop&sig=55"
  ],
  // 15: Travis Scott
  [
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=800&auto=format&fit=crop&sig=56",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop&sig=57",
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop&sig=58",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop&sig=59",
    "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=800&auto=format&fit=crop&sig=60"
  ],
  // 16: The Weeknd
  [
    "https://images.unsplash.com/photo-1540039120624-973056ce7ca6?q=80&w=800&auto=format&fit=crop&sig=61",
    "https://images.unsplash.com/photo-1470229722913-7c090be5c57d?q=80&w=800&auto=format&fit=crop&sig=62",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop&sig=63",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop&sig=64",
    "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=800&auto=format&fit=crop&sig=65"
  ],
  // 17: Jeff Satur
  [
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop&sig=66",
    "https://images.unsplash.com/photo-1533174072545-e68f8ba81232?q=80&w=800&auto=format&fit=crop&sig=67",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop&sig=68",
    "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=800&auto=format&fit=crop&sig=69",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop&sig=70"
  ],
  // 18: SZA
  [
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=800&auto=format&fit=crop&sig=71",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop&sig=72",
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop&sig=73",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop&sig=74",
    "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=800&auto=format&fit=crop&sig=75"
  ],
  // 19: NIKI
  [
    "https://images.unsplash.com/photo-1540039120624-973056ce7ca6?q=80&w=800&auto=format&fit=crop&sig=76",
    "https://images.unsplash.com/photo-1470229722913-7c090be5c57d?q=80&w=800&auto=format&fit=crop&sig=77",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop&sig=78",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop&sig=79",
    "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=800&auto=format&fit=crop&sig=80"
  ],
  // 20: BOWKYLION
  [
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop&sig=81",
    "https://images.unsplash.com/photo-1533174072545-e68f8ba81232?q=80&w=800&auto=format&fit=crop&sig=82",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop&sig=83",
    "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=800&auto=format&fit=crop&sig=84",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop&sig=85"
  ],
  // 21: Martin Garrix
  [
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=800&auto=format&fit=crop&sig=86",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop&sig=87",
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop&sig=88",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop&sig=89",
    "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=800&auto=format&fit=crop&sig=90"
  ],
  // 22: Zedd
  [
    "https://images.unsplash.com/photo-1540039120624-973056ce7ca6?q=80&w=800&auto=format&fit=crop&sig=91",
    "https://images.unsplash.com/photo-1470229722913-7c090be5c57d?q=80&w=800&auto=format&fit=crop&sig=92",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop&sig=93",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop&sig=94",
    "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=800&auto=format&fit=crop&sig=95"
  ],
  // 23: Calvin Harris
  [
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=800&auto=format&fit=crop&sig=96",
    "https://images.unsplash.com/photo-1533174072545-e68f8ba81232?q=80&w=800&auto=format&fit=crop&sig=97",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=800&auto=format&fit=crop&sig=98",
    "https://images.unsplash.com/photo-1520262454473-a1a82276a574?q=80&w=800&auto=format&fit=crop&sig=99",
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop&sig=100"
  ],
  // 24: DJ Snake
  [
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=800&auto=format&fit=crop&sig=101",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=800&auto=format&fit=crop&sig=102",
    "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=800&auto=format&fit=crop&sig=103",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=800&auto=format&fit=crop&sig=104",
    "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?q=80&w=800&auto=format&fit=crop&sig=105"
  ],
  // 25: Illenium
  [
    "https://images.unsplash.com/photo-1540039120624-973056ce7ca6?q=80&w=800&auto=format&fit=crop&sig=106",
    "https://images.unsplash.com/photo-1470229722913-7c090be5c57d?q=80&w=800&auto=format&fit=crop&sig=107",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=800&auto=format&fit=crop&sig=108",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop&sig=109",
    "https://images.unsplash.com/photo-1493225457124-a1a2a5f5646a?q=80&w=800&auto=format&fit=crop&sig=110"
  ]
];

// let eventIdCounter = 1;
// for (let i = 0; i < 25; i++) {
//   const artistId = i + 1;
//   const artistName = artistsData[i].artistName;
  
//   for (let j = 0; j < 5; j++) {
//     const venueId = Math.floor(Math.random() * 10) + 1;
//     const isFinished = j < 2;
//     const status = isFinished ? "FINISHED" : "UPCOMING";
    
//     const year = isFinished ? 2024 + Math.floor(Math.random() * 2) : 2026 + Math.floor(Math.random() * 2);
//     const month = Math.floor(Math.random() * 12) + 1;
//     const startTime = new Date(`${year}-${month.toString().padStart(2, '0')}-15T19:00:00Z`);

//     const eventNames = [
//       `${artistName} Live in Concert`,
//       `${artistName} World Tour ${year}`,
//       `${artistName} Intimate Night`,
//       `${artistName} Festival Headline`,
//       `${artistName} Fan Meeting & Live`
//     ];

//     eventsData.push({
//       eventName: eventNames[j],
//       venueId: venueId,
//       startTime: startTime,
//       status: status,
//       ticketLink: "https://thaiticketmajor.com",
//       posterImage: eventPostersByArtist[i][j] // ดึงรูปตามที่กรอกด้านบน
//     });

//     artistEventsData.push({
//       artistId: artistId,
//       eventId: eventIdCounter
//     });

//     eventIdCounter++;
//   }
// }

// 10. FavArtist (User Follow ศิลปิน)
const favArtistsData = [
  { userId: 3, artistId: 1 }, { userId: 3, artistId: 2 }, { userId: 3, artistId: 6 },
  { userId: 4, artistId: 16 }, { userId: 4, artistId: 3 }, { userId: 4, artistId: 4 },
  { userId: 5, artistId: 6 }, { userId: 5, artistId: 7 }, { userId: 5, artistId: 10 },
  { userId: 6, artistId: 12 }, { userId: 6, artistId: 21 }, { userId: 6, artistId: 18 }
];


const chatRoomsData = [
  { isGroup: false }, { isGroup: false }, { isGroup: false }, { isGroup: false }, { isGroup: false }
];

// 15. ChatRoomUsers
const chatRoomUsersData = [
  { userId: 3, chatRoomId: 1 }, { userId: 4, chatRoomId: 1 },
  { userId: 5, chatRoomId: 2 }, { userId: 6, chatRoomId: 2 },
  { userId: 3, chatRoomId: 3 }, { userId: 5, chatRoomId: 3 },
  { userId: 4, chatRoomId: 4 }, { userId: 6, chatRoomId: 4 },
  { userId: 3, chatRoomId: 5 }, { userId: 6, chatRoomId: 5 }
];

// 16. Messages
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
        prisma.$executeRawUnsafe('TRUNCATE TABLE `PostImage`;'),//เพิ่ม postImage

        prisma.$executeRawUnsafe('SET FOREIGN_KEY_CHECKS = 1;'),
    ]);
    console.log('Start seeding')

     await prisma.user.createMany({ data: usersData, skipDuplicates: true })
     await prisma.genre.createMany({ data: genresData, skipDuplicates: true })
     await prisma.agency.createMany({ data: agenciesData, skipDuplicates: true })
     await prisma.artist.createMany({ data: artistsData, skipDuplicates: true })
     await prisma.artistGenre.createMany({ data: artistGenresData, skipDuplicates: true })
     await prisma.song.createMany({ data: songsData, skipDuplicates: true })
     await prisma.venue.createMany({ data: venuesData, skipDuplicates: true }) // 8 ที่ ในไทย  
     await prisma.event.createMany({ data: eventsData, skipDuplicates: true })//mock data 100 event
     await prisma.artistEvent.createMany({ data: artistsEventsData, skipDuplicates: true }) // many to many eventData&artist   
     await prisma.favArtist.createMany({ data: favArtistsData, skipDuplicates: true }) 
     await prisma.post.createMany({ data: postsData, skipDuplicates: true })    
     await prisma.like.createMany({ data: likePostData, skipDuplicates: true })
     await prisma.comment.createMany({ data: commentsData, skipDuplicates: true })
     await prisma.chatRoom.createMany({ data: chatRoomsData, skipDuplicates: true })
     await prisma.chatRoomUser.createMany({ data: chatRoomUsersData, skipDuplicates: true })
     await prisma.message.createMany({ data: messagesData, skipDuplicates: true })
     await prisma.postArtist.createMany({ data: postArtistsData, skipDuplicates: true })// เพิ่มตรงนี้ต่างจากแบม
     await prisma.postImage.createMany({ data: postImagesData, skipDuplicates: true })
}

resetData().then(async ()=> {
    console.log("Seeding completed successfully.");
    await prisma.$disconnect()
}).catch(async (err)=> {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
})