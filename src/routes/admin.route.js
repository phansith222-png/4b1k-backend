import express from 'express'
import { adminDeleteCommentController, adminDeletePostController } from '../controllers/admin.controller.js'
import authenicateMiddleware from '../middlewares/authenticate.middleware.js'


const adminRouter = express.Router()

adminRouter.delete('/posts/:postId/comments/:commentId',authenicateMiddleware,adminDeleteCommentController)

adminRouter.delete('/posts/:postId',authenicateMiddleware,adminDeletePostController)

export default adminRouter