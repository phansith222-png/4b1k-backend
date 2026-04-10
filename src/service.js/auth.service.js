
import { prisma } from "../lib/prisma.js"

export async function getUserby(field,value) {

    const result = await prisma.user.findUnique({
        where: {[field]: value}
    })
    return result
}
//ทำไม filed ต้องอยู่ในก้ามปูเป็น array ??
// filed value คืออะไร ??

export async function createUser(data) {
    return await prisma.user.create({data:data})
}

//function editUser สร้าง รับ id,username,firstName,password,lastName,gender,email,telephone,profileImage
export const editUser = async (id,username,firstName,lastName,newPassword, gender,email,telephone,profileImage) => {
    const userData = await prisma.user.update({
        where:{ id : id},
        data : {
            username,
            firstName, 
            lastName,
            password : newPassword,
            gender,
            email,
            telephone,
            profileImage
        }
        //.ให้ prisma update table user ที่(where id) data ข้อมูลที่อัพเดท username,firstName,password,lastName,gender,email,telephone,profileImage
    })
    return userData
}
