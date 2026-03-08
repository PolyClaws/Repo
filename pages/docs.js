import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

// ── Sidebar navigation structure ─────────────────────────────────────────────
const NAV = [
  {
    section: 'GETTING STARTED',
    pages: [
      { key: 'overview',   label: 'What is POLYCLAW?' },
      { key: 'loop',       label: 'The Profit Loop' },
      { key: 'quickref',   label: 'Quick Reference' },
    ],
  },
  {
    section: 'THE AGENT',
    pages: [
      { key: 'architecture', label: 'Architecture' },
      { key: 'quant',        label: 'The Quant Engine' },
      { key: 'sizing',       label: 'Bet Sizing' },
      { key: 'cycles',       label: 'Cycles & Timing' },
    ],
  },
  {
    section: 'TOKENOMICS',
    pages: [
      { key: 'token',       label: '$POLYCLAW Token' },
      { key: 'burn',        label: 'Buyback & Burn' },
      { key: 'deflation',   label: 'Deflationary Model' },
    ],
  },
  {
    section: 'INFRASTRUCTURE',
    pages: [
      { key: 'treasury',   label: 'The Treasury' },
      { key: 'bridge',     label: 'The Bridge' },
      { key: 'polymarket', label: 'Polymarket' },
    ],
  },
  {
    section: 'LEGAL',
    pages: [
      { key: 'risk', label: 'Risk & Disclaimers' },
    ],
  },
]

// Flat page list for prev/next navigation
const ALL_PAGES = NAV.flatMap(s => s.pages)

// ── Page content components ───────────────────────────────────────────────────

function Divider() {
  return <div className="d-divider"><span>♦</span></div>
}

function Callout({ type = 'gold', title, children }) {
  return (
    <div className={`d-callout d-callout-${type}`}>
      <div className="d-callout-title">{title}</div>
      <div className="d-callout-body">{children}</div>
    </div>
  )
}

function Formula({ label, children }) {
  return (
    <div className="d-formula">
      {label && <div className="d-formula-label">{label}</div>}
      <pre className="d-formula-body">{children}</pre>
    </div>
  )
}

function StatGrid({ rows }) {
  return (
    <div className="d-stat-grid">
      {rows.map(([label, value, note], i) => (
        <div key={i} className="d-stat-row">
          <div className="d-stat-label">{label}</div>
          <div className="d-stat-value">{value}</div>
          {note && <div className="d-stat-note">{note}</div>}
        </div>
      ))}
    </div>
  )
}

function Pull({ children }) {
  return <blockquote className="d-pull">{children}</blockquote>
}

// ── Page definitions ──────────────────────────────────────────────────────────

