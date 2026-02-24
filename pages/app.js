import { useEffect, useState, useRef } from 'react'
import Head from 'next/head'
import Link from 'next/link'

const CATEGORIES = [
  {
    id: 'politics',
    label: 'Politics Room',
    icon: '🗳️',
    suit: '♠',
    suitColor: 'var(--crimson)',
    tag: 'ROULETTE FLOOR',
    winRate: 71,
    exposure: 18400,
    openPositions: 7,
    pill: 'HIGH CONVICTION',
    pillColor: 'var(--neon-g)',
    pillBorder: 'rgba(0,255,136,.3)',
    glow: 'rgba(200,16,46,.12)',
    markets: ['US Senate runoff — GA','EU Parliament resolution','UK PM confidence vote'],
  },
  {
    id: 'crypto',
    label: 'Crypto Pit',
    icon: '₿',
    suit: '♦',
    suitColor: 'var(--gold)',
    tag: 'SLOT FLOOR',
    winRate: 68,
    exposure: 31200,
    openPositions: 12,
    pill: 'MAX EXPOSURE',
    pillColor: 'var(--gold)',
    pillBorder: 'rgba(212,175,55,.4)',
    glow: 'rgba(212,175,55,.1)',
    markets: ['BTC above $95k by April','ETH/BTC ratio > 0.06','SOL top-3 by market cap'],
  },
  {
    id: 'finance',
    label: 'Finance Table',
    icon: '📈',
    suit: '♣',
    suitColor: 'var(--ivory)',
    tag: 'BLACKJACK TABLES',
    winRate: 74,
    exposure: 22100,
    openPositions: 5,
    pill: 'STEADY EDGE',
    pillColor: 'var(--neon-b)',
    pillBorder: 'rgba(0,207,255,.3)',
    glow: 'rgba(0,207,255,.06)',
    markets: ['Fed rate cut Q2 2025','S&P 500 above 5800 EOY','CPI below 3% by June'],
  },
  {
    id: 'world',
    label: 'World Events',
    icon: '🌍',
    suit: '♥',
    suitColor: 'var(--crimson)',
    tag: 'POKER ROOM',
    winRate: 63,
    exposure: 9800,
    openPositions: 4,
    pill: 'SELECTIVE',
    pillColor: 'rgba(245,240,232,.5)',
    pillBorder: 'rgba(245,240,232,.2)',
    glow: 'rgba(245,240,232,.04)',
    markets: ['UN resolution on AI treaty','G7 summit joint communiqué','Global temp record broken'],
  },
  {
    id: 'sports',
    label: 'Sports Book',
    icon: '⚡',
    suit: '♠',
    suitColor: 'var(--ivory)',
    tag: 'DICE TABLE',
    winRate: 59,
    exposure: 6600,
    openPositions: 3,
    pill: 'LOW WEIGHT',
    pillColor: 'rgba(245,240,232,.4)',
    pillBorder: 'rgba(245,240,232,.15)',
    glow: 'rgba(245,240,232,.03)',
    markets: ['NBA Finals Game 7','Super Bowl LX winner','UFC 310 main event'],
  },
  {
    id: 'science',
    label: 'Science & Tech',
    icon: '🔬',
    suit: '★',
    suitColor: 'var(--neon-g)',
    tag: 'HIGH ROLLER SUITE',
    winRate: 77,
    exposure: 14300,
    openPositions: 6,
    pill: 'ALPHA EDGE',
    pillColor: 'var(--neon-g)',
    pillBorder: 'rgba(0,255,136,.35)',
    glow: 'rgba(0,255,136,.07)',
    markets: ['GPT-5 released before July','Nuclear fusion net gain Q1','Mars mission launch confirmed'],
  },
]

const INIT_POSITIONS = [
  { id: 1, market: 'Fed rate cut — May FOMC meeting', cat: 'FINANCE', dir: 'YES', entry: 0.62, current: 0.71, size: 4200, status: 'OPEN' },
  { id: 2, market: 'BTC above $95k by April 30', cat: 'CRYPTO', dir: 'YES', entry: 0.48, current: 0.54, size: 8100, status: 'OPEN' },
  { id: 3, market: 'US Senate seat flips — GA special', cat: 'POLITICS', dir: 'NO', entry: 0.38, current: 0.31, size: 3600, status: 'OPEN' },
  { id: 4, market: 'GPT-5 released before July 2025', cat: 'SCIENCE', dir: 'YES', entry: 0.55, current: 0.68, size: 5500, status: 'RESOLVING' },
  { id: 5, market: 'ETH/BTC ratio above 0.06 by Q2', cat: 'CRYPTO', dir: 'YES', entry: 0.41, current: 0.39, size: 6200, status: 'OPEN' },
  { id: 6, market: 'CPI below 3% by June 2025', cat: 'FINANCE', dir: 'YES', entry: 0.57, current: 0.63, size: 2900, status: 'OPEN' },
]

const BURN_INIT = [
  { id: 1, amount: 4820, reason: 'US election market closed — profit incinerated', time: '2s ago' },
  { id: 2, amount: 1240, reason: 'Buyback from treasury — tokens destroyed', time: '4m ago' },
  { id: 3, amount: 3310, reason: 'GPT-5 position partial close — burned', time: '9m ago' },
  { id: 4, amount: 890,  reason: 'Scheduled buyback — permanent removal', time: '14m ago' },
  { id: 5, amount: 2100, reason: 'Fed resolution — profit incinerated', time: '22m ago' },
]

