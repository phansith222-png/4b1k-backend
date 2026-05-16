import { jest } from '@jest/globals'

const makeMock = () => ({
  findUnique: jest.fn(),
  findFirst: jest.fn(),
  findMany: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  deleteMany: jest.fn(),
  upsert: jest.fn(),
  count: jest.fn(),
})

const prisma = {
  user: makeMock(),
  artist: makeMock(),
  song: makeMock(),
  favArtist: makeMock(),
  post: makeMock(),
  comment: makeMock(),
  like: makeMock(),
  chatRoom: makeMock(),
  chatRoomUser: makeMock(),
  message: makeMock(),
  artistEvent: makeMock(),
  artistGenre: makeMock(),
  genre: makeMock(),
  event: makeMock(),
  venue: makeMock(),
  news: makeMock(),
  $disconnect: jest.fn(),
}

export { prisma }
export default prisma
