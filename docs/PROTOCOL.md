# Protocol Reference

Technical specification for the POLYCLAW agent protocol.

---

## Cycles

The agent runner maintains three independent loops:

| Loop | Interval | Agents |
|------|----------|--------|
| SOL cycle | 60 minutes | FAUCET → bridge → STONECLAW → IRONCLAW → STORMCLAW → EMBERCLAW |
| Market cycle | 30 minutes | HUNTCLAW (quant scan + order placement) |
| Resolver cycle | 15 minutes | RESOLVER (position check + profit routing) |

Each cycle is independent — a slow SOL cycle does not block market scanning.

---

## Edge Scoring (HUNTCLAW)

All Polymarket markets are scored before any bet is placed. Three metrics must all pass:

### Expected Value (EV)
```
EV = (p_model × b) + ((1 - p_model) × -1)
   = (p_model × b) - (1 - p_model)
```
Where `b` is the decimal odds minus 1, and `p_model` is the quant-estimated probability.

**Threshold**: EV ≥ 4%

### Kelly Criterion
```
Kelly = (p_model × b - (1 - p_model)) / b
```
Full Kelly is computed; a fractional Kelly is applied for position sizing.

**Threshold**: Kelly ≥ 2%

### Liquidity Efficiency
```
efficiency = clamp(liquidity / TARGET_LIQ, 0, 1)
edge_score  = MIN(EV, Kelly) × efficiency
```
Where `TARGET_LIQ = $250,000`.

**Thresholds**: Liquidity between $500 and $1,500,000. Edge score ≥ 7%.

---

## Position Sizing

Bet size is determined by the Kelly output, capped at a maximum per-market allocation:

```
bet_size = MIN(kelly_fraction × available_capital, MAX_BET)
```

Positions are saved to `positions.json` with:
- Market ID and question
- Side (YES/NO)
- Entry price
- Token amount
- Timestamp

---

## Profit Routing

On resolution, RESOLVER handles profits as follows:

1. Gamma API confirms market resolved
2. CLOB position closed at settlement price
3. Profit (USDC, Polygon) routed via deBridge DLN → SOL
4. SOL enters next SOL cycle as treasury contribution
5. EMBERCLAW buys $POLYCLAW and burns

---

## Burn Mechanism

Burns are executed by EMBERCLAW:

1. Receives SOL allocation from STONECLAW
2. Calls `performBuy` via pumpfun-pumpswap-sdk with `POLYCLAW_MINT`
3. Sends received tokens to Solana burn address (`1111...1111`)
4. Logs burn event to `/api/ingest`

The SDK handles bonding curve (pre-graduation) and PumpSwap (post-graduation) automatically. No pool address required.

---

## Security Model

- Agent wallet holds only operating capital (not the token treasury)
- Private keys stored in `.env.local` only — never committed
- INGEST_SECRET authenticates all agent → frontend posts
- No admin keys, no upgrade proxies, no pause mechanisms
