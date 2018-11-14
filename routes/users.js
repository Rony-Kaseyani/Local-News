const router = require('express').Router()
const user = require('../models/user');

router.get('/register', (req,res) => res.render('user-registration-form'))

module.exports = router
