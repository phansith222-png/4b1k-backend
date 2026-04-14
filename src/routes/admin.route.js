import express from 'express'
import { adminDeletePostController } from '../controllers/admin.controller.js'
import authenicateMiddleware from '../middlewares/authenticate.middleware.js'


const adminRouter = express.Router()

adminRouter.delete('/posts/:postId/comments/:commentId',(req,res) => {
    res.json('admin deleted user comment')
})

adminRouter.delete('/posts/:postId',authenicateMiddleware,adminDeletePostController)

export default adminRouter