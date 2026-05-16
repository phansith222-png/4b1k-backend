import {  ZodError } from 'zod'
import createHttpError from 'http-errors'

export default function (err,req,res,next) {
    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            error : 'Token Expired',
            message : 'Your session has expired. Please login again'
        })
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error : 'Invalid Token',
            message : 'The provided token is invalid or malform'
        })
    }

    if (err instanceof ZodError) {
        return res.status(400).json({
            success : false,
            errors : err.flatten().fieldErrors
        })
    }

        console.error(err)
       const statusCode = err.status || 500;
    const errorMessage = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        status: statusCode,
        message: errorMessage
    })
}