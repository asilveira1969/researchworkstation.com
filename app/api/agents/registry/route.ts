import { NextResponse } from "next/server";
import { agentCapabilities, mariaAgent } from "@/config/agents";

export async function GET() {
  return NextResponse.json({
    schemaVersion: "capability-registry-v1",
    maria: mariaAgent,
    summary: {
      total: agentCapabilities.length,
      createsJob: agentCapabilities.filter((capability) => capability.createsJob).length,
      preJob: agentCapabilities.filter((capability) => capability.executionMode === "pre_job").length,
      artifactAccess: agentCapabilities.filter((capability) => capability.executionMode === "artifact_access").length,
    },
    capabilities: agentCapabilities,
  });
}
