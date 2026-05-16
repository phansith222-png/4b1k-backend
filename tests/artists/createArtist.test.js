import { jest } from '@jest/globals'
import { agent } from '../helpers/testServer.js'
import { makeToken, makeAdminToken } from '../helpers/authToken.js'
import prisma from '../../src/lib/prisma.js'

const validBody = {
  artistName: 'New Artist',
  biography: 'Test bio',
}

describe('POST /artists — ADMIN role enforcement', () => {
  afterEach(() => jest.clearAllMocks())

  it('returns 403 when user is not ADMIN', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 1, username: 'user', role: 'USER' })
    const token = makeToken({ id: 1, role: 'USER' })

    const res = await agent
      .post('/artists')
      .set('Authorization', `Bearer ${token}`)
      .send(validBody)

    expect(res.status).toBe(403)
  })

  it('returns 201 when user is ADMIN', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 99, username: 'admin', role: 'ADMIN' })
    prisma.artist.create.mockResolvedValue({
      id: 10,
      artistName: validBody.artistName,
      agency: null,
      genres: [],
      songs: [],
      createdByUser: { id: 99, username: 'admin' },
    })
    const token = makeAdminToken({ id: 99, role: 'ADMIN' })

    const res = await agent
      .post('/artists')
      .set('Authorization', `Bearer ${token}`)
      .send(validBody)

    expect(res.status).toBe(201)
  })
})
