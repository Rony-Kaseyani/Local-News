const request = require('supertest')
const app = require('../../app')

describe('Testing admin namespaced routes', () => {
  let server
  beforeEach(async () => {
    server = require('../../server')
  })
  afterEach(async () => {
    await server.close()
  })

  test('GET /admin/news', async () => {
    const response = await request(app).get('/admin/news', { user: { is_admin: false } })
    expect(response.statusCode).toBe(403)
  })

  test('GET /admin/categories', async () => {
    const response = await request(app).get('/admin/categories', { user: { is_admin: false } })
    expect(response.statusCode).toBe(403)
  })

  test('GET /admin/category/add-new', async () => {
    const response = await request(app).get('/admin/category/add-new', { user: { is_admin: false } })
    expect(response.statusCode).toBe(403)
  })

  test('GET /admin/users', async () => {
    const response = await request(app).get('/admin/users', { user: { is_admin: false } })
    expect(response.statusCode).toBe(403)
  })
})
