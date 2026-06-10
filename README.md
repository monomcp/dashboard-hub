# Console Dashboard

TanStack Start + React dashboard for the MonoMCP console.

## Requirements

- Node.js `22.12+` recommended
- npm `11+`
- Optional: the sibling API project at `../api` for magic-link auth

Vite will not run on Node `20.18.x`; upgrade Node first if you see a version error.

If you use Homebrew on macOS:

```sh
brew install node@22
brew link --overwrite --force node@22
node --version
```

The version should be `v22.12.0` or newer.

If you use a Node version manager:

```sh
nvm install
nvm use
```

The repo includes `.nvmrc` and `.node-version` set to Node 22.

## Environment

Create a local env file:

```sh
cp .env.example .env.local
```

Default local API URL:

```sh
VITE_API_URL=http://localhost:8000
```

`VITE_API_URL` is public browser config. Do not put secrets in it.

## Install

```sh
npm install
```

This repo also has a `bun.lock`, so Bun can be used if available:

```sh
bun install
```

If `bun` is not installed, use npm. You do not need Bun to run the dashboard.

## Run Locally

Start the dashboard:

```sh
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://localhost:5173
```

The login page is available at:

```text
http://localhost:5173/login
```

## Run With The API

From the sibling API project:

```sh
cd ../api
cp .env.example .env
```

For local magic-link testing, set the API email provider to console in `../api/.env`:

```sh
ENVIRONMENT=development
EMAIL_PROVIDER=console
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
FRONTEND_URL=http://localhost:5173
```

Then start the API using its project instructions. It should listen on:

```text
http://localhost:8000
```

In development, `POST /api/v1/auth/magic-link` returns an `otp_token`; the dashboard uses it to confirm the magic link automatically and then redirects to `/`.

## Checks

Type-check:

```sh
npx tsc --noEmit
```

Lint:

```sh
npm run lint
```

Build:

```sh
npm run build
```
