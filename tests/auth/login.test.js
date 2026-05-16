import { jest } from '@jest/globals'
import { agent } from '../helpers/testServer.js'
import bcrypt from 'bcrypt'
import prisma from '../../src/lib/prisma.js'

describe('POST /auth/login', () => {
  afterEach(() => jest.clearAllMocks())

  const credentials = { username: 'testuser', password: 'Password123!' }

  it('returns token on valid credentials', async () => {
    const hashed = await bcrypt.hash(credentials.password, 10)
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      username: credentials.username,
      password: hashed,
      role: 'USER',
    })

    const res = await agent.post('/auth/login').send(credentials)
    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
    expect(res.body.user.password).toBeUndefined()
  })

  it('returns 401 when username does not exist', async () => {
    prisma.user.findUnique.mockResolvedValue(null)
    const res = await agent.post('/auth/login').send(credentials)
    expect(res.status).toBe(401)
  })

  it('returns 401 when password is wrong', async () => {
    const hashed = await bcrypt.hash('different-password', 10)
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      username: credentials.username,
      password: hashed,
      role: 'USER',
    })

    const res = await agent.post('/auth/login').send(credentials)
    expect(res.status).toBe(401)
  })
})
