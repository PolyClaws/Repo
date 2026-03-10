/**
 * GET /api/markets
 * Returns a filtered, scored list of active Polymarket markets.
 * Query params:
 *   category  – filter by category slug (optional)
 *   limit     – max results (default 20)
 *   minEv     – minimum EV threshold, default 0.04
 */

import { filterByLiquidity, filterByEdge } from '../../lib/risk';
import { expectedValue, edge, impliedProbability } from '../../lib/kelly';

const GAMMA_API = 'https://gamma-api.polymarket.com/markets';
const CACHE_TTL = 60_000; // 1 minute

let cache = { ts: 0, data: null };

async function fetchMarkets() {
  const now = Date.now();
  if (cache.data && now - cache.ts < CACHE_TTL) return cache.data;

  const res = await fetch(
    `${GAMMA_API}?active=true&closed=false&limit=200&order=volume&ascending=false`,
    { headers: { Accept: 'application/json' } }
  );

  if (!res.ok) throw new Error(`Gamma API ${res.status}`);
  const raw = await res.json();

  cache = { ts: now, data: raw };
  return raw;
}

function scoreMarket(market) {
  const outcomes = market.outcomes || [];
  let bestEV = -Infinity;
  let bestEdge = -Infinity;
  let bestOutcome = null;

  for (const outcome of outcomes) {
    const price = parseFloat(outcome.price ?? 0);
    if (price <= 0 || price >= 1) continue;

    const impliedProb = price; // Polymarket prices are probabilities
    const marketOdds = 1 / price;

    // Naive edge: assume slight mis-pricing on low-probability events
    const estimatedProb = impliedProb * 1.05; // placeholder — replace with model
    const ev = expectedValue(estimatedProb, marketOdds);
    const edgeVal = edge(estimatedProb, marketOdds);

    if (ev > bestEV) {
      bestEV = ev;
      bestEdge = edgeVal;
      bestOutcome = outcome.name;
    }
  }

  return {
    id: market.id,
    question: market.question,
    category: market.category,
    liquidity: parseFloat(market.liquidityNum ?? market.liquidity ?? 0),
    volume: parseFloat(market.volume ?? 0),
    endDate: market.endDate,
    bestOutcome,
    ev: bestEV,
    edge: bestEdge,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category, limit = '20', minEv = '0.04' } = req.query;
    const maxResults = Math.min(parseInt(limit, 10) || 20, 100);
    const evThreshold = parseFloat(minEv) || 0.04;

    const raw = await fetchMarkets();

    let markets = raw.map(scoreMarket);

    // Liquidity filter
    markets = filterByLiquidity(markets);

    // EV / edge filter
    markets = filterByEdge(markets, { minEV: evThreshold, minEdge: 0.03 });

    // Category filter
    if (category) {
      markets = markets.filter(
        (m) => (m.category || '').toLowerCase() === category.toLowerCase()
      );
    }

    // Sort by EV descending
    markets.sort((a, b) => b.ev - a.ev);

    return res.status(200).json({
      markets: markets.slice(0, maxResults),
      total: markets.length,
      cached: Date.now() - cache.ts < CACHE_TTL,
    });
  } catch (err) {
    console.error('[markets]', err.message);
    return res.status(500).json({ error: 'Failed to fetch markets' });
  }
}
