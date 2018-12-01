const router = require('express').Router()
const models = require('../models/')
const isLoggedIn = require('./util')

router.get('/', isLoggedIn, async (req, res) => {
  if (req.user.is_admin === true) {
    models.News.findAll({}).then(news => {
      res.render('admin-articles-view', { articles: news })
    })
  } else {
    res.redirect('/')
  }
})

router.get('/users', isLoggedIn, async (req, res) => {
  models.user.findAll().then(users => {
    res.render('admin-users-view', { users: users })
  })
})

router.get('/category', async (req, res) => res.render('category-form'))

router.post('/add-category', async (req, res) => {
  models.Category.create({
    title: req.body.title,
    description: req.body.description
  }).then(() => {
    res.redirect('/admin')
  })
})

router.get('/categories', isLoggedIn, async (req, res) => {
  models.Category.findAll().then(categories => {
    res.render('categories-list', { category: categories })
  })
})

router.post('/approve', async (req, res) => {
  models.News.update(
    {
      approved: true
    },
    { where: { id: req.body.article_id } }
  ).then(() => {
    res.redirect('/admin')
  })
})

router.post('/disapprove', async (req, res) => {
  models.News.update(
    {
      approved: false
    },
    { where: { id: req.body.article_id } }
  ).then(() => {
    res.redirect('/admin')
  })
})

router.post('/pin', async (req, res) => {
  models.News.update(
    {
      pinned: true
    },
    { where: { id: req.body.article_id } }
  ).then(() => {
    res.redirect('/admin')
  })
})

router.post('/unpin', async (req, res) => {
  models.News.update(
    {
      pinned: false
    },
    { where: { id: req.body.user_id } }
  ).then(() => {
    res.redirect('/admin')
  })
})

router.post('/grant', async (req, res) => {
  models.user
    .update(
      {
        is_admin: true
      },
      { where: { id: req.body.user_id } }
    )
    .then(() => {
      res.redirect('/admin/users')
    })
})

router.post('/revoke', async (req, res) => {
  models.user
    .update(
      {
        is_admin: false
      },
      { where: { id: req.body.user_id } }
    )
    .then(() => {
      res.redirect('/admin/users')
    })
})

module.exports = router
