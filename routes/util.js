function isLoggedIn(req, res, next) {
    console.log(req.isAuthenticated)
    if (req.isAuthenticated())
        return next()
    res.redirect('users/login')

}

module.exports = isLoggedIn