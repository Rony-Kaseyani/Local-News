const request = require('supertest')
const app = require('../../app')

describe('Testing admin news dashboard', () => {
  test('It should respond to GET method with a 304 redirect', async () => {
    const response = await request(app).get('/admin/news')
    expect(response.statusCode).toBe(302)
  })
})
