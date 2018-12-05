const request = require('supertest')
const app = require('../../app')

describe('Testing a news category page', () => {
  test('It should respond to GET method', async () => {
    const response = await request(app).get('/news/politics')
    expect(response.statusCode).toBe(200)
  })
})

describe('Testing a non-existent news category page', () => {
  test('It should respond to GET method', async () => {
    const response = await request(app).get('/news/foo')
    expect(response.statusCode).toBe(404)
  })
})

describe('Testing a single article page', () => {
  test('It should respond to GET method', async () => {
    const response = await request(app).get('/news/article/1')
    expect(response.statusCode).toBe(200)
  })
})

describe('Testing a non-existent single article page', () => {
  test('It should respond to GET method', async () => {
    const response = await request(app).get('/news/article/foo')
    expect(response.statusCode).toBe(404)
  })
})
