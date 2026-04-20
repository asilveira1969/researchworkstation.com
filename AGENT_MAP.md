# Research Workstation Agent Map

This document maps the current workstation buttons to agentic capabilities.

Maria remains the public voice of the platform. Specialized agents, tools, APIs, MCPs, and workflows may operate behind these capabilities, but the user experience should stay unified through Maria unless an expert/debug view is intentionally added later.

The technical source of truth for this map is `config/agents.ts`. That registry exposes each capability's execution mode, runtime, job behavior, expected inputs, expected outputs, tools, and artifact types.

## Capability States

`live` means available in the current interface.

`prepared` means represented in the UI and architecture, but not yet connected to a real specialized workflow.

`future` means planned, visible, or conceptually reserved, but not yet ready for operational implementation.

## Main Agent

| Field | Value |
| --- | --- |
| Public name | ASB Researcher Maria |
| Agent id | `maria` |
| Session key | `agent:main:main` |
| State | `live` |
| Public role | Main executive research assistant and visible intelligence layer |
| Primary mode | Chat, pre-job guidance, workflow framing, routing, progress explanation |
| Future runtime | NemoClaw/OpenClaw in NVIDIA/Brev |

Maria should decide whether a user is exploring or initiating real work. Maria should create or route jobs only when the user confirms an operational action.

## Left Rail Capabilities

| Capability | Capability id | State | Purpose | Inputs | Outputs | Probable agents/tools |
| --- | --- | --- | --- | --- | --- | --- |
| HOME Maria | `home-maria` | `live` | Return to Maria and explain workstation options | user question, current context | Maria guidance, next-step suggestions | Maria |
| Secondary Qualitative Research | `secondary-qualitative` | `prepared` | Frame qualitative secondary research from existing sources | topic, market, question, scope | research brief, source plan, findings | Maria, Tavily, source extraction tools |
| Edgar Database | `edgar-database` | `prepared` | Research U.S. public companies through SEC filings | company, ticker, filing type, period, decision context | filing summary, risk signals, evidence pack | EDGAR agent, SEC API/tools, document parser |
| World Bank Database | `world-bank` | `prepared` | Add macroeconomic and country-level context | country, indicators, dates, market question | indicator tables, macro brief, charts | World Bank API agent, data normalization tools |
| X Search | `x-search` | `prepared` | Gather social signals from X/Twitter | brand/topic/company, time window, signal type | social signal summary, source list, sentiment notes | X Search agent/API, summarization tools |
| Tavily | `tavily` | `prepared` | Open web discovery with traceable evidence | research question, market/company/topic, source preferences | source pack, evidence summary, web brief | Tavily agent/API, source scoring tools |
| One Page Visual | `one-page-visual-agent` | `prepared` | Generate one-page visual from an existing report | report/artifact id, audience, visual goal | one-page visual, slide/image artifact | visual agent, report parser, image/layout tools |
| Secondary Quantitative Research | `secondary-quantitative` | `prepared` | Scope quantitative research using existing data | metrics, market, geography, time period | data brief, tables, charts, recommendations | data discovery agents, APIs, normalization tools |
| Organize Work | `organize-work` | `prepared` | Structure project work and next actions | goal, current evidence, open questions | work plan, assumptions, task list | Maria, planning workflow |
| Evidence Map | `evidence-map` | `prepared` | Connect claims to evidence and confidence | claims, sources, findings, jobId | evidence map, traceability table | evidence mapping agent, citation tools |

## Right Rail Capabilities

| Capability | Capability id | State | Purpose | Inputs | Outputs | Probable agents/tools |
| --- | --- | --- | --- | --- | --- | --- |
| Exit HERE | `exit` | `prepared` | Summarize session and preserve important work before leaving | session context, current job/artifacts | session summary, save checklist | Maria, memory/workspace tools |
| Primary Quantitative Research | `primary-quantitative` | `future` | Plan or execute primary quantitative research | research objective, sample, survey design, metrics | survey plan, analysis plan, findings | future survey/data collection agents |
| Reporting and Intelligence | `reporting-intelligence` | `prepared` | Turn research into deliverables | findings, evidence, audience, format | executive brief, report, PDF, recommendations | reporting agent, PDF tools, evidence map |
| Library | `library` | `prepared` | Browse reusable artifacts and source materials | filters, jobId, project, artifact type | artifact list, downloads, references | artifact/storage service |
| PDF Downloads | `pdf-downloads` | `prepared` | Access PDF report outputs | jobId, project, report type | PDF download links | artifact/storage service, PDF generator |
| One Page Visuals | `one-page-visuals` | `prepared` | Browse generated one-page visuals | jobId, project, report source | visual list, image/slide downloads | visual library, storage service |
| Findings | `findings` | `prepared` | Review evidence-based discoveries | jobId, evidence set, research topic | findings list, confidence notes | findings agent, evidence tools |
| Primary Qualitative Research | `primary-qualitative` | `future` | Plan interviews, surveys, or field discovery | audience, interview goals, questions | interview guide, qualitative plan | future primary research agents |
| Recommendations | `recommendations` | `prepared` | Convert findings into action | findings, constraints, decision context | recommendations, next steps | recommendation agent, Maria |
| Reset Draft | `reset-draft` | `prepared` | Clear or restart a draft task | current draft, user confirmation | clean prompt, reset state | Maria, UI/session workflow |
| Maria Notes | `maria-notes` | `prepared` | Summarize session assumptions and next prompt | session context, jobId, current artifacts | session notes, memory candidates | Maria, memory/workspace tools |

## Job Creation Guidance

Selecting a capability does not create a job.

A job is created only when the user confirms operational work such as research execution, data collection, transformation, analysis, artifact creation, artifact regeneration, or deliverable update.

Library browsing and downloading existing artifacts do not create new jobs. Regenerating or updating an existing artifact creates a new job with `parentJobId`.

## Future Agent Design Notes

Each future specialized agent should define:
- public capability name
- internal agent name
- allowed tools and APIs
- required inputs
- expected outputs
- job behavior
- memory needs
- security constraints
- artifact destinations
- failure and user-clarification behavior

Maria should remain responsible for explaining agent capabilities and maintaining a coherent user experience.
