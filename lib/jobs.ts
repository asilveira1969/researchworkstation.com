import { getCapabilityById, mariaAgent } from "@/config/agents";
import { randomUUID } from "node:crypto";

export type ResearchJobStatus = "created" | "running" | "needs_input" | "completed" | "failed";

export type ResearchJobStep = {
  id: string;
  label: string;
  status: "completed" | "pending" | "running" | "failed";
  createdAt: string;
};

export type ResearchJob = {
  jobId: string;
  internalId: string;
  parentJobId: string | null;
  sessionId: string;
  capabilityId: string;
  capabilityLabel: string;
  userMessage: string;
  status: ResearchJobStatus;
  steps: ResearchJobStep[];
  artifactIds: string[];
  metadata: {
    executionMode: string;
    runtime: string;
    createdBy: "api";
    storage: "ephemeral-memory-placeholder";
  };
  createdAt: string;
  updatedAt: string;
};

type CreateResearchJobInput = {
  capabilityId: string;
  userMessage: string;
  sessionId?: string;
  parentJobId?: string | null;
};

declare global {
  var __researchWorkstationJobs: ResearchJob[] | undefined;
}

const jobs = globalThis.__researchWorkstationJobs ?? [];

if (!globalThis.__researchWorkstationJobs) {
  globalThis.__researchWorkstationJobs = jobs;
}

function getDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10).replaceAll("-", "");
}

function nextPublicJobId(date = new Date()) {
  const dateKey = getDateKey(date);
  const prefix = `RW-${dateKey}-`;
  const maxSequence = jobs.reduce((max, job) => {
    if (!job.jobId.startsWith(prefix)) return max;
    const sequence = Number(job.jobId.slice(prefix.length));
    return Number.isFinite(sequence) ? Math.max(max, sequence) : max;
  }, 0);

  return `${prefix}${String(maxSequence + 1).padStart(4, "0")}`;
}

export function listJobs() {
  return [...jobs].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function createResearchJob(input: CreateResearchJobInput) {
  const capability = getCapabilityById(input.capabilityId);

  if (!capability) {
    return {
      ok: false as const,
      error: "capability_not_found",
      message: "The requested capability does not exist in the registry.",
    };
  }

  if (!capability.createsJob) {
    return {
      ok: false as const,
      error: "job_not_required",
      message: "This capability is pre-job guidance or artifact access and does not create a new job.",
      capability,
    };
  }

  const userMessage = input.userMessage.trim();

  if (!userMessage) {
    return {
      ok: false as const,
      error: "message_required",
      message: "A user message is required to create a job.",
    };
  }

  const createdAt = new Date().toISOString();
  const job: ResearchJob = {
    jobId: nextPublicJobId(),
    internalId: randomUUID(),
    parentJobId: input.parentJobId || null,
    sessionId: input.sessionId || mariaAgent.sessionKey,
    capabilityId: capability.id,
    capabilityLabel: capability.label,
    userMessage,
    status: "created",
    steps: [
      {
        id: "request_received",
        label: "Operational request received",
        status: "completed",
        createdAt,
      },
      {
        id: "bridge_waiting",
        label: "Maria bridge ready for future agent execution",
        status: "pending",
        createdAt,
      },
    ],
    artifactIds: [],
    metadata: {
      executionMode: capability.executionMode,
      runtime: capability.runtime,
      createdBy: "api",
      storage: "ephemeral-memory-placeholder",
    },
    createdAt,
    updatedAt: createdAt,
  };

  jobs.push(job);

  return {
    ok: true as const,
    job,
  };
}
