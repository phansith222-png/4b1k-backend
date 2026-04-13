import createHttpError from 'http-errors'
import { getAllEvents } from '../service.js/event.service.js'

export async function getAllEventsController (req,res,next) {
    try {
        const events = await getAllEvents()

        res.status(200).json({
            message : "Get all events successfully",
            events : events
        })

    }catch(error) {
        next(error)
    }
}

