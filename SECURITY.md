# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in POLYCLAW, **do not open a public issue**.

Contact the team privately:

- **Email**: security@polyclaw.io
- **Response time**: within 72 hours for confirmed vulnerabilities

Please include:
- A description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fixes (optional)

## Scope

The following are in scope:

- Agent runner logic (capital allocation, order execution, burn mechanics)
- API routes (`/api/ingest`, `/api/feed`)
- Smart contract interactions (pumpswap-sdk, Polymarket CLOB)
- Cross-chain bridge logic (deBridge DLN)
- Authentication and key handling

The following are **out of scope**:

- Third-party services (Polymarket, pump.fun, deBridge)
- Frontend-only visual bugs
- Issues requiring physical access to a machine

## Supported Versions

| Version | Supported |
|---------|-----------|
| latest  | Yes       |
| < 0.3.0 | No        |

## Responsible Disclosure

We commit to:
- Acknowledging your report within 72 hours
- Keeping you informed as we investigate
- Crediting you in the fix (if desired)
- Not taking legal action for good-faith disclosures
