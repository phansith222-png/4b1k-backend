# 4B1K — Backend API

> REST API and real-time server powering the 4B1K music community platform.

> [!WARNING]
> **Demo Version** — All songs and music content featured in this platform are used with permission from the respective rights holders. This project is for demonstration purposes only and is not intended for commercial use.

> [!CAUTION]
> **Security Notice** — Detailed API documentation, endpoint paths, and internal architecture are intentionally not disclosed in this public README. Never commit your `.env` file or share credentials publicly.

---

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white&style=flat-square)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white&style=flat-square)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white&style=flat-square)
![MySQL](https://img.shields.io/badge/MySQL-MariaDB-4479A1?logo=mysql&logoColor=white&style=flat-square)
![Socket.io](https://img.shields.io/badge/Socket.io-4-010101?logo=socket.io&logoColor=white&style=flat-square)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?logo=jsonwebtokens&logoColor=white&style=flat-square)
![Passport](https://img.shields.io/badge/Passport.js-OAuth-34E27A?logo=passport&logoColor=white&style=flat-square)

---

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL or MariaDB server running locally

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up your environment file (see .env.example below)
cp .env.example .env

# 3. Run database migrations
npx prisma migrate dev

# 4. (Optional) Seed the database with sample data
npx prisma db seed

# 5. Start the development server
npm run dev
```

The server will run at **http://localhost:5000**.

---

## Environment Setup

Copy `.env.example` to `.env` and fill in your own values. **Never commit your `.env` file.**

```env
# .env.example — fill in your own values, do NOT use these in production

# Server
PORT=5000

# Database — use your own local credentials
DATABASE_URL="mysql://YOUR_DB_USER:YOUR_DB_PASSWORD@localhost:3306/YOUR_DB_NAME"

# JWT — use a long, random secret string
JWT_SECRET=REPLACE_WITH_A_STRONG_RANDOM_SECRET

# Google OAuth — obtain from Google Cloud Console
GOOGLE_CLIENT_ID=REPLACE_WITH_YOUR_GOOGLE_CLIENT_ID
GOOGLE_SECRET_ID=REPLACE_WITH_YOUR_GOOGLE_SECRET
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

# Facebook OAuth — obtain from Meta for Developers
FACEBOOK_CLIENT_ID=REPLACE_WITH_YOUR_FACEBOOK_APP_ID
FACEBOOK_SECRET_ID=REPLACE_WITH_YOUR_FACEBOOK_SECRET
FACEBOOK_CALLBACK_URL=http://localhost:5000/auth/facebook/callback

# Twitter OAuth — obtain from Twitter Developer Portal
TWITTER_CLIENT_ID=REPLACE_WITH_YOUR_TWITTER_API_KEY
TWITTER_SECRET_ID=REPLACE_WITH_YOUR_TWITTER_SECRET
TWITTER_CALLBACK_URL=http://localhost:5000/auth/twitter/callback
```

---

## API Overview

All endpoints require authentication via **JWT Bearer token** unless otherwise noted. The API covers the following feature areas:

- **Authentication** — Register, login, password reset, and OAuth (Google, Facebook, Twitter)
- **Users** — View and update user profiles
- **Posts & Community** — Create posts, comments, and reactions
- **Artists** — Browse and follow artists by genre
- **Events** — View and manage music events
- **Chat** — Personal and group messaging with real-time support
- **Admin** — Moderation actions (restricted role)

Full API documentation is available internally to team members only.

---

## Real-time Features

The server uses **Socket.io** for real-time communication. Features include live chat messaging, read receipts, typing indicators, and group room management.

Real-time connection requires a valid JWT token. Internal event names are not disclosed publicly.

---

## Database

Schema is managed with **Prisma ORM**. Run migrations before starting the server.

```bash
npx prisma migrate dev     # Apply pending migrations
npx prisma db seed         # Seed sample data
npx prisma studio          # Open visual DB browser (dev only)
```

> Prisma Studio is for local development only. Do not expose port 5555 in any deployed environment.

---

## Team

| Role | Name |
|---|---|
| Product Owner | Phansit Hadtakijwattana (Ben) |
| Backend Developer & Scrum Master | Benyapa Thonhongsa (Ben) |
| Frontend & UI/UX | Patipat Patlom (Best) |
| Frontend & UI/UX | Natanon Chaipromnaruepai (Bam) |
| Frontend | Kanokwan Panyareung (Kwan) |

---

## License

This project is developed as part of a team project. All rights reserved.
