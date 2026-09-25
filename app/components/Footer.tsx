import Link from 'next/link';
import { SOCIAL_LINKS } from '@/config/site';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-slate-800/50 bg-[#05070A]/80 mt-auto py-8 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <h2 className="text-xl font-black tracking-tighter text-slate-50 drop-shadow-sm">
              Rawchy<span className="text-[#00E5FF]">SMP</span>
            </h2>
            <p className="text-slate-400 text-sm font-semibold tracking-[0.2em] uppercase">
              The Hunter&apos;s World
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h3 className="text-slate-200 font-bold uppercase tracking-wider text-sm mb-1">Useful Links</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="/" className="text-slate-400 hover:text-[#00E5FF] transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/leaderboards" className="text-slate-400 hover:text-[#00E5FF] transition-colors text-sm">
                  Leaderboards
                </Link>
              </li>
              <li>
                <Link href="/rules" className="text-slate-400 hover:text-[#00E5FF] transition-colors text-sm">
                  Rules
                </Link>
              </li>
              <li>
                <a href={SOCIAL_LINKS.discord} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#00E5FF] transition-colors text-sm">
                  Discord
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-3 text-center md:text-left">
            <h3 className="text-slate-200 font-bold uppercase tracking-wider text-sm mb-1">Follow RawchySMP</h3>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-1">
              <a 
                href="https://www.instagram.com/rawchysmp" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-[#00E5FF] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@rawchysmp" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-slate-400 hover:text-[#00E5FF] transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]"
                aria-label="TikTok"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" transform="scale(0.75) translate(3.5, 4.5)" strokeWidth="2.6"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/50 flex flex-col items-center gap-3 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {currentYear} RawchySMP. All rights reserved.
          </p>
          <p className="text-slate-500 text-xs max-w-2xl">
            RawchySMP is an independent Minecraft server and is not affiliated with or endorsed by Mojang Studios or Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
}
