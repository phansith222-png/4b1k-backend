import express from 'express'
import { createArtistPageController, getAllArtistsController, getArtistController } from '../controllers/artist.controller.js'
import authenicateMiddleware from '../middlewares/authenticate.middleware.js'

const artistsRouter = express.Router()

artistsRouter.get('/',getAllArtistsController)

artistsRouter.get('/:artistId',getArtistController)

artistsRouter.post('/',authenicateMiddleware,createArtistPageController)

artistsRouter.patch('/:id',(req,res) => {
    res.json('update artist page')
})

artistsRouter.delete('/:id',(req,res) => {
    res.json('deleted artist page')
})

artistsRouter.post('/:id/like',(req,res) => {
    res.json('like artist')
})

artistsRouter.delete('/:id/like',(req,res) => {
    res.json('like artist')
})

export default artistsRouter