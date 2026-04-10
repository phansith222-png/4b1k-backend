import {z} from 'zod'
import bcrypt from 'bcrypt'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

//ต้องมีตัวพิมพ์เล็กอย่างน้อย 1 ตัว
//ต้องมีตัวพิมพ์ใหญ่อย่างน้อย 1 ตัว
//ต้องมีตัวเลขอย่างน้อย 1 ตัว
//ต้องมีอักขระพิเศษอย่างน้อย 1 ตัว
//อนุญาตเฉพาะตัวอักษรเหล่านี้ และต้องยาว 8 ตัวขึ้นไป

//ทำไม refine ของ password confirmpassword อยุ่ข้างนอก ????
//Path : ['confirmpassword'] คืออะไร มีไว้ทำไม ????

//หลังจ่ากผ่านการตรวจสอบด้านบน เอาข้อมูลที่ผ่านการตรงจสอบให้เปลี่ยนเป็นข้อมูล ที่เราต้องการ
//transfer คือ 
export const registerSchema = z.object({
    username : z.string().min(2,"Username must be at least 2 characters"),
    firstName : z.string().min(2,'Firstname is required'),
    lastName : z.string().min(2,'Lastname is required'),
    email : z.string().min(2)
    .refine(val=>emailRegex.test(val),'Invalid email format').optional(),
    password : z.string().min(8,'Password must be at least 8 characters')
    .refine(val=>passwordRegex.test(val),'Password does not meet requirements'),
    confirmPassword : z.string().min(1,'Confirmedpassword is required'),
    telephone: z.string().optional()
}).refine(input=>input.password === input.confirmPassword,{
    message: 'Passwords must match',
    path : ['confirmpassword']
}).transform(async data => ({
    username : data.username,
    firstName : data.firstName,
    lastName : data.lastName,
    email: data.email,
    password : await bcrypt.hash(data.password,8),
    telephone : data.telephone
}))

export const loginSchema = z.object({
    username : z.string().min(2,'Username is required'),
    password : z.string().min(2,'Password is required')
}).transform(data => ({
    username : data.username,
    password : data.password
})
)