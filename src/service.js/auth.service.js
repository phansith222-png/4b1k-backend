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
    return await prisma.user.findUnique({
      where: {
        id: profile.id,
      },
    });
  }

  const providerId = profile.id;
  const email = profile.email?.[0]?.value || null;
  const displayName = profile.displayName || "";
  const photo = profile.photos?.[0]?.value || null;

  const [firstName = displayName, ...rest] = displayName.split(" ");
  const lastName = rest.join(" ") || "-";

  const oauthUsername = `${provider}_${providerId}`;
  let user = await prisma.user.findUnique({
    where: { username: oauthUsername },
  });
  if (user) return user;

  if (email) {
    user = await prisma.user.findUnique({
      where: { email },
    });
    if (user) return user;
  }

  user = await prisma.user.create({
    data: {
      username: oauthUsername,
      email: email || `${oauthUsername}@oauth.placeholder`,
      firstName,
      lastName,
      password: `oauth_${provider}_${providerId}`,
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
