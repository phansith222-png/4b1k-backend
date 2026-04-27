import createHttpError from 'http-errors'
import { commentPost, createPost, deleteComment, deletePost, editComment, editPost, getAllLike, getAllPosts, getAPost, likePost, unlikePost } from '../service.js/post.service.js'

export async function getAllPostController (req,res,next) {
    
    try {
        const posts = await getAllPosts()
        
        res.status(200).json({posts})
    }catch(error) {
        next(error)
    }
}


export async function getPostController (req,res,next) {
    const {postId} = req.params
    try {
        const getPost = await getAPost(Number(postId))

        res.status(200).json({
            message : 'get post successfully',
            post : getPost
        })

    }catch(error) {
        next(error)
    }
}

export async function createPostController (req,res,next) {
    const userId = req.user.id
    const {title,content,image,artistIds} = req.body
    // console.log("controller",req.body)
    try {
        const createdPost = await createPost(title,content,image,userId,artistIds)


        res.status(201).json({
            message: "create post successfully",
            post: createdPost
        });

    }catch(error) {
        next(error)
    }
}

export async function deletePostController (req,res,next) {
    
    try {
        const {postId} = req.params
        const userId = req.user.id
        const deletedPost = await deletePost(Number(postId),userId)

        res.status(200).json({
            message : "deleted success",
            post : deletedPost
        })
    }catch(error) {
        next(error)
    }
}

export async function editPostController (req,res,next) {

    try {
        const {postId} = req.params
        const userId = req.user.id
        console.log(req.body)
        const { title,content,image,artistIds} = req.body

        console.log("trdtdtts", artistIds)

        const updatePost = await editPost(
            Number(postId),
            userId,
            title,
            content,
            image,
            artistIds
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
        const {content,image} = req.body
        const userId = req.user.id

        if ((!content || content.trim() === '') && !image) {
            return res.status(400).json({ error: 'Comment content cannot be empty' })
        }

        if (!postId) {
            return res.status(400).json({ error: 'Invalid post ID' })
        }

        const newComment = await commentPost(
            content.trim(),
            image,
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

export async function getAllLikeController (req,res,next) {
    try {
        const {postId} = req.params

        const likes = await getAllLike(Number(postId))

        res.status(200).json({
            message : 'get all like successfully',
            postId : postId,
            likes : likes,
            totalLikes : likes.length
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
        const {content,image} = req.body

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
            content.trim(),
            image)

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
    
        const removeComment = await deleteComment(userId,Number(postId),Number(commentId))

        res.status(200).json({
            message : 'Deleted comment successfully',
            deleteComment : removeComment
        })

    }catch(error) {
        next(error)
    }
}

