import {prisma} from '../lib/prisma.js'
import createHttpError from 'http-errors'

export const adminDeletePost = async (postId) => {
    const foundPost = await prisma.post.findUnique({
        where : { id : postId}
    })

    if(!foundPost) {
        return (createHttpError[404],('Not Found Post'))
    }

    const result = await prisma.post.delete({
        where : { id : postId}
    })

    return result
}