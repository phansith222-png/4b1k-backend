import express from 'express'
import authenicateMiddleware from '../middlewares/authenticate.middleware.js'
import { editMeController, getMeController } from '../controllers/user.controller.js'

const usersRouter = express.Router()

usersRouter.get('/me',getMeController)

usersRouter.patch('/me',editMeController)

export default usersRouter 