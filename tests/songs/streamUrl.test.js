import { jest } from '@jest/globals'
import { agent } from '../helpers/testServer.js'
import prisma from '../../src/lib/prisma.js'

const mockArtistWithDemoSong = {
  id: 1,
  artistName: 'Demo Artist',
  profileImage: null,
  biography: null,
  agency: null,
  genres: [],
  songs: [
    {
      id: 1,
      title: 'Licensed Song',
      streamUrl: 'http://example.com/licensed.mp3',
      isDemo: false,
      popularity: 5,
    },
    {
      id: 2,
      title: 'Demo Song',
      streamUrl: 'http://example.com/demo.mp3',
      isDemo: true,
      popularity: 3,
    },
  ],
  events: [],
}

let savedNodeEnv

beforeEach(() => {
  savedNodeEnv = process.env.NODE_ENV
  jest.clearAllMocks()
})

afterEach(() => {
  if (savedNodeEnv === undefined) {
    delete process.env.NODE_ENV
  } else {
    process.env.NODE_ENV = savedNodeEnv
  }
})

describe('Song streamUrl demo gate', () => {
  it('returns streamUrl for non-demo songs in production', async () => {
    process.env.NODE_ENV = 'production'
    prisma.artist.findUnique.mockResolvedValue(mockArtistWithDemoSong)

    const res = await agent.get('/artists/1')
    expect(res.status).toBe(200)

    const songs = res.body.artist.songs
    const licensedSong = songs.find(s => s.id === 1)
    expect(licensedSong.streamUrl).toBe('http://example.com/licensed.mp3')
  })

  it('returns null streamUrl for demo songs in production', async () => {
    process.env.NODE_ENV = 'production'
    prisma.artist.findUnique.mockResolvedValue(mockArtistWithDemoSong)

    const res = await agent.get('/artists/1')
    expect(res.status).toBe(200)

    const songs = res.body.artist.songs
    const demoSong = songs.find(s => s.id === 2)
    expect(demoSong.streamUrl).toBeNull()
  })

  it('returns streamUrl for demo songs outside of production', async () => {
    process.env.NODE_ENV = 'development'
    prisma.artist.findUnique.mockResolvedValue(mockArtistWithDemoSong)

    const res = await agent.get('/artists/1')
    expect(res.status).toBe(200)

    const songs = res.body.artist.songs
    const demoSong = songs.find(s => s.id === 2)
    expect(demoSong.streamUrl).toBe('http://example.com/demo.mp3')
  })

  it('includes demoDisclaimer when any song is demo', async () => {
    process.env.NODE_ENV = 'production'
    prisma.artist.findUnique.mockResolvedValue(mockArtistWithDemoSong)

    const res = await agent.get('/artists/1')
    expect(res.status).toBe(200)
    expect(res.body.demoDisclaimer).toBeDefined()
  })
})
