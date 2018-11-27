const router = require('express').Router()

//Models
const models = require("../models")
//Sync Database
models.sequelize.sync().then(function() {
    console.log('Database connection correct')
}).catch(function(err) {
    console.log(err, "Something went wrong with connecting to the database")
})

router.get('/', async (req, res) => {
    models.News.findAll({
        where: {approved: true}
    }).then((news) => {
        res.render('articles-list', { title: "Latest News", list: news })
    })
})
router.use('/admin', require('./admin'))
router.use('/users', require('./users'))
router.use('/news', require('./news'))
router.get('/dashboard', (req, res) => res.render('dashboard'))
router.get('/register', (req, res) => res.render('user-registration-form'))
router.get('/login', (req, res) => res.render('login-form'))
router.get('/logout', (req, res) => {
    req.logout()
    res.render('index')
})
router.get('/category', (req, res) => res.render('category-form'))

module.exports = router
