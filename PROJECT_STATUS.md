# Research Workstation v2 - Project Status

Last updated: 2026-04-19

## Current State

Research Workstation v2 is a new Vercel-ready Next.js app for the official `researchworkstation.com` experience.

The app currently provides:
- Maria workstation UI inspired by the existing OpenClaw prototype.
- Beta login protection using server-side Basic Auth.
- A configurable agent/capability registry.
- Placeholder server-side API routes for Maria, agents, and artifacts.
- A Vercel preview deployment for safe online testing.

The previous folders and deployments are intentionally untouched:
- `C:\Users\pc\researchworkstation.com`
- `C:\Users\pc\.openclaw\canvas\maria.html`
- `https://maria.agentesdeprocesos.com/canvas/maria.html`

## Local Project

Project folder:

```text
C:\Users\pc\researchworkstation.com-v2
```

Run locally:

```powershell
cd C:\Users\pc\researchworkstation.com-v2
& 'C:\Program Files\nodejs\npm.cmd' run dev
```

Local URL:

```text
http://127.0.0.1:3000
```

## Vercel Preview

Preview URL:

```text
https://researchworkstation-com-v2.vercel.app
```

Vercel project:

```text
anastacios-projects-481225da/researchworkstation-com-v2
```

The real domain `researchworkstation.com` has not been moved to this app yet.

## Security Notes

Do not commit:
- `.env.local`
- `.vercel/`
- `.next/`
- `node_modules/`
- OpenClaw gateway tokens
- NVIDIA/Brev credentials
- Any API keys

Current beta login values are stored outside Git in local/Vercel environment configuration.

The browser must never receive OpenClaw, Brev, NVIDIA, MCP, or other provider tokens.

## Verified

Local:
- UI loads.
- Beta login blocks unauthenticated users.
- Correct beta credentials allow access.
- Incorrect beta credentials are rejected.

Vercel preview:
- Unauthenticated request returns `401`.
- Correct beta login returns `200`.
- Maria UI renders.
- `/api/agents/registry` responds behind login.
- `/api/maria/chat` responds with safe placeholder behavior behind login.
- `.env.local` is not exposed.

Git:
- Initial stable commit exists:

```text
6a96c0a Initial Maria workstation preview
```

## Next Safe Steps

Recommended order:
- Review the Vercel preview visually.
- Improve responsive layout and workstation fidelity if needed.
- Replace beta password with a stronger private value before production.
- Prepare a GitHub remote when ready.
- Only after preview approval, associate `researchworkstation.com`.
- Later, implement the server-side bridge from Vercel to Maria in Brev/NemoClaw.

Do not update OpenClaw/NemoClaw or connect real gateway tokens until there is a clear backup and rollback plan.
