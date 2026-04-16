import express from 'express'

const newsRouter = express.Router()

newsRouter.get('/',(req,res) => {
    res.json('get all news')
})

newsRouter.get('/:newsId',(req,res) => {
    res.json('get a news')
})

newsRouter.post('/',(req,res) => {
    res.json('creat news')
})

newsRouter.patch('/:newsId',(req,res) => {
    res.json('edit or update news')
})

newsRouter.patch('/:newsId',(req,res) => {
    res.json('delete news')
})

export default newsRouter