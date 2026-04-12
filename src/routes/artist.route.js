import express from 'express'

const artistsRouter = express.Router()

artistsRouter.get('/',(req,res) => {
    res.json('get all artist pages')
})

artistsRouter.get('/;id',(req,res) => {
    res.json('get an artist pages')
})

artistsRouter.post('/',(req,res) => {
    res.json('create artist page')
})

artistsRouter.patch('/:id',(req,res) => {
    res.json('update artist page')
})

artistsRouter.delete('/:id',(req,res) => {
    res.json('deleted artist page')
})

artistsRouter.post('/:id/like',(req,res) => {
    res.json('like artist')
})

export default artistsRouter