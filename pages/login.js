import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const curRef = useRef(null)
  const cur2Ref = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const cur = curRef.current
    const cur2 = cur2Ref.current
    const move = (e) => {
      cur.style.left = e.clientX + 'px'
      cur.style.top = e.clientY + 'px'
      cur2.style.left = e.clientX + 'px'
      cur2.style.top = e.clientY + 'px'
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  // Spawn floating suit symbols
  useEffect(() => {
    const suits = ['♠', '♥', '♣', '♦']
    const colors = ['#C8102E', '#F5F0E8', '#C8102E', '#D4AF37']
    const container = document.getElementById('suits-bg')
    if (!container) return
    const items = []
    for (let i = 0; i < 12; i++) {
      const el = document.createElement('span')
      const si = i % 4
      el.textContent = suits[si]
      el.style.cssText = `
        position:absolute;
        opacity:0.04;
        left:${Math.random() * 100}%;
        font-size:${40 + Math.random() * 60}px;
        color:${colors[si]};
        animation:suitFloat ${20 + Math.random() * 20}s linear infinite;
        animation-delay:-${Math.random() * 20}s;
        user-select:none;
        pointer-events:none;
      `
      container.appendChild(el)
      items.push(el)
    }
    return () => items.forEach(el => el.remove())
  }, [])

  function handleLogin(e) {
    e.preventDefault()
    if (!email || !password) return
    router.push('/app')
  }

  return (
    <>
      <Head>
        <title>Login — POLYCLAW</title>
      </Head>

      <div id="cur" ref={curRef} />
      <div id="cur2" ref={cur2Ref} />

      {/* Suit float container */}
      <div id="suits-bg" className="suits-bg" />

      {/* Grid overlay — inherited from globals.css body::before */}

      <main className="login-page">
        {/* Diamond drift background */}
        <div className="hero-diamonds" />

        <div className="login-card">
          <div className="modal-top-bar" />

          <div className="modal-suits">
            <span>♠</span><span>♥</span><span>♣</span><span>♦</span>
          </div>

          <p className="modal-eyebrow">// Enter The House</p>
          <h1 className="modal-title">POLY<span>CLAW</span></h1>

          <form onSubmit={handleLogin}>
            <div className="modal-field">
              <label className="modal-label" htmlFor="loginEmail">Email Address</label>
              <input
                id="loginEmail"
                type="email"
                className="modal-input"
                placeholder="dealer@polyclaw.io"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="modal-field">
              <label className="modal-label" htmlFor="loginPass">Password</label>
              <input
                id="loginPass"
                type="password"
                className="modal-input"
                placeholder="••••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="modal-btn-primary">
              Enter The House
            </button>
          </form>

          <div className="modal-divider">
            <span className="modal-divider-text">OR</span>
          </div>

          <button className="modal-btn-wallet" type="button">
            ⬡&nbsp;&nbsp;Connect Wallet
          </button>

          <p className="modal-footer-text">
            No account?&nbsp;
            <a href="/register">Register &amp; Claim Your Chips</a>
            <br />
            <a href="/" style={{ marginTop: 6, display: 'inline-block' }}>← Back to the Floor</a>
          </p>
        </div>
      </main>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,16,46,.12) 0%, rgba(13,8,13,0) 60%),
                      radial-gradient(ellipse 120% 80% at 50% 100%, rgba(212,175,55,.07) 0%, transparent 60%),
                      var(--black);
          padding: 24px;
        }

        .hero-diamonds {
          position: absolute;
          inset: 0;
          opacity: .07;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M30 5 L55 30 L30 55 L5 30Z' fill='none' stroke='%23D4AF37' stroke-width='.5'/%3E%3C/svg%3E");
          background-size: 60px 60px;
          animation: diamondDrift 40s linear infinite;
          pointer-events: none;
        }

        @keyframes diamondDrift {
          from { background-position: 0 0; }
          to   { background-position: 60px 60px; }
        }

        @keyframes suitFloat {
          from { transform: translateY(110vh) rotate(0deg); }
          to   { transform: translateY(-20vh) rotate(360deg); }
        }

        @keyframes modalIn {
          from { transform: translateY(32px) scale(.97); opacity: 0; }
          to   { transform: translateY(0) scale(1); opacity: 1; }
        }

        .login-card {
          background: linear-gradient(160deg, #1A0E22 0%, #0D070F 100%);
          border: 1px solid rgba(212,175,55,.35);
          max-width: 420px;
          width: 100%;
          padding: 56px 48px 48px;
          position: relative;
          box-shadow: 0 40px 100px rgba(0,0,0,.9), 0 0 0 1px rgba(0,0,0,.5), 0 0 60px rgba(212,175,55,.08);
          animation: modalIn .45s cubic-bezier(.22,1,.36,1) both;
          z-index: 1;
        }

        @media (max-width: 480px) {
          .login-card { padding: 40px 28px 36px; }
        }
      `}</style>
    </>
  )
}
