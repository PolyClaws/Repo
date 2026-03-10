/**
 * Risk management helpers — exposure limits, drawdown checks, position caps
 */

const DEFAULTS = {
  maxExposurePct: 0.20,   // max % of bankroll in open positions
  maxSingleBetPct: 0.05,  // max % of bankroll on one bet
  maxDrawdownPct: 0.15,   // halt if drawdown exceeds this
  minLiquidity: 500,      // min market liquidity in USD
  maxLiquidity: 1_500_000, // skip illiquid mega-markets
  minEV: 0.04,            // minimum EV threshold (4%)
  minEdge: 0.07,          // minimum edge threshold (7%)
};

/**
 * Check whether a new bet fits within exposure limits
 * @param {number} bankroll
 * @param {number} currentExposure  - total USD in open positions
 * @param {number} betSize          - proposed bet in USD
 * @param {object} opts             - override DEFAULTS
 * @returns {{ ok: boolean, reason?: string }}
 */
export function checkExposure(bankroll, currentExposure, betSize, opts = {}) {
  const cfg = { ...DEFAULTS, ...opts };

  if (betSize > bankroll * cfg.maxSingleBetPct) {
    return { ok: false, reason: `Bet exceeds single-bet cap (${cfg.maxSingleBetPct * 100}% of bankroll)` };
  }

  if (currentExposure + betSize > bankroll * cfg.maxExposurePct) {
    return { ok: false, reason: `Total exposure would exceed ${cfg.maxExposurePct * 100}% of bankroll` };
  }

  return { ok: true };
}

/**
 * Check if drawdown exceeds halt threshold
 * @param {number} peak   - highest bankroll recorded
 * @param {number} current
 * @param {object} opts
 * @returns {{ halted: boolean, drawdown: number }}
 */
export function drawdownCheck(peak, current, opts = {}) {
  const cfg = { ...DEFAULTS, ...opts };
  if (peak <= 0) return { halted: false, drawdown: 0 };
  const drawdown = (peak - current) / peak;
  return {
    halted: drawdown >= cfg.maxDrawdownPct,
    drawdown,
  };
}

/**
 * Filter markets by liquidity bounds
 * @param {Array<{ liquidity: number }>} markets
 * @param {object} opts
 * @returns {Array}
 */
export function filterByLiquidity(markets, opts = {}) {
  const cfg = { ...DEFAULTS, ...opts };
  return markets.filter(
    (m) => m.liquidity >= cfg.minLiquidity && m.liquidity <= cfg.maxLiquidity
  );
}

/**
 * Filter candidates by minimum EV and edge thresholds
 * @param {Array<{ ev: number, edge: number }>} candidates
 * @param {object} opts
 * @returns {Array}
 */
export function filterByEdge(candidates, opts = {}) {
  const cfg = { ...DEFAULTS, ...opts };
  return candidates.filter(
    (c) => c.ev >= cfg.minEV && c.edge >= cfg.minEdge
  );
}

/**
 * Summarise current portfolio risk
 * @param {Array<{ size: number, prob: number, odds: number }>} positions
 * @param {number} bankroll
 * @returns {{ totalExposure: number, exposurePct: number, weightedEV: number }}
 */
export function portfolioRisk(positions, bankroll) {
  const totalExposure = positions.reduce((sum, p) => sum + p.size, 0);
  const weightedEV = positions.reduce((sum, p) => {
    const ev = p.prob * p.odds - 1;
    return sum + ev * p.size;
  }, 0);

  return {
    totalExposure,
    exposurePct: bankroll > 0 ? totalExposure / bankroll : 0,
    weightedEV: totalExposure > 0 ? weightedEV / totalExposure : 0,
  };
}
