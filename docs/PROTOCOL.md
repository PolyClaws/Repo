# Protocol Reference

Technical specification for the POLYCLAW agent protocol.

---

## Cycles

The agent runner maintains three independent loops:

| Loop | Interval | Operations |
|------|----------|--------|
| SOL cycle | 60 minutes | Fee claims → bridge → capital allocation → buybacks → burns |
| Market cycle | 30 minutes | Quant scan + CLOB order placement |
| Resolver cycle | 15 minutes | Position resolution + profit routing |

Each cycle is independent — a slow SOL cycle does not block market scanning.

---

## Edge Scoring

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

On resolution:

1. Gamma API confirms market resolved
2. CLOB position closed at settlement price
3. Profit (USDC, Polygon) routed via deBridge DLN → SOL
4. SOL enters next SOL cycle as treasury contribution
5. $POLYCLAW bought and burned

---

## Burn Mechanism

1. SOL allocated from capital allocator
2. `performBuy` called via pumpfun-pumpswap-sdk with `POLYCLAW_MINT`
3. Received tokens sent to Solana burn address (`1111...1111`)
4. Burn event logged to `/api/ingest`

The SDK handles bonding curve (pre-graduation) and PumpSwap (post-graduation) automatically. No pool address required.

---

## Security Model

- Agent wallet holds only operating capital (not the token treasury)
- Private keys stored in `.env.local` only — never committed
- `INGEST_SECRET` authenticates all agent → frontend posts
- No admin keys, no upgrade proxies, no pause mechanisms
