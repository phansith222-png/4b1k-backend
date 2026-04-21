import bcrypt from 'bcrypt'
const hashPassword = () => bcrypt.hashSync('@Concert123456',8)
export const usersData = [
  // Admins (2)
  { 
    username: "admin_ben", 
    email: "admin.ben@concert.com", 
    firstName: "Ben", 
    lastName: "Admin", 
    password: hashPassword(), 
    role: "ADMIN", 
    gender: "FEMALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "admin_lisa", 
    email: "lisa.admin@concert.com", 
    firstName: "Lisa", 
    lastName: "Admin", 
    password: hashPassword(), 
    role: "ADMIN", 
    gender: "MALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  // Users (24)
  { 
    username: "fanboy01", 
    email: "fanboy@gmail.com", 
    firstName: "Somchai", 
    lastName: "Jaidee", 
    password: hashPassword(), 
    role: "USER", 
    gender: "MALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "fangirl99", 
    email: "fangirl@gmail.com", 
    firstName: "Somsri", 
    lastName: "Rakdee", 
    password: hashPassword(), 
    role: "USER", 
    gender: "FEMALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "musiclover", 
    email: "music@yahoo.com", 
    firstName: "John", 
    lastName: "Doe", 
    password: hashPassword(), 
    role: "USER", 
    gender: "OTHER", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "concertgoer", 
    email: "goer@hotmail.com", 
    firstName: "Jane", 
    lastName: "Smith", 
    password: hashPassword(), 
    role: "USER", 
    gender: "FEMALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "kpop_stan_01", 
    email: "kpop.stan@gmail.com", 
    firstName: "Nutchanon", 
    lastName: "Siri", 
    password: hashPassword(), 
    role: "USER", 
    gender: "MALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "melody_queen", 
    email: "melody.q@hotmail.com", 
    firstName: "Ploypailin", 
    lastName: "Wong", 
    password: hashPassword(), 
    role: "USER", 
    gender: "FEMALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "rock_never_die", 
    email: "rocker.man@yahoo.com", 
    firstName: "Arthit", 
    lastName: "Sangsri", 
    password: hashPassword(), 
    role: "USER", 
    gender: "MALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "jazz_lover", 
    email: "jazz.vibe@gmail.com", 
    firstName: "Vichai", 
    lastName: "Keng", 
    password: hashPassword(), 
    role: "USER", 
    gender: "OTHER", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "frontrow_girl", 
    email: "frontrow@gmail.com", 
    firstName: "Kanya", 
    lastName: "Mee", 
    password: hashPassword(), 
    role: "USER", 
    gender: "FEMALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "bass_hunter", 
    email: "bass.h@outlook.com", 
    firstName: "Tanakorn", 
    lastName: "Poom", 
    password: hashPassword(), 
    role: "USER", 
    gender: "MALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "indie_vibe", 
    email: "indie.vibe@gmail.com", 
    firstName: "Sita", 
    lastName: "Roj", 
    password: hashPassword(), 
    role: "USER", 
    gender: "FEMALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "ticket_master_th", 
    email: "ticket.m@yahoo.com", 
    firstName: "Anan", 
    lastName: "Pha", 
    password: hashPassword(), 
    role: "USER", 
    gender: "MALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "concert_addict", 
    email: "addict.c@gmail.com", 
    firstName: "May", 
    lastName: "Zaa", 
    password: hashPassword(), 
    role: "USER", 
    gender: "FEMALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "acoustic_soul", 
    email: "soul.a@hotmail.com", 
    firstName: "Chaiwat", 
    lastName: "Dee", 
    password: hashPassword(), 
    role: "USER", 
    gender: "MALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "festival_goer", 
    email: "festival.go@gmail.com", 
    firstName: "Napa", 
    lastName: "Siri", 
    password: hashPassword(), 
    role: "USER", 
    gender: "FEMALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "beat_maker", 
    email: "beat.maker@outlook.com", 
    firstName: "Somsak", 
    lastName: "Suk", 
    password: hashPassword(), 
    role: "USER", 
    gender: "OTHER", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "vocal_coach_fan", 
    email: "vocal.f@gmail.com", 
    firstName: "Pim", 
    lastName: "Prao", 
    password: hashPassword(), 
    role: "USER", 
    gender: "FEMALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "vinyl_collector", 
    email: "vinyl.c@yahoo.com", 
    firstName: "Kitti", 
    lastName: "Man", 
    password: hashPassword(), 
    role: "USER", 
    gender: "MALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "lightstick_ready", 
    email: "lightstick@gmail.com", 
    firstName: "Aree", 
    lastName: "Chai", 
    password: hashPassword(), 
    role: "USER", 
    gender: "FEMALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "moshpit_king", 
    email: "moshpit.k@gmail.com", 
    firstName: "Pawat", 
    lastName: "Kong", 
    password: hashPassword(), 
    role: "USER", 
    gender: "MALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "dreamy_sound", 
    email: "dreamy.s@hotmail.com", 
    firstName: "Lalita", 
    lastName: "Yim", 
    password: hashPassword(), 
    role: "USER", 
    gender: "FEMALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "rhythm_seeker", 
    email: "rhythm.s@gmail.com", 
    firstName: "Noppadol", 
    lastName: "Pai", 
    password: hashPassword(), 
    role: "USER", 
    gender: "MALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "stage_side", 
    email: "stage.side@outlook.com", 
    firstName: "Wipa", 
    lastName: "Rat", 
    password: hashPassword(), 
    role: "USER", 
    gender: "FEMALE", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
  { 
    username: "blue_note", 
    email: "blue.note@gmail.com", 
    firstName: "Chanon", 
    lastName: "See", 
    password: hashPassword(), 
    role: "USER", 
    gender: "OTHER", 
    profileImage: "ใส่ลิงก์รูปโปรไฟล์ที่นี่" 
  },
];