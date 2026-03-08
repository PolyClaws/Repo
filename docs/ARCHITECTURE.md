# Architecture

POLYCLAW operates as a fully autonomous protocol across two blockchains. This document covers the system design, agent responsibilities, and data flow.

---

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                      AGENT RUNNER                        │
│  (TypeScript process, 3 independent cycle loops)         │
├─────────────────────────────────────────────────────────┤
│  SOL Cycle (60min)     Market Cycle (30min)  Res. (15m) │
│  ├─ FAUCET             ├─ HUNTCLAW           └─ RESOLVER │
│  ├─ bridge.ts          └─ edge.ts                        │
│  ├─ STONECLAW                                            │
│  ├─ IRONCLAW                                             │
│  ├─ STORMCLAW                                            │
│  └─ EMBERCLAW                                            │
└─────────────────────────────────────────────────────────┘
         │                          │
         ▼                          ▼
  Solana mainnet             Polygon mainnet
  (pump.fun / PumpSwap)      (Polymarket CLOB)
         │
         ▼
  logger.ts → /api/ingest → lib/store.js → /api/feed
                                                │
                                                ▼
                                         Next.js frontend
                                         (/app dashboard)
```

---

## Agent Descriptions

### FAUCET
Claims pump.fun creator fee revenue into the treasury wallet. Runs at the start of every SOL cycle.

### STONECLAW
Capital allocator. Receives treasury balance from FAUCET, decides how to split SOL between buyback, raid, and burn operations. Uses the inference layer for allocation decisions.

### IRONCLAW
Executes buybacks on PumpSwap. Monitors for whale activity and adjusts buy size accordingly. Feeds into EMBERCLAW for burn execution.

### STORMCLAW
Concentrated raid buyer. Executes large-volume buys approved by STONECLAW when market conditions are favorable.

### EMBERCLAW
Buy-and-burn executor. Buys $POLYCLAW and sends to the burn address. Works on the bonding curve pre-graduation and PumpSwap post-graduation — pool address not required.

### HUNTCLAW
Pure quant market scanner for Polymarket. Scores every active market by EV, Kelly criterion, and liquidity efficiency. Does not use inference for scoring — only submits shortlist to `huntclawSanityCheck()` for approval.

### RESOLVER
Runs every 15 minutes. Checks open positions (from `positions.json`) against Gamma API resolution data. Routes profits through the bridge or directly into the burn cycle.

### TIDECLAW
LP management module. Currently on standby pending SDK stability. When active, manages $POLYCLAW liquidity positions on PumpSwap.

---

## Inference Layer

The inference layer (`decisions.ts`) wraps all Claude API calls. Agents that use inference:

- STONECLAW — allocation decisions
- STORMCLAW — raid approval
- HUNTCLAW — sanity check on quant shortlist (`huntclawSanityCheck`)

Agents that do NOT use inference:
- FAUCET, IRONCLAW, EMBERCLAW, RESOLVER (fully deterministic)
- `edge.ts` quant engine (pure math, no LLM)

---

## Cross-Chain Bridge

`agent-runner/bridge.ts` uses deBridge DLN to move surplus SOL into Polygon USDC for Polymarket bets. Runs automatically inside the SOL cycle after FAUCET claims.

---

## Data Persistence

- `positions.json` — open Polymarket bets (gitignored, local only)
- `lib/store.js` — in-memory activity feed (replace with Supabase for production)

---

## Frontend

The Next.js frontend is a read-only dashboard. It polls `/api/feed` every 5 seconds and displays:

- Live agent activity log
- Open positions
- Burn history and total burned
- Category breakdown of active markets
