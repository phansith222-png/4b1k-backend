import createHttpError from 'http-errors'
import { createArtistPage, deleteArtistPage, getAllArtists, getArtist, likeArtist, unlikeArtist, updateArtistPage } from '../service.js/artist.service.js'

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

export async function getArtistController (req,res,next) {
    try {
        const {artistId} = req.params

        const getAnArtist = await getArtist(Number(artistId))

        res.status(200).json({
            message : 'get an artist',
            artist : getAnArtist
        })
    }catch(error){
        next(error)
    }
}

export async function createArtistPageController (req,res,next) {
    try {
        if (req.user.role !== 'ADMIN') {
            return (createHttpError[403],'Access denied, Admin only')
        }

        const userId = req.user.id
        const { artistName, profileImage, biography, agencyId, genreId, songs } = req.body

        if (!artistName || artistName.trim() === '') {
            return  (createHttpError[400],'Artist name is required')
        }

        const newArtist = await createArtistPage({
            artistName: artistName.trim(),
            profileImage,
            biography,
            agencyId: agencyId ? Number(agencyId) : undefined,
            genreId: genreId ? Number(genreId) : undefined,
            songs: songs,
            userId
        })

        res.status(201).json({
            message : 'created Artist Page successfully',
            artist : newArtist
        })

    }catch(error) {
        next(error)
    }
}

export async function updateArtistPageController (req,res,next) {

    try {
        if (req.user.role !== 'ADMIN') {
            return (createHttpError[403],'Access denied, Admin only')
        }

        const userId = req.user.id

        const {artistId} = req.params

        const { artistName, profileImage, biography, agencyId, genreId, songs } = req.body

         if (!artistName || artistName.trim() === '') {
            return  (createHttpError[400],'Artist name is required')
        }

        const updateArtist = await updateArtistPage({
            artistName: artistName.trim(),
            artistId: Number(artistId),
            profileImage,
            biography,
            agencyId: agencyId ? Number(agencyId) : undefined,
            genreId: genreId ? Number(genreId) : undefined,
            songs: songs,
            userId
        })

        res.status(200).json({
            message : 'updated Artist successfully',
            artist : updateArtist
        })

    }catch (error) {
        next(error)
    }
}

export async function deleteArtistPageController (req,res,next) {

    try {
         if (req.user.role !== 'ADMIN') {
            return (createHttpError[403],'Access denied, Admin only')
        }

        const {artistId} = req.params

        const adminId = req.user.id;

        const adminName = req.user.username || "Admin";

       if (!artistId) {
            return (createHttpError[400], 'Invalid artist ID');
        } 

        const remeoveArtist = await deleteArtistPage(Number(artistId))

        res.status(200).json({
            message : "deleted Artist Page successfully",
            actionBy: {
                adminId: adminId,
                adminName: adminName
            },
            deletedData : remeoveArtist
        })

    }catch(error) {
        next(error)
    }
}
export async function likeArtistController (req,res,next) {
    
    try {
        const {artistId} = req.params
        const userId = req.user.id

        // console.log('artistId',artistId)
        // console.log('userId',userId)

        const addLike = await likeArtist({
            userId,
            artistId: Number(artistId)
        })

        res.status(200).json({
            message : 'Like artist successfully',
            artist : addLike
        })

    }catch(error){
        next(error)
    }
}

export async function unlikeArtistController (req,res,next) {

    try {
        const {artistId} = req.params
        const userId = req.user.id

        const unlike = await unlikeArtist({
            userId,
            artistId: Number(artistId)
        })

         res.status(200).json({
            message : 'Like artist successfully',
            artist : unlike
        })

    }catch(error) {
        next(error)
    }
}