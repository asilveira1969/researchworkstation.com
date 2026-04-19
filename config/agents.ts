export type AgentStatus = "live" | "prepared" | "future";

export type AgentCapability = {
  id: string;
  label: string;
  eyebrow?: string;
  group: "left" | "right";
  tone: "primary" | "secondary" | "quiet";
  status: AgentStatus;
  prompt: string;
};

export const mariaAgent = {
  id: "maria",
  name: "ASB Researcher Maria",
  sessionKey: "agent:main:main",
  status: "live" as const,
  description:
    "Executive research assistant for traceable market research, briefs, recommendations, and report-ready outputs.",
};

export const agentCapabilities: AgentCapability[] = [
  {
    id: "home-maria",
    label: "HOME Maria",
    eyebrow: "Home",
    group: "left",
    tone: "quiet",
    status: "live",
    prompt: "Return to Maria home and explain what this workstation can help me do.",
  },
  {
    id: "secondary-qualitative",
    label: "Secondary Qualitative Research",
    group: "left",
    tone: "primary",
    status: "prepared",
    prompt:
      "Explain the guide and capabilities of Secondary Qualitative Research and help me begin with a clear research question.",
  },
  {
    id: "edgar-database",
    label: "Edgar Database",
    eyebrow: "API Source",
    group: "left",
    tone: "quiet",
    status: "prepared",
    prompt:
      "Prepare an SEC EDGAR company research workflow. Ask for the company, ticker, filing type, and decision context.",
  },
  {
    id: "world-bank",
    label: "World Bank Database",
    eyebrow: "API Source",
    group: "left",
    tone: "quiet",
    status: "prepared",
    prompt:
      "Prepare a World Bank macroeconomic research workflow. Ask for country, indicators, period, and market question.",
  },
  {
    id: "x-search",
    label: "X Search",
    eyebrow: "Social API",
    group: "left",
    tone: "quiet",
    status: "prepared",
    prompt:
      "Use X Search to retrieve relevant X/Twitter social signals and summarize them with citations and traceability.",
  },
  {
    id: "tavily",
    label: "Tavily",
    eyebrow: "Web Discovery",
    group: "left",
    tone: "quiet",
    status: "prepared",
    prompt:
      "Use Tavily for open web discovery, source collection, and evidence packaging for this research question.",
  },
  {
    id: "one-page-visual-agent",
    label: "One Page Visual",
    eyebrow: "Prototype",
    group: "left",
    tone: "quiet",
    status: "prepared",
    prompt:
      "Create a one-page visual from an existing report. First identify the report and available evidence.",
  },
  {
    id: "secondary-quantitative",
    label: "Secondary Quantitative Research",
    group: "left",
    tone: "primary",
    status: "prepared",
    prompt:
      "Explain Secondary Quantitative Research and help scope data sources, metrics, comparisons, and outputs.",
  },
  {
    id: "organize-work",
    label: "Organize Work",
    group: "left",
    tone: "quiet",
    status: "prepared",
    prompt:
      "Organize this research into a clean work plan with assumptions, sources, open questions, and deliverables.",
  },
  {
    id: "evidence-map",
    label: "Evidence Map",
    group: "left",
    tone: "quiet",
    status: "prepared",
    prompt:
      "Create an evidence map that links each claim, source, confidence level, and missing evidence.",
  },
  {
    id: "exit",
    label: "Exit HERE",
    group: "right",
    tone: "primary",
    status: "prepared",
    prompt: "Summarize the session and identify what should be saved before exiting.",
  },
  {
    id: "primary-quantitative",
    label: "Primary Quantitative Research",
    group: "right",
    tone: "primary",
    status: "future",
    prompt:
      "Explain Primary Quantitative Research and what information is needed before collecting primary data.",
  },
  {
    id: "reporting-intelligence",
    label: "Reporting and Intelligence",
    group: "right",
    tone: "primary",
    status: "prepared",
    prompt:
      "Help turn current research into findings, recommendations, reports, PDFs, or executive briefs.",
  },
  {
    id: "library",
    label: "Library",
    group: "right",
    tone: "quiet",
    status: "prepared",
    prompt:
      "Switch into library mode and identify the most relevant documents, reports, and source materials.",
  },
  {
    id: "pdf-downloads",
    label: "PDF Downloads",
    group: "right",
    tone: "quiet",
    status: "prepared",
    prompt:
      "Show available PDF report outputs. If none are connected yet, explain how this library will work.",
  },
  {
    id: "one-page-visuals",
    label: "One Page Visuals",
    group: "right",
    tone: "quiet",
    status: "prepared",
    prompt:
      "Show available one-page visuals. If none are connected yet, explain how this library will work.",
  },
  {
    id: "findings",
    label: "Findings",
    group: "right",
    tone: "quiet",
    status: "prepared",
    prompt:
      "Turn the current evidence into a short findings section with the most decision-relevant points.",
  },
  {
    id: "primary-qualitative",
    label: "Primary Qualitative Research",
    group: "right",
    tone: "primary",
    status: "future",
    prompt:
      "Explain Primary Qualitative Research and help design interviews, surveys, or field discovery.",
  },
  {
    id: "recommendations",
    label: "Recommendations",
    group: "right",
    tone: "quiet",
    status: "prepared",
    prompt:
      "Draft practical recommendations grounded in the current findings and confidence level.",
  },
  {
    id: "reset-draft",
    label: "Reset Draft",
    group: "right",
    tone: "quiet",
    status: "prepared",
    prompt:
      "Clear the current draft and restart the task with a simpler prompt and cleaner assumptions.",
  },
  {
    id: "maria-notes",
    label: "Maria Notes",
    group: "right",
    tone: "quiet",
    status: "prepared",
    prompt:
      "Summarize what Maria has done so far, assumptions in play, and the next best prompt.",
  },
];

export function getCapabilitiesByGroup(group: AgentCapability["group"]) {
  return agentCapabilities.filter((capability) => capability.group === group);
}
