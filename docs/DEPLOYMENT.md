# Deployment Guide

How to deploy POLYCLAW in production.

---

## Prerequisites

- Node.js 18+
- A funded Solana wallet (agent wallet)
- A funded Polygon wallet for Polymarket bets
- Vercel account (or any Node.js host)
- Anthropic API key

---

## 1. Frontend (Vercel)

```bash
# Install Vercel CLI (optional)
npm i -g vercel

# Deploy
vercel --prod
```

Or connect the GitHub repo to Vercel and it will auto-deploy on every push to `main`.

Set the following environment variables in the Vercel dashboard:

```
INGEST_SECRET=<your secret>
```

Note: `INGEST_URL` is only needed by the agent runner, not the frontend.

---

## 2. Agent Runner

The agent runner is a long-running TypeScript process. Run it on any server with persistent uptime:

```bash
# Install dependencies
npm install

# Copy environment config
cp .env.example .env.local
# Fill in all required values

# Start the agent
npx ts-node agent-runner/index.ts
```

For production, use a process manager:

```bash
# PM2 (recommended)
npm install -g pm2
pm2 start "npx ts-node agent-runner/index.ts" --name polyclaw-agent
pm2 save
pm2 startup
```

---

## 3. Environment Variables

All required variables are documented in [`.env.example`](../.env.example).

Minimum required for a live run:

| Variable | Description |
|----------|-------------|
| `SOLANA_RPC` | Solana RPC endpoint |
| `AGENT_WALLET_PRIVATE_KEY` | Solana agent wallet (base58) |
| `POLYCLAW_MINT` | $POLYCLAW token mint address |
| `POLYGON_WALLET_KEY` | Polygon agent wallet (hex) |
| `AGENT_INFERENCE_KEY` | Anthropic API key |
| `INGEST_URL` | Vercel deployment URL + `/api/ingest` |
| `INGEST_SECRET` | Shared secret for agent → frontend auth |

---

## 4. Polymarket Setup

On first run, the agent will attempt to derive Polymarket CLOB credentials from `POLYGON_WALLET_KEY` via `createOrDeriveApiKey()`.

Before the first bet can be placed, the wallet must accept Polymarket's Terms of Service:

1. Visit [polymarket.com](https://polymarket.com)
2. Connect the Polygon wallet
3. Accept Terms of Service

This is a one-time action per wallet.

---

## 5. Monitoring

The agent logs all activity to `/api/ingest`. View live activity at `/app` on your deployed frontend.

For server logs:

```bash
# PM2 logs
pm2 logs polyclaw-agent

# Tail log file
tail -f ~/.pm2/logs/polyclaw-agent-out.log
```
