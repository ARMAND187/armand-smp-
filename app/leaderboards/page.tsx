import LeaderboardClient from "./LeaderboardClient";

export const metadata = {
  title: "Leaderboards | RawchySMP",
  description: "View the top players on RawchySMP. Live Money, Pul, Kills, Deaths, and Playtime leaderboards.",
};

const fallbackData = {
  money: [], pul: [], kills: [], deaths: [], bounty: [], duels: [], playtime: [],
};

export default async function LeaderboardsPage() {
  let initialData = fallbackData;
  let initialError = null;
  
  try {
    const res = await fetch(`https://rawchysmp.com/api/leaderboards`, { next: { revalidate: 30 } });
    if (res.ok) {
      const json = await res.json();
      if (json.success) {
        initialData = json.data;
      } else {
        initialError = json.error || "SERVER DATA TEMPORARILY UNAVAILABLE";
      }
    } else {
      initialError = "SERVER DATA TEMPORARILY UNAVAILABLE";
    }
  } catch (e) {
    initialError = "SERVER DATA TEMPORARILY UNAVAILABLE";
  }

  return <LeaderboardClient initialData={initialData} initialError={initialError} />;
}
