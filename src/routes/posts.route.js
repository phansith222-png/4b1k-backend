import express from 'express'
import { createPostController, deletePostController, editPostController, getAllPostController, getPostController } from '../controllers/post.controller.js'

const postsRouter = express.Router()

postsRouter.post('/',createPostController)

postsRouter.get('/',getAllPostController)

postsRouter.get('/:id',getPostController)

postsRouter.delete('/:id',deletePostController)

postsRouter.patch('/:id',editPostController)

postsRouter.post('/:id/comment',(req,res)=>{
    res.json('write comment at a posts')
})

postsRouter.post('/:id/like',(req,res)=> {
    res.json('like at post')
})

export default postsRouter