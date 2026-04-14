import createHttpError from 'http-errors'
import { commentPost, createPost, deleteComment, deletePost, editComment, editPost, getAllPosts, getAPost, likePost, unlikePost } from '../service.js/post.service.js'

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

export async function commentPostController (req,res,next) {
    try {
        const {postId} = req.params
        const {content} = req.body
        const userId = req.user.id

        if (!content || content.trim() === '') {
            return res.status(400).json({ error: 'Comment content cannot be empty' })
        }

        if (!postId) {
            return res.status(400).json({ error: 'Invalid post ID' })
        }

        const newComment = await commentPost(
            content.trim(),
            userId,
            Number(postId)
        )

        res.status(201).json({
            message : 'comment successfully',
            data : newComment
        })
    }catch (error) {
        next(error)
    }
}

export async function likePostController (req,res,next) {
    try {
        const {postId} = req.params
        const userId = req.user.id

        if(!postId) {
            return res.status(400).json({ error: 'Invalid post ID' })
        }
        
        const newLike = await likePost(userId,Number(postId))

        res.status(201).json({
            message : 'Like Post successfully',
            data : newLike
        })

    }catch (error) {
        next(error)
    }
}

export async function deleteLikePostController (req,res,next) {
    try {
        const {postId} = req.params
        const userId = req.user.id

        if(!postId) {
            return res.status(400).json({ error: 'Invalid post ID' })
        }

        const removeLike = await unlikePost(userId,Number(postId))

        res.status(200).json({
            message : 'unlike Post successfully',
            data : removeLike
        })

    }catch(error) {
        if (error.message === 'NOT_LIKED_YET') {
            return res.status(404).json({ error: 'Like not found for this post' }); // 404 Not Found
        }

        console.error('Error in deleteLikeController:', error);
        next(error);
    }
}

export async function editCommentController (req,res,next) {
    try {
        const {postId,commentId} = req.params
        const userId = req.user.id
        const {content} = req.body

        if(!content || content.trim() === '') {
            return createHttpError(400, 'Comment content cannot be empty')
        }

        if(!postId || !commentId) {
            return createHttpError(400, 'Invalid post ID or comment ID')
        }

        const updateComment = await editComment(
            userId,
            Number(postId),
            Number(commentId),
            content.trim())

        res.status(201).json({
            message : 'edit comment successfully',
            data : updateComment
        })

    }catch(error) {
        next(error)
    }
}

export async function deleteCommentController (req,res,next) {
    try {
        const {postId,commentId} = req.params
        const userId = req.user.id

        if(!postId || !commentId) {
            return createHttpError(400, 'Invalid post ID or comment ID')
        }
    
        const removeComment = await deleteComment(userId,Number(userId),Number(commentId))

        res.status(200).json({
            message : 'Deleted comment successfully'
        })

    }catch(error) {
        next(error)
    }
}

