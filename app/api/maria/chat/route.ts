import { NextResponse } from "next/server";
import { mariaAgent } from "@/config/agents";

type MariaChatRequest = {
  message?: string;
  sessionId?: string;
  agentId?: string;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as MariaChatRequest;
  const message = String(body.message || "").trim();

  if (!message) {
    return NextResponse.json(
      {
        status: "error",
        error: "message_required",
        message: "A message is required.",
      },
      { status: 400 },
    );
  }

  const gatewayUrl = process.env.OPENCLAW_GATEWAY_URL?.trim();
  const gatewayToken = process.env.OPENCLAW_GATEWAY_TOKEN?.trim();

  if (!gatewayUrl || !gatewayToken) {
    return NextResponse.json({
      status: "prepared",
      agentId: body.agentId || mariaAgent.id,
      sessionId: body.sessionId || mariaAgent.sessionKey,
      reply:
        "Maria is installed in the Research Workstation interface. The secure NemoClaw bridge is prepared but not connected in this deployment yet.",
      metadata: {
        bridge: "not_configured",
        runtime: "brev-nvidia-nemoclaw",
      },
    });
  }

  return NextResponse.json({
    status: "prepared",
    agentId: body.agentId || mariaAgent.id,
    sessionId: body.sessionId || process.env.MARIA_DEFAULT_SESSION || mariaAgent.sessionKey,
    reply:
      "The secure bridge environment variables are present. Live OpenClaw WebSocket relay will be implemented after the first protected Vercel release is validated.",
    metadata: {
      bridge: "configured_not_relaying",
      gatewayHost: new URL(gatewayUrl).host,
    },
  });
}
