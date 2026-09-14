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
    const interval = setInterval(async () => {
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
    }, 45000); // 45s
    return () => clearInterval(interval);
  }, []);

  const renderTable = (catId: string, title: string, items: LeaderboardItem[], limit = 10) => (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden mb-6 backdrop-blur-sm">
      <div className="bg-zinc-800/50 px-6 py-4 border-b border-zinc-700">
        <h2 className="text-xl font-black uppercase tracking-wider text-cyan-400">{title}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-900/80 text-zinc-400 text-sm uppercase tracking-wider">
              <th className="px-6 py-3 font-semibold">Rank</th>
              <th className="px-6 py-3 font-semibold">Player</th>
              <th className="px-6 py-3 font-semibold text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {items.slice(0, limit).map((item) => (
              <tr key={item.rank} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${item.rank === 1 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : item.rank === 2 ? 'bg-zinc-300/20 text-zinc-300 border border-zinc-300/30' : item.rank === 3 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-zinc-800 text-zinc-500'}`}>
                    #{item.rank}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-zinc-200">
                  {item.name}
                </td>
                <td className="px-6 py-4 text-right font-mono text-cyan-300 font-bold">
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-600">
            RawchySMP Leaderboards
          </h1>
          <p className="text-zinc-400 mt-2 font-medium">The best hunters in the world.</p>
        </div>
        <div className={`mt-4 md:mt-0 text-sm font-mono px-3 py-1.5 rounded-md border inline-flex items-center ${error ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-zinc-900/50 border-zinc-800 text-zinc-500'}`}>
          <span className={`w-2 h-2 rounded-full mr-2 ${error ? 'bg-red-500' : 'bg-green-500 animate-pulse'}`}></span>
          {error ? "OFFLINE" : `Live updating • Last sync: ${lastUpdated}`}
        </div>
      </div>

      {error ? (
        <div className="w-full bg-red-500/10 border border-red-500/20 rounded-xl p-12 text-center flex flex-col items-center justify-center">
          <span className="text-4xl mb-4">⚠️</span>
          <h2 className="text-2xl font-black text-red-500 tracking-wider mb-2">SERVER DATA TEMPORARILY UNAVAILABLE</h2>
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
                  className={`flex items-center whitespace-nowrap px-4 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all duration-200 ${
                    activeTab === cat.id
                      ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                      : "bg-zinc-900/50 text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-200"
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
