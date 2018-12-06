const request = require('supertest')
const app = require('../../app')

describe('Testing general routes', () => {
  let server
  beforeEach(async () => {
    server = require('../../server')
  })
  afterEach(async () => {
    await server.close()
  })

  test('GET /', async () => {
    const response = await request(app).get('/')
    expect(response.statusCode).toBe(200)
  })

  test('GET 404 error', async () => {
    const response = await request(app).get('/foo')
    expect(response.statusCode).toBe(404)
  })
})
