import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

const CARDS = [
  {
    rank:'A', suit:'♥', suitColor:'var(--crimson)', centerFilter:'drop-shadow(0 0 12px var(--neon-r))',
    step:'// STEP 01', title:'Treasury Loads The Chamber',
    desc:'Creator fees stream on-chain into the PolyClaw treasury. Fully automated. No human touch. Pure protocol fuel.',
    backStat:'100%', backLabel:'Auto-Funded',
    backDesc:'Creator fees stream on-chain with zero human intervention. The treasury fills itself.',
  },
  {
    rank:'K', suit:'♠', suitColor:'var(--ivory)', centerFilter:'drop-shadow(0 0 12px rgba(245,240,232,.4))',
    step:'// STEP 02', title:'The Claw Reads The Table',
    desc:'PolyClaw scans hundreds of prediction markets in real time, identifying mispriced odds and exploitable alpha positions.',
    backStat:'60', backLabel:'Markets Scanned',
    backDesc:'Every 30 minutes, 60 live markets analysed for exploitable mispricing and edge.',
  },
  {
    rank:'Q', suit:'♦', suitColor:'var(--crimson)', centerFilter:'drop-shadow(0 0 12px var(--neon-r))',
    step:'// STEP 03', title:'Bets Placed. Autonomously.',
    desc:'The agent places positions with optimal sizing. Entry, exit, risk management — executed without a single human hand.',
    backStat:'$1–$3', backLabel:'Bet Sizing',
    backDesc:'Fixed-size positions. Kelly Criterion + EV threshold required before any capital is deployed.',
  },
  {
    rank:'🔥', suit:'★', suitColor:'var(--gold)', centerFilter:'drop-shadow(0 0 14px rgba(212,175,55,.7))',
    step:'// STEP 04', title:'Every Profit. Incinerated.',
    desc:"Winnings go straight to the burn. Not to holders, not to a team. The claw wins and immediately destroys. Supply shrinks forever.",
    backStat:'∞', backLabel:'Burns Forever',
    backDesc:'Profits never recirculate. Every winning token is destroyed on-chain. Supply only falls.',
  },
]

