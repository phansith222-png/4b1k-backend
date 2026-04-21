import express from 'express'
import { commentPostController, createPostController, deleteCommentController, deleteLikePostController, deletePostController, editCommentController, editPostController, getAllLikeController, getAllPostController, getPostController, likePostController } from '../controllers/post.controller.js'

const postsRouter = express.Router()

postsRouter.post('/',createPostController)

postsRouter.get('/',getAllPostController)

postsRouter.get('/:postId',getPostController)

postsRouter.delete('/:postId',deletePostController)

postsRouter.patch('/:postId',editPostController)

postsRouter.post('/:postId/comments',commentPostController)

postsRouter.get('/:postId/like',getAllLikeController)

postsRouter.post('/:postId/like',likePostController)

postsRouter.delete('/:postId/like',deleteLikePostController)

postsRouter.patch('/:postId/comments/:commentId',editCommentController)

postsRouter.delete('/:postId/comments/:commentId',deleteCommentController)

export default postsRouter