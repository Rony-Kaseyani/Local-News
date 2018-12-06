/// dependencies
const router = require('express').Router()
const models = require('../models/')
const passport = require('passport')
const isLoggedIn = require('./util').isLoggedIn
const routesErrorHandler = require('./util').routesErrorHandler

/// user routes
// dashboard with list of articles associated to the logged in user
router.get(
  '/dashboard',
  isLoggedIn,
  routesErrorHandler(async (req, res, next) => {
    const news = await models.News.findAll({
      where: {
        userId: req.user.id
      }
    })
    return res.status(200).render('user-articles-list', { articles: news })
  })
)

// getting login form
router.get('/login', async (req, res) => res.status(200).render('login-form'))

// post request for login
router.post(
  '/login',
  passport.authenticate('local-signin', {
    failureRedirect: '/users/login'
  }),
  async (req, res) => {
    req.checkBody('email', 'Enter a valid email address').isEmail()

    if (req.user.is_admin === true) {
      return res.status(302).redirect('/admin/news')
    } else {
      return res.status(302).redirect('/users/dashboard')
    }
  }
)

// getting form for user registration
router.get('/register', async (req, res) => res.status(200).render('user-registration-form'))

// post request for registering user
router.post(
  '/register',
  passport.authenticate('local-signup', {
    failureRedirect: '/users/register'
  }),
  async (req, res) => {
    await req.checkBody('email', 'Enter a valid email address').isEmail()
    return res.status(302).redirect('/users/dashboard')
  }
)

// logging user out and destroying session
router.get('/logout', isLoggedIn, async (req, res) => {
  req.session.destroy()
  req.logout()
  return res.status(302).redirect('/')
})

module.exports = router
