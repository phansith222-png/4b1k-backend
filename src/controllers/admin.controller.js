import createHttpError from 'http-errors'
import { adminDeleteComment, adminDeletePost } from '../service.js/admin.service.js'


export async function adminDeletePostController (req,res,next) {
    try {
        if (req.user.role !== 'ADMIN') {
            return next(createHttpError(403, 'Access denied, Admin only'))
        }

        const {postId} = req.params

        const adminId = req.user.id

        const adminName = req.user.username || 'Admin'

        const removePost = await adminDeletePost(Number(postId))

        res.status(200).json({
            message : 'delete user post successfully',
            actionBy : {
                adminId : adminId,
                adminName : adminName
            },
            deleteData : removePost
        })
    }catch(error) {
        next(error)
    }
}

export async function adminDeleteCommentController (req,res,next) {
    try {
        if (req.user.role !== 'ADMIN') {
            return next(createHttpError(403, 'Access denied, Admin only'))
        }

        const {postId,commentId} = req.params
        const adminId = req.user.id
        const adminName = req.user.username || 'Admin'

         const removeComment = await adminDeleteComment(Number(postId),Number(commentId))

         res.status(200).json({
            message : 'delete user comment successfully',
            actionBy : {
                adminId : adminId,
                adminName : adminName
            },
            postDetails : {
                postId : removeComment.postInfo.id,
                postTitle : removeComment.postInfo.title
            },
            deleteData : removeComment.result
        })

    }catch(error) {
        next(error)
    }
}