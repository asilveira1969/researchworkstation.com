# Research Workstation v2

Official Vercel-ready workstation app for `researchworkstation.com`.

This project recreates the Maria workstation experience from the local OpenClaw prototype without depending on local `.openclaw` paths, browser-visible gateway tokens, or `127.0.0.1` services.

Current operational notes live in [`PROJECT_STATUS.md`](./PROJECT_STATUS.md).

## Local Development

1. Copy `.env.example` to `.env.local`.
2. Set `RW_BETA_USERNAME` and `RW_BETA_PASSWORD`.
3. Install dependencies.
4. Run the app:

```bash
npm run dev
```

On this Windows machine, if the `nvm` npm shim fails with `EPERM`, use:

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run dev
```

In development, if beta credentials are not configured, the auth gate is bypassed so the UI can be reviewed locally. In production, missing credentials return a setup-required response.

## Architecture

- `app/page.tsx` renders the Maria workstation UI.
- `config/agents.ts` is the public capability registry.
- `app/api/maria/chat/route.ts` is the future server-side bridge to Maria in NemoClaw/Brev.
- `proxy.ts` protects the beta app with server-side Basic Auth.

Secrets must stay in Vercel environment variables. Do not expose OpenClaw, Brev, NVIDIA, or MCP tokens in browser code.
