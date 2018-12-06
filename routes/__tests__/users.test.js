const request = require('supertest')
const app = require('../../app')

const loginDetails = {
  email: 'admin@email.com',
  password: 'admin'
}

describe('Testing user namespaced routes', () => {
  let server
  beforeEach(async () => {
    server = require('../../server')
  })
  afterEach(async () => {
    await server.close()
  })

  test('GET /users/dashboard', async () => {
    const response = await request(app).get('/users/dashboard')
    expect(response.statusCode).toBe(302)
  })

  test('GET /users/login', async () => {
    const response = await request(app).get('/users/login')
    expect(response.statusCode).toBe(200)
  })

  test('POST /users/login', async () => {
    const authenticatedRequest = request.agent(app)
    const response = await authenticatedRequest.post('/users/login').send(loginDetails)
    expect(response.statusCode).toBe(302)
  })

  test('GET /users/register', async () => {
    const response = await request(app).get('/users/register')
    expect(response.statusCode).toBe(200)
  })

  test('GET /users/logout', async () => {
    const response = await request(app).get('/users/logout')
    expect(response.statusCode).toBe(302)
  })
})
