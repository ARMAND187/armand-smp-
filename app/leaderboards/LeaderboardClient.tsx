"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { id: 'top', icon: '🏆', label: 'TOP', title: 'Top Overview' },
  { id: 'money', icon: '💰', label: 'MONEY', title: 'Top Money' },
  { id: 'pul', icon: '💎', label: 'PUL', title: 'Top Pul' },
  { id: 'kills', icon: '⚔️', label: 'KILLS', title: 'Top Kills' },
  { id: 'deaths', icon: '☠️', label: 'DEATHS', title: 'Top Deaths' },
  { id: 'bounty', icon: '🏹', label: 'BOUNTY', title: 'Top Bounty' },
  { id: 'duels', icon: '⚔️', label: 'DUEL WINS', title: 'Top Duel Wins' },
  { id: 'playtime', icon: '⏱️', label: 'PLAYTIME', title: 'Top Playtime' },
];

type LeaderboardItem = {
  rank: number;
  name: string;
  value: string;
};

type LeaderboardData = Record<string, LeaderboardItem[]>;

export default function LeaderboardClient({ 
  initialData, 
  initialError 
}: { 
  initialData: LeaderboardData, 
  initialError: string | null 
}) {
  const [data, setData] = useState<LeaderboardData>(initialData);
  const [error, setError] = useState<string | null>(initialError);
  const [activeTab, setActiveTab] = useState('top');
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch('/api/leaderboards');
        const json = await res.json();
        if (json.success) {
          setData(json.data);
          setError(null);
          setLastUpdated(new Date().toLocaleTimeString());
        } else {
          setError("SERVER DATA TEMPORARILY UNAVAILABLE");
        }
      } catch (e) {
        setError("SERVER DATA TEMPORARILY UNAVAILABLE");
      }
    };

    // If the server-side render failed to get data (e.g. Supabase was empty during Vercel build),
    // fetch immediately on client load instead of waiting 45 seconds.
    if (initialError) {
      fetchLeaderboard();
    }

    const interval = setInterval(fetchLeaderboard, 45000);
    return () => clearInterval(interval);
  }, [initialError]);

  const renderTable = (catId: string, title: string, items: LeaderboardItem[], limit = 10) => (
    <div className="bg-[#111827]/75 border border-[#1E293B] rounded-xl overflow-hidden mb-6 backdrop-blur-md transition-all duration-300 hover:border-[#00E5FF]/30">
      <div className="bg-[#0F172A]/80 px-4 sm:px-6 py-4 border-b border-[#1E293B]">
        <h2 className="text-xl font-black uppercase tracking-wider text-[#00E5FF] font-montserrat">{title}</h2>
      </div>
      <div className="overflow-hidden">
        <table className="w-full text-left border-collapse table-fixed sm:table-auto">
          <thead>
            <tr className="bg-[#05070A]/50 text-[#94A3B8] text-xs sm:text-sm uppercase tracking-wider font-montserrat">
              <th className="px-3 sm:px-6 py-3 font-semibold w-16 sm:w-auto">Rank</th>
              <th className="px-3 sm:px-6 py-3 font-semibold truncate">Player</th>
              <th className="px-3 sm:px-6 py-3 font-semibold text-right w-24 sm:w-auto">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B]">
            {items.slice(0, limit).map((item) => (
              <tr key={item.rank} className="hover:bg-[#1E293B] hover:-translate-y-[1px] transition-all duration-200">
                <td className="px-3 sm:px-6 py-3 sm:py-4">
                  <span className={`inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full font-bold text-xs sm:text-sm ${item.rank === 1 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : item.rank === 2 ? 'bg-slate-300/20 text-slate-300 border border-slate-300/30' : item.rank === 3 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-slate-800 text-slate-400'}`}>
                    #{item.rank}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 font-bold text-slate-100 text-sm sm:text-base truncate">
                  {item.name}
                </td>
                <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-mono text-[#00E5FF] font-bold text-sm sm:text-base truncate">
                  {catId === 'money' && !item.value.startsWith('$') ? '$' : ''}{item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative z-10">
      <div className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-slate-50 font-montserrat drop-shadow-md">
            RAWCHY<span className="text-[#00E5FF]">SMP</span> LEADERBOARDS
          </h1>
          <p className="text-[#94A3B8] mt-2 font-medium">The best hunters in the world.</p>
        </div>
        <div className={`mt-4 md:mt-0 text-sm font-mono px-3 py-1.5 rounded-md border inline-flex items-center ${error ? 'bg-[#EF4444]/10 border-[#EF4444]/30 text-[#EF4444]' : 'bg-[#111827]/80 border-[#1E293B] text-slate-400'}`}>
          <span className={`w-2 h-2 rounded-full mr-2 ${error ? 'bg-[#EF4444]' : 'bg-[#22C55E] animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]'}`}></span>
          {error ? "OFFLINE" : `Live updating ⚡ Last sync: ${lastUpdated}`}
        </div>
      </div>

      {error ? (
        <div className="w-full bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl p-12 text-center flex flex-col items-center justify-center">
          <span className="text-4xl mb-4">⚠️</span>
          <h2 className="text-2xl font-black text-[#EF4444] tracking-wider mb-2 font-montserrat">SERVER DATA TEMPORARILY UNAVAILABLE</h2>
          <p className="text-red-400/80">The connection to the RawchySMP live database could not be established.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Nav */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 hide-scrollbar sticky top-24">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`flex items-center whitespace-nowrap px-4 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-200 font-montserrat ${
                    activeTab === cat.id
                      ? "bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/50 shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                      : "bg-[#111827]/50 text-[#94A3B8] border border-[#1E293B] hover:bg-[#1E293B] hover:text-slate-200"
                  }`}
                >
                  <span className="text-xl mr-3">{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-grow min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'top' ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {renderTable('money', '💰 Top Money', data.money || [], 3)}
                    {renderTable('pul', '💎 Top Pul', data.pul || [], 3)}
                    {renderTable('kills', '⚔️ Top Kills', data.kills || [], 3)}
                    {renderTable('duels', '⚔️ Top Duel Wins', data.duels || [], 3)}
                  </div>
                ) : (
                  renderTable(activeTab, CATEGORIES.find(c => c.id === activeTab)?.title || '', data[activeTab] || [], 10)
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
