import { jest } from '@jest/globals'
import { agent } from '../helpers/testServer.js'
import prisma from '../../src/lib/prisma.js'

const mockArtist = {
  id: 1,
  artistName: 'Test Artist',
  profileImage: null,
  biography: 'Bio',
  agency: null,
  genres: [],
  songs: [
    { id: 1, title: 'Song A', streamUrl: 'http://example.com/song.mp3', isDemo: true },
  ],
  events: [],
}

describe('GET /artists', () => {
  afterEach(() => jest.clearAllMocks())

  it('returns 200 with array of artists', async () => {
    prisma.artist.findMany.mockResolvedValue([mockArtist])
    const res = await agent.get('/artists')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body.artists)).toBe(true)
  })
})

describe('GET /artists/:id', () => {
  afterEach(() => jest.clearAllMocks())

  it('returns 200 with artist data', async () => {
    prisma.artist.findUnique.mockResolvedValue(mockArtist)
    const res = await agent.get('/artists/1')
    expect(res.status).toBe(200)
    expect(res.body.artist).toBeDefined()
  })

  it('returns 404 when artist does not exist', async () => {
    prisma.artist.findUnique.mockResolvedValue(null)
    const res = await agent.get('/artists/99999')
    expect(res.status).toBe(404)
  })
})
