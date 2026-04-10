import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { getUserby } from '../service.js/auth.service.js'

export default async function authenicateMiddleware (req,res,next) {
    const authorization = req.headers.authorization
    // console.log('authorization', authorization)

    //startWith คืออะไร
    if(!authorization || !authorization.startsWith('Bearer ')) {
        return next(createHttpError[401]('Unauthorized 1'))
    }

    const [,token] = authorization.split(' ')

    //in case no have token
    if(!token) {
        return next(createHttpError[401]('Unauthorized 2 token'))
    }

    //token verify
    const payload = jwt.verify(token,process.env.JWT_SECRET)
    // console.log('payload',payload)

    const foundUser = await getUserby('id',payload.id)

    if(!foundUser) {
        return next(createHttpError[401]('Unauthorized 3 user'))
    }

    const {createdAt,updatedAt,...userInfo} = foundUser

    req.user = userInfo
    // console.log('req.user', req.user)
    next()
}