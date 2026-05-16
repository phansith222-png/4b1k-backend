import jwt from 'jsonwebtoken'

export function makeToken(payload = { id: 1, role: 'USER' }) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export function makeAdminToken(payload = { id: 99, role: 'ADMIN' }) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
}
