import { NextResponse } from "next/server";
import { agentCapabilities, mariaAgent } from "@/config/agents";

export async function GET() {
  return NextResponse.json({
    maria: mariaAgent,
    capabilities: agentCapabilities,
  });
}