export default function Home() {
  const router = useRouter()
  const [rulesOpen, setRulesOpen] = useState(false)

  // ── Custom cursor + ambient glow + mouse parallax ───────────────────────
  useEffect(() => {
    const cur   = document.getElementById('cur')
    const cur2  = document.getElementById('cur2')
    const glow  = document.getElementById('cursor-glow')
    const onMove = (e) => {
      const mx = e.clientX, my = e.clientY
      cur.style.left  = mx + 'px'; cur.style.top  = my + 'px'
      setTimeout(() => { cur2.style.left = mx + 'px'; cur2.style.top = my + 'px' }, 80)
      if (glow) { glow.style.left = mx + 'px'; glow.style.top = my + 'px' }
      // Parallax — hero layer elements drift opposite to cursor
      const hw = window.innerWidth / 2, hh = window.innerHeight / 2
      const dx = (mx - hw) / hw, dy = (my - hh) / hh
      const diamonds = document.querySelector('.hero-diamonds')
      const suits    = document.getElementById('suitsBg')
      if (diamonds) diamonds.style.transform = `translate(${dx * -14}px,${dy * -8}px)`
      if (suits)    suits.style.transform    = `translate(${dx * -22}px,${dy * -14}px)`
    }
    const onEnter      = () => { cur.style.width = '20px'; cur.style.height = '20px'; cur2.style.borderColor = 'var(--crimson)' }
    const onLeave      = () => { cur.style.width = '14px'; cur.style.height = '14px'; cur2.style.borderColor = 'var(--gold)'   }
    const onInputEnter = () => { cur.style.width = '4px';  cur.style.height = '20px' }
    document.addEventListener('mousemove', onMove)
    const btns   = document.querySelectorAll('button, a')
    const inputs = document.querySelectorAll('input')
    btns.forEach(el   => { el.addEventListener('mouseenter', onEnter);      el.addEventListener('mouseleave', onLeave) })
    inputs.forEach(el => { el.addEventListener('mouseenter', onInputEnter); el.addEventListener('mouseleave', onLeave) })
    return () => {
      document.removeEventListener('mousemove', onMove)
      btns.forEach(el   => { el.removeEventListener('mouseenter', onEnter);      el.removeEventListener('mouseleave', onLeave) })
      inputs.forEach(el => { el.removeEventListener('mouseenter', onInputEnter); el.removeEventListener('mouseleave', onLeave) })
    }
  }, [])

  // ── Floating suits ──────────────────────────────────────────────────────
  useEffect(() => {
    const sb = document.getElementById('suitsBg')
    if (!sb) return
    const suits = ['♠','♥','♦','♣']
    const sc    = ['rgba(245,240,232,1)','rgba(200,16,46,1)','rgba(200,16,46,1)','rgba(245,240,232,1)']
    const els   = []
    for (let i = 0; i < 20; i++) {
      const el = document.createElement('div')
      el.className = 'suit-float'
      const s = Math.floor(Math.random() * 4)
      el.textContent = suits[s]; el.style.color = sc[s]
      el.style.left            = Math.random() * 100 + '%'
      el.style.fontSize        = (20 + Math.random() * 60) + 'px'
      el.style.animationDuration = (12 + Math.random() * 20) + 's'
      el.style.animationDelay  = (-Math.random() * 30) + 's'
      sb.appendChild(el); els.push(el)
    }
    return () => els.forEach(el => el.remove())
  }, [])

  // ── Count-up stats ──────────────────────────────────────────────────────
  useEffect(() => {
    const elements  = document.querySelectorAll('.cu')
    const observers = []
    elements.forEach(el => {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return
          const t = parseFloat(el.dataset.t), d = parseInt(el.dataset.d)
          let c = 0; const inc = t / 60
          const ti = setInterval(() => {
            c += inc
            if (c >= t) { c = t; clearInterval(ti) }
            el.textContent = d > 0 ? c.toFixed(d) : Math.floor(c)
          }, 25)
          obs.unobserve(el)
        })
      }, { threshold: 0.5 })
      obs.observe(el); observers.push(obs)
    })
    return () => observers.forEach(obs => obs.disconnect())
  }, [])

  // ── Burn counter slot digits ────────────────────────────────────────────
  useEffect(() => {
    let burnCount = 847392
    const updateBurn = () => {
      burnCount += Math.floor(Math.random() * 80) + 15
      const full    = burnCount.toLocaleString('en-US')
      const arr     = full.split('')
      while (arr.length < 7) arr.unshift('0')
      const slotArr = arr.slice(-7)
      ;['d0','d1','d2','d3','d4','d5','d6'].forEach((id, i) => {
        const el = document.getElementById(id)
        if (!el) return
        const nv = slotArr[i] || '0'
        if (el.textContent !== nv) {
          el.textContent = nv
          el.style.animation = 'none'
          requestAnimationFrame(() => { el.style.animation = 'digitFlip .3s ease-in-out' })
        }
      })
    }
    const iv = setInterval(updateBurn, 3000)
    return () => clearInterval(iv)
  }, [])

  // ── Live feed ───────────────────────────────────────────────────────────
  useEffect(() => {
    const fTypes = ['win','burn','bet','buy']
    const fData  = {
      win:  { texts: ['Market resolved — prediction correct','Position closed profitably','Winning bet settled on-chain'],         col: 'var(--neon-g)', pre: '+$' },
      burn: { texts: ['CLAW tokens permanently incinerated','Profit burn executed on-chain','Buyback tokens destroyed'],           col: 'var(--neon-r)', pre: '-'  },
      bet:  { texts: ['New position: upcoming Fed decision','Opening: Bitcoin dominance market','Entering: Next Apple event'],      col: 'var(--neon-b)', pre: '$'  },
      buy:  { texts: ['Open market buyback from treasury','Automated buyback at floor price','Treasury fee captured, buyback done'], col: 'var(--gold)',   pre: '$'  },
    }
    const iv = setInterval(() => {
      const body = document.getElementById('tableBody')
      if (!body) return
      const type = fTypes[Math.floor(Math.random() * fTypes.length)]
      const d    = fData[type]
      const text = d.texts[Math.floor(Math.random() * d.texts.length)]
      const amt  = Math.floor(Math.random() * 5000) + 200
      const sfx  = type === 'burn' ? ' CLAW' : ''
      const row  = document.createElement('div')
      row.className = 'table-row row-new'
      row.innerHTML = `<span class="row-time">just now</span><span class="row-type ${type}">${type.toUpperCase()}</span><span class="row-text">${text}</span><span class="row-amount" style="color:${d.col}">${d.pre}${amt.toLocaleString()}${sfx}</span>`
      body.insertBefore(row, body.firstChild)
      if (body.children.length > 10) body.removeChild(body.lastChild)
      Array.from(body.querySelectorAll('.row-time')).forEach((t, i) => {
        if (i === 0)     t.textContent = 'just now'
        else if (i < 4)  t.textContent = (i * 25) + 's ago'
        else             t.textContent = Math.floor(i * 1.8) + 'm ago'
      })
    }, 4200)
    return () => clearInterval(iv)
  }, [])

  // ── CLAW glitch ─────────────────────────────────────────────────────────
  useEffect(() => {
    const chars = ['█','▓','▒','░','₿','◆','✦','∆','#','@','%','&']
    const el    = document.querySelector('.hero-title .claw')
    if (!el) return
    const orig  = 'CLAW'
    const glitch = () => {
      if (Math.random() > 0.35) return
      const arr = orig.split('')
      const n   = Math.floor(Math.random() * 2) + 1
      for (let i = 0; i < n; i++) {
        arr[Math.floor(Math.random() * arr.length)] = chars[Math.floor(Math.random() * chars.length)]
      }
      el.textContent = arr.join('')
      setTimeout(() => { el.textContent = orig }, 60 + Math.random() * 120)
    }
    const iv = setInterval(glitch, 1800 + Math.random() * 1400)
    return () => clearInterval(iv)
  }, [])


  // ── Fire embers ─────────────────────────────────────────────────────────
  useEffect(() => {
    const container = document.getElementById('embers')
    if (!container) return
    const tracked = []
    const spawn = () => {
      const el   = document.createElement('div')
      el.className = 'ember'
      const sz   = 2 + Math.random() * 4
      const gold = Math.random() > 0.4
      el.style.cssText = `left:${10 + Math.random() * 80}%;width:${sz}px;height:${sz}px;animation-duration:${2.5 + Math.random() * 2.5}s;background:${gold ? '#FFD700' : '#FF1A3C'};--drift:${(Math.random() - 0.5) * 80}px;`
      container.appendChild(el); tracked.push(el)
      setTimeout(() => { el.remove(); const i = tracked.indexOf(el); if (i > -1) tracked.splice(i, 1) }, 5500)
    }
    const iv = setInterval(spawn, 160)
    return () => { clearInterval(iv); tracked.forEach(e => e.remove()) }
  }, [])

  // ── Escape closes rules ─────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setRulesOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // ── Chip burst ──────────────────────────────────────────────────────────
  function spawnChips(e) {
    const colors    = ['#D4AF37','#C8102E','#F5F0E8','#7B5C00','#FF1A3C','#FFD700']
    const container = document.getElementById('chips')
    const cx = e.clientX, cy = e.clientY
    for (let i = 0; i < 32; i++) {
      const chip = document.createElement('div')
      chip.className = 'chip'
      const dx = (Math.random() - 0.5) * 300
      chip.style.cssText = `left:${cx}px;top:${cy}px;background:${colors[Math.floor(Math.random()*colors.length)]};width:${8+Math.random()*10}px;height:${8+Math.random()*10}px;--dx:${dx}px;animation-duration:${0.9+Math.random()*1.2}s;animation-delay:${Math.random()*0.3}s;`
      container.appendChild(chip)
      setTimeout(() => chip.remove(), 2500)
    }
  }

  function enterHouse(e) {
    if (e) spawnChips(e)
    setTimeout(() => router.push('/app'), 400)
  }

  function openRules(e) {
    if (e) spawnChips(e)
    setRulesOpen(true)
  }

  return (
    <>
      <Head>
        <title>POLYCLAW — The House Always Burns</title>
      </Head>

      <div id="cur" />
      <div id="cur2" />
      <div id="cursor-glow" />
      <div id="chips" />

      <nav>
        <div className="nav-logo">POLY<span>CLAW</span></div>
        <div className="nav-links">
          <a href="#how">The Game</a>
          <a href="#mechanics">Mechanics</a>
          <a href="#burn">The Burn</a>
          <a href="#table">Live Table</a>
          <a href="/docs">Docs</a>
        </div>
        <button className="nav-btn" onClick={enterHouse}>ENTER THE HOUSE</button>
      </nav>

      <section className="hero">
        <div className="hero-diamonds" />
        <div className="rope-top" />
        <div className="rope-bottom" />
        <div className="suits-bg" id="suitsBg" />

        <div className="slot-strip">
          <div className="slot-reel">AI AGENT</div>
          <div className="slot-reel">POLYMARKET</div>
          <div className="slot-reel">DEFLATIONARY</div>
          <div className="slot-reel">AUTONOMOUS</div>
        </div>

        <div className="hero-eyebrow">♠ Autonomous · On-Chain · Self-Governing ♠</div>
        <h1 className="hero-title"><span className="poly">POLY</span><span className="claw">CLAW</span></h1>
        <p className="hero-tagline">— The House Always Burns —</p>
        <p className="hero-sub">A self-governing AI agent that plays the prediction markets, burns every profit, and never sleeps. The claw feeds the fire. The fire feeds itself.</p>

        <div className="hero-cta">
          <button className="btn-casino" onClick={enterHouse}>PLACE YOUR BET</button>
          <button className="btn-ghost"  onClick={openRules}>READ THE RULES</button>
        </div>

        <div className="suit-row"><span>♠</span><span>♥</span><span>♣</span><span>♦</span></div>
      </section>

      <div className="marquee-wrap">
        <div className="marquee">
          <span className="marquee-item">♠ AUTONOMOUS TRADING</span><span className="marquee-item msep">◆</span>
          <span className="marquee-item">♥ PROFIT INCINERATION</span><span className="marquee-item msep">◆</span>
          <span className="marquee-item">♣ BUYBACK &amp; BURN</span><span className="marquee-item msep">◆</span>
          <span className="marquee-item">♦ TREASURY FUNDED</span><span className="marquee-item msep">◆</span>
          <span className="marquee-item">♠ POLYMARKET ALPHA</span><span className="marquee-item msep">◆</span>
          <span className="marquee-item">♥ SELF-GOVERNING AI</span><span className="marquee-item msep">◆</span>
          <span className="marquee-item">♣ DEFLATIONARY ENGINE</span><span className="marquee-item msep">◆</span>
          <span className="marquee-item">♦ WIN · BURN · REPEAT</span><span className="marquee-item msep">◆</span>
          <span className="marquee-item">♠ AUTONOMOUS TRADING</span><span className="marquee-item msep">◆</span>
          <span className="marquee-item">♥ PROFIT INCINERATION</span><span className="marquee-item msep">◆</span>
          <span className="marquee-item">♣ BUYBACK &amp; BURN</span><span className="marquee-item msep">◆</span>
          <span className="marquee-item">♦ TREASURY FUNDED</span><span className="marquee-item msep">◆</span>
          <span className="marquee-item">♠ POLYMARKET ALPHA</span><span className="marquee-item msep">◆</span>
          <span className="marquee-item">♥ SELF-GOVERNING AI</span><span className="marquee-item msep">◆</span>
          <span className="marquee-item">♣ DEFLATIONARY ENGINE</span><span className="marquee-item msep">◆</span>
          <span className="marquee-item">♦ WIN · BURN · REPEAT</span><span className="marquee-item msep">◆</span>
        </div>
      </div>

      <section className="stats-section">
        <div className="gold-divider"><div className="gold-divider-text">♦ House Statistics ♦</div></div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-suit">♠</div>
            <div className="stat-num"><span className="cu" data-t="4.2" data-d="1">0.0</span>M</div>
            <div className="stat-label">Volume Traded</div>
            <div className="stat-badge">↑ +18.4% this week</div>
          </div>
          <div className="stat-card">
            <div className="stat-suit" style={{color:'var(--crimson)'}}>♥</div>
            <div className="stat-num"><span className="cu" data-t="847" data-d="0">0</span>K</div>
            <div className="stat-label">Tokens Burned</div>
            <div className="stat-badge">↑ +11.2% this week</div>
          </div>
          <div className="stat-card">
            <div className="stat-suit">♣</div>
            <div className="stat-num"><span className="cu" data-t="68" data-d="0">0</span>%</div>
            <div className="stat-label">Win Rate</div>
            <div className="stat-badge">all-time accuracy</div>
          </div>
          <div className="stat-card">
            <div className="stat-suit" style={{color:'var(--crimson)'}}>♦</div>
            <div className="stat-num"><span className="cu" data-t="247" data-d="0">0</span></div>
            <div className="stat-label">Active Markets</div>
            <div className="stat-badge">monitored live</div>
          </div>
        </div>
      </section>

      <section className="how-section" id="how">
        <div className="section-header">
          <div className="section-eyebrow">// The Game</div>
          <h2 className="section-title">HOW THE <span className="accent">CLAW</span><br />PLAYS THE <span className="danger">HOUSE</span></h2>
        </div>
        <div className="cards-row">
          {CARDS.map((card, i) => (
            <div key={i} className="playing-card card-flip">
              <div className="card-flip-inner">

                {/* Front face */}
                <div className="card-front">
                  <div className="card-corner-tl" style={{color:card.suitColor}}>
                    {card.rank}<span className="suit-small" style={{color:card.suitColor}}>{card.suit}</span>
                  </div>
                  <div className="card-corner-br" style={{color:card.suitColor}}>
                    {card.rank}<span className="suit-small" style={{color:card.suitColor}}>{card.suit}</span>
                  </div>
                  <span className="card-center-suit" style={{color:card.suitColor, filter:card.centerFilter, fontSize: i===3 ? '50px' : '56px'}}>
                    {i === 3 ? '🔥' : card.suit}
                  </span>
                  <div className="card-step">{card.step}</div>
                  <div className="card-title">{card.title}</div>
                  <div className="card-desc">{card.desc}</div>
                </div>

                {/* Back face */}
                <div className="card-back">
                  <div className="card-back-corner-tl" style={{color:card.suitColor}}>{card.rank}<span style={{display:'block',fontSize:'16px'}}>{card.suit}</span></div>
                  <div className="card-back-corner-br" style={{color:card.suitColor}}>{card.rank}<span style={{display:'block',fontSize:'16px'}}>{card.suit}</span></div>
                  <div className="card-back-suit" style={{color:card.suitColor}}>{i===3?'🔥':card.suit}</div>
                  <div className="card-back-stat" style={{color:card.suitColor==='var(--ivory)'?'var(--gold)':card.suitColor}}>{card.backStat}</div>
                  <div className="card-back-label">{card.backLabel}</div>
                  <div className="card-back-desc">{card.backDesc}</div>
                  <div className="card-back-hint">// flip back</div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mechanics-section" id="mechanics">
        <div className="roulette-deco" />
        <div className="section-header">
          <div className="section-eyebrow">// Tokenomics</div>
          <h2 className="section-title">THE <span className="accent">ENGINE</span><br />BEHIND THE <span className="danger">FELT</span></h2>
        </div>
        <div className="mechanics-grid">
          <div className="mech-cell">
            <div className="mech-number">I</div>
            <div className="mech-icon">🏛️</div>
            <div className="mech-title">Treasury System</div>
            <div className="mech-desc">Creator fees are captured on-chain and deposited into the PolyClaw war chest. Fully transparent, fully autonomous. The house always has chips on the table.</div>
            <span className="mech-pill">Auto-Funded</span>
          </div>
          <div className="mech-cell">
            <div className="mech-number">II</div>
            <div className="mech-icon">🔄</div>
            <div className="mech-title">Buyback &amp; Burn</div>
            <div className="mech-desc">A cut of every fee buys back tokens from the open market and destroys them permanently. Every hand dealt compresses supply. The deck gets shorter every round.</div>
            <span className="mech-pill">Deflationary</span>
          </div>
          <div className="mech-cell">
            <div className="mech-number">III</div>
            <div className="mech-icon">🔥</div>
            <div className="mech-title">Profit Incineration</div>
            <div className="mech-desc">Market winnings don&apos;t enrich — they evaporate. All profits are burned on-chain in real time. The claw wins every hand and lights the chips on fire. Scarcity is the only payout.</div>
            <span className="mech-pill">Win &amp; Burn</span>
          </div>
        </div>
      </section>

      <section className="burn-section" id="burn">
        <div id="embers" />
        <div className="section-header" style={{position:'relative',zIndex:1}}>
          <div className="section-eyebrow">// Deflation Engine</div>
          <h2 className="section-title">THE <span className="danger">FIRE</span><br />NEVER GOES <span className="accent">COLD</span></h2>
        </div>
        <div style={{marginTop:'60px',position:'relative',display:'inline-block',zIndex:1}}>
          <div className="slot-display">
            <div className="slot-digit-wrap"><span className="slot-digit" id="d0">8</span></div>
            <div className="slot-digit-wrap"><span className="slot-digit" id="d1">4</span></div>
            <div className="slot-digit-wrap"><span className="slot-digit" id="d2">7</span></div>
            <div className="slot-digit-wrap"><span className="slot-digit" id="d3">,</span></div>
            <div className="slot-digit-wrap"><span className="slot-digit" id="d4">3</span></div>
            <div className="slot-digit-wrap"><span className="slot-digit" id="d5">9</span></div>
            <div className="slot-digit-wrap"><span className="slot-digit" id="d6">2</span></div>
          </div>
        </div>
        <div className="burn-label-main" style={{position:'relative',zIndex:1}}>CLAW tokens permanently destroyed</div>
        <div className="burn-sub-text"   style={{position:'relative',zIndex:1}}>and the number only ever grows</div>
      </section>

      <section className="table-section" id="table">
        <div className="section-header">
          <div className="section-eyebrow">// Real-Time</div>
          <h2 className="section-title">THE <span className="accent">LIVE</span><br /><span className="danger">TABLE</span></h2>
        </div>
        <div className="live-table">
          <div className="table-header">
            <div className="live-dot" />
            <div className="table-header-text">Agent Activity · Broadcasting Live</div>
          </div>
          <div id="tableBody">
            <div className="table-row"><span className="row-time">2s ago</span><span className="row-type win">WIN</span><span className="row-text">US election market resolved — position closed profitably</span><span className="row-amount" style={{color:'var(--neon-g)'}}>+$4,820</span></div>
            <div className="table-row"><span className="row-time">18s ago</span><span className="row-type burn">BURN</span><span className="row-text">4,820 CLAW incinerated from trading profit</span><span className="row-amount" style={{color:'var(--neon-r)'}}>-4,820</span></div>
            <div className="table-row"><span className="row-time">1m ago</span><span className="row-type bet">BET</span><span className="row-text">Position opened: Fed rate cut 25bps — high confidence</span><span className="row-amount" style={{color:'var(--neon-b)'}}>$2,100</span></div>
            <div className="table-row"><span className="row-time">3m ago</span><span className="row-type buy">BUY</span><span className="row-text">Open market buyback executed from treasury</span><span className="row-amount" style={{color:'var(--gold)'}}>$890</span></div>
            <div className="table-row"><span className="row-time">5m ago</span><span className="row-type burn">BURN</span><span className="row-text">890 CLAW permanently destroyed from buyback</span><span className="row-amount" style={{color:'var(--neon-r)'}}>-890</span></div>
            <div className="table-row"><span className="row-time">7m ago</span><span className="row-type bet">BET</span><span className="row-text">Position opened: Bitcoin above $100k by Q1 end</span><span className="row-amount" style={{color:'var(--neon-b)'}}>$3,400</span></div>
            <div className="table-row"><span className="row-time">11m ago</span><span className="row-type win">WIN</span><span className="row-text">GDP growth estimate market — prediction correct</span><span className="row-amount" style={{color:'var(--neon-g)'}}>+$1,760</span></div>
          </div>
        </div>
      </section>

      <section className="cta-final">
        <div className="cta-deco tl">♠</div>
        <div className="cta-deco br">♠</div>
        <h2 className="cta-title">THE <span className="red">CLAW</span><br />NEVER <span className="gd">FOLDS</span></h2>
        <p className="cta-subtitle">The house burns what it earns.</p>
        <p className="cta-body">Every market it enters, every position it closes, every profit it makes — reduced to ash. This isn&apos;t a token. It&apos;s a machine that eats itself to make supply scarcer forever.</p>
        <div className="cta-btns">
          <button className="btn-casino" onClick={enterHouse}>ENTER THE HOUSE</button>
          <button className="btn-ghost"  onClick={openRules}>VIEW CONTRACT</button>
        </div>
        <div className="ca-bar">
          <span className="ca-label">CA</span>
          {/* REPLACE ca-val content with mint address after launch */}
          <span className="ca-val">TBA AT LAUNCH</span>
        </div>
      </section>

      <footer>
        <div className="footer-logo">POLY<span>CLAW</span></div>
        <div className="footer-copy">© 2026 POLYCLAW · Autonomous · Deflationary · Relentless<br />Not financial advice. The house always burns.</div>
        <div className="footer-links">
          <a href="https://x.com/PolyClawSolana" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="/docs">Docs</a>
          <a href="https://github.com/PolyClaws/Repo" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </footer>

      {/* ── Rules slide-in panel ─────────────────────────────────────────── */}
      <div className={`rules-overlay${rulesOpen ? ' open' : ''}`} onClick={() => setRulesOpen(false)}>
        <div className="rules-panel" onClick={e => e.stopPropagation()}>
          <div className="rules-top-bar" />
          <button className="rules-close" onClick={() => setRulesOpen(false)}>✕</button>

          <div className="rules-suits">♠ ♥ ♦ ♣</div>
          <div className="rules-eyebrow">// The Rulebook</div>
          <h2 className="rules-title">THE HOUSE<br /><span>RULES</span></h2>
          <p className="rules-tagline">— How the machine operates —</p>

          <div className="rules-rule">
            <div className="rules-rule-num">// RULE I</div>
            <div className="rules-rule-title">THE TREASURY FEEDS THE CLAW</div>
            <div className="rules-rule-body">All operating capital flows from pump.fun creator fees collected autonomously on-chain. No team takes a cut. No VC holds a bag. The claw eats what the protocol earns.</div>
            <span className="rules-pill">AUTO-FUNDED · ON-CHAIN</span>
          </div>

          <div className="rules-divider" />

          <div className="rules-rule">
            <div className="rules-rule-num">// RULE II</div>
            <div className="rules-rule-title">THE CLAW ONLY BETS WITH EDGE</div>
            <div className="rules-rule-body">Every position requires a positive Expected Value (&gt;4%) and a positive Kelly Criterion score (&gt;2%). Markets below $500 liquidity are skipped. Bets are fixed at $1–$3 regardless of treasury size — the claw is disciplined, not greedy.</div>
            <span className="rules-pill">KELLY CRITERION · EV GATED</span>
          </div>

          <div className="rules-divider" />

          <div className="rules-rule">
            <div className="rules-rule-num">// RULE III</div>
            <div className="rules-rule-title">EVERY PROFIT BURNS</div>
            <div className="rules-rule-body">Winning positions are bridged from Polygon back to Solana. The SOL is used to buyback $CLAW from the open market and permanently destroy it. There is no extraction. The only payout is scarcity.</div>
            <span className="rules-pill">WIN → BRIDGE → BURN</span>
          </div>

          <div className="rules-divider" />

          <div className="rules-rule">
            <div className="rules-rule-num">// RULE IV</div>
            <div className="rules-rule-title">THE HOUSE NEVER SLEEPS</div>
            <div className="rules-rule-body">Three independent cycles run continuously: treasury management every 60 minutes, market scanning every 30 minutes, position resolution every 15 minutes. No human intervention. No off switch.</div>
            <span className="rules-pill">24/7 · FULLY AUTONOMOUS</span>
          </div>

          <div className="rules-footer">
            NOT FINANCIAL ADVICE<br />
            THE HOUSE ALWAYS BURNS<br />
            ♠ POLYCLAW · {new Date().getFullYear()} ♠
          </div>
        </div>
      </div>
    </>
  )
}
