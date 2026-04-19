import { NextResponse } from "next/server";
import { agentCapabilities, mariaAgent } from "@/config/agents";
import { isBetaAuthConfigured } from "@/lib/auth";

export async function GET() {
  const gatewayUrl = process.env.OPENCLAW_GATEWAY_URL?.trim() || "";
  const gatewayToken = process.env.OPENCLAW_GATEWAY_TOKEN?.trim() || "";
  const mariaDefaultSession = process.env.MARIA_DEFAULT_SESSION?.trim() || mariaAgent.sessionKey;

  return NextResponse.json({
    status: "ok",
    app: "researchworkstation.com-v2",
    maria: {
      id: mariaAgent.id,
      name: mariaAgent.name,
      status: mariaAgent.status,
      defaultSession: mariaDefaultSession,
    },
    security: {
      betaAuthConfigured: isBetaAuthConfigured(),
      browserSecretsExposed: false,
    },
    runtime: {
      frontend: "vercel",
      agentRuntime: "brev-nvidia-nemoclaw",
      bridge: gatewayUrl && gatewayToken ? "configured_not_relaying" : "prepared_not_configured",
      gatewayHost: gatewayUrl ? new URL(gatewayUrl).host : null,
    },
    capabilities: {
      total: agentCapabilities.length,
      live: agentCapabilities.filter((capability) => capability.status === "live").length,
      prepared: agentCapabilities.filter((capability) => capability.status === "prepared").length,
      future: agentCapabilities.filter((capability) => capability.status === "future").length,
    },
  });
}
