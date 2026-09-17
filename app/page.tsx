"use client";

import { useEffect, useState } from "react";
import { SERVER_IP, SOCIAL_LINKS } from "@/config/site";
import { motion } from "framer-motion";
import { Users, Copy, Check, Clock, ArrowRight } from "lucide-react";
import { formatLastSync, isServerOnline, SYNC_INTERVAL_MS } from "@/lib/leaderboard-status";

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
        const res = await fetch('/api/leaderboards', { cache: 'no-store', signal: AbortSignal.timeout(10_000) });
        const json = await res.json();
        
        if (res.ok && json.success && json.data.server && json.updated_at) {
          const lastUpdated = new Date(json.updated_at);
          setLastUpdateDate(lastUpdated);
          
          if (isServerOnline(json.updated_at, Date.now())) {
            setOnline(true);
            setPlayerCount(json.data.server.online);
            setMaxPlayers(json.data.server.max);
          } else {
            setOnline(false);
          }
        } else {
          setOnline(false);
        }
      } catch {
        setOnline(false);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStatus();
    const interval = setInterval(fetchStatus, SYNC_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const copyIp = async () => {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const formatDate = (date: Date) => {
    return formatLastSync(date.toISOString());
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#05070A] font-sans">
      {/* Dark Minecraft warrior background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20 mix-blend-screen"
        style={{ backgroundImage: "url('/bg-warrior.jpg')" }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/70 to-[#05070A]/30"></div>
      
      {/* Optional grid overlay */}
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>

      <div className="z-10 flex flex-col items-center px-4 text-center max-w-5xl mx-auto w-full py-6 md:py-8">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center px-6 py-1.5 rounded-full border border-red-500/50 bg-red-950/20 text-red-500 font-bold tracking-widest text-xs md:text-sm uppercase mb-8 md:mb-4 shadow-[0_0_15px_rgba(239,68,68,0.15)] font-montserrat"
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
          <div className="absolute inset-0 bg-cyan-500 blur-[100px] opacity-[0.15] rounded-full w-full h-full"></div>
          
          {/* Crown Icon */}
          <svg className="w-10 h-10 md:w-14 md:h-14 text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] relative z-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/>
          </svg>

          {/* Glowing line under crown */}
          <div className="w-full max-w-[250px] md:max-w-[350px] h-[2px] bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_12px_rgba(0,229,255,0.8)] mb-3 md:mb-0 relative z-0"></div>

          {/* Styled Text Logo */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black italic tracking-tighter uppercase relative z-10 flex items-center leading-tight font-montserrat mt-2 md:mt-0">
            <span className="text-slate-50" style={{ textShadow: '0 4px 10px rgba(0,0,0,0.8)' }}>RAWCHY</span>
            <span className="text-[#00E5FF] bg-clip-text text-transparent bg-gradient-to-b from-[#00E5FF] to-[#007BFF] pr-2 md:pr-4" style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.8)) drop-shadow(0 0 20px rgba(0,229,255,0.4))' }}>SMP</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-3 md:gap-6 w-full max-w-lg md:max-w-2xl mb-4"
        >
          {/* Left glowing line */}
          <div className="h-[2px] flex-grow bg-gradient-to-l from-[#00E5FF] to-transparent shadow-[0_0_10px_rgba(0,229,255,0.6)] opacity-70"></div>
          
          <h2 className="text-sm md:text-xl font-bold text-slate-50 uppercase tracking-[0.2em] md:tracking-[0.4em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] whitespace-nowrap font-montserrat">
            The Hunter&apos;s World
          </h2>
          
          {/* Right glowing line */}
          <div className="h-[2px] flex-grow bg-gradient-to-r from-[#00E5FF] to-transparent shadow-[0_0_10px_rgba(0,229,255,0.6)] opacity-70"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-2xl mb-5 flex flex-col gap-2"
        >
          <p className="text-slate-400 text-sm md:text-base font-normal">A new adventure is coming.</p>
          <p className="text-slate-50 text-sm md:text-base font-bold tracking-widest uppercase font-montserrat">Build. Hunt. Survive. <span className="text-[#00E5FF]">GO TOP</span></p>
        </motion.div>

        <motion.a
          href={SOCIAL_LINKS.discord}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="group inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#00E5FF]/80 bg-[#00E5FF]/10 text-[#00E5FF] font-bold uppercase tracking-wider hover:bg-[#00E5FF]/20 hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-200 mb-8 font-montserrat"
        >
          Get Ready 
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </motion.a>

        {/* Bottom Status Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 bg-[#111827]/75 backdrop-blur-md border border-[#00E5FF]/20 rounded-2xl p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] divide-y md:divide-y-0 md:divide-x divide-slate-800/50"
        >
          {/* Section 1: Server IP & Status */}
          <div className="flex flex-col items-center md:items-start justify-center px-4 md:px-8 gap-3">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${loading ? 'bg-slate-500 animate-pulse' : online ? 'bg-[#22C55E] shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-[#EF4444]'}`}></div>
              <span className={`text-xs font-bold tracking-wider uppercase font-montserrat ${loading ? 'text-slate-400' : online ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                {loading ? 'Pinging...' : online ? 'Server Online' : 'Server Offline'}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-slate-100">
              <Users size={16} className="text-[#00E5FF]" />
              <span className="font-mono font-semibold tracking-wide">{SERVER_IP}</span>
              <button 
                onClick={copyIp}
                className="hover:text-white transition-colors ml-1 text-slate-400 border border-transparent hover:border-slate-700 p-1 rounded"
                title="Copy IP"
              >
                {copied ? <span className="text-xs font-bold text-[#22C55E] flex items-center gap-1"><Check size={14}/> COPIED</span> : <Copy size={14} />}
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <Users size={14} />
              <span>Players: {loading ? '--' : online ? `${playerCount} / ${maxPlayers}` : '0 / 0'}</span>
            </div>
          </div>

          {/* Section 2: Last Update */}
          <div className="flex flex-col items-center md:items-start justify-center px-4 md:px-8 gap-3 pt-6 md:pt-0">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold tracking-wider uppercase font-montserrat">
              <Clock size={14} />
              <span>Last Update</span>
            </div>
            
            <div className="text-slate-100 text-sm font-medium">
              {lastUpdateDate ? formatDate(lastUpdateDate) : 'Awaiting data...'}
            </div>
          </div>

          {/* Section 3: Discord Button */}
          <div className="flex items-center justify-center px-4 md:px-8 pt-6 md:pt-0">
            <a 
              href={SOCIAL_LINKS.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#111827] border border-[#334155] hover:bg-[#1E293B] hover:border-[#8B5CF6]/50 text-slate-50 font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] flex items-center justify-center gap-2 uppercase tracking-wide text-sm font-montserrat"
            >
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
              </svg>
              Join Discord <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
