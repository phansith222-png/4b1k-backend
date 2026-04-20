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

export const adminDeleteComment = async (postId,commentId) => {
    const foundPost = await prisma.post.findUnique({
        where : { id : postId},
        select : { id : true , title : true}
    })

    if(!foundPost) {
        return (createHttpError[404],('Not Found Post'))
    }

    const foundComment = await prisma.comment.findUnique({
        where : { id : commentId}
    })


    if(!foundComment) {
        return (createHttpError[404],('Not Found Comment'))
    }

    if (foundComment.postId !== postId) {
        return createHttpError(400, 'This comment does not belong to the specified post');
    }

    const result = await prisma.comment.delete({
        where : { id : commentId}
    })

    return {result , postInfo : foundPost}
}