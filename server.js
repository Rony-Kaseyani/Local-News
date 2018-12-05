const app = require('./app')

// starting the server...
const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Listening on port ' + server.address().port)
})

module.exports = server
