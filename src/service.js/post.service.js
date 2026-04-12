import {prisma} from '../lib/prisma.js'
import createHttpError from 'http-errors'

export const getAllPosts = async() => {
    const result = await prisma.post.findMany({
        orderBy : {createdAt : 'desc'},
        include : {
            user : {select : {username:true,profileImage:true}},
            comments : {
                include : {user : {select : {username:true,profileImage:true}}}
            },
            likes : {
                include : {user : {select : {username : true}}}
            }
        }
    })

    return result
}

export const getAPost = async(id) => {
    const result = await prisma.post.findUnique({
        where : {id : id}
    })
    return result
}

export const createPost = async(title,content,postImages,userId,artistId) => {
    const result = await prisma.post.create({
        data : {
            title: title,
            content : content,
            userId: userId,
            artistId : artistId,
            postImages: {
               create: {
                    url: postImages 
                } 
            }
        }
    })

    return result
}

export const deletePost = async(id,userId) => {

    const foundPost = await getAPost(id)
    if(!foundPost) {
        return (createHttpError[404]('Post not found'))
    }
    if(userId != foundPost.id) {
        return (createHttpError[404]('Cannot delete this post'))
    }
    const result = await prisma.post.deleteMany(
        {where : {id : id}}
    )

    return result
}

export const editPost = async(id,userId,title,content,postImages,artistId) => {
    const foundPost = await getAPost(id)
    console.log(foundPost)
    if(!foundPost) {
        return (createHttpError[404]('Post not found'))
    }
     if(userId != foundPost.userId) {
        console.log("edit post",userId)
        console.log(foundPost.id)
         return (createHttpError[404]('Cannot delete this post'))
    }

    const result = await prisma.post.update({
        where : {id : id},
        data : {
            title : title,
            content : content,
            artistId : artistId,
            postImages : {
                create : {
                    url : postImages
                }
            }

        }
    }) 
    return result
}

export const commentPost = async (content,userId,postId) => {
    const result = await prisma.comment.create({
        data : {
            content : content,
            userId : userId,
            postId : postId
        },
        include : {
            user : {
                select : {
                    id : true,
                    username : true,
                    profileImage : true
                }
            }
        }
    })

    return result
}

export const likePost = async (userId,postId) => {

    const postData = await prisma.like.findUnique({
        where: {
            userId_postId: { userId, postId }
        }
    })

    if (postData) {
		return (createHttpError[401]('cannot like this post'))
	}

    const haveLike = await prisma.like.findUnique({
        where : {
            userId_postId : {
                userId : userId,
                postId : postId
            }
        }
    })

    if(haveLike) {
        return (createHttpError[400]('already like this post'))
    }

    const result = await prisma.like.create({
        data : { userId: userId, postId: postId}
    })

    return result
}

export const unlikePost = async (userId,postId) => {

    const postData = await prisma.like.findUnique({
        where: {
            userId_postId: { userId, postId }
        }
    })

    if (!postData) {
		return (createHttpError[401]('cannot unlike this post'))
	}

    const result = await prisma.like.delete({
        where: {
            userId_postId: { userId, postId } 
        }
    })

    return result
}

export const editComment = async (userId,postId,commentId,newContent) => {

    const haveComment = await prisma.comment.findUnique({
        where : { id : commentId}
    })

    if(!haveComment){
        return (createHttpError[404],'Comment not found')
    }

    if(haveComment.postId !== postId) {
        return (createHttpError[400],'This comment does not belong to the specified post')
    }

    if(haveComment.userId !== userId) {
        return (createHttpError[403],'You are not authorized to edit this comment')
    }

    const result = await prisma.comment.update({
        where : { id : commentId},
        data : {
            content : newContent
        },
        include : {
            user : {
                select : {
                    id : true,
                    username : true,
                    profileImage :true
                }
            }
        }
    })

    return result
}

export const deleteComment = async (userId,postId,commentId) => {
    const haveComment = await prisma.comment.findUnique({
        where : {id : commentId}
    })

    if (!haveComment) {
        return createHttpError([404],'Comment not found')
    }

    if (haveComment.postId !== postId) {
        return createHttpError([400],'This comment does not belong to the specified post')
    }

    if (haveComment.userId !== userId) {
        return createHttpError([403],'You are not authorized to delete this comment')
    }

    const result = await prisma.comment.deleteMany({
        where : { id : commentId}
    })

    return result
}