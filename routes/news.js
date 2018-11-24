const router = require('express').Router()
const models = require('../models/')
const multer = require('multer')
const path = require('path')

const dateNow = Date.now() + '-'

//image upload directory
const storage = multer.diskStorage(
    {
        destination: './public/article_images/',
        filename: function (req, file, cb) {
            //req.body is empty...
            //How could I get the new_file_name property sent from client here?
            cb(null, dateNow + file.originalname) //+ '-' + Date.now()+".jpg")
        }
    }
)

var imageUpload = multer({ storage: storage })

router.get('/post', (req, res) => res.render('post-news'))

router.post('/add-news', imageUpload.single('image_file'), (req, res) => {

    const isApproved = 0
    const isPinned = 0

    models.News.create({
        category: req.body.category,
        title: req.body.title,
        body: req.body.body,
        image: dateNow + req.file.originalname,
        approved: isApproved,
        pinned: isPinned
    }).then(() => {
        res.redirect('/')
    })
})

router.get('/article', async (req, res) => {

    models.News.findAll({
        where: {
            id: 4
        }
    }).then((news) => {
        res.render('view-article', { article: news })
    })
})

router.get('/articles', async (req, res) => {

    models.News.findAll({
    }).then((news) => {
        res.render('articles-list', { articles: news })
    })
})

router.get('/edit', (req, res) => res.render('news-edit'))

module.exports = router