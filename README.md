# POLYCLAW

> **The House Always Burns.**

POLYCLAW is an autonomous prediction market agent that bets on [Polymarket](https://polymarket.com), then burns all profits to permanently deflate the $POLYCLAW token supply on Solana. Every edge captured in the market becomes fuel for the burn.

---

## Overview

The protocol operates across two chains:

- **Solana** — $POLYCLAW token, treasury, buybacks, burns
- **Polygon** — Polymarket CLOB order execution, position resolution

An on-chain agent loop runs continuously, claiming protocol fees, evaluating markets, placing bets, resolving positions, and routing profits back into buy-and-burn cycles. No human intervention required after deployment.

---

## How It Works

```
pump.fun creator fees
        │
        ▼
  FAUCET (claims SOL)
        │
        ▼
  STONECLAW (allocates capital)
   ├── IRONCLAW  → buybacks + whale detection
   ├── STORMCLAW → concentrated raid buys
   └── EMBERCLAW → buy + burn
        │
        ▼
  HUNTCLAW (scans Polymarket)
   └── Kelly/EV/efficiency scoring
       └── positions.json → RESOLVER
              │
              ▼
       deBridge DLN (Polygon USDC → SOL)
              │
              ▼
       back to burn cycle
```

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (pages router) |
| Chain | Solana / pump.fun / pumpswap-sdk |
| Markets | Polymarket CLOB (Polygon) |
| Bridge | deBridge DLN |
| Inference | Claude (via Anthropic API) |
| Hosting | Vercel |

---

## Agents

| Agent | Role |
|-------|------|
| FAUCET | Claims pump.fun creator fees |
| STONECLAW | Capital allocation decisions |
| IRONCLAW | Buybacks, whale detection |
| STORMCLAW | Concentrated raid buys |
| EMBERCLAW | Buy + burn execution |
| HUNTCLAW | Polymarket edge scanner (quant) |
| RESOLVER | Position resolution + profit routing |
| TIDECLAW | LP management (standby) |

---

## Tokenomics

- **Ticker**: $POLYCLAW
- **Chain**: Solana (pump.fun → PumpSwap)
- **Supply**: Deflationary — burned proportionally to all agent profits
- **Treasury**: Protocol fees → SOL → buyback → burn

Every bet won reduces supply. Every profit is permanent deflation.

---

## Edge Model (HUNTCLAW)

Markets are scored by three criteria before any bet is placed:

```
EV  = (p_model × odds_win) + ((1 - p_model) × odds_lose) - 1
Kelly = (p_model × b - (1 - p_model)) / b
Edge  = MIN(EV, Kelly) × liquidity_efficiency
```

Thresholds: `EV ≥ 4%` · `Kelly ≥ 2%` · `Edge score ≥ 7%` · `Liquidity $500–$1.5M`

---

## Repository Structure

```
polyclaw/
├── agent-runner/          # Agent loop (TypeScript)
│   ├── agents/            # Individual agent modules
│   ├── decisions.ts       # Claude inference layer
│   ├── edge.ts            # Pure quant engine
│   ├── bridge.ts          # deBridge cross-chain
│   ├── positions.ts       # Bet persistence
│   └── index.ts           # Main loop
├── pages/                 # Next.js pages
│   ├── index.js           # Landing page
│   ├── app.js             # Agent dashboard
│   ├── docs.js            # Documentation
│   └── api/               # API routes
├── lib/                   # Shared utilities
├── styles/                # Global CSS
└── docs/                  # Protocol documentation
```

---

## Environment Variables

See [`.env.example`](.env.example) for all required configuration.

---

## Docs

Full protocol documentation is available at [polyclaw.io/docs](https://polyclaw.io/docs).

---

## License

[MIT](LICENSE)
