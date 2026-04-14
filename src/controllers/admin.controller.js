import createHttpError from 'http-errors'
import { adminDeletePost } from '../service.js/admin.service.js'


export async function adminDeletePostController (req,res,next) {
    try {
        if (req.user.role !== 'ADMIN') {
                    return (createHttpError[403],'Access denied, Admin only')
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