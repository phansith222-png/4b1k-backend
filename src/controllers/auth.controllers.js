import createHttpError from 'http-errors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { loginSchema, registerSchema } from '../validations/validate.js'
import { createUser, getUserby, resetPassword } from '../service.js/auth.service.js'


export async function registerController (req,res,next) {
    //validation เอา registerSchema มากจาก file schema**

    const data = await registerSchema.parseAsync(req.body)

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

    const foundUser = await getUserby('username',data.username)
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

//***********************//
// Controller สำหรับจัดการเมื่อ OAuth สำเร็จ
export const oauthSuccessController = (req, res) => {
  // req.user ได้มาจากตอนที่ทำ done(null, user) ในไฟล์ passport.js
  const user = req.user;

  // สร้าง JWT Token
  const payload = { id: user.id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "7d",
  });

  // ส่ง Token กลับไปที่ Frontend (หน้าเว็บคอนเสิร์ตของเรา)
  const frontendURL = process.env.FRONTEND_URL || "http://localhost:5173";
  res.redirect(`${frontendURL}/oauth/callback?token=${token}`);
};

export const oauthFailedController = (req, res) => {
  res.status(401).json({ message: "OAuth login failed. Please try again." });
};

export async function resetPasswordController (req,res,next)  {

    try {

    const {email} = req.body

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await resetPassword(email)

    res.status(200).json({
        message : "If this email address is in the system, an OTP will be sent"
    })
    }catch(error) {
        next(error)
    }

}

export async function verifyOtpController  (req,res) {

    const {email,otp} = req.body

    const result = await verifyOtp(email,otp)

    res.status(200).json({
        message : "verify success",
        OTP : otp    })

}