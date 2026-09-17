"use client";

import { useEffect, useState } from "react";
import { SERVER_IP, SOCIAL_LINKS } from "@/config/site";
import { motion } from "framer-motion";
import { Users, Copy, Check, Info, Clock, ArrowRight } from "lucide-react";

export default function Home() {
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [maxPlayers, setMaxPlayers] = useState<number | null>(null);
  const [online, setOnline] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastUpdateDate, setLastUpdateDate] = useState<Date | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch('/api/leaderboards');
        const json = await res.json();
        
        if (json.success && json.data.server && json.updated_at) {
          const lastUpdated = new Date(json.updated_at);
          setLastUpdateDate(lastUpdated);
          
          const now = new Date().getTime();
          const diffMinutes = (now - lastUpdated.getTime()) / 1000 / 60;
          
          if (diffMinutes < 3) {
            setOnline(true);
            setPlayerCount(json.data.server.online);
            setMaxPlayers(json.data.server.max);
          } else {
            setOnline(false);
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' • ' + 
           date.toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit' });
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050B14]">
      {/* Dark Minecraft warrior background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-screen"
        style={{ backgroundImage: "url('/bg-warrior.jpg')" }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/60 to-transparent"></div>
      
      {/* Optional grid overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>

      <div className="z-10 flex flex-col items-center px-4 text-center max-w-5xl mx-auto w-full py-4 md:py-8">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center px-6 py-1.5 rounded-full border border-cyan-500/50 bg-cyan-950/30 text-cyan-400 font-bold tracking-widest text-xs md:text-sm uppercase mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]"
        >
          Coming Soon
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-1 relative flex flex-col items-center w-full"
        >
          {/* Logo glow effect */}
          <div className="absolute inset-0 bg-cyan-500 blur-[100px] opacity-20 rounded-full w-full h-full"></div>
          
          {/* Crown Icon */}
          <svg className="w-10 h-10 md:w-14 md:h-14 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] relative z-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
          </svg>

          {/* Glowing line under crown */}
          <div className="w-full max-w-[250px] md:max-w-[350px] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(34,211,238,1)] mb-[-10px] relative z-0"></div>

          {/* Styled Text Logo */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black italic tracking-tighter uppercase relative z-10 flex items-center leading-tight">
            <span className="text-white" style={{ textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>RAWCHY</span>
            <span className="text-cyan-400" style={{ textShadow: '0 4px 10px rgba(0,0,0,0.8), 0 0 30px rgba(6,182,212,0.6)' }}>SMP</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-3 md:gap-6 w-full max-w-lg md:max-w-2xl mb-4"
        >
          {/* Left glowing line */}
          <div className="h-[2px] flex-grow bg-gradient-to-l from-cyan-500 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.8)] opacity-70"></div>
          
          <h2 className="text-sm md:text-xl font-bold text-white uppercase tracking-[0.2em] md:tracking-[0.4em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap">
            The Hunter's World
          </h2>
          
          {/* Right glowing line */}
          <div className="h-[2px] flex-grow bg-gradient-to-r from-cyan-500 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.8)] opacity-70"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-zinc-300 text-sm md:text-base max-w-2xl mb-4 flex flex-col gap-2 font-medium"
        >
          <p>A new adventure is coming.</p>
          <p className="tracking-widest uppercase">Build. Hunt. Survive. <span className="text-cyan-400 font-bold">GO TOP</span></p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="group inline-flex items-center gap-2 px-8 py-3 rounded-full border border-cyan-500 bg-cyan-950/20 text-cyan-400 font-bold uppercase tracking-wider hover:bg-cyan-900/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all mb-8"
        >
          Get Ready 
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </motion.button>

        {/* Bottom Status Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 bg-[#0A111E]/80 backdrop-blur-xl border border-cyan-900/30 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] divide-y md:divide-y-0 md:divide-x divide-zinc-800/50"
        >
          {/* Section 1: Server IP & Status */}
          <div className="flex flex-col items-center md:items-start justify-center px-4 md:px-8 gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${loading ? 'bg-zinc-500 animate-pulse' : online ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`}></div>
              <span className="text-xs font-bold tracking-wider uppercase text-zinc-300">
                {loading ? 'Pinging...' : online ? 'Server Online' : 'Server Offline'}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-zinc-300">
              <Users size={16} className="text-cyan-400" />
              <span className="font-mono font-semibold tracking-wide">{SERVER_IP}</span>
              <button 
                onClick={copyIp}
                className="hover:text-white transition-colors ml-1"
                title="Copy IP"
              >
                {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <Users size={14} />
              <span>Players: {loading ? '--' : online ? `${playerCount} / ${maxPlayers}` : '0 / 0'}</span>
            </div>
          </div>

          {/* Section 2: Last Update */}
          <div className="flex flex-col items-center md:items-start justify-center px-4 md:px-8 gap-3 pt-6 md:pt-0">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold tracking-wider uppercase">
              <Clock size={14} />
              <span>Last Update</span>
            </div>
            
            <div className="text-zinc-300 text-sm font-medium">
              {lastUpdateDate ? formatDate(lastUpdateDate) : 'Awaiting data...'}
            </div>
            
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span>Live data (45s)</span>
            </div>
          </div>

          {/* Section 3: Discord Button */}
          <div className="flex items-center justify-center px-4 md:px-8 pt-6 md:pt-0">
            <a 
              href={SOCIAL_LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3 px-6 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(88,101,242,0.4)] flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
            >
              <img src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png" alt="Discord" className="w-5 h-5 filter brightness-0 invert" />
              Join Discord <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
