import "server-only";

export type LeaderboardItem = { rank: number; name: string; value: string };
export type LeaderboardData = Record<string, LeaderboardItem[]>;

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
  if (!snapshot?.data || typeof snapshot.data !== "object" ||
      typeof snapshot.updated_at !== "string" || !Number.isFinite(Date.parse(snapshot.updated_at))) {
    throw new Error("No valid leaderboard snapshot available");
  }
  return { ...snapshot, checked_at: Date.now() } as { data: LeaderboardData; updated_at: string; checked_at: number };
}
