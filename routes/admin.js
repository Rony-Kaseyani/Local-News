const router = require('express').Router()
const models = require('../models/')
const isLoggedIn = require('./util')

router.get('/category', (req, res) => res.render('category-form'))

router.post('/add-category', (req, res) => {

    models.Category.create({
        title: req.body.title,
        description: req.body.description
    }).then(() => {
        res.redirect('/')
    })
})

router.get('/', isLoggedIn, async(req, res) => {
    models.user.findById(req.user.id, {
        where: {
            is_admin: true
        }
    }).then((user) => {
        console.log(user)
        models.News.findAll({
        }).then((news) => {
            res.render('admin-articles-view', {articles: news})
        })
    })
})

module.exports = router