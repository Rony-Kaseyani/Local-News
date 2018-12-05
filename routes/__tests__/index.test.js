const request = require('supertest')
const app = require('../../app')

describe('Testing homepage', () => {
  test('It should respond to GET method', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })
})

describe('Testing 404 error', () => {
  test('It should respond to GET method with a 404 status code', async () => {
    const response = await request(app).get('/foo')
    expect(response.statusCode).toBe(404)
  })
})
