import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { loginSchema, registerSchema } from '../validations/validate.js'
import { createUser, getUserby } from '../service.js/auth.service.js'


export async function registerController (req,res,next) {
    //validation เอา registerSchema มากจาก file schema**

    const data = await registerSchema.parseAsync(req.body)

    //ได้ออกมาเป็น data
    console.log('data',data)
    
    // const username = data.username //เพราะ เบญสร้างตัวแปรชื่อ username ให้มีค่าเท่ากับ data.username
    // const email = data.email
    // const telephone = data.telephone


    const foundUser = await getUserby ('username',data.username)

    if(foundUser) {
        return next(createHttpError[409]('This username has already been registered')) 
    }

    if(data.email) {
    const foundEmail = await getUserby ('email',data.email)
    if(foundEmail){
        return next(createHttpError[409]('This email has already been registered'))
    }
    }
  
    if(data.telephone) {
    const foundTelephone = await getUserby ('telephone',data.telephone)
    if(foundTelephone){
        return next(createHttpError[409]('This telephone has already been registered'))
    }
    }
   
    // res.send('Success ka') 
    console.log('data',data)
    // return 
    //ตรวจสอบแล้ว username email telephone ไม่ซ้ำก็ให้มา create user **


    const user = await createUser(data)

    const userInfo = {
        id : user.id,
        username : user.username,
        firstName : user.firstName,
        lastName : user.lastName, 
    }
 
    
    res.json({
        message : 'Register successful',
        user : userInfo
    })
}

export async function loginController (req,res,next){
    const data = loginSchema.parse(req.body)
    console.log('logincontroller',data)

    const foundUser = await getUserby('username',data.username)
    console.log(foundUser,'foundUser')
    if(!foundUser) {
        return next(createHttpError[401]('Invalid Login 1 username incorrect'))
    }

    const checkPassword = await bcrypt.compare(data.password,foundUser.password)
    if(!checkPassword) {
        return next(createHttpError[401]('Invalid Login 2 password incorrect'))
    }

    //พอเช็คว่า username กับ password ตรง ก็ไปสร้าง token เมื่อ Login ได้

    const payload = {id: foundUser.id} //ตรงนี้คืออะไร มีไว้ทำไม data ที่ไว้ยืนยันว่าเป็นใคร ก
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        algorithm : 'HS256',
        expiresIn: '7d'
    })

    const {password,...userInfo} = foundUser
    res.send({
        message : 'Login Done',
        token : token,
        user : userInfo
    })
}