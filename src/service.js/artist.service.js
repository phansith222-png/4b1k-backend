import {prisma} from '../lib/prisma.js'
import createHttpError from 'http-errors'

export const getAllArtists = async() => {
    const result = await prisma.artist.findMany({
        orderBy : {createdAt : 'desc'},
    })
    return result
}