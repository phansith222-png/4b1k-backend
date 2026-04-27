import { prisma } from "../lib/prisma.js";
import crypto from 'crypto'
import bcrypt from 'bcrypt'

export async function getUserby(field, value) {
  const result = await prisma.user.findUnique({
    where: { [field]: value },
  });
  return result;
}
//ทำไม filed ต้องอยู่ในก้ามปูเป็น array ??
// filed value คืออะไร ??

export async function createUser(data) {
  return await prisma.user.create({ data: data });
}


//function editUser สร้าง รับ id,username,firstName,password,lastName,gender,email,telephone,profileImage
export const editUser = async (
  id,
  username,
  firstName,
  lastName,
  newPassword,
  gender,
  email,
  telephone,
  profileImage
) => {
  const userData = await prisma.user.update({
    where: { id: id },
    data: {
      username,
      firstName,
      lastName,
      password: newPassword,
      gender,
      email,
      telephone,
      profileImage,
    },
    //.ให้ prisma update table user ที่(where id) data ข้อมูลที่อัพเดท username,firstName,password,lastName,gender,email,telephone,profileImage
  });
  return userData;
};

//สำหรับ google facebook X
export async function findOrCreateOAuthUser(provider, profile) {
  const providerId = profile.id;
  const email = profile.emails?.[0]?.value || null;
  const displayName = profile.displayName || "";
  const photo = profile.photos?.[0]?.value || null;

  const [firstName = displayName, ...rest] = displayName.split(" ");
  const lastName = rest.join(" ") || "-";

  // สร้าง username จำลอง เช่น "google_12345"
  const oauthUsername = `${displayName}`;

  // 1. เช็คว่าเคยเข้าสู่ระบบด้วยช่องทางนี้หรือยัง
  let user = await prisma.user.findUnique({
    where: { username: oauthUsername },
  });
  if (user) return user;

  // 2. ถ้ายังไม่เคย ให้เช็คว่าอีเมลนี้มีในระบบ (ที่สมัครแบบปกติ) หรือยัง ถ้ามีก็ดึงมาใช้เลย
  if (email) {
    user = await prisma.user.findUnique({ where: { email } });
    if (user) return user;
  }

  // 3. ถ้าไม่มีเลย = เป็นผู้ใช้ใหม่เอี่ยม ให้สร้างแอคเคาท์ใหม่
  user = await prisma.user.create({
    data: {
      username: oauthUsername,
      email: email || `${oauthUsername}@oauth.placeholder`, 
      firstName,
      lastName,
      password: `oauth_${provider}_${providerId}`, // ใส่ไว้กัน Error เพราะ Schema บังคับ
      profileImage: photo,
    },
  });

  return user;
}

export async function resetPassword (email) {

  const foundUser = await prisma.user.findUnique(
    {where : { email : email}}
  )

  if (!foundUser) {
    return { success : false,message : 'User not found'}
  }

    const otp = crypto.randomInt(100000, 999999).toString()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
    const hashedOtp = await bcrypt.hash(otp,8)

    await prisma.user.update({
    where : {id : foundUser.id},
    data : {
      resetOtp : hashedOtp,
      resetOtpExpires : expiresAt
    }
  })

  const result = await (email, `Your OTP is : ${otp}`)

  return { success : true ,result} 
}

export async function verifyOtp (email,otp) {
    const tokenRecord = await prisma.user.findFirst ({
      where : {
        user : {email : email},
        resetOtpExpires : { gt : new Date()},
      }
    })

    if (!tokenRecord) {
      return res.status(400).json({
        error : "OTP already expried"
      })
    }

    const isValid = await bcrypt.compare(otp,tokenRecord.otp)

}