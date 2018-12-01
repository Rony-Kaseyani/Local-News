const router = require('express').Router()

//Models
const models = require('../models')
//Sync Database
models.sequelize
  .sync()
  .then(function() {
    console.log('Database connection correct')
  })
  .catch(function(err) {
    console.log(err, 'Something went wrong with connecting to the database')
  })

router.get('/', async (req, res) => {
  models.News.findAll({
    where: { approved: true }
  }).then(news => {
    res.render('articles-list', { title: 'Latest News', list: news })
  })
})

router.get('/search', async (req, res) => {
  models.News.findAll({
    where: models.sequelize.where(
      models.sequelize.fn('concat', models.sequelize.col('body'), models.sequelize.col('title')),
      {
        $like: `%${req.query.q}%`
      }
    )
  }).then(results => {
    res.render('articles-list', { title: 'Search', list: results })
  })
})

router.post('/search', async (req, res) => {
  res.redirect(`/search?q=${req.body.query}`)
})

router.use('/admin', require('./admin'))
router.use('/users', require('./users'))
router.use('/news', require('./news'))
router.get('/category', async (req, res) => res.render('category-form'))
router.get('/logout', async (req, res) => {
  req.session.destroy()
  req.logout()
  res.redirect('/')
})

module.exports = router
