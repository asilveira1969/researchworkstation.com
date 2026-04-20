import { NextResponse } from "next/server";
import { createResearchJob, listJobs } from "@/lib/jobs";

type CreateJobRequest = {
  capabilityId?: string;
  userMessage?: string;
  sessionId?: string;
  parentJobId?: string | null;
};

export async function GET() {
  const jobs = listJobs();

  return NextResponse.json({
    schemaVersion: "job-system-v1",
    storage: "ephemeral-memory-placeholder",
    note:
      "Jobs are traceable in this runtime process for v1. Durable storage will replace this placeholder before real agent execution.",
    summary: {
      total: jobs.length,
      created: jobs.filter((job) => job.status === "created").length,
      running: jobs.filter((job) => job.status === "running").length,
      needsInput: jobs.filter((job) => job.status === "needs_input").length,
      completed: jobs.filter((job) => job.status === "completed").length,
      failed: jobs.filter((job) => job.status === "failed").length,
    },
    jobs,
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as CreateJobRequest;
  const capabilityId = String(body.capabilityId || "").trim();
  const userMessage = String(body.userMessage || "").trim();

  if (!capabilityId) {
    return NextResponse.json(
      {
        status: "error",
        error: "capability_required",
        message: "A capabilityId is required to create a job.",
      },
      { status: 400 },
    );
  }

  const result = createResearchJob({
    capabilityId,
    userMessage,
    sessionId: body.sessionId,
    parentJobId: body.parentJobId,
  });

  if (!result.ok) {
    const status = result.error === "capability_not_found" ? 404 : result.error === "job_not_required" ? 409 : 400;

    return NextResponse.json(
      {
        status: "error",
        error: result.error,
        message: result.message,
      },
      { status },
    );
  }

  return NextResponse.json(
    {
      status: "created",
      schemaVersion: "job-system-v1",
      job: result.job,
    },
    { status: 201 },
  );
}
