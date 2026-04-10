import createHttpError from 'http-errors'
import { createPost, deletePost, editPost, getAllPosts, getAPost } from '../service.js/post.service.js'

export async function getAllPostController (req,res,next) {
    
    try {
        const posts = await getAllPosts()
        res.status(200).json({posts})
    }catch(error) {
        next(error)
    }
}


export async function getPostController (req,res,next) {
    const id = Number(req.params.id)
    try {
        const foundPost = await getAPost(id)
        if(!foundPost) {
            return next (createHttpError[404]('Post Not Found'))
        }
        res.status(200).json({foundPost})

    }catch(error) {
        next(error)
    }
}

export async function createPostController (req,res,next) {
    const userId = req.user.id
    const {title,content,postImages,artistId} = req.body
    try {
        const createdPost = await createPost(title,content,postImages,userId,artistId)
        res.status(200).json({createdPost})

    }catch(error) {
        next(error)
    }
}

export async function deletePostController (req,res,next) {
    
    try {
        const id = Number(req.params.id)
        const userId = req.user.id
        const deletedPost = await deletePost(id,userId)

        res.status(200).json({
            message : "deleted success"
        })
    }catch(error) {
        next(error)
    }
}

export async function editPostController (req,res,next) {

    try {
        const id = Number(req.params.id)
        const userId = req.user.id
        const { title,content,postImages,artistId} = req.body

        const updatePost = await editPost(
            id,
            userId,
            title,
            content,
            postImages,
            artistId
        )

        res.status(200).json({
            message : 'Post updated',
            post : updatePost
        })

    }catch(error) {
        next(error)
    }
}