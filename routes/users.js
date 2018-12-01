const router = require('express').Router()
const models = require('../models/')
const passport = require('passport')
const isLoggedIn = require('./util')

router.get('/login', async (req, res) => res.render('login-form'))

router.post(
  '/login',
  passport.authenticate('local-signin', {
    failureRedirect: '/users/login'
  }),
  (req, res) => {
    if (req.user.is_admin === true) {
      res.redirect('/admin')
    } else {
      res.redirect('/users/dashboard')
    }
  }
)

router.get('/register', async (req, res) => res.render('user-registration-form'))

router.post(
  '/register',
  passport.authenticate('local-signup', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/register'
  })
)

router.get('/dashboard', isLoggedIn, async (req, res) => {
  models.News.findAll({
    where: {
      userId: req.user.id
    }
  }).then(news => {
    res.render('user-articles-list', { articles: news })
  })
})

module.exports = router
