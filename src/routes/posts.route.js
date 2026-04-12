import express from 'express'
import { commentPostController, createPostController, deleteLikePostController, deletePostController, editCommentController, editPostController, getAllPostController, getPostController, likePostController } from '../controllers/post.controller.js'

const postsRouter = express.Router()

postsRouter.post('/',createPostController)

postsRouter.get('/',getAllPostController)

postsRouter.get('/:id',getPostController)

postsRouter.delete('/:id',deletePostController)

postsRouter.patch('/:id',editPostController)

postsRouter.post('/:postId/comments',commentPostController)

postsRouter.post('/:postId/like',likePostController)

postsRouter.delete('/:postId/like',deleteLikePostController)

postsRouter.patch('/:postId/comments/:commentId',editCommentController)

export default postsRouter