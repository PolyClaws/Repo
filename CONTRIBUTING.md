# Contributing to POLYCLAW

Thank you for your interest in contributing to POLYCLAW.

## Before You Start

- Read the [README](README.md) to understand the protocol
- Check [open issues](https://github.com/PolyClaws/polyclaw/issues) before opening a new one
- For significant changes, open an issue first to discuss the approach

## Development Setup

1. Clone the repository
2. Copy `.env.example` to `.env.local` and fill in your keys
3. Install dependencies: `npm install`
4. Run the frontend: `npm run dev`
5. Run the agent (separate terminal): `npx ts-node agent-runner/index.ts`

## Pull Requests

- Branch from `main`
- Keep PRs focused — one feature or fix per PR
- Include a clear description of what changed and why
- Make sure the build passes (`npm run build`) before submitting
- Do not commit `.env.local` or any private keys

## Agent Modules

Each agent in `agent-runner/agents/` follows the same interface:

```typescript
export async function runAgentName(context: AgentContext): Promise<void>
```

If you're adding a new agent:
- Add it to `agent-runner/index.ts` in the appropriate cycle
- Add a system prompt to `lib/agents.ts` if inference is used
- Document the agent's role in `docs/ARCHITECTURE.md`

## Code Style

- TypeScript for agent runner
- Plain JavaScript (no TypeScript) for Next.js pages
- No component libraries — vanilla CSS only
- Follow existing naming conventions

## Security

Do not open public issues for security vulnerabilities. See [SECURITY.md](SECURITY.md).
