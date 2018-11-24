const router = require('express').Router()
const models = require('../models/')

router.get('/category', (req, res) => res.render('category-form'))

router.post('/add-category', (req, res) => {

    models.Category.create({
        title: req.body.title,
        description: req.body.description
    }).then(() => {
        res.redirect('/')
    })
})

router.get('/articles', async(req, res) => {

    models.News.findAll({
        where: {
            approved: 0
          }
    }).then((news) => {
        res.render('admin-articles-view', {articles: news})
    })
})

module.exports = router