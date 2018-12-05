const request = require('supertest')
const app = require('../../app')

describe('Testing user login page', () => {
  test('It should respond to GET method', async () => {
    const response = await request(app).get('/users/login')
    expect(response.statusCode).toBe(200)
  })
})

describe('Testing user register page', () => {
  test('It should respond to GET method', async () => {
    const response = await request(app).get('/users/register')
    expect(response.statusCode).toBe(200)
  })
})
