import bcrypt from 'bcrypt'
import { editUser, getUserby } from '../service.js/auth.service.js'

export async function getUserByIdController (req, res, next) {
    try {
        const { id } = req.params;
        const user = await getUserby('id', parseInt(id));
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return only non-sensitive information
        const { password, resetOtp, resetOtpExpires, ...safeUser } = user;
        res.json(safeUser);
    } catch (error) {
        next(error);
    }
}

export async function getMeController (req,res) {
    // console.log('get profile',req.user)
    res.json({user: req.user})
    //req.user มาจาก authenticate.middlewware
}

//ในกรณีจะแก้ username ได้ไหม
export async function editMeController (req,res,next) {
    //ระบุตัวตนว่าใครเป็นแก้
    const {id} = req.user
    // req.user from middleware
    // console.log('req.user', req.user)
    //ดึงข้อมูลใหม่จาก req.body

    const {
        username,
        firstName,
        lastName,
        password,
        gender,
        email,
        telephone,
        profileImage } = req.body    
    
        try {
            
            let finalPassword = req.user.password
            if(password) {
               finalPassword = await bcrypt.hash(password,8)
            }
              
            //edit user คือ การส่ง 
        const updateProfile = await editUser
                                (id,
                                username || req.user.username,
                                firstName || req.user.firstName,
                                lastName || req.user.lastName,
                                finalPassword,
                                gender || req.user.gender,
                                email || req.user.email,
                                telephone || req.user.telephone,
                                profileImage || req.user.profileImage)

         res.status(200).json({
            message : "profile update",
            update : updateProfile})
        }catch(error) {
            next(error)
        }      
    
}