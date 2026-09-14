"use client";

import { useEffect, useState } from "react";
import { SERVER_IP, SOCIAL_LINKS } from "@/config/site";
import { motion } from "framer-motion";
import { Users, Copy, Check, Info } from "lucide-react";

export default function Home() {
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [maxPlayers, setMaxPlayers] = useState<number | null>(null);
  const [online, setOnline] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch('/api/leaderboards');
        const json = await res.json();
        
        if (json.success && json.data.server && json.updated_at) {
          // Check if the data is fresh (updated within the last 3 minutes)
          const lastUpdated = new Date(json.updated_at).getTime();
          const now = new Date().getTime();
          const diffMinutes = (now - lastUpdated) / 1000 / 60;
          
          if (diffMinutes < 3) {
            setOnline(true);
            setPlayerCount(json.data.server.online);
            setMaxPlayers(json.data.server.max);
          } else {
            setOnline(false); // Server script hasn't pushed recently, assume offline
          }
        } else {
          setOnline(false);
        }
      } catch (error) {
        setOnline(false);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const copyIp = () => {
    navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-950">
      {/* Background patterns */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="z-10 flex flex-col items-center px-4 text-center max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 text-red-500 font-black tracking-widest text-sm md:text-base border border-red-500/20 mb-6 uppercase shadow-[0_0_15px_rgba(239,68,68,0.2)]"
        >
          Coming Soon
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-600 mb-2 uppercase drop-shadow-md"
        >
          RawchySMP
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold text-white mb-6 uppercase tracking-wider"
        >
          The Hunter's World
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-8 flex flex-col gap-2"
        >
          <p>A new adventure is coming.</p>
          <p className="font-semibold text-zinc-300">Build. Hunt. Survive. GO TOP</p>
          <p className="text-yellow-500 font-bold tracking-widest mt-2 uppercase">Get Ready</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          {/* Server IP Card */}
          <div className="flex flex-col bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-2xl p-4 w-full sm:w-auto relative group overflow-hidden">
            <div className="flex items-center gap-4 mb-2">
              <div className={`w-3 h-3 rounded-full ${loading ? 'bg-zinc-600 animate-pulse' : online ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`}></div>
              <span className="font-bold text-sm tracking-wider uppercase text-zinc-300">
                {loading ? 'Pinging Server...' : online ? 'Server Online' : 'Server Offline'}
              </span>
            </div>
            
            <div className="flex items-center justify-between gap-6 bg-black/40 rounded-xl p-3 border border-zinc-800/50 group-hover:border-zinc-700 transition-colors">
              <span className="font-mono text-lg font-bold text-white tracking-wider">{SERVER_IP}</span>
              <button 
                onClick={copyIp}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-all active:scale-95 text-zinc-400 hover:text-white"
                title="Copy IP"
              >
                {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          {/* Discord Button */}
          <a 
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center bg-[#5865F2]/10 hover:bg-[#5865F2]/20 border border-[#5865F2]/30 backdrop-blur-md rounded-2xl p-4 w-full sm:w-48 h-full min-h-[90px] transition-all duration-300 hover:shadow-[0_0_20px_rgba(88,101,242,0.2)] group"
          >
            <span className="font-bold text-[#5865F2] tracking-wider uppercase mb-1 flex items-center gap-2 group-hover:scale-105 transition-transform">
              Join Discord
            </span>
          </a>
        </motion.div>

        {/* Dynamic Player Count / Offline Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 text-sm flex items-center justify-center h-8"
        >
          {loading ? (
            <span className="text-zinc-500 animate-pulse">Checking status...</span>
          ) : online ? (
            <span className="text-emerald-400 font-medium flex items-center gap-2 bg-emerald-400/10 px-4 py-1.5 rounded-full border border-emerald-400/20">
              <Users size={16} />
              {playerCount} / {maxPlayers} Players Online
            </span>
          ) : (
            <span className="text-zinc-500 flex items-center gap-2 bg-zinc-900/50 px-4 py-1.5 rounded-full border border-zinc-800">
              <Info size={16} />
              Check Discord for updates
            </span>
          )}
        </motion.div>
      </div>
    </main>
  );
}
