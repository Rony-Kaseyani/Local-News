const request = require('supertest')
const app = require('../../app')

describe('Testing news namespaced routes', () => {
  let server
  beforeEach(async () => {
    server = require('../../server')
  })
  afterEach(async () => {
    await server.close()
  })

  test('GET /news/:category', async () => {
    const response = await request(app).get('/news/politics')
    expect(response.statusCode).toBe(200)
  })

  test('GET /news/404', async () => {
    const response = await request(app).get('/news/foo')
    expect(response.statusCode).toBe(404)
  })

  test('GET /news/article/..', async () => {
    const response = await request(app).get('/news/article/1')
    expect(response.statusCode).toBe(200)
  })

  test('GET /news/article/404', async () => {
    const response = await request(app).get('/news/article/foo')
    expect(response.statusCode).toBe(404)
  })

  test('GET /news/article/../edit', async () => {
    const response = await request(app).get('/news/article/1/edit')
    expect(response.statusCode).toBe(302)
  })

  test('GET /news/add-new', async () => {
    const response = await request(app).get('/news/add-new')
    expect(response.statusCode).toBe(302)
  })
})