export default function App() {
  const [selected, setSelected] = useState(null)
  const [positions, setPositions] = useState(INIT_POSITIONS)
  const [burns, setBurns] = useState(BURN_INIT)
  const [totalBurned, setTotalBurned] = useState(847392)
  const [agentPnl, setAgentPnl] = useState(+2847)
  const [tick, setTick] = useState(0)
  const [treasurySOL, setTreasurySOL] = useState(null)
  const [agentOnline, setAgentOnline] = useState(false)

  // Custom cursor
  useEffect(() => {
    const cur = document.getElementById('cur')
    const cur2 = document.getElementById('cur2')
    if (!cur || !cur2) return
    const onMove = (e) => {
      cur.style.left = e.clientX + 'px'; cur.style.top = e.clientY + 'px'
      setTimeout(() => { cur2.style.left = e.clientX + 'px'; cur2.style.top = e.clientY + 'px' }, 80)
    }
    const onEnter = () => { cur.style.width='20px';cur.style.height='20px';cur2.style.borderColor='var(--crimson)' }
    const onLeave = () => { cur.style.width='14px';cur.style.height='14px';cur2.style.borderColor='var(--gold)' }
    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('button,a').forEach(el => {
      el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave)
    })
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  // Poll real agent feed
  useEffect(() => {
    const TYPE_LABEL = { burn:'BURN', buy:'BUY', raid:'RAID', vault:'FEES', hunt:'HUNT', hold:'HOLD', bet:'BET', win:'WIN', bridge:'BRIDGE' }

    function extractTokens(detail) {
      const m = detail.match(/([\d,]+)\s*\$POLYCLAW/)
      if (m) return parseInt(m[1].replace(/,/g,''))
      const sol = detail.match(/([\d.]+)\s*SOL/)
      if (sol) return Math.round(parseFloat(sol[1]) * 1000)
      return 0
    }

    function timeAgo(iso) {
      const diff = (Date.now() - new Date(iso).getTime()) / 1000
      if (diff < 60)  return `${Math.round(diff)}s ago`
      if (diff < 3600) return `${Math.round(diff/60)}m ago`
      return `${Math.round(diff/3600)}h ago`
    }

    const poll = async () => {
      try {
        const res = await fetch('/api/feed')
        if (!res.ok) return
        const data = await res.json()

        const s = data.stats
        if (s) {
          if (s.totalBurned > 0)     setTotalBurned(s.totalBurned)
          if (s.treasurySOL != null) setTreasurySOL(s.treasurySOL)
          if (s.totalBoughtBack > 0) setAgentPnl(Math.round(s.totalBoughtBack * 100) / 100)
        }

        if (data.activity?.length) {
          setAgentOnline(true)
          setBurns(data.activity.map(a => ({
            id:        a.id,
            amount:    extractTokens(a.detail),
            reason:    a.detail,
            time:      timeAgo(a.timestamp),
            txHash:    a.txHash,
            solscanUrl: a.solscanUrl,
            typeLabel: TYPE_LABEL[a.type] ?? a.type.toUpperCase(),
            agentName: a.agent,
          })))
        }
      } catch { /* keep showing mock data if agent is offline */ }
    }

    poll()
    const iv = setInterval(poll, 5000)
    return () => clearInterval(iv)
  }, [])

  // Simulate live P&L drift
  useEffect(() => {
    const iv = setInterval(() => {
      setPositions(prev => prev.map(p => {
        const drift = (Math.random() - 0.48) * 0.012
        const next = Math.min(0.99, Math.max(0.01, p.current + drift))
        return { ...p, current: parseFloat(next.toFixed(3)) }
      }))
      setAgentPnl(prev => prev + Math.floor((Math.random() - 0.3) * 120))
      setTick(t => t + 1)
    }, 2800)
    return () => clearInterval(iv)
  }, [])

  // Simulate burns
  useEffect(() => {
    const burnReasons = [
      'Market profit incinerated on-chain',
      'Buyback executed — tokens destroyed',
      'Resolved position — burn triggered',
      'Treasury sweep — permanent removal',
    ]
    const iv = setInterval(() => {
      const amt = Math.floor(Math.random() * 6000) + 400
      setTotalBurned(prev => prev + amt)
      setBurns(prev => [
        { id: Date.now(), amount: amt, reason: burnReasons[Math.floor(Math.random()*burnReasons.length)], time: 'just now' },
        ...prev.slice(0, 7)
      ])
    }, 6000)
    return () => clearInterval(iv)
  }, [])

  const activeCategory = selected ? CATEGORIES.find(c => c.id === selected) : null
  const totalExposure = CATEGORIES.reduce((s, c) => s + c.exposure, 0)
  const totalOpen = CATEGORIES.reduce((s, c) => s + c.openPositions, 0)
  const avgWin = Math.round(CATEGORIES.reduce((s, c) => s + c.winRate, 0) / CATEGORIES.length)

  return (
    <>
      <Head><title>THE FLOOR — POLYCLAW</title></Head>

      <div id="cur" /><div id="cur2" />

      {/* NAV */}
      <nav>
        <Link href="/" className="nav-logo">POLY<span>CLAW</span></Link>
        <div className="nav-links">
          <a href="#floor">The Floor</a>
          <a href="#positions">Positions</a>
          <a href="#burns">Burn Feed</a>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div className="agent-live-pill" style={agentOnline ? {} : {color:'rgba(245,240,232,.3)', borderColor:'rgba(245,240,232,.1)'}}>
            <span className="live-dot" style={agentOnline ? {} : {background:'rgba(245,240,232,.3)', boxShadow:'none'}} />
            {agentOnline ? 'AGENT LIVE' : 'AGENT STANDBY'}
          </div>
        </div>
      </nav>

      {/* AGENT STATUS BAR */}
      <div className="agent-bar">
        <div className="agent-bar-inner">
          <div className="agent-status-msg">
            <span className="agent-eye">◈</span>
            <span>The Claw is scanning {totalOpen} open positions across {CATEGORIES.length} markets</span>
          </div>
          <div className="agent-bar-stats">
            <div className="astat">
              <div className="astat-val" style={{color:'var(--neon-g)'}}>{agentPnl >= 0 ? '+' : ''}${agentPnl.toLocaleString()}</div>
              <div className="astat-label">Today&apos;s P&amp;L</div>
            </div>
            <div className="astat-sep" />
            <div className="astat">
              <div className="astat-val" style={{color:'var(--gold)'}}>
                {treasurySOL != null ? `${treasurySOL.toFixed(3)} SOL` : `$${totalExposure.toLocaleString()}`}
              </div>
              <div className="astat-label">Treasury</div>
            </div>
            <div className="astat-sep" />
            <div className="astat">
              <div className="astat-val" style={{color:'var(--crimson)'}}>{totalBurned.toLocaleString()}</div>
              <div className="astat-label">CLAW Burned</div>
            </div>
            <div className="astat-sep" />
            <div className="astat">
              <div className="astat-val">{avgWin}%</div>
              <div className="astat-label">Win Rate</div>
            </div>
          </div>
        </div>
      </div>

      <main className="floor-main">

        {/* SECTION HEADER */}
        <div className="floor-header" id="floor">
          <div className="section-eyebrow">// The Casino Floor</div>
          <h2 className="section-title">
            THE <span className="accent">AGENT</span> IS<br />
            AT EVERY <span className="danger">TABLE</span>
          </h2>
          <p className="floor-sub">PolyClaw runs autonomously across every category. You don&apos;t pick — you watch it work.</p>
        </div>

        {/* SLOT MACHINE */}
        <div className="machine-section">
          <p className="machine-eyebrow">// The Machine</p>
          <div className="slot-machine-box">
            <div className="sm-header">🎰 &nbsp; AGENT IS AT THE TABLE &nbsp; 🎰</div>
            <div className="sm-reels">
              <div className="sm-reel-wrap">
                <div className="sm-reel-label">Market</div>
                <div className="sm-reel">
                  <div className="sm-strip reel-a">
                    {['POLITICS','CRYPTO','FINANCE','WORLD','SPORTS','SCIENCE',
                      'POLITICS','CRYPTO','FINANCE','WORLD','SPORTS','SCIENCE'].map((v,i) => (
                      <div key={i} className="sm-item" style={{color:'var(--crimson)'}}>{v}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="sm-sep">◆</div>
              <div className="sm-reel-wrap">
                <div className="sm-reel-label">Action</div>
                <div className="sm-reel">
                  <div className="sm-strip reel-b">
                    {['SCANNING','BETTING','BURNING','WINNING','BUYING','ANALYZING',
                      'SCANNING','BETTING','BURNING','WINNING','BUYING','ANALYZING'].map((v,i) => (
                      <div key={i} className="sm-item" style={{color:'var(--gold)'}}>{v}</div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="sm-sep">◆</div>
              <div className="sm-reel-wrap">
                <div className="sm-reel-label">Amount</div>
                <div className="sm-reel">
                  <div className="sm-strip reel-c">
                    {['$8,100','$4,200','$3,600','$5,500','$2,900','$6,200',
                      '$8,100','$4,200','$3,600','$5,500','$2,900','$6,200'].map((v,i) => (
                      <div key={i} className="sm-item" style={{color:'var(--neon-g)'}}>{v}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="sm-scanline" />
            <div className="sm-footer">WIN · BURN · REPEAT · WIN · BURN · REPEAT · WIN · BURN · REPEAT · WIN · BURN · REPEAT</div>
          </div>
        </div>

        {/* CATEGORY GRID */}
        <div className="cat-grid">
          {CATEGORIES.map(cat => {
            const pnlPct = ((cat.winRate - 50) / 50 * 100).toFixed(0)
            return (
              <div
                key={cat.id}
                className={`cat-card${selected === cat.id ? ' active' : ''}`}
                style={{'--glow': cat.glow}}
                onClick={() => setSelected(selected === cat.id ? null : cat.id)}
              >
                <div className="cat-top-bar" style={{background:`linear-gradient(90deg,transparent,${cat.suitColor},transparent)`}} />
                <div className="cat-tag">{cat.tag}</div>
                <div className="cat-icon">{cat.icon}</div>
                <div className="cat-suit" style={{color:cat.suitColor}}>{cat.suit}</div>
                <div className="cat-label">{cat.label}</div>

                <div className="cat-stats">
                  <div className="cat-stat">
                    <div className="cat-stat-val" style={{color:'var(--neon-g)'}}>{cat.winRate}%</div>
                    <div className="cat-stat-lbl">Win Rate</div>
                  </div>
                  <div className="cat-stat">
                    <div className="cat-stat-val" style={{color:'var(--gold)'}}>
                      ${(cat.exposure/1000).toFixed(1)}k
                    </div>
                    <div className="cat-stat-lbl">Exposure</div>
                  </div>
                  <div className="cat-stat">
                    <div className="cat-stat-val">{cat.openPositions}</div>
                    <div className="cat-stat-lbl">Open</div>
                  </div>
                </div>

                <span className="cat-pill" style={{color:cat.pillColor,borderColor:cat.pillBorder}}>
                  {cat.pill}
                </span>
              </div>
            )
          })}
        </div>

        {/* CATEGORY DRILL-DOWN */}
        {activeCategory && (
          <div className="cat-detail">
            <div className="cat-detail-top-bar" style={{background:`linear-gradient(90deg,transparent,${activeCategory.suitColor},transparent)`}} />
            <div className="cat-detail-header">
              <div>
                <div className="section-eyebrow">// {activeCategory.tag}</div>
                <h3 className="cat-detail-title">{activeCategory.icon} {activeCategory.label.toUpperCase()}</h3>
              </div>
              <button className="close-detail" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="cat-detail-body">
              <div className="cat-detail-markets">
                <div className="detail-label">Agent&apos;s Active Markets</div>
                {activeCategory.markets.map((m, i) => (
                  <div key={i} className="detail-market-row">
                    <span className="detail-market-num">0{i+1}</span>
                    <span className="detail-market-name">{m}</span>
                    <span className="detail-market-status">
                      <span className="live-dot" style={{width:6,height:6}} /> OPEN
                    </span>
                  </div>
                ))}
              </div>
              <div className="cat-detail-aside">
                <div className="detail-big-stat">
                  <div className="detail-big-val" style={{color:'var(--neon-g)'}}>{activeCategory.winRate}%</div>
                  <div className="detail-big-lbl">Category Win Rate</div>
                </div>
                <div className="detail-big-stat">
                  <div className="detail-big-val" style={{color:'var(--gold)'}}>
                    ${activeCategory.exposure.toLocaleString()}
                  </div>
                  <div className="detail-big-lbl">Total Exposure</div>
                </div>
                <div className="detail-note">
                  The agent selects and sizes all positions autonomously. No user input. No manual override.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ROULETTE ALLOCATION */}
        <div className="roulette-section">
          <div className="roulette-inner">
            <div className="roulette-text">
              <div className="section-eyebrow">// Portfolio Allocation</div>
              <h3 className="roulette-title">WHERE THE<br /><span className="accent">CLAW</span> PLAYS</h3>
              <div className="roulette-legend">
                {CATEGORIES.map(cat => {
                  const total = CATEGORIES.reduce((s,c) => s + c.exposure, 0)
                  const pct = Math.round(cat.exposure / total * 100)
                  const dotColor = cat.suitColor === 'var(--ivory)'
                    ? 'rgba(245,240,232,.6)'
                    : cat.suitColor === 'var(--crimson)' ? '#C8102E'
                    : cat.suitColor === 'var(--gold)' ? '#D4AF37'
                    : cat.suitColor === 'var(--neon-g)' ? '#00FF88'
                    : cat.suitColor
                  return (
                    <div key={cat.id} className="legend-row">
                      <div className="legend-dot" style={{background: dotColor}} />
                      <span className="legend-name">{cat.label}</span>
                      <span className="legend-pct">{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="roulette-wheel-wrap">
              <div className="roulette-wheel-outer">
                <div className="roulette-ticks">
                  {Array.from({length:36}).map((_,i) => (
                    <div key={i} className="roulette-tick" style={{transform:`rotate(${i*10}deg)`}} />
                  ))}
                </div>
                <div className="roulette-wheel" />
                <div className="roulette-hub">
                  <div className="hub-inner">◈</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* POSITIONS + BURNS */}
        <div className="bottom-grid">

          {/* ACTIVE POSITIONS */}
          <div className="positions-panel" id="positions">
            <div className="panel-header">
              <div className="live-dot" />
              <span className="panel-title">Agent&apos;s Open Positions</span>
            </div>
            <div className="pos-table">
              <div className="pos-thead">
                <span>Market</span>
                <span>Cat</span>
                <span>Side</span>
                <span>Entry</span>
                <span>Now</span>
                <span>P&amp;L</span>
                <span>Status</span>
              </div>
              {positions.map(p => {
                const pnl = ((p.current - p.entry) * p.size * (p.dir === 'YES' ? 1 : -1))
                const pnlPos = pnl >= 0
                return (
                  <div key={p.id} className="pos-row">
                    <span className="pos-market">{p.market}</span>
                    <span className="pos-cat">{p.cat}</span>
                    <span className="pos-dir" style={{color: p.dir === 'YES' ? 'var(--neon-g)' : 'var(--neon-r)'}}>{p.dir}</span>
                    <span className="pos-val">{p.entry.toFixed(2)}</span>
                    <span className="pos-val" style={{color: p.current > p.entry ? 'var(--neon-g)' : 'var(--neon-r)'}}>
                      {p.current.toFixed(2)}
                    </span>
                    <span className="pos-pnl" style={{color: pnlPos ? 'var(--neon-g)' : 'var(--neon-r)'}}>
                      {pnlPos ? '+' : ''}${Math.abs(pnl).toFixed(0)}
                    </span>
                    <span className={`pos-status ${p.status === 'RESOLVING' ? 'resolving' : ''}`}>
                      {p.status === 'RESOLVING' && <span className="live-dot" style={{width:6,height:6,background:'var(--gold)',boxShadow:'0 0 6px var(--gold)'}} />}
                      {p.status}
                    </span>
                  </div>
                )
              })}
            </div>
            <div className="positions-note">
              All positions opened and managed autonomously by the PolyClaw agent. Profits route directly to burn.
            </div>
          </div>

          {/* BURN FEED */}
          <div className="burn-panel" id="burns">
            <div className="panel-header">
              <span style={{fontSize:16}}>🔥</span>
              <span className="panel-title">Live Burn Feed</span>
            </div>
            <div className="burn-total-display">
              <div className="burn-total-num">{totalBurned.toLocaleString()}</div>
              <div className="burn-total-lbl">CLAW Permanently Destroyed</div>
            </div>
            <div className="burn-list">
              {burns.map(b => (
                <div key={b.id} className="burn-row">
                  <div className="burn-row-top">
                    <span className="burn-amount">
                      {b.typeLabel
                        ? <span className={`burn-type-tag burn-type-${(b.typeLabel||'').toLowerCase()}`}>{b.typeLabel}</span>
                        : null}
                      {b.amount > 0 ? ` ${b.amount.toLocaleString()}` : ''}
                    </span>
                    <span className="burn-time">{b.time}</span>
                  </div>
                  <div className="burn-reason">{b.reason}</div>
                  {b.solscanUrl && (
                    <a className="burn-tx-link" href={b.solscanUrl} target="_blank" rel="noopener noreferrer">
                      view on solscan →
                    </a>
                  )}
                </div>
              ))}
            </div>
            <div className="burn-note">
              Every profit. Every buyback. Gone forever.
            </div>
          </div>

        </div>

        {/* PHILOSOPHY BANNER */}
        <div className="philosophy-bar">
          <div className="philo-suit">♠</div>
          <div className="philo-text">
            <div className="philo-title">You don&apos;t bet. You hold.</div>
            <div className="philo-sub">The agent bets for the protocol. Every win compresses supply. Every loss is the cost of the game. The claw never folds.</div>
          </div>
          <div className="philo-suit">♠</div>
        </div>

      </main>

      <footer>
        <div className="footer-logo">POLY<span>CLAW</span></div>
        <div className="footer-copy">© 2025 POLYCLAW · Autonomous · Deflationary · Relentless<br />Not financial advice. The house always burns.</div>
        <div className="footer-links">
          <a href="#">Twitter</a>
          <a href="#">Telegram</a>
          <a href="#">Docs</a>
          <a href="#">Audit</a>
        </div>
      </footer>

      <style jsx>{`
        .floor-main {
          padding-top: 72px;
          min-height: 100vh;
        }

        /* NAV OVERRIDE */
        .agent-live-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          color: var(--neon-g);
          border: 1px solid rgba(0,255,136,.25);
          padding: 8px 16px;
          text-transform: uppercase;
        }

        /* AGENT BAR */
        .agent-bar {
          background: linear-gradient(90deg, var(--velvet), #160B1E, var(--velvet));
          border-bottom: 1px solid rgba(212,175,55,.2);
          padding: 0 60px;
          position: sticky;
          top: 72px;
          z-index: 900;
        }
        .agent-bar-inner {
          max-width: 1300px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 52px;
          gap: 32px;
        }
        .agent-status-msg {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          letter-spacing: 2px;
          color: rgba(245,240,232,.4);
          white-space: nowrap;
        }
        .agent-eye {
          color: var(--gold);
          font-size: 14px;
          animation: flickerGold 4s infinite;
        }
        .agent-bar-stats {
          display: flex;
          align-items: center;
          gap: 0;
        }
        .astat {
          text-align: center;
          padding: 0 24px;
        }
        .astat-val {
          font-family: 'Cinzel Decorative', serif;
          font-size: 15px;
          color: var(--ivory);
          line-height: 1;
          margin-bottom: 3px;
        }
        .astat-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 3px;
          color: rgba(245,240,232,.3);
          text-transform: uppercase;
        }
        .astat-sep {
          width: 1px;
          height: 28px;
          background: rgba(212,175,55,.15);
        }
        @media(max-width: 960px) {
          .agent-bar { padding: 0 16px; }
          .agent-status-msg { display: none; }
          .astat { padding: 0 12px; }
        }

        /* FLOOR HEADER */
        .floor-header {
          text-align: center;
          padding: 80px 60px 60px;
          position: relative;
        }
        .floor-sub {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 16px;
          color: var(--dim);
          margin-top: 20px;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.8;
        }

        /* CATEGORY GRID */
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 60px 60px;
        }
        @media(max-width: 960px) { .cat-grid { grid-template-columns: 1fr 1fr; padding: 0 24px 40px; } }
        @media(max-width: 600px) { .cat-grid { grid-template-columns: 1fr; } }

        .cat-card {
          background: linear-gradient(160deg, #1A0E22 0%, #0D070F 100%);
          border: 1px solid rgba(212,175,55,.18);
          padding: 36px 28px 28px;
          position: relative;
          cursor: none;
          transition: border-color .3s, transform .2s, box-shadow .3s;
          overflow: hidden;
        }
        .cat-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, var(--glow, rgba(212,175,55,.06)), transparent 60%);
          opacity: 0;
          transition: opacity .3s;
        }
        .cat-card:hover, .cat-card.active {
          border-color: rgba(212,175,55,.5);
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(0,0,0,.7), 0 0 30px var(--glow, rgba(212,175,55,.08));
        }
        .cat-card:hover::before, .cat-card.active::before { opacity: 1; }
        .cat-card.active { border-color: rgba(212,175,55,.7); }

        .cat-top-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
        }
        .cat-tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 4px;
          color: rgba(212,175,55,.4);
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .cat-icon {
          font-size: 36px;
          margin-bottom: 6px;
          display: block;
        }
        .cat-suit {
          font-size: 20px;
          position: absolute;
          top: 20px;
          right: 24px;
          opacity: .5;
        }
        .cat-label {
          font-family: 'Cinzel Decorative', serif;
          font-size: 16px;
          letter-spacing: 1px;
          color: var(--ivory);
          margin-bottom: 24px;
          line-height: 1.3;
        }
        .cat-stats {
          display: flex;
          gap: 0;
          margin-bottom: 20px;
          background: rgba(0,0,0,.3);
          border: 1px solid rgba(212,175,55,.08);
        }
        .cat-stat {
          flex: 1;
          padding: 12px 8px;
          text-align: center;
          border-right: 1px solid rgba(212,175,55,.08);
        }
        .cat-stat:last-child { border-right: none; }
        .cat-stat-val {
          font-family: 'Cinzel Decorative', serif;
          font-size: 18px;
          color: var(--ivory);
          line-height: 1;
          margin-bottom: 4px;
        }
        .cat-stat-lbl {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 2px;
          color: rgba(245,240,232,.3);
          text-transform: uppercase;
        }
        .cat-pill {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 3px;
          text-transform: uppercase;
          border: 1px solid;
          padding: 5px 12px;
          display: inline-block;
        }

        /* CATEGORY DETAIL */
        .cat-detail {
          max-width: 1200px;
          margin: 0 auto 40px;
          padding: 0 60px;
        }
        @media(max-width:960px) { .cat-detail { padding: 0 24px; } }
        .cat-detail > div:first-child + div {
          background: linear-gradient(160deg, #1C0F24, #0F0814);
          border: 1px solid rgba(212,175,55,.3);
          position: relative;
          overflow: hidden;
          animation: fadeDown .3s ease both;
        }
        .cat-detail-top-bar {
          height: 2px;
          width: 100%;
        }
        .cat-detail-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 32px 40px 0;
        }
        .cat-detail-title {
          font-family: 'Cinzel Decorative', serif;
          font-size: 22px;
          color: var(--ivory);
          margin-top: 8px;
        }
        .close-detail {
          background: none;
          border: none;
          color: rgba(245,240,232,.3);
          font-size: 20px;
          cursor: none;
          padding: 4px 8px;
          transition: color .2s;
        }
        .close-detail:hover { color: var(--gold); }
        .cat-detail-body {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 40px;
          padding: 28px 40px 40px;
        }
        @media(max-width:760px) { .cat-detail-body { grid-template-columns: 1fr; } }
        .detail-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 4px;
          color: rgba(212,175,55,.5);
          text-transform: uppercase;
          margin-bottom: 16px;
        }
        .detail-market-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(212,175,55,.07);
        }
        .detail-market-num {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          color: rgba(212,175,55,.4);
          letter-spacing: 2px;
          flex-shrink: 0;
        }
        .detail-market-name {
          font-family: 'Playfair Display', serif;
          font-size: 14px;
          color: var(--ivory);
          flex: 1;
        }
        .detail-market-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 3px;
          color: var(--neon-g);
          flex-shrink: 0;
        }
        .cat-detail-aside {
          border-left: 1px solid rgba(212,175,55,.1);
          padding-left: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .detail-big-stat {}
        .detail-big-val {
          font-family: 'Cinzel Decorative', serif;
          font-size: 36px;
          line-height: 1;
          margin-bottom: 6px;
        }
        .detail-big-lbl {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 3px;
          color: rgba(245,240,232,.35);
          text-transform: uppercase;
        }
        .detail-note {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 12px;
          color: rgba(245,240,232,.3);
          line-height: 1.8;
          margin-top: auto;
          border-top: 1px solid rgba(212,175,55,.08);
          padding-top: 20px;
        }

        /* BOTTOM GRID */
        .bottom-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 60px 80px;
        }
        @media(max-width:960px) { .bottom-grid { grid-template-columns: 1fr; padding: 0 24px 60px; } }

        /* POSITIONS PANEL */
        .positions-panel, .burn-panel {
          background: linear-gradient(160deg, #130A18, #0D070F);
          border: 1px solid rgba(212,175,55,.18);
          overflow: hidden;
        }
        .panel-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 18px 24px;
          background: linear-gradient(90deg, rgba(200,16,46,.12), transparent);
          border-bottom: 1px solid rgba(212,175,55,.12);
        }
        .panel-title {
          font-family: 'Cinzel', serif;
          font-size: 11px;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: var(--gold);
        }
        .pos-table { width: 100%; overflow-x: auto; }
        .pos-thead {
          display: grid;
          grid-template-columns: 2fr .6fr .45fr .45fr .45fr .6fr .7fr;
          padding: 10px 20px;
          border-bottom: 1px solid rgba(212,175,55,.1);
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(245,240,232,.25);
          gap: 8px;
        }
        .pos-row {
          display: grid;
          grid-template-columns: 2fr .6fr .45fr .45fr .45fr .6fr .7fr;
          padding: 14px 20px;
          border-bottom: 1px solid rgba(212,175,55,.06);
          align-items: center;
          gap: 8px;
          transition: background .2s;
          animation: rowIn .3s ease both;
        }
        .pos-row:hover { background: rgba(212,175,55,.03); }
        .pos-market {
          font-family: 'Playfair Display', serif;
          font-size: 12px;
          color: var(--dim);
          line-height: 1.4;
        }
        .pos-cat {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 2px;
          color: rgba(212,175,55,.5);
          text-transform: uppercase;
        }
        .pos-dir {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 2px;
          font-weight: bold;
        }
        .pos-val {
          font-family: 'Share Tech Mono', monospace;
          font-size: 11px;
          color: var(--dim);
        }
        .pos-pnl {
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px;
          font-weight: bold;
        }
        .pos-status {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 2px;
          color: rgba(245,240,232,.35);
          text-transform: uppercase;
        }
        .pos-status.resolving { color: var(--gold); }
        .positions-note {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(245,240,232,.2);
          padding: 14px 20px;
          border-top: 1px solid rgba(212,175,55,.08);
          line-height: 1.6;
        }

        /* BURN PANEL */
        .burn-total-display {
          padding: 28px 24px 20px;
          border-bottom: 1px solid rgba(212,175,55,.1);
          text-align: center;
        }
        .burn-total-num {
          font-family: 'Cinzel Decorative', serif;
          font-size: 32px;
          color: var(--crimson);
          text-shadow: 0 0 20px var(--neon-r), 0 0 40px rgba(255,0,60,.3);
          line-height: 1;
          margin-bottom: 6px;
        }
        .burn-total-lbl {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 3px;
          color: rgba(200,16,46,.6);
          text-transform: uppercase;
        }
        .burn-list {
          padding: 0 20px;
        }
        .burn-row {
          padding: 14px 0;
          border-bottom: 1px solid rgba(212,175,55,.06);
          animation: rowIn .3s ease both;
        }
        .burn-row-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .burn-amount {
          font-family: 'Share Tech Mono', monospace;
          font-size: 12px;
          color: var(--neon-r);
          font-weight: bold;
        }
        .burn-time {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          color: rgba(245,240,232,.25);
          letter-spacing: 1px;
        }
        .burn-reason {
          font-family: 'Playfair Display', serif;
          font-size: 11px;
          color: rgba(245,240,232,.35);
          line-height: 1.5;
        }
        .burn-type-tag {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 3px;
          padding: 2px 7px;
          border: 1px solid;
          display: inline-block;
          vertical-align: middle;
          margin-right: 4px;
        }
        .burn-type-burn  { color: var(--neon-r); border-color: rgba(255,0,60,.3); }
        .burn-type-buy   { color: var(--gold);   border-color: rgba(212,175,55,.3); }
        .burn-type-raid  { color: var(--gold);   border-color: rgba(212,175,55,.3); }
        .burn-type-fees  { color: var(--neon-b); border-color: rgba(0,207,255,.3); }
        .burn-type-hunt  { color: var(--neon-g); border-color: rgba(0,255,136,.3); }
        .burn-type-hold  { color: rgba(245,240,232,.3); border-color: rgba(245,240,232,.1); }
        .burn-type-bet    { color: var(--neon-g); border-color: rgba(0,255,136,.3); }
        .burn-type-win    { color: var(--gold);   border-color: rgba(212,175,55,.5); }
        .burn-type-bridge { color: var(--neon-b); border-color: rgba(0,207,255,.3); }
        .burn-tx-link {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(212,175,55,.4);
          text-decoration: none;
          display: inline-block;
          margin-top: 4px;
          transition: color .2s;
        }
        .burn-tx-link:hover { color: var(--gold); }

        .burn-note {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 11px;
          color: rgba(245,240,232,.2);
          padding: 14px 20px;
          border-top: 1px solid rgba(212,175,55,.08);
          text-align: center;
        }

        /* SLOT MACHINE */
        .machine-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 60px 64px;
          text-align: center;
        }
        .machine-eyebrow {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 6px;
          text-transform: uppercase;
          color: rgba(212,175,55,.5);
          margin-bottom: 20px;
        }
        .slot-machine-box {
          display: inline-block;
          background: #050208;
          border: 2px solid rgba(212,175,55,.3);
          border-radius: 4px;
          position: relative;
          overflow: hidden;
          min-width: 560px;
          box-shadow: 0 0 0 1px rgba(0,0,0,.6), inset 0 0 80px rgba(0,0,0,.9),
                      0 0 80px rgba(212,175,55,.07), 0 0 120px rgba(200,16,46,.04);
        }
        @media(max-width:640px) { .slot-machine-box { min-width: 0; width: 100%; } .machine-section { padding: 0 16px 48px; } }
        .sm-header {
          font-family: 'Share Tech Mono', monospace;
          font-size: 10px;
          letter-spacing: 5px;
          color: rgba(212,175,55,.45);
          padding: 14px 32px 12px;
          border-bottom: 1px solid rgba(212,175,55,.1);
          background: linear-gradient(180deg, rgba(212,175,55,.03), transparent);
        }
        .sm-reels {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 24px;
        }
        .sm-reel-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          flex: 1;
          padding: 20px 0;
          border-right: 1px solid rgba(212,175,55,.08);
        }
        .sm-reel-wrap:last-child { border-right: none; }
        .sm-reel-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 8px;
          letter-spacing: 4px;
          color: rgba(212,175,55,.3);
          text-transform: uppercase;
        }
        .sm-reel {
          height: 58px;
          overflow: hidden;
          width: 100%;
          position: relative;
          border-top: 1px solid rgba(212,175,55,.15);
          border-bottom: 1px solid rgba(212,175,55,.15);
        }
        .sm-reel::before, .sm-reel::after {
          content: '';
          position: absolute;
          left: 0; right: 0;
          height: 18px;
          z-index: 2;
          pointer-events: none;
        }
        .sm-reel::before { top: 0; background: linear-gradient(180deg, #050208, transparent); }
        .sm-reel::after  { bottom: 0; background: linear-gradient(0deg, #050208, transparent); }
        .sm-strip { display: flex; flex-direction: column; }
        .sm-item {
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Cinzel Decorative', serif;
          font-size: 13px;
          letter-spacing: 2px;
          flex-shrink: 0;
        }
        .sm-sep {
          color: rgba(212,175,55,.18);
          font-size: 11px;
          padding: 0 6px;
          flex-shrink: 0;
        }
        @keyframes reelA { 0% { transform: translateY(0); } 100% { transform: translateY(-348px); } }
        @keyframes reelB { 0% { transform: translateY(0); } 100% { transform: translateY(-348px); } }
        @keyframes reelC { 0% { transform: translateY(0); } 100% { transform: translateY(-348px); } }
        .reel-a { animation: reelA 9s linear infinite; }
        .reel-b { animation: reelB 6.5s linear infinite; }
        .reel-c { animation: reelC 4.8s linear infinite; }
        .sm-scanline {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.07) 2px, rgba(0,0,0,.07) 4px);
          pointer-events: none;
          z-index: 3;
        }
        .sm-footer {
          font-family: 'Share Tech Mono', monospace;
          font-size: 9px;
          letter-spacing: 5px;
          color: rgba(200,16,46,.35);
          padding: 10px 32px 13px;
          border-top: 1px solid rgba(212,175,55,.08);
          overflow: hidden;
          white-space: nowrap;
          animation: marqueeScroll 10s linear infinite;
          background: linear-gradient(180deg, transparent, rgba(200,16,46,.02));
        }

        /* ROULETTE WHEEL */
        .roulette-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 60px 64px;
        }
        @media(max-width:960px) { .roulette-section { padding: 0 24px 48px; } }
        .roulette-inner {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 60px;
          align-items: center;
          background: linear-gradient(160deg, #12091A, #0A060F);
          border: 1px solid rgba(212,175,55,.14);
          padding: 52px 52px 52px 60px;
        }
        @media(max-width:900px) { .roulette-inner { grid-template-columns: 1fr; padding: 36px 28px; } }
        .roulette-title {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(28px, 3.5vw, 48px);
          letter-spacing: 2px;
          color: var(--ivory);
          margin: 12px 0 32px;
          line-height: 1.1;
        }
        .roulette-legend { display: flex; flex-direction: column; gap: 12px; }
        .legend-row { display: flex; align-items: center; gap: 12px; }
        .legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .legend-name {
          font-family: 'Cinzel', serif;
          font-size: 10px;
          letter-spacing: 3px;
          color: rgba(245,240,232,.45);
          text-transform: uppercase;
          flex: 1;
        }
        .legend-pct {
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          color: var(--gold);
          letter-spacing: 2px;
        }
        .roulette-wheel-wrap { display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .roulette-wheel-outer { position: relative; width: 280px; height: 280px; }
        .roulette-ticks { position: absolute; inset: 0; animation: rouletteSpin 16s linear infinite; }
        .roulette-tick {
          position: absolute;
          top: 0; left: 50%;
          transform-origin: 0.5px 140px;
          width: 1px; height: 16px;
          background: rgba(212,175,55,.25);
          margin-left: -0.5px;
        }
        .roulette-wheel {
          position: absolute;
          inset: 22px;
          border-radius: 50%;
          animation: rouletteSpin 16s linear infinite;
          background: conic-gradient(
            #C8102E 0deg 65deg,
            #D4AF37 65deg 175deg,
            #00CFFF 175deg 253deg,
            rgba(245,240,232,.55) 253deg 287deg,
            rgba(245,240,232,.25) 287deg 310deg,
            #00FF88 310deg 360deg
          );
          box-shadow: 0 0 0 2px rgba(212,175,55,.2), 0 0 40px rgba(212,175,55,.1), inset 0 0 30px rgba(0,0,0,.6);
        }
        .roulette-hub {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none;
        }
        .hub-inner {
          width: 54px; height: 54px;
          border-radius: 50%;
          background: #050208;
          border: 2px solid rgba(212,175,55,.4);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; color: var(--gold);
          box-shadow: 0 0 20px rgba(212,175,55,.3);
          animation: flickerGold 5s infinite;
        }

        /* PHILOSOPHY BAR */
        .philosophy-bar {
          display: flex;
          align-items: center;
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto 80px;
          padding: 40px 60px;
          background: linear-gradient(135deg, #120A18, #0A0510);
          border: 1px solid rgba(212,175,55,.15);
          border-left: 3px solid var(--crimson);
        }
        @media(max-width:960px) { .philosophy-bar { padding: 32px 24px; gap: 20px; } }
        .philo-suit {
          font-size: 40px;
          color: var(--crimson);
          opacity: .3;
          flex-shrink: 0;
        }
        @media(max-width:600px) { .philo-suit { display: none; } }
        .philo-title {
          font-family: 'Cinzel Decorative', serif;
          font-size: 20px;
          color: var(--gold);
          margin-bottom: 10px;
          letter-spacing: 1px;
        }
        .philo-sub {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 14px;
          color: var(--dim);
          line-height: 1.8;
          max-width: 600px;
        }
      `}</style>
    </>
  )
}
