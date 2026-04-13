import express from 'express'

const eventsRouter = express.Router()

eventsRouter.get('/',(req,res)=> {
    res.json('get all event')
})

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