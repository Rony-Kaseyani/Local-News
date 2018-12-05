/// dependencies
const router = require('express').Router()
const models = require('../models/')
const isAdmin = require('./util').isAdmin
const routesErrorHandler = require('./util').routesErrorHandler

/// admin routes namespaced with /admin
// admin news dashboard
router.get(
  '/news',
  isAdmin,
  routesErrorHandler(async (req, res, next) => {
    const newsArticles = await models.News.findAll({})
    return res.render('admin-articles-view', { articles: newsArticles })
  })
)

// admin news approval/disapproval post requests
router.post(
  '/news/approve',
  isAdmin,
  routesErrorHandler(async (req, res, next) => {
    await models.News.update(
      {
        approved: true
      },
      { where: { id: req.body.article_id } }
    )
    return res.redirect('/admin/news')
  })
)

router.post(
  '/news/disapprove',
  isAdmin,
  routesErrorHandler(async (req, res, next) => {
    await models.News.update(
      {
        approved: false
      },
      { where: { id: req.body.article_id } }
    )
    return res.redirect('/admin/news')
  })
)

// admin news pin/unpin post requests
router.post(
  '/news/pin',
  isAdmin,
  routesErrorHandler(async (req, res, next) => {
    await models.News.update(
      {
        pinned: true
      },
      { where: { id: req.body.article_id } }
    )
    return res.redirect('/admin/news')
  })
)

router.post(
  '/news/unpin',
  isAdmin,
  routesErrorHandler(async (req, res, next) => {
    await models.News.update(
      {
        pinned: false
      },
      { where: { id: req.body.article_id } }
    )
    return res.redirect('/admin/news')
  })
)

// admin user dashboard
router.get(
  '/users',
  isAdmin,
  routesErrorHandler(async (req, res, next) => {
    const allUsers = await models.user.findAll({})
    return res.render('admin-users-view', { users: allUsers })
  })
)

// admin user make/revoke admin post requests
router.post(
  '/user/make-admin',
  isAdmin,
  routesErrorHandler(async (req, res, next) => {
    await models.user.update(
      {
        is_admin: true
      },
      { where: { id: req.body.user_id } }
    )
    return res.redirect('/admin/users')
  })
)

router.post(
  '/user/revoke-admin',
  isAdmin,
  routesErrorHandler(async (req, res, next) => {
    await models.user.update(
      {
        is_admin: false
      },
      { where: { id: req.body.user_id } }
    )
    return res.redirect('/admin/users')
  })
)

// admin category dashboard
router.get(
  '/categories',
  isAdmin,
  routesErrorHandler(async (req, res, next) => {
    const categories = await models.Category.findAll({})
    return res.render('admin-categories-list', { categories: categories })
  })
)

// admin category add form
router.get('/category/add-new', isAdmin, async (req, res) => res.render('admin-category-form'))

// admin category add post request
router.post(
  '/category/add-new',
  isAdmin,
  routesErrorHandler(async (req, res, next) => {
    await models.Category.create({
      title: req.body.title,
      description: req.body.description
    })
    return res.redirect('/admin/categories')
  })
)

module.exports = router
