const router = require('express').Router()
const models = require('../models/')
const isLoggedIn = require('./util')

router.get('/', isLoggedIn, async (req, res) => {
    models.user.findAll({
        where: {
            id: req.user.id,
            is_admin: true
        },
        limit: 1
    }).then((user) => {
        if (user[0] && user[0].is_admin) {
            models.News.findAll({
            }).then((news) => {
                res.render('admin-articles-view', { articles: news })
            })
        } else {
            res.redirect('/')
        }
    })
})

router.get('/category', async (req, res) => res.render('category-form'))

router.post('/add-category', async (req, res) => {

    models.Category.create({
        title: req.body.title,
        description: req.body.description
    }).then(() => {
        res.redirect('/')
    })
})

router.post('/approve', async (req, res) => {
    models.News.update({
        approved: true
    }, {where: {id: req.body.article_id}}).then(() => {
        res.redirect('/admin')
    })
})

router.post('/disapprove', async (req, res) => {
    models.News.update({
        approved: false
    }, {where: {id: req.body.article_id}}).then(() => {
        res.redirect('/admin')
    })
})

module.exports = router