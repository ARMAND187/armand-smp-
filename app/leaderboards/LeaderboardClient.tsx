"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { formatLastSync, isServerOnline, SYNC_INTERVAL_MS } from "@/lib/leaderboard-status";
import { isLeaderboardData, type LeaderboardData, type LeaderboardItem } from "@/lib/leaderboard-data";

const CATEGORIES = [
  { id: "top", icon: "🏆", label: "TOP", title: "Top Overview" },
  { id: "money", icon: "💰", label: "MONEY", title: "Top Money" },
  { id: "pul", icon: "💎", label: "PUL", title: "Top Pul" },
  { id: "kills", icon: "⚔️", label: "KILLS", title: "Top Kills" },
  { id: "deaths", icon: "☠️", label: "DEATHS", title: "Top Deaths" },
  { id: "bounty", icon: "🏹", label: "BOUNTY", title: "Top Bounty" },
  { id: "duels", icon: "⚔️", label: "DUEL WINS", title: "Top Duel Wins" },
  { id: "playtime", icon: "⏱️", label: "PLAYTIME", title: "Top Playtime" },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];
type RankedCategoryId = Exclude<CategoryId, "top">;

const rankedCategories = CATEGORIES.filter(
  (category): category is (typeof CATEGORIES)[number] & { id: RankedCategoryId } => category.id !== "top",
);

function displayValue(category: string, value: string) {
  return category === "money" && !value.startsWith("$") ? `$${value}` : value;
}

