import { prisma } from "../lib/prisma.js";

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

export async function findOrCreateOAuthUser(provider, profile) {
  if (!provider) {
    return await prisma.user.findUnique({ where: { id: profile.id } });
  }

  const providerId = profile.id;
  const email = profile.emails?.[0]?.value || null;
  const displayName = profile.displayName || "";
  const photo = profile.photos?.[0]?.value || null;

  const [firstName = displayName, ...rest] = displayName.split(" ");
  const lastName = rest.join(" ") || "-";

  // ตัวอย่าง username: "google_12345", "facebook_12345", "twitter_12345"
  const oauthUsername = `${provider}_${providerId}`;

  // 1. ถ้าหากสมัครสมาชิกด้วย oauth อยู่แล้ว
  let user = await prisma.user.findUnique({
    where: { username: oauthUsername },
  });
  if (user) return user;

  // 2. หาอีเมลของผู้ใช้ที่มีอยู่แล้ว ถ้าอีเมลตรงกันก็ให้ลิงค์กัน
  if (email) {
    user = await prisma.user.findUnique({ where: { email } });
    if (user) return user;
  }

  // 3. ผู้ใช้ใหม่ สร้างแอคเค้าท์
  user = await prisma.user.create({
    data: {
      username: oauthUsername,
      email: email || `${oauthUsername}@oauth.placeholder`, // ต้องใช้ schema ที่มี email เป็น unique
      firstName,
      lastName,
      password: `oauth_${provider}_${providerId}`, // อันนี้แค่ placeholder เท่านั้น ห้ามใช้กับ oauth login
      profileImage: photo,
    },
  });

  return user;
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
