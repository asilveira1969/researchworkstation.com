# Research Workstation v2 - Project Status

Last updated: 2026-04-19

## Current State

Research Workstation v2 is a new Vercel-ready Next.js app for the official `researchworkstation.com` experience.

The app currently provides:
- Maria workstation UI inspired by the existing OpenClaw prototype.
- Beta login protection using server-side Basic Auth.
- A configurable agent/capability registry.
- Placeholder server-side API routes for Maria, agents, and artifacts.
- A safe `/api/health` endpoint for deployment checks without exposing secrets.
- A Vercel preview deployment for safe online testing.
- Persistent Vercel environment variables for the temporary `vercel.app` production deployment.

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

Latest redeploy inspect URL:

```text
https://vercel.com/anastacios-projects-481225da/researchworkstation-com-v2/22yfQUkEiqnosLJwaSwkS8xern5K
```

Vercel project:

```text
anastacios-projects-481225da/researchworkstation-com-v2
```

The real domain `researchworkstation.com` has not been moved to this app yet.

## GitHub

Remote repository:

```text
https://github.com/asilveira1969/researchworkstation.com.git
```

The local `main` branch tracks `origin/main`.

The preview baseline tag has been pushed:

```text
v0.1.0-preview
```

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

Vercel environment notes:
- `RW_BETA_USERNAME`, `RW_BETA_PASSWORD`, `RW_SESSION_SECRET`, and `MARIA_DEFAULT_SESSION` are stored in Vercel for the temporary production deployment.
- The Vercel project is connected to GitHub repository `asilveira1969/researchworkstation.com`.
- The `main` branch is treated as the production branch by Vercel, so beta login variables must exist in the Vercel Production environment for pushes to `main`.
- Preview env vars are for non-production branches or pull requests; Vercel does not allow `main` to be configured as a Preview branch.
- Before attaching `researchworkstation.com`, replace the beta test password and session secret with stronger private values.

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
- `/api/health` reports deployment state without exposing tokens.
- `.env.local` is not exposed.

Latest Vercel redeploy:
- Clean deploy completed using persistent Vercel env vars instead of command-line `--env` flags.
- Unauthenticated request returned `401`.
- Correct beta login returned `200`.
- Incorrect beta password returned `401`.
- The alias remains `https://researchworkstation-com-v2.vercel.app`.

Git:
- Local branch is `main`.
- Remote branch is `origin/main`.
- Vercel Git integration is connected to `asilveira1969/researchworkstation.com`.
- Stable local/remote tag is `v0.1.0-preview`.
- Stable commits exist:

```text
2e4834a Record preview release tag
dc1e8cf Record main branch status
86313d1 Document preview deployment status
6a96c0a Initial Maria workstation preview
```

## Next Safe Steps

Recommended order:
- Review the Vercel preview visually.
- Improve responsive layout and workstation fidelity if needed.
- Replace beta password with a stronger private value before production.
- Keep GitHub updated after each safe milestone.
- Only after preview approval, associate `researchworkstation.com`.
- Later, implement the server-side bridge from Vercel to Maria in Brev/NemoClaw.

Do not update OpenClaw/NemoClaw or connect real gateway tokens until there is a clear backup and rollback plan.