export default function LeaderboardClient({
  initialData,
  initialError,
  initialUpdatedAt,
  initialNow,
}: {
  initialData: LeaderboardData;
  initialError: string | null;
  initialUpdatedAt: string | null;
  initialNow: number;
}) {
  const [data, setData] = useState<LeaderboardData>(initialData);
  const [error, setError] = useState<string | null>(initialError);
  const [activeTab, setActiveTab] = useState<CategoryId>("top");
  const [lastUpdated, setLastUpdated] = useState(initialUpdatedAt);
  const [now, setNow] = useState(initialNow);
  const online = isServerOnline(lastUpdated, now);

  useEffect(() => {
    let disposed = false;
    let pending = false;
    let controller: AbortController | null = null;

    const fetchLeaderboard = async () => {
      if (pending) return;
      pending = true;
      controller = new AbortController();
      const timeout = setTimeout(() => controller?.abort(), 10_000);

      try {
        const response = await fetch("/api/leaderboards", {
          cache: "no-store",
          signal: controller.signal,
        });
        const json = await response.json();
        if (disposed) return;

        if (
          response.ok &&
          json.success &&
          isLeaderboardData(json.data) &&
          typeof json.updated_at === "string" &&
          Number.isFinite(Date.parse(json.updated_at))
        ) {
          setData(json.data);
          setError(null);
          setLastUpdated(json.updated_at);
        } else {
          setError("SERVER DATA TEMPORARILY UNAVAILABLE");
        }
      } catch {
        if (!disposed) setError("SERVER DATA TEMPORARILY UNAVAILABLE");
      } finally {
        clearTimeout(timeout);
        pending = false;
        if (!disposed) setNow(Date.now());
      }
    };

    void fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, SYNC_INTERVAL_MS);
    const clock = setInterval(() => setNow(Date.now()), 1000);

    return () => {
      disposed = true;
      controller?.abort();
      clearInterval(interval);
      clearInterval(clock);
    };
  }, []);

  const renderTable = (categoryId: string, title: string, items: LeaderboardItem[]) => (
    <div className="overflow-hidden rounded-xl border border-[#1E293B] bg-[#111827]/75 backdrop-blur-md transition-colors duration-300 hover:border-[#00E5FF]/30">
      <div className="border-b border-[#1E293B] bg-[#0F172A]/80 px-4 py-4 sm:px-6">
        <h2 className="font-montserrat text-xl font-black uppercase tracking-wider text-[#00E5FF]">{title}</h2>
      </div>
      <div className="overflow-hidden">
        <table className="w-full table-fixed border-collapse text-left sm:table-auto">
          <caption className="sr-only">{title} player rankings</caption>
          <thead>
            <tr className="bg-[#05070A]/50 font-montserrat text-xs uppercase tracking-wider text-[#94A3B8] sm:text-sm">
              <th scope="col" className="w-16 px-3 py-3 font-semibold sm:w-auto sm:px-6">Rank</th>
              <th scope="col" className="truncate px-3 py-3 font-semibold sm:px-6">Player</th>
              <th scope="col" className="w-24 px-3 py-3 text-right font-semibold sm:w-auto sm:px-6">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B]">
            {items.slice(0, 10).map((item) => (
              <tr key={item.rank} className="transition-colors duration-200 hover:bg-[#1E293B]">
                <td className="px-3 py-3 sm:px-6 sm:py-4">
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold sm:h-8 sm:w-8 sm:text-sm ${item.rank === 1 ? "border-yellow-500/30 bg-yellow-500/20 text-yellow-500" : item.rank === 2 ? "border-slate-300/30 bg-slate-300/20 text-slate-300" : item.rank === 3 ? "border-orange-500/30 bg-orange-500/20 text-orange-400" : "border-slate-700 bg-slate-800 text-slate-400"}`}>
                    #{item.rank}
                  </span>
                </td>
                <td className="truncate px-3 py-3 text-sm font-bold text-slate-100 sm:px-6 sm:py-4 sm:text-base">
                  {item.name.trim()}
                </td>
                <td className="truncate px-3 py-3 text-right font-mono text-sm font-bold text-[#00E5FF] sm:px-6 sm:py-4 sm:text-base">
                  {displayValue(categoryId, item.value.trim())}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % CATEGORIES.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + CATEGORIES.length) % CATEGORIES.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = CATEGORIES.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    setActiveTab(CATEGORIES[nextIndex].id);
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[nextIndex]?.focus();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="mb-8 flex flex-col justify-between text-center md:flex-row md:items-end md:text-left">
          <div>
            <h1 className="font-montserrat text-3xl font-black uppercase tracking-tighter text-slate-50 drop-shadow-md min-[360px]:text-4xl md:text-5xl">
              RAWCHY<span className="text-[#00E5FF]">SMP</span> LEADERBOARDS
            </h1>
            <p className="mt-2 font-medium text-[#94A3B8]">The best hunters in the world.</p>
          </div>

          <div
            role="status"
            aria-live="polite"
            className={`mt-4 inline-flex flex-col items-center rounded-lg border px-3 py-2 font-mono md:mt-0 md:items-start ${!online || error ? "border-[#EF4444]/30 bg-[#EF4444]/10 text-[#EF4444]" : "border-[#1E293B] bg-[#111827]/80 text-slate-300"}`}
          >
            <span className="inline-flex items-center text-sm">
              <span className={`mr-2 h-2 w-2 shrink-0 rounded-full ${!online || error ? "bg-[#EF4444]" : "animate-pulse bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.6)]"}`}></span>
              {error
                ? `Sync unavailable • Last sync: ${formatLastSync(lastUpdated)}`
                : online
                  ? `Live updating ⚡ Last sync: ${formatLastSync(lastUpdated, false)}`
                  : `Server offline • Last sync: ${formatLastSync(lastUpdated)}`}
            </span>
            <span className="mt-1 text-center text-[11px] leading-relaxed text-slate-400 md:text-left">
              {error ? "Saved rankings are still available. Retrying automatically." : online ? "Updates every 45 seconds. Times shown in Baghdad time." : "Last saved rankings, shown in Baghdad time. Waiting for the server to return."}
            </span>
          </div>
        </div>

        {error && !lastUpdated ? (
          <div className="flex w-full flex-col items-center justify-center rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/10 p-8 text-center sm:p-12">
            <span className="mb-4 text-4xl" aria-hidden="true">⚠️</span>
            <h2 className="mb-2 font-montserrat text-2xl font-black tracking-wider text-[#EF4444]">SERVER DATA TEMPORARILY UNAVAILABLE</h2>
            <p className="text-red-400/80">The connection to the RawchySMP live database could not be established.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="w-full shrink-0 lg:w-64">
              <div
                role="tablist"
                aria-label="Leaderboard categories"
                className="sticky top-20 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:top-24 lg:flex lg:flex-col"
              >
                {CATEGORIES.map((category, index) => (
                  <button
                    type="button"
                    role="tab"
                    id={`tab-${category.id}`}
                    aria-controls={`panel-${category.id}`}
                    aria-selected={activeTab === category.id}
                    tabIndex={activeTab === category.id ? 0 : -1}
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                    className={`min-h-12 rounded-xl border px-3 py-3 font-montserrat text-xs font-bold uppercase tracking-wide transition-all duration-200 sm:text-sm lg:flex lg:items-center lg:px-4 lg:text-left lg:tracking-wider ${activeTab === category.id ? "border-[#00E5FF]/50 bg-[#00E5FF]/10 text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.15)]" : "border-[#1E293B] bg-[#111827]/50 text-[#94A3B8] hover:bg-[#1E293B] hover:text-slate-200"}`}
                  >
                    <span className="mr-1.5 text-base sm:text-lg lg:mr-3 lg:text-xl" aria-hidden="true">{category.icon}</span>
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="min-w-0 flex-grow">
              <AnimatePresence mode="wait">
                <motion.div
                  role="tabpanel"
                  id={`panel-${activeTab}`}
                  aria-labelledby={`tab-${activeTab}`}
                  tabIndex={0}
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "top" ? (
                    <div>
                      <div className="mb-4 flex items-end justify-between gap-4">
                        <div>
                          <p className="font-montserrat text-xs font-bold uppercase tracking-[0.2em] text-[#00E5FF]">Hall of fame</p>
                          <h2 className="mt-1 font-montserrat text-2xl font-black uppercase text-slate-50">Every category leader</h2>
                        </div>
                        <p className="hidden text-sm text-slate-500 sm:block">Select a card for the full top 10.</p>
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {rankedCategories.map((category) => {
                          const winner = data[category.id]?.find((item) => !["---", "none"].includes(item.name.trim().toLowerCase()));
                          return (
                            <button
                              type="button"
                              key={category.id}
                              onClick={() => setActiveTab(category.id)}
                              className="group min-h-32 rounded-xl border border-[#1E293B] bg-[#111827]/75 p-4 text-left backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[#00E5FF]/50 hover:bg-[#111827] focus-visible:border-[#00E5FF]"
                              aria-label={`Open ${category.title} rankings`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-2xl" aria-hidden="true">{category.icon}</span>
                                <span className="font-montserrat text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-[#00E5FF]">View top 10</span>
                              </div>
                              <p className="mt-3 font-montserrat text-xs font-bold uppercase tracking-wider text-slate-400">{category.title}</p>
                              <div className="mt-1 flex items-baseline justify-between gap-3">
                                <strong className="truncate text-base text-slate-100">{winner?.name.trim() ?? "No ranked players yet"}</strong>
                                <span className="shrink-0 font-mono text-sm font-bold text-[#00E5FF]">
                                  {winner ? displayValue(category.id, winner.value.trim()) : "--"}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    renderTable(
                      activeTab,
                      `${CATEGORIES.find((category) => category.id === activeTab)?.icon ?? ""} ${CATEGORIES.find((category) => category.id === activeTab)?.title ?? ""}`,
                      data[activeTab] || [],
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
