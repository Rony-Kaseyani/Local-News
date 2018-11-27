const router = require('express').Router()
const user = require('../models/user')
const passport = require('passport')
const isLoggedIn = require('./util')

router.get('/register', (req, res) => res.render('user-registration-form'))

router.get('/login', (req, res) => res.render('login-form'))

router.get('/list', isLoggedIn, (req, res) => res.render('user-articles-list'))

router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',

    failureRedirect: '/register'
}

))

router.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/list',

    failureRedirect: '/users/login'
}

))

module.exports = router
