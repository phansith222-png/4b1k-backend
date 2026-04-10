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