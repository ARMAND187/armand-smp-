import LeaderboardClient from "./LeaderboardClient";
import { getLeaderboardSnapshot, type LeaderboardData } from "@/lib/leaderboards";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Leaderboards | RawchySMP",
  description: "View the top players on RawchySMP. Live Money, Pul, Kills, Deaths, and Playtime leaderboards.",
};

const fallbackData = {
  money: [], pul: [], kills: [], deaths: [], bounty: [], duels: [], playtime: [],
};

export default async function LeaderboardsPage() {
  let initialData: LeaderboardData = fallbackData;
  let initialError: string | null = null;
  let initialUpdatedAt: string | null = null;
  let initialNow = 0;
  
  try {
    const snapshot = await getLeaderboardSnapshot();
    initialData = snapshot.data;
    initialUpdatedAt = snapshot.updated_at;
    initialNow = snapshot.checked_at;
  } catch {
    initialError = "SERVER DATA TEMPORARILY UNAVAILABLE";
  }

  return (
    <main className="relative min-h-screen bg-[#05070A] font-sans">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-10 mix-blend-screen pointer-events-none"
        style={{ backgroundImage: "url('/bg-warrior.jpg')", backgroundAttachment: "fixed" }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#05070A] via-[#05070A]/80 to-[#05070A] pointer-events-none"></div>
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
      
      <LeaderboardClient initialData={initialData} initialError={initialError} initialUpdatedAt={initialUpdatedAt} initialNow={initialNow} />
    </main>
  );
}
