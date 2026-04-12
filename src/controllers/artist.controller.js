import createHttpError from 'http-errors'
import { getAllArtists } from '../service.js/artist.service.js'

export async function getAllArtistsController (req,res,next) {
    try {
        const artists = await getAllArtists()
        
        res.status(200).json({
            message : 'get all artist successfully',
            artists : artists
        })
    }catch(error) {
        next(error)
    }
}
 