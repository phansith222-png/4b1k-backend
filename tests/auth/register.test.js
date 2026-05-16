import { jest } from '@jest/globals'
import { agent } from '../helpers/testServer.js'
import prisma from '../../src/lib/prisma.js'

describe('POST /auth/register', () => {
  afterEach(() => jest.clearAllMocks())

  const validBody = {
    username: 'newuser123',
    password: 'Password123!',
    confirmPassword: 'Password123!',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
  }

  it('returns 200 and user info without password on success', async () => {
    prisma.user.findUnique.mockResolvedValue(null)
    prisma.user.create.mockResolvedValue({
      id: 1,
      username: validBody.username,
      firstName: validBody.firstName,
      lastName: validBody.lastName,
      email: validBody.email,
      password: 'hashed',
    })

    const res = await agent.post('/auth/register').send(validBody)
    expect(res.status).toBe(200)
    expect(res.body.user).toBeDefined()
    expect(res.body.user.password).toBeUndefined()
  })

  it('returns 409 when username is already taken', async () => {
    prisma.user.findUnique.mockResolvedValueOnce({ id: 1, username: validBody.username })

    const res = await agent.post('/auth/register').send(validBody)
    expect(res.status).toBe(409)
  })

  it('returns 400 when required fields are missing', async () => {
    const res = await agent.post('/auth/register').send({ username: 'a' })
    expect(res.status).toBe(400)
  })
})
