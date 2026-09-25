export const LEADERBOARD_CATEGORIES = [
  "money", "pul", "kills", "deaths", "bounty", "duels", "playtime", "clan_kills", "clan_money",
] as const;

export type LeaderboardItem = { rank: number; name: string; value: string };
export type LeaderboardData = Record<(typeof LEADERBOARD_CATEGORIES)[number], LeaderboardItem[]> & {
  server: { online: number; max: number };
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isLeaderboardData(value: unknown): value is LeaderboardData {
  if (!isRecord(value) || !isRecord(value.server)) return false;
  const { online, max } = value.server;
  if (typeof online !== "number" || typeof max !== "number" ||
      !Number.isInteger(online) || !Number.isInteger(max) ||
      online < 0 || max < online || max > 999999) return false;

  return LEADERBOARD_CATEGORIES.every((category) => {
    const items = value[category];
    if (!Array.isArray(items) || items.length > 10) return false;
    const ranks = new Set<number>();
    return items.every((item) => {
      if (!isRecord(item) || typeof item.rank !== "number" ||
          !Number.isInteger(item.rank) || item.rank < 1 || item.rank > 10 || ranks.has(item.rank) ||
          typeof item.name !== "string" || item.name.length > 32 || !item.name.trim() ||
          typeof item.value !== "string" || item.value.length > 64 || !item.value.trim()) return false;
      ranks.add(item.rank);
      return true;
    });
  });
}
