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

module.exports = router