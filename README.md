# LIFEVAULT AI

LIFEVAULT AI is a secure digital legacy and life-continuity workspace for organizing assets, important documents, trusted people, recovery plans, and emergency succession workflows in one place.

The project combines a React dashboard with an Express API, PostgreSQL persistence, JWT authentication, and an optional Google Gemini-powered assistant.

## Features

- Dashboard with net-worth, security, recovery-readiness, and alert metrics
- Digital life map for connected assets, people, documents, and recovery actions
- Asset vault for financial accounts, property, insurance, investments, vehicles, gold, loans, and subscriptions
- Document vault with metadata, verification status, and document analysis flows
- Trusted-person access matrix with role-based continuity planning
- Recovery guide and emergency verification workflow
- AI assistant for legacy, asset-continuity, document, and succession questions
- Security center with audit-oriented controls and a downloadable Supabase schema
- Light and dark themes, responsive navigation, command palette, notifications, and animated transitions

## Tech Stack

- React 19 and TypeScript
- Vite 6 with Tailwind CSS 4
- Express 4 and Node.js
- PostgreSQL via `pg`
- JWT authentication with `jsonwebtoken`
- Password hashing with `bcryptjs`
- Optional Google Gemini integration through `@google/genai`
- Motion, Recharts, D3, React Flow, and Lucide React for the product UI

## Requirements

- Node.js 20 or newer
- npm
- PostgreSQL 14 or newer
- A PostgreSQL database available through a connection string
- A long random JWT secret
- A Gemini API key only if live AI responses are required

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/lifevault
   JWT_SECRET=replace-with-a-long-random-secret
   GEMINI_API_KEY=your-gemini-api-key # Optional
   ```

   `GEMINI_API_KEY` is optional. Without it, the AI chat endpoint uses a deterministic local fallback. `DATABASE_URL` and `JWT_SECRET` are required.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

On first startup, the server creates the `users`, `assets`, `documents`, and `trusted_people` tables and their indexes if they do not already exist.

## Available Scripts

| Command           | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `npm run dev`     | Start the Express API with Vite development middleware   |
| `npm run build`   | Build the frontend and bundle the production server      |
| `npm start`       | Run the bundled production server from `dist/server.cjs` |
| `npm run preview` | Preview the Vite frontend build                          |
| `npm run lint`    | Run the TypeScript compiler without emitting files       |
| `npm run clean`   | Remove generated build output                            |

## API Overview

The API is served under `/api`.

### Public endpoints

- `GET /api/health` - service health and Gemini configuration status
- `POST /api/auth/signup` - create an account
- `POST /api/auth/login` - authenticate and receive a seven-day JWT

### Authenticated endpoints

Send the token in the request header:

```http
Authorization: Bearer <token>
```

- `GET /api/auth/me` - retrieve the current user
- `GET|POST /api/vault/assets` - list or create assets
- `PATCH|DELETE /api/vault/assets/:id` - update or remove an asset
- `GET|POST /api/vault/documents` - list or create document records
- `PATCH|DELETE /api/vault/documents/:id` - update or remove a document record
- `GET|POST /api/vault/trusted-people` - list or create trusted people
- `PATCH|DELETE /api/vault/trusted-people/:id` - update or remove a trusted person
- `POST /api/ai/chat` - ask the AI continuity assistant
- `POST /api/ai/ocr-analyze` - analyze document metadata and extract entities
- `GET /api/export/schema` - download the Supabase-oriented schema export

Vault resources are scoped to the authenticated user. The API stores the resource payload in PostgreSQL JSONB columns and applies ownership checks to reads, updates, and deletes.

## Production Build

Build and run the production server with:

```bash
npm run build
npm start
```

The production server serves the compiled frontend from `dist` and listens on port `3000` on all interfaces. Put a TLS-terminating reverse proxy in front of it for deployment, and provide environment variables through the hosting platform rather than committing secrets.

## Project Structure

```text
server.ts              Express entry point and AI routes
server/auth.ts         Signup, login, JWT validation, and user sessions
server/db.ts           PostgreSQL pool and startup schema initialization
server/vault.ts        Authenticated vault resource routes
src/App.tsx            Application shell and view routing
src/context/           Shared vault state and API synchronization
src/views/              Dashboard, vault, recovery, security, and settings views
src/components/        Navigation, modals, workflows, and reusable UI
src/lib/api.ts         Frontend API client and document normalization
src/data/mockData.ts   Demo and initial UI data
```

## Security Notes

- Never commit `.env` files, API keys, database credentials, or production JWT secrets.
- Use HTTPS in any non-local deployment.
- Configure a strong, unique `JWT_SECRET`; changing it invalidates existing sessions.
- Review and harden the generated Supabase schema before using it in production.
- LIFEVAULT AI is an application prototype and does not replace legal, financial, medical, or estate-planning advice.
