export const SYNC_INTERVAL_MS = 45_000;
export const OFFLINE_AFTER_MS = SYNC_INTERVAL_MS * 2;
export const SERVER_TIME_ZONE = "Asia/Baghdad";

export function isServerOnline(updatedAt: string | null, now: number): boolean {
  if (!updatedAt) return false;
  const timestamp = Date.parse(updatedAt);
  const age = now - timestamp;
  return Number.isFinite(timestamp) && age >= -SYNC_INTERVAL_MS && age < OFFLINE_AFTER_MS;
}

export function formatLastSync(updatedAt: string | null, includeDate = true): string {
  if (!updatedAt || !Number.isFinite(Date.parse(updatedAt))) return "Not available";
  const date = new Date(updatedAt);
  const time = date.toLocaleTimeString("en-US", {
    timeZone: SERVER_TIME_ZONE, hour: "2-digit", minute: "2-digit",
    ...(includeDate ? {} : { second: "2-digit" as const }),
  });
  if (!includeDate) return time;
  return date.toLocaleDateString("en-US", {
    timeZone: SERVER_TIME_ZONE, month: "short", day: "numeric", year: "numeric",
  }) + " \u2022 " + time;
}
