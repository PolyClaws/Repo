# Changelog

All notable changes to POLYCLAW are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### In Progress
- Supabase auth integration (email + wallet)
- TIDECLAW LP management (awaiting SDK stability)
- Live $POLYCLAW contract address binding

---

## [0.4.0] — 2026-03-06

### Added
- RESOLVER agent: 15-minute cycle, Gamma API resolution, profit routing
- deBridge DLN bridge module: automatic Polygon USDC → SOL cross-chain
- `positions.json` persistence layer for open bets
- Burns re-enabled: EMBERCLAW guard removed, live burn execution

### Changed
- Agent cycle split into three independent loops: SOL (60min), Market (30min), Resolver (15min)
- Bridge execution moved inside SOL cycle after FAUCET claims

---

## [0.3.2] — 2026-03-03

### Added
- HUNTCLAW sanity check via inference layer (`huntclawSanityCheck`)
- `decisions.ts` replaces per-agent decision logic with unified interface
- `lib/agents.ts`: AGENT_MAP with unified system prompts

### Changed
- HUNTCLAW: quant engine (`edge.ts`) picks independently, inference only approves
- All agent identities unified — no sub-agent names exposed in any output

### Fixed
- Kelly formula edge case when `b = 0` (zero-liquidity markets)
- EV threshold bypass on very high-confidence low-liquidity plays

---

## [0.3.0] — 2026-02-28

### Added
- `agent-runner/edge.ts` — pure quant engine, no inference dependency
- Kelly criterion + EV + liquidity efficiency scoring pipeline
- `huntclaw.ts` — market scanner with three-threshold filter
- Polymarket CLOB integration via `createOrDeriveApiKey()` from wallet
- Gamma public API for market metadata and resolution

### Changed
- STONECLAW allocation model updated for cross-chain capital split
- `polymarket.ts` derives credentials from POLYGON_WALLET_KEY — no separate auth

---

## [0.2.1] — 2026-02-25

### Added
- Docs page (`/docs`) — GitBook-style sidebar, 13-page casino pamphlet content
- Mobile responsive layout for landing page and docs
- Fire ember animation on burn section
- CLAW glitch effect on hero header
- Mouse parallax on hero diamonds
- Ambient cursor glow (500px radial gradient)
- 3D card flip on mechanism cards
- Entry pulse animation on live table rows
- READ THE RULES slide-in modal

### Fixed
- Mobile slot display overflow (40px digits, 8px padding)
- Formula block overflow (`white-space:pre-wrap`)
- Docs sidebar mobile overlay

---

## [0.2.0] — 2026-02-23

### Added
- `/app` dashboard: agent activity feed, open positions, burn tracker, category breakdown
- `/api/ingest` — receives POSTs from agent runner
- `/api/feed` — serves live agent data (5s polling)
- `lib/store.js` — in-memory data store
- `logger.ts` — posts agent events to INGEST_URL
- `agent-runner/index.ts` — main agent loop skeleton

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
- Agent architecture defined: FAUCET, STONECLAW, IRONCLAW, STORMCLAW, EMBERCLAW, TIDECLAW
- Solana wallet setup (`agent-runner/wallet.ts`)
- pump.fun fee claiming (`agent-runner/agents/faucet.ts`)
- Buyback execution (`agent-runner/agents/ironclaw.ts`)
- Burn execution (`agent-runner/agents/emberclaw.ts`)
