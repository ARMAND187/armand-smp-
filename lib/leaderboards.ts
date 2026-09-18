import "server-only";

import { isLeaderboardData } from "./leaderboard-data";
export type { LeaderboardData, LeaderboardItem } from "./leaderboard-data";

export async function getLeaderboardSnapshot() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://shyiddpxzllyhiwssooi.supabase.co";
  const key = process.env.SUPABASE_ANON_KEY;
  if (!key) throw new Error("Missing SUPABASE_ANON_KEY");
  const response = await fetch(`${url}/rest/v1/leaderboards?id=eq.1&select=data,updated_at`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
    cache: "no-store", signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error(`Leaderboard database returned ${response.status}`);
  const rows = await response.json();
  const snapshot = rows?.[0];
  if (!isLeaderboardData(snapshot?.data) ||
      typeof snapshot.updated_at !== "string" || !Number.isFinite(Date.parse(snapshot.updated_at))) {
    throw new Error("No valid leaderboard snapshot available");
  }
  return { data: snapshot.data, updated_at: snapshot.updated_at as string, checked_at: Date.now() };
}
