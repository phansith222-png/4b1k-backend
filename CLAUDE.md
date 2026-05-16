# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role

You are a senior Node.js/Express backend engineer on the 4B1K project. You write production-quality code, follow existing patterns strictly, and create deployment-ready work including test coverage and security hardening.

## Critical Safety Rules

**NEVER read, cat, print, log, or inspect the `.env` file without the user's explicit permission.** If you need to know which environment variables are configured, ask the user to describe them — do not read the file directly.

## Project Overview

4B1K backend: Node.js 18+ / Express 5 / Prisma 7 / MariaDB / Socket.io 4 / JWT + Passport.js OAuth. REST API on port 5000 (dev) with real-time chat via Socket.io.

## Commands

```bash
npm run dev                              # dev server with --watch
npm test                                 # Jest test suite
npm run test:watch                       # Jest in watch mode
npm run test:coverage                    # Jest with coverage report
npx prisma migrate dev                   # apply schema changes (dev only)
npx prisma migrate deploy                # apply migrations in production (no prompt)
npx prisma db seed                       # seed demo data (dev only — NEVER in prod)
npx prisma studio                        # visual DB browser
npx prisma generate                      # regenerate client after schema change
```

## Architecture

**Entry flow:** `src/server.js` (HTTP + Socket.io) → `src/app.js` (Express middleware + routes)

**Pattern:** MVC + service layer
- Routes (`src/routes/`) → Controllers (`src/controllers/`) → Services (`src/service.js/`)
- Services are the only layer that touches Prisma
- Zod validation runs inside controllers before any service call

**Key conventions:**
- All files use ESM (`"type": "module"` in package.json). No `require()`.
- Services live in `src/service.js/` — the directory name has a `.js` suffix. This is intentional; do not rename it.
- Prisma singleton is exported from `src/lib/prisma.js`. Never instantiate `PrismaClient` anywhere else.
- `http-errors` package: use `createHttpError(statusCode, 'message')` with parentheses (not bracket notation for creating errors passed to `next()`).
- The `generated/prisma/` directory is gitignored and must be regenerated with `npx prisma generate`.

**Auth:** JWT Bearer tokens verified by `src/middlewares/authenticate.middleware.js`. OAuth via `src/oauthConfig/passport.js`.

**Real-time:** Socket.io handlers in `src/server.js`. Events: `join_room`, `send_message`, `receive_message`, `mark_read`, `typing`, `stop_typing`, `delete_group`.

## Environment Variables

Do not read `.env` — ask the user. Required vars: `PORT`, `DATABASE_HOST`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME`, `JWT_SECRET`, `FRONTEND_URL`, `ALLOWED_ORIGINS`, OAuth keys. See `.env.example` for the full list.

## Deployment

Target: **Render** (web service) + **PlanetScale** (MySQL-compatible database).

- Build command: `npm install && npx prisma generate && npx prisma migrate deploy`
- Start command: `node src/server.js`
- Config file: `render.yaml` in project root
- Use `prisma migrate deploy` (not `migrate dev`) in production — it applies pending migrations without interactive prompts.
- Never run `prisma db seed` in production — seed data is demo-only content.

## Testing

Framework: Jest + Supertest. Tests are in `tests/`. Prisma is mocked via `src/lib/__mocks__/prisma.js` — no live database needed.

```bash
npm test                   # run all tests
npm run test:coverage      # run with coverage
```

## Song/License Rules

Songs in seed data are demo-only (not commercially licensed). The `Song.isDemo` field gates `streamUrl`:
- In `NODE_ENV=production`: songs with `isDemo: true` return `streamUrl: null`
- In development: `streamUrl` is returned as-is for local testing
- Never set `isDemo: false` unless the track has a verified commercial license
