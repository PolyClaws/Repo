# Architecture

POLYCLAW operates as a fully autonomous protocol across two blockchains. This document covers the system design, operation cycles, and data flow.

---

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                      AGENT RUNNER                        │
│  (TypeScript process, 3 independent cycle loops)         │
├─────────────────────────────────────────────────────────┤
│  SOL Cycle (60min)     Market Cycle (30min)  Res. (15m) │
│  ├─ Fee claims         ├─ Market scan        └─ Resolve  │
│  ├─ Bridge             └─ edge.ts                        │
│  ├─ Capital allocation                                   │
│  ├─ Buybacks                                             │
│  ├─ Concentrated buys                                    │
│  └─ Buy + burn                                           │
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

## Operation Cycles

### SOL Cycle (every 60 minutes)
1. Claim pump.fun creator fees into treasury wallet
2. Run deBridge cross-chain bridge if surplus exists
3. Allocate capital between buyback, concentrated buy, and burn operations
4. Execute buybacks on PumpSwap (whale activity monitored)
5. Execute concentrated buy if approved
6. Buy $POLYCLAW and send to burn address

### Market Cycle (every 30 minutes)
1. Pull all active Polymarket markets via Gamma API
2. Score every market through the quant edge engine (`edge.ts`)
3. Shortlist passes to inference layer for sanity check
4. Approved markets: place CLOB orders and save to `positions.json`

### Resolver Cycle (every 15 minutes)
1. Load open positions from `positions.json`
2. Check each market against Gamma API resolution data
3. Settled profits (USDC, Polygon) routed via deBridge DLN → SOL
4. SOL enters next SOL cycle as treasury contribution

---

## Inference Layer

`decisions.ts` wraps all inference API calls. Inference is used for:
- Capital allocation decisions
- Concentrated buy approval
- Market bet sanity check (final gate on quant shortlist)

The quant engine (`edge.ts`) runs entirely without inference — pure math. Inference is a final approval gate only, never the primary picker.

---

## Buy-and-Burn

Burn execution uses pumpfun-pumpswap-sdk with `POLYCLAW_MINT`:
1. Receives SOL allocation from the capital allocator
2. Calls `performBuy` — SDK handles bonding curve (pre-graduation) and PumpSwap (post-graduation) automatically
3. Sends received tokens to Solana burn address (`1111...1111`)
4. Logs burn event to `/api/ingest`

No pool address required. SDK resolves routing automatically.

---

## Cross-Chain Bridge

`agent-runner/bridge.ts` uses deBridge DLN to move surplus SOL into Polygon USDC for Polymarket bets. Runs automatically inside the SOL cycle after fee claims.

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
