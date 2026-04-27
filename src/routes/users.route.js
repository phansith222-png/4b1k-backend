import express from 'express'
import authenicateMiddleware from '../middlewares/authenticate.middleware.js'
import { editMeController, getMeController, getUserByIdController } from '../controllers/user.controller.js'

const usersRouter = express.Router()

usersRouter.get('/me',getMeController)

usersRouter.patch('/me',editMeController)

usersRouter.get('/:id', getUserByIdController)

export default usersRouter 