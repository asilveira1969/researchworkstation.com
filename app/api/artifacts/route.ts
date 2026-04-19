import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "prepared",
    message:
      "Artifact storage is prepared for PDFs, reports, and one-page visuals. Durable storage is not connected yet.",
    artifacts: [],
  });
}
