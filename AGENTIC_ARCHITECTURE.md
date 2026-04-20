# Research Workstation Agentic Architecture

This document defines the operating architecture for `researchworkstation.com-v2`.

The product is not a static website with a chat widget. It is an agentic research workstation where Maria is the public-facing executive research assistant and specialized agents, tools, skills, MCPs, APIs, workflows, memory systems, and job runners operate behind the interface.

## System Model

The browser is the cockpit. It renders the workstation, receives user intent, shows Maria's responses, displays job progress, and exposes deliverables through areas such as Library, PDF Downloads, One Page Visuals, Findings, Recommendations, and Maria Notes.

Vercel is the secure front door and API layer. It authenticates beta access, receives UI requests, validates intent, creates or routes jobs, and talks server-side to the agent runtime. Browser code must never receive OpenClaw, Brev, NVIDIA, MCP, provider, or database tokens.

NVIDIA/Brev/NemoClaw is the heavy agent runtime. Maria and future specialized agents operate there with the space, compute, tools, skills, memory, policies, and external connections needed for research work.

Agents are operating units, not visual buttons. A button in the UI represents a capability that may map to Maria alone, one specialized agent, or a chain of agents and tools.

## Runtime Responsibilities

Vercel should handle:
- user-facing UI delivery
- beta authentication
- server-side request routing
- lightweight API coordination
- safe status and health checks
- future artifact listing and download authorization

Vercel should not handle heavy research execution such as large scraping, document parsing, long-running data normalization, multi-source analysis, PDF generation at scale, or long agent chains.

NVIDIA/Brev/NemoClaw should handle:
- Maria's live runtime
- specialized agents
- tool and skill execution
- MCP and API integrations
- workflow execution
- intermediate files and working memory
- source collection, extraction, normalization, synthesis, and packaging

## Maria's Role

Maria is the only main public-facing assistant identity. Users should feel they are speaking with Maria even when specialized agents or tools operate behind the scenes.

Maria should:
- understand the whole workstation
- explain capabilities without exposing unnecessary internals
- help users move from vague questions to clear workflows
- decide when a request is still exploratory
- create or route jobs only when the user confirms operational intent
- report progress clearly in chat
- connect outputs to artifacts, jobs, and traceable evidence

## Pre-Job Mode vs Job Mode

Not every click creates a job.

`pre-job mode` covers exploration and navigation:
- asking Maria what the platform can do
- selecting buttons to understand capabilities
- comparing agent options
- browsing Library, PDF Downloads, Findings, Recommendations, or One Page Visuals
- downloading an existing artifact
- asking clarifying questions before execution

`job mode` starts only when the user confirms operational work:
- starting a research workflow
- activating agents, tools, APIs, MCPs, or scraping
- collecting or transforming data
- generating or updating an artifact
- regenerating an existing deliverable
- creating a new report, PDF, evidence map, visual, source pack, dataset, findings section, or recommendations

This distinction prevents noisy tracking and keeps the system auditable. Clicks and navigation are not jobs. Confirmed work is a job.

## Job ID Rule

Every operational workflow must receive a human-readable `jobId`.

Initial public format:

```text
RW-YYYYMMDD-0001
```

Example:

```text
RW-20260420-0001
```

The `jobId` must be visible or traceable across:
- Maria chat progress
- workflow status
- internal logs
- agent steps
- source packs
- final artifacts
- Library entries
- PDF Downloads
- One Page Visuals
- Findings
- Recommendations
- email or folder deliveries

Internal systems may also use UUIDs, but the user-facing reference should be the readable `jobId`.

If a user regenerates, updates, or derives work from an existing artifact, create a new `jobId` and preserve the original as `parentJobId`.

Example:

```json
{
  "jobId": "RW-20260420-0002",
  "parentJobId": "RW-20260418-0003",
  "action": "regenerate_report_with_updated_sources"
}
```

## Future Workflow Contract

The capability registry in `config/agents.ts` is the first technical source of truth for UI buttons and future workflow routing. Each capability declares whether it is pre-job guidance, job-required work, or artifact access.

Future workflow APIs should use a minimal shared contract:

```json
{
  "jobId": "RW-20260420-0001",
  "parentJobId": null,
  "sessionId": "agent:main:main",
  "capabilityId": "tavily",
  "userMessage": "Research this market with traceable sources.",
  "status": "created",
  "steps": [],
  "artifactIds": [],
  "metadata": {}
}
```

Expected job statuses:
- `created`
- `running`
- `needs_input`
- `completed`
- `failed`

`/api/maria/chat` should remain the fast path for Maria conversation and pre-job guidance. Heavy workflows should use asynchronous jobs so agents have room to work without forcing the browser to wait on long operations.

Job System v1 is implemented as `/api/jobs` with temporary in-process storage. It is useful for testing the public `jobId` contract and UI behavior, but it is not durable. Before real agent workflows run, this must move to durable storage so jobs survive deployments, serverless instance changes, browser reloads, and long-running workflows.

## Output Types

The chat is the primary user experience, but not the only output destination.

Conversational outputs are live updates and responses from Maria:
- progress updates
- clarifying questions
- preliminary summaries
- decisions needed from the user
- final explanations

Operational internal outputs are temporary or intermediate files used by agents:
- raw source captures
- normalized records
- JSON or JSONL source packs
- scraped fragments
- extracted tables
- intermediate notes
- draft findings

Final or reusable outputs are durable deliverables:
- PDF reports
- executive briefs
- one-page visuals
- evidence maps
- findings
- recommendations
- source packs
- normalized datasets
- report-ready documents

Final or reusable outputs should be stored in durable storage and surfaced through the workstation. Durable storage does not replace chat; it makes important deliverables findable, downloadable, reusable, and auditable after the conversation moves on.

## Security Rules

The browser must never receive:
- OpenClaw gateway tokens
- NVIDIA API keys
- Brev credentials
- MCP server credentials
- provider API keys
- database passwords
- private storage credentials

All sensitive connections must be server-side. Vercel may hold environment variables for routing and authorization. The agent runtime may hold operational credentials according to the relevant policy model.

## Domain Rule

Do not attach `researchworkstation.com` until the protected Vercel experience, Maria bridge plan, beta credentials, rollback path, and agentic architecture are stable.

Continue using the temporary Vercel domain until the product is ready for official domain activation.
