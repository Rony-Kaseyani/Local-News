const router = require('express').Router()
const isLoggedIn = require('./util')
const models = require('../models/')
const multer = require('multer')
const showdown = require('showdown')

const converter = new showdown.Converter()

const dateNow = Date.now() + '-'

//image upload directory
const storage = multer.diskStorage({
  destination: './public/article_images/',
  filename: function(req, file, cb) {
    //Get the new_file_name property sent from client
    cb(null, dateNow + file.originalname)
  }
})

var imageUpload = multer({ storage: storage })

router.get('/post', async (req, res) => res.render('post-news'))

router.post('/add-news', isLoggedIn, imageUpload.single('image_file'), async (req, res) => {
  const isApproved = 0
  const isPinned = 0
  const sessionID = req.user.id
  console.log('Checking session ID:' + sessionID)
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

router.get('/post', isLoggedIn, async (req, res) => res.render('post-news'))

router.get('/single/:id', async (req, res) => {
  models.News.findById(req.params.id).then(item => {
    models.user.findById(item.userId).then(user => {
      const body = converter.makeHtml(item.body)
      const author = `${user.first_name} ${user.last_name}`
      const publishedDate = item.createdAt.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      res.render('open-article', { item, body, author, publishedDate })
    })
  })
})

router.get('/single/:id/edit', isLoggedIn, async (req, res) => {
  models.News.findById(req.params.id).then(article => {
    res.render('news-edit', { article })
  })
})

router.post('/single/:id/edit', isLoggedIn, imageUpload.single('imagefile'), async (req, res) => {
  models.News.findById(req.params.id).then(article => {
    const articleImage = article.image
    models.News.update(
      {
        category: req.body.category,
        title: req.body.title,
        body: req.body.body,
        image: req.file ? dateNow + req.file.originalname : articleImage
      },
      { where: { id: req.params.id, userId: req.user.id } }
    ).then(() => res.redirect('/users/dashboard'))
  })
})

router.get('/category/:category', async (req, res) => {
  console.log(req.params.category)
  models.News.findAll({
    where: {
      category: req.params.category,
      approved: true
    }
  }).then(news => {
    res.locals.category_nav_title = req.params.category
    res.render('articles-list', { title: req.params.category, list: news })
  })
})

module.exports = router
