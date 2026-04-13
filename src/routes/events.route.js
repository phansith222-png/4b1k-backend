import express from 'express'
import { getAllEventsController } from '../controllers/event.controller.js'
import authenicateMiddleware from '../middlewares/authenticate.middleware.js'

const eventsRouter = express.Router()

eventsRouter.get('/',authenicateMiddleware,getAllEventsController)

eventsRouter.get('/:eventId',(req,res)=> {
    res.json('get an event')
})

eventsRouter.post('/',(req,res)=> {
    res.json('create all event')
})

eventsRouter.patch('/:eventId',(req,res)=> {
    res.json('edit/update event')
})

eventsRouter.delete('/:eventId',(req,res)=> {
    res.json('deleted an event')
})

export default eventsRouter