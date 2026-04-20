import express from 'express'
import { createEventController, deleteEventController, getAllEventsController, getEventController, updateEventController } from '../controllers/event.controller.js'
import authenicateMiddleware from '../middlewares/authenticate.middleware.js'

const eventsRouter = express.Router()

eventsRouter.get('/',getAllEventsController)

eventsRouter.get('/:eventId',authenicateMiddleware,getEventController)

eventsRouter.post('/',authenicateMiddleware,createEventController)

eventsRouter.patch('/:eventId',authenicateMiddleware,updateEventController)

eventsRouter.delete('/:eventId',authenicateMiddleware,deleteEventController)

export default eventsRouter