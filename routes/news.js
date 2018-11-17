const router = require('express').Router()
const models = require('../models/')

router.get('/post', (req, res) => res.render('post-news'))

router.post('/add-news', (req, res) => {

    const isApproved = 0
    const isPinned = 0

    models.News.create({
        title: req.body.title,
        body: req.body.body,
        image: req.body.image_file,
        video: req.body.video_file,
        audio: req.body.audio_file,
        approved: isApproved,
        pinned: isPinned
    }).then(() => {
        res.redirect('/')
    })
})

router.get('/article', async(req, res) => {

    models.News.findAll({
        where: {
            id: 3
          }
    }).then((news) => {
        res.render('view-article', {article: news})
    })
}) 

router.get('/articles', async(req, res) => {

    models.News.findAll({
    }).then((news) => {
        res.render('articles-list', {articles: news})
    })
}) 

module.exports = router