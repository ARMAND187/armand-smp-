import { NextResponse, NextRequest } from "next/server";
import { getLeaderboardSnapshot } from "@/lib/leaderboards";

export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store" };
// Per-instance protection; production-wide limits belong in Vercel's firewall.
const rateLimitMap = new Map<string, { count: number; expires: number }>();

export async function GET(req: NextRequest) {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap) {
    if (entry.expires <= now) rateLimitMap.delete(key);
  }
  const ip = (req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown").slice(0, 128);
  const entry = rateLimitMap.get(ip) || { count: 0, expires: now + 60_000 };
  entry.count++;
  if (entry.count > 30) {
    return NextResponse.json({ success: false, error: "Too Many Requests" }, {
      status: 429, headers: { ...headers, "Retry-After": "60" },
    });
  }
  if (rateLimitMap.size >= 10_000 && !rateLimitMap.has(ip)) {
    rateLimitMap.delete(rateLimitMap.keys().next().value!);
  }
  rateLimitMap.set(ip, entry);
  try {
    const snapshot = await getLeaderboardSnapshot();
    return NextResponse.json({ success: true, ...snapshot }, { headers });
  } catch (error) {
    console.error("Leaderboard read failed:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ success: false, error: "SERVER DATA TEMPORARILY UNAVAILABLE" }, { status: 503, headers });
  }
}
