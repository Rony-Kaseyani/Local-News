module.exports.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/users/login')
}

module.exports.isAdmin = function(req, res, next) {
  if (req.user && (req.isAuthenticated() && req.user.is_admin === true)) return next()
  res.redirect('/users/login')
}

module.exports.routesErrorHandler = function(middleware) {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}
