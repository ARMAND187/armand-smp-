import LeaderboardClient from "./LeaderboardClient";

export const metadata = {
  title: "Leaderboards | RawchySMP",
  description: "View the top players on RawchySMP. Live Money, Pul, Kills, Deaths, and Playtime leaderboards.",
};

// Fallback empty data structure in case the server is offline during build
const fallbackData = {
  money: Array(10).fill({ rank: 0, name: "---", value: "0" }).map((x,i) => ({...x, rank: i+1})),
  pul: Array(10).fill({ rank: 0, name: "---", value: "0" }).map((x,i) => ({...x, rank: i+1})),
  kills: Array(10).fill({ rank: 0, name: "---", value: "0" }).map((x,i) => ({...x, rank: i+1})),
  deaths: Array(10).fill({ rank: 0, name: "---", value: "0" }).map((x,i) => ({...x, rank: i+1})),
  bounty: Array(10).fill({ rank: 0, name: "---", value: "0" }).map((x,i) => ({...x, rank: i+1})),
  duels: Array(10).fill({ rank: 0, name: "---", value: "0" }).map((x,i) => ({...x, rank: i+1})),
  playtime: Array(10).fill({ rank: 0, name: "---", value: "0" }).map((x,i) => ({...x, rank: i+1})),
};

export default async function LeaderboardsPage() {
  let initialData = fallbackData;
  
  // Try to fetch initial data if possible, but don't fail the build if it can't
  try {
    // In Next.js App Router, fetch with revalidate is highly optimized
    // Since this runs on the server (Vercel edge/node), we must provide the absolute URL
    // We use the public URL since the RCON bridge is exposed there.
    // If it fails (e.g. during build), we just use fallbackData and the client will load it.
    const res = await fetch(`https://rawchysmp.com/api/leaderboards`, { next: { revalidate: 30 } });
    if (res.ok) {
      const json = await res.json();
      if (json.success) initialData = json.data;
    }
  } catch (e) {
    console.log("Could not fetch initial leaderboard data during SSR.");
  }

  return <LeaderboardClient initialData={initialData} />;
}
