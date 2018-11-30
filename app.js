// Dependencies
const express = require('express')
const compression = require('compression')
const bodyParser = require('body-parser')
const passport = require('passport')
const logger = require('morgan')
const methodOverride = require('method-override')
const hbs = require('express-handlebars')
const errorhandler = require('errorhandler')
const models = require('./models')
const session = require('express-session')

// init express app
const app = express()

const isProduction = process.env.NODE_ENV === 'production'

app.use(express.static('public'))
app.use(express.static('views'))

/// express config
app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
}))

app.use(passport.initialize())
app.use(passport.session())

// template engine
app.engine('handlebars', hbs({ defaultLayout: "main" }))
app.set('view engine', 'handlebars')
app.use((req, res, next) => {
  res.locals.logout = !req.isAuthenticated()
  models.News.findAll({
    where: {pinned: true}
  }).then((news) => {
    res.locals.pinned_articles = news
  })
  next()
})
app.use(require('./routes'))

//load passport strategies
require('./config/passport/passport.js')(passport, models.user)

if (!isProduction) {
  app.use(errorhandler())
}

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('The requested page could not be found.')
  err.status = 404
  next(err)
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack)

    res.status(err.status || 500)

    res.render('error', {
      'errors': {
        message: err.message,
        error: err
      }
    })
  })
}

// production error handler
// no stacktraces leaked to the client
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    'errors': {
      message: err.message,
      error: {}
    }
  })
})

// starting the server...
const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port ' + server.address().port)
})
