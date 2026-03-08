# Changelog

All notable changes to POLYCLAW are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### In Progress
- Supabase auth integration (email + wallet)
- LP management module (awaiting SDK stability)
- Live $POLYCLAW contract address binding

---

## [0.4.0] — 2026-03-06

### Added
- Position resolution cycle: 15-minute loop, Gamma API resolution check, profit routing
- deBridge DLN bridge module: automatic Polygon USDC → SOL cross-chain
- `positions.json` persistence layer for open bets
- Burns re-enabled: live buy-and-burn execution

### Changed
- Agent cycle split into three independent loops: SOL (60min), Market (30min), Resolver (15min)
- Bridge execution runs inside SOL cycle after fee claims

---

## [0.3.2] — 2026-03-03

### Added
- Market sanity check via inference layer
- `decisions.ts`: unified inference interface across all operations
- `lib/agents.ts`: centralized system prompt configuration

### Changed
- Quant engine (`edge.ts`) picks independently, inference layer only approves
- All agent output unified — no internal operation names exposed

### Fixed
- Kelly formula edge case when `b = 0` (zero-liquidity markets)
- EV threshold bypass on very high-confidence low-liquidity plays

---

## [0.3.0] — 2026-02-28

### Added
- `agent-runner/edge.ts` — pure quant engine, no inference dependency
- Kelly criterion + EV + liquidity efficiency scoring pipeline
- Polymarket CLOB market scanner with three-threshold filter
- Polymarket CLOB integration via `createOrDeriveApiKey()` from wallet
- Gamma public API for market metadata and resolution

### Changed
- Capital allocation model updated for cross-chain split
- `polymarket.ts` derives credentials from `POLYGON_WALLET_KEY` — no separate auth

---

## [0.2.1] — 2026-02-25

### Added
- Docs page (`/docs`) — GitBook-style sidebar, casino pamphlet content
- Mobile responsive layout for landing page and docs
- Fire ember animation on burn section
- Glitch effect on hero header
- Mouse parallax on hero elements
- Ambient cursor glow (500px radial gradient)
- 3D card flip on mechanism cards
- Entry pulse animation on live table rows
- READ THE RULES slide-in modal

### Fixed
- Mobile slot display overflow
- Formula block overflow on small screens
- Docs sidebar mobile overlay

---

## [0.2.0] — 2026-02-23

### Added
- `/app` dashboard: live activity feed, open positions, burn tracker, category breakdown
- `/api/ingest` — receives POSTs from agent runner
- `/api/feed` — serves live agent data (5s polling)
- `lib/store.js` — in-memory data store
- Agent runner main loop

### Changed
- Vercel deployment fixed (`vercel.json` with `{"framework":"nextjs"}`)
- Nav and footer links updated across all pages

---

## [0.1.0] — 2026-02-22

### Added
- Initial Next.js 14 project (pages router)
- Landing page (`pages/index.js`)
- Login page (`pages/login.js`)
- Design system: CSS variables, Cinzel/Playfair fonts, custom cursor
- Solana wallet setup and fee claiming
- Buyback execution module
- Burn execution module
