const router = require('express').Router()
const models = require('../models/')

router.get('/post', (req, res) => res.render('post-news'))

router.post('/add-news', (req, res) => {
    models.News.create({
        title: req.body.title,
        body: req.body.body,
        image: req.body.image_file,
        video: req.body.video_file,
        audio: req.body.audio_file,
        //UserId: req.params.user_id,
        Category: req.body.category_id
    }).then(() => {
        res.redirect('/')
    })
})

module.exports = router