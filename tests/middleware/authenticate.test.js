import { jest } from '@jest/globals'
import { agent } from '../helpers/testServer.js'
import { makeToken } from '../helpers/authToken.js'
import prisma from '../../src/lib/prisma.js'

describe('authenticate middleware', () => {
  afterEach(() => jest.clearAllMocks())

  it('returns 401 when no Authorization header', async () => {
    const res = await agent.get('/users/me')
    expect(res.status).toBe(401)
  })

  it('returns 401 when Authorization is not Bearer format', async () => {
    const res = await agent.get('/users/me').set('Authorization', 'Basic abc123')
    expect(res.status).toBe(401)
  })

  it('returns 401 when token is malformed', async () => {
    const res = await agent.get('/users/me').set('Authorization', 'Bearer not.a.real.token')
    expect(res.status).toBe(401)
  })

  it('returns 401 when user from token does not exist in DB', async () => {
    prisma.user.findUnique.mockResolvedValue(null)
    const token = makeToken({ id: 9999 })
    const res = await agent.get('/users/me').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(401)
  })

  it('proceeds to route when token is valid', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      username: 'testuser',
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const token = makeToken({ id: 1 })
    const res = await agent.get('/users/me').set('Authorization', `Bearer ${token}`)
    // Any status other than 401 means middleware passed
    expect(res.status).not.toBe(401)
  })
})