const PAGES = {

  overview: () => (
    <div className="d-body">
      <div className="d-eyebrow">// Getting Started</div>
      <h1 className="d-title">What is <span className="d-accent">POLYCLAW?</span></h1>
      <p className="d-lead">POLYCLAW is a fully autonomous agent that operates a self-sustaining deflationary loop — claiming protocol fees, placing quant-driven bets on prediction markets, and burning every dollar of profit to permanently reduce $POLYCLAW token supply.</p>

      <Pull>The claw earns. The claw burns. The supply never grows again.</Pull>

      <Divider />

      <h2 className="d-h2">The Core Idea</h2>
      <p className="d-p">Most tokens promise utility. POLYCLAW is different — it is a machine. There is no team making manual decisions, no discretionary treasury management, no human hands on the controls. An autonomous agent runs on a server, executes trades on Polymarket, and routes every profit back into $POLYCLAW destruction.</p>
      <p className="d-p">The token was launched on pump.fun on the Solana network. Pump.fun charges a 1% creator fee on all trading volume. These fees flow automatically into the POLYCLAW treasury wallet and become the fuel for the entire operation.</p>

      <Divider />

      <h2 className="d-h2">What Makes It Different</h2>
      <div className="d-feature-grid">
        <div className="d-feature">
          <div className="d-feature-icon">♠</div>
          <div className="d-feature-title">Zero Human Decisions</div>
          <div className="d-feature-desc">No team votes, no manual approvals. Every action — from fee claims to bet execution to token burns — is automated and on-chain.</div>
        </div>
        <div className="d-feature">
          <div className="d-feature-icon">♥</div>
          <div className="d-feature-title">Quant-Driven Betting</div>
          <div className="d-feature-desc">Markets are not picked by gut or hype. Every bet requires a positive Expected Value and a valid Kelly Criterion score. Math only.</div>
        </div>
        <div className="d-feature">
          <div className="d-feature-icon">♣</div>
          <div className="d-feature-title">Profit Incineration</div>
          <div className="d-feature-desc">Winnings are not held, distributed, or reinvested. They are bridged back to Solana and destroyed. Supply falls with every win.</div>
        </div>
        <div className="d-feature">
          <div className="d-feature-icon">♦</div>
          <div className="d-feature-title">Self-Sustaining Loop</div>
          <div className="d-feature-desc">Fees fund bets. Bets generate profits. Profits fund buybacks. Buybacks get burned. The loop runs indefinitely without external input.</div>
        </div>
      </div>

      <Callout type="gold" title="♦ The One-Line Summary">
        POLYCLAW turns prediction market alpha into permanent token scarcity.
      </Callout>
    </div>
  ),

  loop: () => (
    <div className="d-body">
      <div className="d-eyebrow">// Getting Started</div>
      <h1 className="d-title">The <span className="d-accent">Profit Loop</span></h1>
      <p className="d-lead">Every dollar that enters the POLYCLAW system follows a single, deterministic path. From fee collection to token destruction, nothing leaks.</p>

      <Divider />

      <h2 className="d-h2">Step by Step</h2>

      <div className="d-steps">
        <div className="d-step">
          <div className="d-step-num">01</div>
          <div className="d-step-content">
            <div className="d-step-title">Fees Are Claimed</div>
            <div className="d-step-desc">Every hour, POLYCLAW checks the pump.fun creator fee account and claims any accumulated fees into the treasury wallet on Solana. No manual action required — the agent runs the claim automatically.</div>
          </div>
        </div>
        <div className="d-step-connector">↓</div>
        <div className="d-step">
          <div className="d-step-num">02</div>
          <div className="d-step-content">
            <div className="d-step-title">Capital is Assessed</div>
            <div className="d-step-desc">The agent evaluates the treasury SOL balance against configured reserves (gas, minimum action threshold). If surplus exists and the Polygon wallet is low on USDC, it triggers a bridge.</div>
          </div>
        </div>
        <div className="d-step-connector">↓</div>
        <div className="d-step">
          <div className="d-step-num">03</div>
          <div className="d-step-content">
            <div className="d-step-title">SOL Bridges to USDC</div>
            <div className="d-step-desc">Via deBridge DLN, surplus SOL is converted to USDC on Polygon (where Polymarket operates). The bridge takes approximately 5 minutes and requires no human signing — the agent&apos;s wallet handles it automatically.</div>
          </div>
        </div>
        <div className="d-step-connector">↓</div>
        <div className="d-step">
          <div className="d-step-num">04</div>
          <div className="d-step-content">
            <div className="d-step-title">Quant Engine Scans Markets</div>
            <div className="d-step-desc">Every 30 minutes, the quant engine fetches 60 active Polymarket markets, scores each for Expected Value and Kelly Criterion, and filters by liquidity and efficiency thresholds. The top candidates pass to a final sanity check.</div>
          </div>
        </div>
        <div className="d-step-connector">↓</div>
        <div className="d-step">
          <div className="d-step-num">05</div>
          <div className="d-step-content">
            <div className="d-step-title">Bets Are Placed</div>
            <div className="d-step-desc">Qualifying markets receive fixed-size USDC bets via the Polymarket CLOB (Central Limit Order Book). Bet size is $1 (LOW), $2 (MEDIUM), or $3 (HIGH) confidence — never larger, regardless of treasury size.</div>
          </div>
        </div>
        <div className="d-step-connector">↓</div>
        <div className="d-step">
          <div className="d-step-num">06</div>
          <div className="d-step-content">
            <div className="d-step-title">Positions Resolve</div>
            <div className="d-step-desc">Every 15 minutes, POLYCLAW checks each tracked position for resolution. When a market closes, it detects the outcome, calculates gross profit, logs the result, and flags the USDC for bridging.</div>
          </div>
        </div>
        <div className="d-step-connector">↓</div>
        <div className="d-step">
          <div className="d-step-num">07</div>
          <div className="d-step-content">
            <div className="d-step-title">Profits Bridge Back</div>
            <div className="d-step-desc">After each Polymarket cycle, any USDC above the $10 Polygon reserve is bridged back to Solana as SOL via deBridge. The $10 reserve remains on Polygon to fund the next betting cycle.</div>
          </div>
        </div>
        <div className="d-step-connector">↓</div>
        <div className="d-step">
          <div className="d-step-num">08</div>
          <div className="d-step-content">
            <div className="d-step-title">SOL Buys Back &amp; Burns</div>
            <div className="d-step-desc">The returned SOL lands in the treasury. On the next hourly cycle, the agent uses it to buy $POLYCLAW from the open market via PumpSwap and permanently destroys the tokens. Supply is reduced. Forever.</div>
          </div>
        </div>
      </div>

      <Callout type="red" title="⚠ The Loop is Closed">
        There is no exit point for profits. No wallet accumulates value. Every winning cycle results in fewer $POLYCLAW tokens in existence.
      </Callout>
    </div>
  ),

  quickref: () => (
    <div className="d-body">
      <div className="d-eyebrow">// Getting Started</div>
      <h1 className="d-title">Quick <span className="d-accent">Reference</span></h1>
      <p className="d-lead">All key thresholds, constants, and configuration values in one place.</p>

      <Divider />
      <h2 className="d-h2">Betting Parameters</h2>
      <StatGrid rows={[
        ['Minimum Expected Value',      '> 4%',        'Required before any bet is placed'],
        ['Minimum Kelly Criterion',     '> 2%',        'Fraction of bankroll model'],
        ['Minimum Edge Score',          '> 7%',        'Composite quant threshold'],
        ['Minimum Market Liquidity',    '$500',        'Below this, market is skipped'],
        ['Maximum Market Liquidity',    '$1,500,000',  'Above this, efficiency assumed low'],
        ['Minimum Volume',              '$100',        'Thin markets excluded'],
        ['Bet — LOW confidence',        '$1 USDC',     'Fixed. Never scales.'],
        ['Bet — MEDIUM confidence',     '$2 USDC',     'Fixed. Never scales.'],
        ['Bet — HIGH confidence',       '$3 USDC',     'Fixed. Never scales.'],
        ['Markets scanned per cycle',   '60',          'Top candidates by volume'],
        ['Max new picks per cycle',     '3',           'Prevents overexposure'],
        ['Max open positions',          '8',           'Hard cap'],
      ]} />

      <Divider />
      <h2 className="d-h2">Cycle Timing</h2>
      <StatGrid rows={[
        ['SOL cycle (treasury + burns)', 'Every 60 min', 'Fee claim → Bridge → Buyback/Burn'],
        ['Market cycle (betting)',        'Every 30 min', 'Quant scan → Review → Orders'],
        ['Resolver cycle (settlements)',  'Every 15 min', 'Position check → Profit routing'],
      ]} />

      <Divider />
      <h2 className="d-h2">Bridge Configuration</h2>
      <StatGrid rows={[
        ['Forward bridge trigger',       '< $10 USDC on Polygon',    'Top-up if below this'],
        ['Forward bridge fraction',      '40% of SOL surplus',       'Max 1 SOL per bridge'],
        ['SOL surplus required',         '≥ 0.50 SOL',              'Minimum before bridging'],
        ['Polygon USDC reserve',         '$10',                      'Always maintained'],
        ['Return bridge minimum',        '$2 excess above reserve',  'Smaller amounts held'],
        ['Bridge provider',              'deBridge DLN',             'Cross-chain liquidity'],
        ['Bridge time',                  '~5 minutes',               'Solana ↔ Polygon'],
      ]} />

      <Divider />
      <h2 className="d-h2">Market Efficiency Baselines</h2>
      <StatGrid rows={[
        ['Sports markets',   '0.88', 'Highest baseline efficiency'],
        ['Politics markets', '0.80', 'Well-traded, moderate edge'],
        ['Finance markets',  '0.75', 'Good macro alpha potential'],
        ['Crypto markets',   '0.55', 'High volatility, lower efficiency'],
        ['World events',     '0.50', 'Broad alpha opportunities'],
        ['Science markets',  '0.45', 'Lowest baseline — most edge'],
      ]} />
    </div>
  ),

  architecture: () => (
    <div className="d-body">
      <div className="d-eyebrow">// The Agent</div>
      <h1 className="d-title"><span className="d-accent">Architecture</span></h1>
      <p className="d-lead">POLYCLAW is a TypeScript agent runner with three independent cycles, each handling a distinct part of the operation. Everything runs headlessly on a server — no dashboard required.</p>

      <Divider />

      <h2 className="d-h2">Components</h2>
      <div className="d-components">
        <div className="d-component">
          <div className="d-component-tag">FEE CLAIM</div>
          <div className="d-component-desc">Claims accumulated pump.fun creator fees from the protocol into the treasury wallet. Runs inside the SOL cycle every 60 minutes. Zero configuration required once the wallet is set.</div>
        </div>
        <div className="d-component">
          <div className="d-component-tag">QUANT ENGINE</div>
          <div className="d-component-desc">Pure mathematics. Scores every scanned market using Expected Value, Kelly Criterion, and Market Efficiency scoring. Produces a ranked list of edge opportunities. Contains zero inference — all deterministic math.</div>
        </div>
        <div className="d-component">
          <div className="d-component-tag">SANITY CHECK</div>
          <div className="d-component-desc">Receives the top quant candidates and performs a final structural review — flagging markets that may have already resolved, contain ambiguous language, or appear structurally unsound. Returns a reject list only. Does not pick winners.</div>
        </div>
        <div className="d-component">
          <div className="d-component-tag">ORDER EXECUTOR</div>
          <div className="d-component-desc">Places USDC bets via the Polymarket CLOB using the @polymarket/clob-client SDK. Signs orders with the Polygon wallet. Saves each confirmed position to positions.json for tracking.</div>
        </div>
        <div className="d-component">
          <div className="d-component-tag">POSITION TRACKER</div>
          <div className="d-component-desc">Monitors open positions against the Polymarket Gamma API. Detects resolution when a market closes and a YES/NO token price settles at ≥ 0.99. Calculates net profit (gross × 0.98 fee adjustment) and routes wins.</div>
        </div>
        <div className="d-component">
          <div className="d-component-tag">BRIDGE</div>
          <div className="d-component-desc">Handles both directions of cross-chain capital flow using deBridge DLN. Forward (SOL → USDC on Polygon) for funding bets. Return (USDC → SOL on Solana) for routing profits back to be burned.</div>
        </div>
        <div className="d-component">
          <div className="d-component-tag">BUYBACK / BURN</div>
          <div className="d-component-desc">Uses PumpSwap SDK to purchase $POLYCLAW from the open market with treasury SOL. Sends purchased tokens to the burn address. Executes on every SOL cycle if treasury conditions are met.</div>
        </div>
      </div>

      <Divider />

      <h2 className="d-h2">Data Flow</h2>
      <Formula label="System Architecture">
{`pump.fun fees
    └─▶ Treasury SOL
         ├─▶ Bridge (SOL → USDC, Polygon)
         │    └─▶ Order Executor (Polymarket CLOB)
         │         └─▶ Open Positions (positions.json)
         │              └─▶ Position Tracker (every 15 min)
         │                   └─▶ Wins: Bridge (USDC → SOL)
         │                             └─▶ Treasury SOL
         └─▶ Buyback / Burn (PumpSwap → destroy)`}
      </Formula>

      <Divider />

      <h2 className="d-h2">Stack</h2>
      <StatGrid rows={[
        ['Runtime',       'Node.js + TypeScript (tsx)',    ''],
        ['Chain — Solana','@solana/web3.js + spl-token',  'Treasury, burns, bridge signing'],
        ['Chain — Polygon','ethers.js v5',                'Polymarket, bridge signing'],
        ['Betting',       '@polymarket/clob-client',      'Order placement + CLOB access'],
        ['Bridge',        'deBridge DLN REST API',        'Cross-chain liquidity'],
        ['Persistence',   'positions.json (local)',       'Open position tracking'],
        ['Reporting',     'HTTP POST to /api/ingest',     'Live dashboard feed'],
      ]} />
    </div>
  ),

  quant: () => (
    <div className="d-body">
      <div className="d-eyebrow">// The Agent</div>
      <h1 className="d-title">The Quant <span className="d-accent">Engine</span></h1>
      <p className="d-lead">The heart of POLYCLAW&apos;s betting logic is a pure mathematics engine with zero inference involvement. Markets are evaluated on three independent scoring systems. All three must pass before a bet is considered.</p>

      <Callout type="gold" title="♦ Math Picks the Markets">
        The quant engine determines which markets to bet on. The inference layer only reviews its selections for structural problems — it cannot add candidates, only remove them.
      </Callout>

      <Divider />

      <h2 className="d-h2">I. Expected Value</h2>
      <p className="d-p">Expected Value (EV) measures whether a bet is mathematically profitable over many repetitions. A positive EV means that, on average, the bet returns more than it costs.</p>

      <Formula label="Expected Value Formula">
{`EV = (estimated_probability × payout_multiplier) − 1

Where:
  payout_multiplier = 1 / market_price
  estimated_probability = adjusted market probability

Threshold: EV > 4% required to proceed`}
      </Formula>

      <p className="d-p">The estimated probability is not simply the market price. It is adjusted for market staleness (how long since price moved), category efficiency (how well-traded the market is), thin market penalty (small pools are less reliable), and near-resolution trust (markets close to resolving get extra weight on current price).</p>

      <Divider />

      <h2 className="d-h2">II. Kelly Criterion</h2>
      <p className="d-p">The Kelly Criterion is the mathematically optimal fraction of a bankroll to bet given a known edge. It prevents both overbetting (which causes ruin) and underbetting (which leaves edge on the table).</p>

      <Formula label="Kelly Criterion Formula">
{`f* = (b × p − q) / b

Where:
  b = payout odds (decimal − 1)
  p = estimated probability of winning
  q = estimated probability of losing (1 − p)
  f* = optimal fraction of bankroll to bet

Threshold: f* > 2% required to proceed`}
      </Formula>

      <p className="d-p">POLYCLAW does not use fractional Kelly sizing directly for position sizing (bets are fixed dollar amounts). Instead, the Kelly fraction acts as a gate — if the optimal bet size is below 2% of bankroll, the market has insufficient edge and is skipped entirely.</p>

      <Divider />

      <h2 className="d-h2">III. Market Efficiency Score</h2>
      <p className="d-p">Market efficiency measures how reliably a market&apos;s price reflects true probability. Highly efficient markets (like liquid sports books) offer less edge. Less efficient markets (like niche science or world event markets) offer more.</p>

      <Formula label="Efficiency Score Formula">
{`efficiency = category_baseline × volume_factor × pool_factor

category_baseline:
  Sports   = 0.88   (most efficient)
  Politics = 0.80
  Finance  = 0.75
  Crypto   = 0.55
  World    = 0.50
  Science  = 0.45   (least efficient)

volume_factor  = clamp(turnover_ratio, 0.5, 1.0)
pool_factor    = logarithmic scale of pool size`}
      </Formula>

      <p className="d-p">Lower efficiency means more potential edge — the market price is less reliable, which creates opportunities for the quant engine. The efficiency score feeds into the composite ranking.</p>

      <Divider />

      <h2 className="d-h2">IV. Composite Score &amp; Ranking</h2>
      <p className="d-p">After computing all three individual scores, each market receives a composite score used for final ranking:</p>

      <Formula label="Composite Score">
{`composite = (EV × 0.50) + (kelly × 0.20) + (efficiency × 0.20) + (edge × 0.10)

Where:
  edge = EV − (1 − efficiency)   // pure excess above market friction

The top candidates by composite score proceed to the sanity check.`}
      </Formula>

      <Callout type="red" title="⚠ All Gates Must Pass">
        A market that passes EV but fails Kelly is rejected. A market that passes both but has insufficient liquidity is rejected. Every threshold is a hard gate, not a suggestion.
      </Callout>
    </div>
  ),

  sizing: () => (
    <div className="d-body">
      <div className="d-eyebrow">// The Agent</div>
      <h1 className="d-title">Bet <span className="d-accent">Sizing</span></h1>
      <p className="d-lead">POLYCLAW uses fixed bet sizes. There is no dynamic scaling, no percentage-of-treasury calculation, and no compound growth into larger positions. The sizing is deliberate.</p>

      <Pull>Discipline is the edge. Greed is the leak.</Pull>

      <Divider />

      <h2 className="d-h2">The Three Tiers</h2>
      <StatGrid rows={[
        ['LOW confidence',    '$1 USDC', 'Composite score qualifies but edge is thin'],
        ['MEDIUM confidence', '$2 USDC', 'Strong quant signal across multiple metrics'],
        ['HIGH confidence',   '$3 USDC', 'Maximum composite score, all metrics strong'],
      ]} />

      <Divider />

      <h2 className="d-h2">Why Fixed Sizing?</h2>
      <p className="d-p">In standard Kelly betting, position size grows as the bankroll grows. This means a successful agent would eventually be placing very large bets — bets large enough to move markets, attract attention, or suffer significant drawdowns in losing streaks.</p>
      <p className="d-p">POLYCLAW is not optimising for maximum profit extraction. It is optimising for a sustainable, perpetual burn loop. The goal is to generate a steady stream of small, consistent wins that feed the deflation engine — not to swing for maximum EV at the cost of ruin risk.</p>
      <p className="d-p">Fixed sizing also means the agent&apos;s betting behaviour cannot be gamed or predicted by other market participants. A $1–$3 position from a single account does not move markets and does not reveal strategy through size patterns.</p>

      <Callout type="gold" title="♦ The Discipline Rule">
        Bet size will never exceed $3 regardless of treasury size, win rate, or market conditions. This is not a limitation — it is the design. The burn is the product, not the profit.
      </Callout>

      <Divider />

      <h2 className="d-h2">Confidence Determination</h2>
      <p className="d-p">The confidence tier is determined by where the market&apos;s composite score falls relative to defined thresholds after all gates have been passed:</p>

      <Formula label="Confidence Tier Logic">
{`if composite_score ≥ HIGH_THRESHOLD   → HIGH   → $3
if composite_score ≥ MEDIUM_THRESHOLD → MEDIUM → $2
else                                  → LOW    → $1

All three tiers still require:
  EV > 4%  ·  Kelly > 2%  ·  Liquidity $500–$1.5M`}
      </Formula>
    </div>
  ),

  cycles: () => (
    <div className="d-body">
      <div className="d-eyebrow">// The Agent</div>
      <h1 className="d-title">Cycles &amp; <span className="d-accent">Timing</span></h1>
      <p className="d-lead">Three independent cycles run in parallel, each with its own interval and overlap guard. A cycle that is still running will not spawn a duplicate — no pile-up, no race conditions.</p>

      <Divider />

      <div className="d-cycle-block">
        <div className="d-cycle-header">
          <span className="d-cycle-tag">CYCLE 1</span>
          <span className="d-cycle-interval">Every 60 Minutes</span>
        </div>
        <div className="d-cycle-title">SOL Treasury Cycle</div>
        <div className="d-cycle-steps">
          <div className="d-cycle-step">1. Claim pump.fun creator fees into treasury</div>
          <div className="d-cycle-step">2. Bridge check — if Polygon USDC &lt; $10 and SOL surplus ≥ 0.50, forward bridge triggers</div>
          <div className="d-cycle-step">3. Agent evaluates treasury state — act or hold</div>
          <div className="d-cycle-step">4. If acting: allocates SOL to buyback and/or burn operations</div>
          <div className="d-cycle-step">5. Buyback executes via PumpSwap, tokens sent to burn address</div>
        </div>
      </div>

      <div className="d-cycle-block">
        <div className="d-cycle-header">
          <span className="d-cycle-tag">CYCLE 2</span>
          <span className="d-cycle-interval">Every 30 Minutes</span>
        </div>
        <div className="d-cycle-title">Market Betting Cycle</div>
        <div className="d-cycle-steps">
          <div className="d-cycle-step">1. Check USDC balance on Polygon — minimum $5 to proceed</div>
          <div className="d-cycle-step">2. Check open position count — skip if at maximum (8)</div>
          <div className="d-cycle-step">3. Fetch 60 active Polymarket markets via Gamma API</div>
          <div className="d-cycle-step">4. Quant engine scores every market (EV, Kelly, efficiency)</div>
          <div className="d-cycle-step">5. Sanity check filters structurally questionable candidates</div>
          <div className="d-cycle-step">6. Top 3 qualifying markets receive USDC bets via CLOB</div>
          <div className="d-cycle-step">7. Confirmed orders saved to positions.json</div>
          <div className="d-cycle-step">8. Return bridge check — excess USDC above $10 reserve bridges back to Solana</div>
        </div>
      </div>

      <div className="d-cycle-block">
        <div className="d-cycle-header">
          <span className="d-cycle-tag">CYCLE 3</span>
          <span className="d-cycle-interval">Every 15 Minutes</span>
        </div>
        <div className="d-cycle-title">Resolution Cycle</div>
        <div className="d-cycle-steps">
          <div className="d-cycle-step">1. Load all open positions from positions.json</div>
          <div className="d-cycle-step">2. For each position, query Gamma API for current market state</div>
          <div className="d-cycle-step">3. Resolution detected when: market closed AND winning token price ≥ 0.99</div>
          <div className="d-cycle-step">4. Win: calculate gross profit (size × (1/entryPrice − 1)) × 0.98 net</div>
          <div className="d-cycle-step">5. Log activity, remove position from tracking</div>
          <div className="d-cycle-step">6. Loss: log result, remove from tracking — no further action</div>
        </div>
      </div>

      <Callout type="gold" title="♦ Overlap Guards">
        Each cycle uses a boolean lock (isRunning). If a cycle has not completed by the time the next interval fires, the new execution is skipped entirely. This prevents compounding failures during network slowdowns.
      </Callout>
    </div>
  ),

  token: () => (
    <div className="d-body">
      <div className="d-eyebrow">// Tokenomics</div>
      <h1 className="d-title">$POLYCLAW <span className="d-accent">Token</span></h1>
      <p className="d-lead">$POLYCLAW is a Solana SPL token launched via pump.fun. It is the deflationary asset at the centre of the entire operation — the only thing the machine produces is its own scarcity.</p>

      <Divider />

      <h2 className="d-h2">Token Properties</h2>
      <StatGrid rows={[
        ['Network',         'Solana',                'SPL token standard'],
        ['Launch platform', 'pump.fun',              'Fair launch, no presale'],
        ['Supply type',     'Fixed → Deflationary',  'No minting capability retained'],
        ['Team allocation', '0%',                    'No allocation. No vesting.'],
        ['Burn mechanism',  'On-chain destruction',  'Via PumpSwap buyback + burn address'],
        ['Creator fee',     '1% of trading volume',  'Auto-routed to treasury wallet'],
      ]} />

      <Divider />

      <h2 className="d-h2">How pump.fun Creator Fees Work</h2>
      <p className="d-p">When a token is created on pump.fun, the creator earns 1% of all trading volume on that token, in perpetuity. For $POLYCLAW, this fee is not taken by a team or treasury wallet for personal gain — it is routed directly into the autonomous agent that uses it to fund bets and burns.</p>
      <p className="d-p">As trading volume increases, fee income increases. More fee income means more capital for the treasury, which means more buyback pressure, which means more supply destruction. Volume and deflation are directly linked.</p>

      <Pull>The more the market trades $POLYCLAW, the faster it burns.</Pull>

      <Divider />

      <h2 className="d-h2">No Human Control</h2>
      <p className="d-p">The treasury wallet is controlled by the agent runner&apos;s private key. There is no multisig, no DAO governance, and no team override. All decisions — when to claim fees, when to bridge, when to bet, when to burn — are made by the agent according to its configuration.</p>

      <Callout type="red" title="⚠ No Extraction Path">
        There is no function in the codebase that sends funds to a team wallet. All SOL flows into either bets or burns. This is verifiable by reading the agent source code.
      </Callout>
    </div>
  ),

  burn: () => (
    <div className="d-body">
      <div className="d-eyebrow">// Tokenomics</div>
      <h1 className="d-title">Buyback &amp; <span className="d-accent">Burn</span></h1>
      <p className="d-lead">Every profit the agent generates — from Polymarket wins and from treasury fee accumulation — is used to purchase $POLYCLAW from the open market and permanently destroy it.</p>

      <Divider />

      <h2 className="d-h2">The Buyback Process</h2>
      <p className="d-p">Buybacks execute via PumpSwap, the native DEX for pump.fun tokens on Solana. The agent uses treasury SOL to place a swap into $POLYCLAW. This creates real buy pressure on the open market — the token&apos;s price sees genuine demand before the tokens are destroyed.</p>

      <div className="d-flow-row">
        <div className="d-flow-box">Treasury SOL</div>
        <div className="d-flow-arrow">→</div>
        <div className="d-flow-box">PumpSwap DEX</div>
        <div className="d-flow-arrow">→</div>
        <div className="d-flow-box">$POLYCLAW purchased</div>
        <div className="d-flow-arrow">→</div>
        <div className="d-flow-box d-flow-fire">🔥 Burn Address</div>
      </div>

      <Divider />

      <h2 className="d-h2">Burn Sources</h2>
      <StatGrid rows={[
        ['Treasury fee income', 'Primary source', 'pump.fun 1% creator fees → SOL → buyback → burn'],
        ['Polymarket profits',  'Secondary source', 'Win USDC → bridge to SOL → buyback → burn'],
      ]} />

      <Divider />

      <h2 className="d-h2">What "Burning" Means</h2>
      <p className="d-p">Token burning on Solana means sending tokens to a known burn address from which they can never be retrieved. The transaction is public and verifiable on-chain. The tokens are not locked, staked, or in a time-lock — they are gone permanently.</p>
      <p className="d-p">Each burn event is logged in the activity feed on the dashboard with a Solscan transaction link. The cumulative burn counter on the homepage tracks the total tokens destroyed since launch.</p>

      <Callout type="gold" title="♦ Double Deflation">
        When the agent wins a bet, two things happen: (1) the winning USDC is used to buy $POLYCLAW, creating buy pressure. (2) Those tokens are immediately burned, removing them from supply forever. The market sees demand. Then supply shrinks.
      </Callout>
    </div>
  ),

  deflation: () => (
    <div className="d-body">
      <div className="d-eyebrow">// Tokenomics</div>
      <h1 className="d-title">Deflationary <span className="d-accent">Model</span></h1>
      <p className="d-lead">$POLYCLAW has no inflation mechanism. No new tokens are ever minted. The only supply movement is downward. This is structural — not a promise, not a roadmap item.</p>

      <Pull>The supply cannot grow. It can only shrink. Every cycle, every win, every burn makes the next token scarcer than the last.</Pull>

      <Divider />

      <h2 className="d-h2">Supply Mechanics</h2>
      <StatGrid rows={[
        ['Initial supply',    'Fixed at launch',   'pump.fun fair launch'],
        ['Minting',           'Disabled',          'No additional supply ever created'],
        ['Burns',             'Continuous',        'Every profit cycle burns tokens'],
        ['Net supply change', 'Always negative',   'As long as agent operates'],
      ]} />

      <Divider />

      <h2 className="d-h2">The Deflation Guarantee</h2>
      <p className="d-p">The deflation is mathematically guaranteed under one condition: the agent must continue to operate. As long as pump.fun trading generates fees, and as long as the agent&apos;s wallet is funded, tokens will be burned on every SOL cycle.</p>
      <p className="d-p">Even in a scenario where the agent loses every Polymarket bet (which the quant engine is designed to prevent), fee income alone would still drive buybacks and burns. The betting layer accelerates deflation — it is not required for it.</p>

      <Formula label="Net Supply Change">
{`Δsupply = −(buybacks_from_fees + buybacks_from_profits)

Since both terms are always ≥ 0 and burns are irreversible:
  supply(t+1) < supply(t)  always true while agent runs`}
      </Formula>

      <Divider />

      <h2 className="d-h2">Compounding Scarcity</h2>
      <p className="d-p">As supply decreases and if demand remains constant or increases, the price per token rises. A rising price means each SOL of buyback purchases fewer tokens — but the absolute supply still decreases with every cycle. The scarcity compounds over time regardless of price action.</p>

      <Callout type="red" title="⚠ Not a Price Guarantee">
        Deflation does not guarantee price appreciation. Market demand determines price. The agent controls supply — it cannot control demand. Do not confuse mechanical deflation with investment return.
      </Callout>
    </div>
  ),

  treasury: () => (
    <div className="d-body">
      <div className="d-eyebrow">// Infrastructure</div>
      <h1 className="d-title">The <span className="d-accent">Treasury</span></h1>
      <p className="d-lead">The treasury is a single Solana wallet controlled by the agent runner. It is the financial hub of the entire operation — all funds flow in and out through this address.</p>

      <Divider />

      <h2 className="d-h2">Income Sources</h2>
      <p className="d-p">The treasury has one primary income source: pump.fun creator fees. Every time $POLYCLAW is traded on pump.fun, 1% of the transaction value is routed to the creator fee account associated with the token. The agent claims this balance hourly and deposits it into the treasury wallet.</p>
      <p className="d-p">A secondary income stream comes from bridged Polymarket profits. When a winning position is detected, the USDC profit is queued for the return bridge back to Solana, where it lands in the treasury and is incorporated into the next burn cycle.</p>

      <Divider />

      <h2 className="d-h2">Reserve Management</h2>
      <p className="d-p">The agent maintains two hard reserves before allocating any capital to actions:</p>
      <StatGrid rows={[
        ['Gas reserve',              '0.05 SOL',  'Always kept for transaction fees'],
        ['Minimum action threshold', '0.10 SOL',  'Below this, no operations execute'],
        ['Bridge buffer',            '0.05 SOL',  'Additional safety before bridging'],
      ]} />
      <p className="d-p">Only the SOL above these reserves is considered surplus and eligible for bridging or buybacks. This prevents the agent from accidentally leaving itself unable to pay for transactions.</p>

      <Divider />

      <h2 className="d-h2">Capital Allocation Decision</h2>
      <p className="d-p">On every SOL cycle, after fees are claimed and reserves are confirmed, the agent evaluates the treasury state and decides how to act. Possible outputs:</p>

      <div className="d-options">
        <div className="d-option"><span className="d-option-tag">HOLD</span> Treasury below threshold. No action. Accumulate until next cycle.</div>
        <div className="d-option"><span className="d-option-tag">BUYBACK</span> Sufficient surplus. Buy $POLYCLAW from market. Burn.</div>
        <div className="d-option"><span className="d-option-tag">BRIDGE</span> Polygon wallet low. Forward bridge SOL → USDC.</div>
        <div className="d-option"><span className="d-option-tag">RAID</span> High-conviction single-market allocation approved. Concentrated position.</div>
      </div>

      <Callout type="gold" title="♦ Fully Transparent">
        Every treasury action is broadcast to the activity feed via the ingest API and logged on Solscan. The wallet address and all transactions are publicly verifiable on-chain.
      </Callout>
    </div>
  ),

  bridge: () => (
    <div className="d-body">
      <div className="d-eyebrow">// Infrastructure</div>
      <h1 className="d-title">The <span className="d-accent">Bridge</span></h1>
      <p className="d-lead">POLYCLAW operates across two blockchains — Solana (treasury, burns) and Polygon (Polymarket betting). The bridge layer moves capital between them automatically using deBridge DLN.</p>

      <Divider />

      <h2 className="d-h2">deBridge DLN</h2>
      <p className="d-p">DLN (Decentralised Liquidity Network) is a cross-chain order-based bridge that matches on-chain limit orders with professional market makers. It offers fast execution (~5 minutes), no slippage on the take rate, and supports Solana ↔ Polygon natively.</p>
      <p className="d-p">The agent interacts with deBridge via their REST API, which returns a pre-built transaction that the agent signs with the appropriate wallet (Solana keypair for forward, Polygon ethers.js wallet for return).</p>

      <Divider />

      <h2 className="d-h2">Forward Bridge — SOL → USDC</h2>
      <p className="d-p">The forward bridge fires when the Polygon USDC balance drops below $10 (the reserve level) and the Solana treasury has sufficient surplus.</p>

      <StatGrid rows={[
        ['Trigger condition',    'Polygon USDC < $10',          'Checked on every SOL cycle'],
        ['Surplus required',     '≥ 0.50 SOL above reserves',  'Below this, bridge skipped'],
        ['Bridge fraction',      '40% of surplus SOL',         'Partial bridging, not total'],
        ['Maximum per bridge',   '1.00 SOL',                   'Hard cap per forward event'],
        ['Source',               'Solana treasury wallet',     'Signs as VersionedTransaction'],
        ['Destination',          'Polygon USDC wallet',        'Funding Polymarket account'],
      ]} />

      <Divider />

      <h2 className="d-h2">Return Bridge — USDC → SOL</h2>
      <p className="d-p">The return bridge moves accumulated Polymarket profits back to Solana after each betting cycle. It keeps a $10 USDC reserve on Polygon for future bets and bridges everything above that threshold.</p>

      <StatGrid rows={[
        ['Trigger condition',    'Polygon USDC > $10 + $2 minimum', 'Must have meaningful excess'],
        ['Reserve kept',         '$10 USDC',                        'Always maintained on Polygon'],
        ['Minimum return',       '$2 above reserve',                'Smaller amounts stay put'],
        ['USDC approval',        'MaxUint256 one-time approve',     'Required for deBridge contract'],
        ['Source',               'Polygon wallet (ethers.js)',      'Signs EVM transaction'],
        ['Destination',          'Solana treasury wallet (SOL)',    'Converted via DLN liquidity'],
      ]} />

      <Formula label="Return Bridge Flow">
{`bridge_amount = polygon_usdc_balance − $10 reserve

if bridge_amount < $2 → skip (too small to bother)
if bridge_amount ≥ $2 → bridge to Solana

Arriving SOL → treasury → next burn cycle`}
      </Formula>

      <Callout type="gold" title="♦ ~5 Minute Cross-Chain Time">
        deBridge DLN order fulfilment typically completes within 3–7 minutes. The resolution and betting cycles continue running during bridge transit — capital in flight does not block other operations.
      </Callout>
    </div>
  ),

  polymarket: () => (
    <div className="d-body">
      <div className="d-eyebrow">// Infrastructure</div>
      <h1 className="d-title"><span className="d-accent">Polymarket</span></h1>
      <p className="d-lead">Polymarket is the world&apos;s largest prediction market platform, operating on Polygon. POLYCLAW uses it as the primary alpha-generation venue — betting USDC on binary outcome markets with quantified edge.</p>

      <Divider />

      <h2 className="d-h2">How Polymarket Works</h2>
      <p className="d-p">Polymarket markets are binary — each resolves to either YES or NO. Traders buy shares in either outcome at a price between $0.01 and $0.99, where the price represents the market&apos;s implied probability. A $0.60 YES share pays $1 if the event happens — a 66.7% payout on a 60% probability bet.</p>
      <p className="d-p">The market is a Central Limit Order Book (CLOB). Bets are placed as limit orders that fill against existing liquidity. The @polymarket/clob-client SDK handles order signing, nonce management, and order submission.</p>

      <Divider />

      <h2 className="d-h2">Market Categories</h2>
      <StatGrid rows={[
        ['Politics',  'Elections, legislation, geopolitical', 'High volume, well-tracked'],
        ['Crypto',    'Price targets, protocol milestones',   'Volatile — moderate efficiency'],
        ['Finance',   'Fed decisions, macro indicators',      'Steady alpha — slower to move'],
        ['World',     'News events, treaties, disasters',     'Less traded — more edge'],
        ['Sports',    'Game outcomes, championships',         'Heavily arbitraged — low edge'],
        ['Science',   'Research outcomes, regulatory',       'Niche — highest potential edge'],
      ]} />

      <Divider />

      <h2 className="d-h2">Position Limits</h2>
      <StatGrid rows={[
        ['Max open positions',     '8',      'Hard cap — new bets blocked above this'],
        ['Max new bets per cycle', '3',      'Prevents overallocation in one pass'],
        ['Min USDC to act',        '$5',     'Below this balance, cycle is skipped'],
        ['Polygon reserve',        '$10',    'Always maintained for operating costs'],
      ]} />

      <Divider />

      <h2 className="d-h2">Resolution Detection</h2>
      <p className="d-p">POLYCLAW monitors open positions by querying the Polymarket Gamma API for each market every 15 minutes. Resolution is detected when two conditions are both true:</p>

      <Formula label="Resolution Conditions">
{`market.closed === true
AND
(YES_token_price ≥ 0.99  OR  NO_token_price ≥ 0.99)

Profit calculation:
  gross_profit = position_size × ((1 / entry_price) − 1)
  net_profit   = gross_profit × 0.98   // 2% platform fee`}
      </Formula>

      <Callout type="red" title="⚠ Markets Can Lose">
        The quant engine identifies edge — it does not guarantee wins. Prediction markets are inherently uncertain. The agent will lose positions. The deflationary loop continues regardless because fee income funds burns independently of betting results.
      </Callout>
    </div>
  ),

  risk: () => (
    <div className="d-body">
      <div className="d-eyebrow">// Legal</div>
      <h1 className="d-title">Risk &amp; <span className="d-accent">Disclaimers</span></h1>
      <p className="d-lead">POLYCLAW is an experimental autonomous system. Interacting with or holding $POLYCLAW involves significant risks. Read this section carefully.</p>

      <Callout type="red" title="⚠ Not Financial Advice">
        Nothing in this documentation, on the POLYCLAW website, or associated social media constitutes financial advice, investment advice, or a recommendation to buy, sell, or hold any asset. All information is provided for educational and informational purposes only.
      </Callout>

      <Divider />

      <h2 className="d-h2">Betting Risk</h2>
      <p className="d-p">Prediction markets are not guaranteed. The quant engine selects markets with positive expected value, but expected value is a statistical property over many repetitions — individual bets can and will lose. The agent may experience losing streaks.</p>
      <p className="d-p">During losing streaks, the Polygon USDC balance decreases. If the balance drops below the $5 minimum action threshold, betting cycles are skipped until the forward bridge replenishes the balance. The system is designed to handle losses without catastrophic failure.</p>

      <Divider />

      <h2 className="d-h2">Smart Contract Risk</h2>
      <p className="d-p">POLYCLAW interacts with several external protocols: pump.fun, PumpSwap, deBridge DLN, and Polymarket&apos;s CLOB. Each carries smart contract risk. A bug, exploit, or protocol failure in any of these systems could result in loss of funds in the treasury or betting wallets.</p>

      <Divider />

      <h2 className="d-h2">Operational Risk</h2>
      <p className="d-p">The agent runs on a server. If the server goes offline, cycles stop. If the server experiences a bug, cycles may malfunction. If API rate limits are hit, market data may be stale. The system has basic error handling but is not fault-tolerant at a production-grade infrastructure level.</p>

      <Divider />

      <h2 className="d-h2">Regulatory Risk</h2>
      <p className="d-p">Prediction markets and autonomous trading agents exist in an evolving regulatory landscape. Regulations around prediction markets, DeFi protocols, and autonomous on-chain agents vary by jurisdiction and may change. POLYCLAW does not provide legal guidance.</p>

      <Divider />

      <h2 className="d-h2">No Guarantees</h2>
      <StatGrid rows={[
        ['Price appreciation',  'Not guaranteed', 'Deflation ≠ price increase'],
        ['Betting profits',     'Not guaranteed', 'Edge is statistical, not certain'],
        ['Uptime',              'Not guaranteed', 'Operational risk exists'],
        ['Protocol safety',     'Not guaranteed', 'Third-party contract risk'],
        ['Regulatory clarity',  'Not guaranteed', 'Landscape is evolving'],
      ]} />

      <Callout type="red" title="⚠ Final Notice">
        $POLYCLAW is an experimental token with no intrinsic value. Do not invest funds you cannot afford to lose entirely. The house always burns — including yours.
      </Callout>
    </div>
  ),
}

