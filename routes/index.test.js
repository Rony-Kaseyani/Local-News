const request = require('supertest')
const models = require('../models')
const indexRoutes = require('./index.js')

describe('Test the homepage', () => {
  beforeAll(() => {
    models.sequelize.sync({ force: true })
  })

  test('It should respond to GET method', () => {
    const response = request(indexRoutes).get('/')
    expect(response.statusCode).toBe(200)
  })
})
