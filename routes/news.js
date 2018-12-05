/// dependencies
const router = require('express').Router()
const isLoggedIn = require('./util').isLoggedIn
const models = require('../models/')
const multer = require('multer')
const showdown = require('showdown')
const nodemailer = require('nodemailer')
const routesErrorHandler = require('./util').routesErrorHandler

// setting up nodemailer
// reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'localnewssite2018@gmail.com', // generated ethereal user
    pass: 'localnews2018' // generated ethereal password
  }
})

// init markdown to html converter
const converter = new showdown.Converter()

// current date
const dateNow = Date.now() + '-'

//image upload directory
const storage = multer.diskStorage({
  destination: './public/article_images/',
  filename: function(req, file, cb) {
    //Get the new_file_name property sent from client
    cb(null, dateNow + file.originalname)
  }
})

let imageUpload = multer({ storage: storage })

/// news routes namespaced with /news
// get form to add new news article
router.get('/add-new', isLoggedIn, async (req, res) => res.render('post-news'))

// post request for adding new news article
router.post(
  '/add-new',
  isLoggedIn,
  imageUpload.single('image_file'),
  routesErrorHandler(async (req, res, next) => {
    const isApproved = false
    const isPinned = false
    const sessionID = req.user.id
    await models.News.create({
      category: req.body.category,
      title: req.body.title,
      body: req.body.body,
      image: dateNow + req.file.originalname,
      approved: isApproved,
      pinned: isPinned,
      userId: sessionID
    })

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Local News Site" <localnewssite2018@gmail.com>', // sender address
      to: 'superuserlocalnews@gmail.com', // list of receivers
      subject: 'Approve Local News Article', // Subject line
      text: 'Approve Local News Article', // plain text body
      html:
        '<p>A new article has recently been posted on the Local News site.  Click here to approve the article: http://localhost:3000</p>' // html body
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error)
      }
      console.log('Message sent: %s', info.messageId)
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    })

    return res.redirect('/')
  })
)

// get single news article
router.get(
  '/article/:id',
  routesErrorHandler(async (req, res, next) => {
    const articleId = req.params.id
    if (Math.round(articleId)) {
      const newsArticleRatings = await models.Ratings.findAll({
        where: {
          NewsId: articleId
        }
      })
      let arrOfRatings = []
      newsArticleRatings.forEach(rating => {
        arrOfRatings.push(rating.dataValues.rating)
      })
      const newsArticleRatingsCount = arrOfRatings.length
      const newsArticleRatingsAvg = (arrOfRatings.reduce((p, c) => p + c, 0) / arrOfRatings.length).toFixed(1) || 0
      const newsArticle = await models.News.findById(articleId)
      const user = await models.user.findById(newsArticle.userId)
      const body = converter.makeHtml(newsArticle.body)
      const author = `${user.first_name} ${user.last_name}`
      const publishedDate = newsArticle.createdAt.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      return res.render('single-article-view', {
        newsArticle,
        body,
        author,
        publishedDate,
        newsArticleRatingsAvg,
        newsArticleRatingsCount
      })
    } else {
      let err = new Error('The article you were looking for could not be found.')
      err.status = 404
      next(err)
    }
  })
)

// submit rating for news article
router.post(
  '/article/:id/submit-rating',
  isLoggedIn,
  routesErrorHandler(async (req, res, next) => {
    await models.Ratings.create({
      rating: req.body.rating,
      userId: req.user.id,
      NewsId: req.params.id
    })
    res.redirect(`/news/article/${req.params.id}`)
  })
)

// edit news article
router.get(
  '/article/:id/edit',
  isLoggedIn,
  routesErrorHandler(async (req, res, next) => {
    const article = await models.News.findById(req.params.id)
    return res.render('news-edit', { article })
  })
)

// post request for editing news article
router.post(
  '/article/:id/edit',
  isLoggedIn,
  imageUpload.single('imagefile'),
  routesErrorHandler(async (req, res, next) => {
    const article = await models.News.findById(req.params.id)
    await models.News.update(
      {
        category: req.body.category,
        title: req.body.title,
        body: req.body.body,
        image: req.file ? dateNow + req.file.originalname : article.image
      },
      { where: { id: req.params.id, userId: req.user.id } }
    )
    return res.redirect('/users/dashboard')
  })
)

// listing news articles based on category in the url
router.get(
  '/:category',
  routesErrorHandler(async (req, res, next) => {
    const categoryInDb = await models.Category.findAll({ where: { title: req.params.category } })
    if (categoryInDb) {
      const news = await models.News.findAll({
        where: {
          category: req.params.category,
          approved: true
        }
      })
      res.locals.category_nav_title = req.params.category
      return res.render('articles-list', { title: req.params.category, list: news })
    } else {
      let err = new Error('The category you requested does not exist.')
      err.status = 404
      next(err)
    }
  })
)

module.exports = router
