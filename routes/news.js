const router = require('express').Router()
const isLoggedIn = require('./util')
const models = require('../models/')
const multer = require('multer')
const path = require('path')
const showdown  = require('showdown')

const converter = new showdown.Converter()

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

router.post('/add-news', isLoggedIn, imageUpload.single('image_file'), async(req, res) => {

    const isApproved = 0
    const isPinned = 0
    const sessionID = req.user.id
    console.log('hey bro, are you logged in?'+sessionID)
    models.News.create({
        category: req.body.category,
        title: req.body.title,
        body: req.body.body,
        image: dateNow + req.file.originalname,
        approved: isApproved,
        pinned: isPinned,
        userId: sessionID
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
        res.render('articles-list', { list: news })
    })
})

router.get('/edit', async (req, res) => {

    models.News.findAll({
        where: {
            id: 4
        }
    }).then((news) => {
        res.render('news-edit', { article: news })
    })
})

router.get('/post', (req, res) => res.render('post-news'))

router.post('/news-edit', imageUpload.single('image_file'), async(req, res) => {

    models.News.update({
        category: req.body.category,
        title: req.body.title,
        body: req.body.body,
        image: dateNow + req.file.originalname,
    }, {where: {id: 4 }}).then(() => {
        res.redirect('/')
    })
})

router.get('/single/:id', async(req, res) => {
    models.News.findById(req.params.id).then((item) => {
        const body = converter.makeHtml(item.body)
        res.render('open-article', {item, body })
    })
}) 

router.get('/category/:category', async (req, res) => {
    console.log(req.params.category)
    models.News.findAll({
        where: {
            category: req.params.category
        }
    }).then((news) => {
        res.render('articles-list', { title: req.params.category, list: news })
    })
})

module.exports = router