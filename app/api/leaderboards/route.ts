import { NextResponse } from "next/server";
import { getLeaderboardSnapshot } from "@/lib/leaderboards";

export const revalidate = 45;

export async function GET() {
  try {
    const snapshot = await getLeaderboardSnapshot();
    return NextResponse.json({ success: true, ...snapshot });
  } catch (error) {
    console.error("Leaderboard read failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ success: false, error: "SERVER DATA TEMPORARILY UNAVAILABLE" }, { status: 503 });
  }
}