// ── Main docs component ──────────────────────────────────────────────────────

export default function Docs() {
  const [page, setPage]         = useState('overview')
  const [mobileOpen, setMobileOpen] = useState(false)

  // Custom cursor
  useEffect(() => {
    const cur  = document.getElementById('cur')
    const cur2 = document.getElementById('cur2')
    const onMove = (e) => {
      cur.style.left  = e.clientX + 'px'; cur.style.top  = e.clientY + 'px'
      setTimeout(() => { cur2.style.left = e.clientX + 'px'; cur2.style.top = e.clientY + 'px' }, 80)
    }
    const onEnter = () => { cur.style.width = '20px'; cur.style.height = '20px'; cur2.style.borderColor = 'var(--crimson)' }
    const onLeave = () => { cur.style.width = '14px'; cur.style.height = '14px'; cur2.style.borderColor = 'var(--gold)'   }
    document.addEventListener('mousemove', onMove)
    const btns = document.querySelectorAll('button, a')
    btns.forEach(el => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave) })
    return () => {
      document.removeEventListener('mousemove', onMove)
      btns.forEach(el => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave) })
    }
  }, [page])

  // Scroll to top on page change
  useEffect(() => {
    const content = document.getElementById('docs-content')
    if (content) content.scrollTop = 0
  }, [page])

  const currentIdx = ALL_PAGES.findIndex(p => p.key === page)
  const prev       = ALL_PAGES[currentIdx - 1] ?? null
  const next       = ALL_PAGES[currentIdx + 1] ?? null

  const navigate = (key) => {
    setPage(key)
    setMobileOpen(false)
  }

  return (
    <>
      <Head>
        <title>POLYCLAW Docs — The Rulebook</title>
      </Head>

      <div id="cur" />
      <div id="cur2" />

      <div className="docs-layout">

        {/* ── Sidebar ──────────────────────────────────────────────────── */}
        <aside className={`docs-sidebar${mobileOpen ? ' mobile-open' : ''}`}>
          <div className="docs-sidebar-inner">

            <div className="docs-brand">
              <Link href="/" className="docs-brand-logo">POLY<span>CLAW</span></Link>
              <div className="docs-brand-sub">// Documentation</div>
            </div>

            <div className="docs-sidebar-rule" />

            {NAV.map(section => (
              <div key={section.section} className="docs-nav-section">
                <div className="docs-nav-section-label">{section.section}</div>
                {section.pages.map(p => (
                  <button
                    key={p.key}
                    className={`docs-nav-item${page === p.key ? ' active' : ''}`}
                    onClick={() => navigate(p.key)}
                  >
                    <span className="docs-nav-dot">{page === p.key ? '◆' : '·'}</span>
                    {p.label}
                  </button>
                ))}
              </div>
            ))}

            <div className="docs-sidebar-rule" />
            <div className="docs-sidebar-footer">
              <Link href="/" className="docs-back-link">← Back to House</Link>
            </div>
          </div>
        </aside>

        {/* ── Mobile top bar ────────────────────────────────────────────── */}
        <div className="docs-mobile-bar">
          <Link href="/" className="docs-brand-logo">POLY<span>CLAW</span></Link>
          <button className="docs-hamburger" onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* ── Content ──────────────────────────────────────────────────── */}
        <main className="docs-main" id="docs-content">
          <div className="docs-page">

            {PAGES[page]?.()}

            {/* Prev / Next nav */}
            <div className="docs-divider-line" />
            <div className="docs-prev-next">
              {prev
                ? <button className="docs-pn docs-prev" onClick={() => navigate(prev.key)}>← {prev.label}</button>
                : <div />
              }
              {next
                ? <button className="docs-pn docs-next" onClick={() => navigate(next.key)}>{next.label} →</button>
                : <div />
              }
            </div>

          </div>
        </main>

      </div>
    </>
  )
}
