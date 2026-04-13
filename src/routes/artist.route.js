import express from 'express'
import { createArtistPageController, deleteArtistPageController, getAllArtistsController, getArtistController, likeArtistController, unlikeArtistController, updateArtistPageController } from '../controllers/artist.controller.js'
import authenicateMiddleware from '../middlewares/authenticate.middleware.js'

const artistsRouter = express.Router()

artistsRouter.get('/',getAllArtistsController)

artistsRouter.get('/:artistId',getArtistController)

artistsRouter.post('/',authenicateMiddleware,createArtistPageController)

artistsRouter.patch('/:artistId',authenicateMiddleware,updateArtistPageController)

artistsRouter.delete('/:artistId',authenicateMiddleware,deleteArtistPageController)

artistsRouter.post('/:artistId/like',authenicateMiddleware,likeArtistController)

artistsRouter.delete('/:artistId/like',authenicateMiddleware,unlikeArtistController)

export default artistsRouter