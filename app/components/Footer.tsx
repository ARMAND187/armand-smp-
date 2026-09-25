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
            <h2 className="text-xl font-black tracking-tighter text-slate-50 uppercase drop-shadow-sm">
              RAWCHY<span className="text-[#00E5FF]">SMP</span>
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

          {/* Blank space or future join info */}
          <div className="flex flex-col gap-3 text-center md:text-left hidden md:flex">
            {/* Kept structured cleanly for a future /join page or server IP widget */}
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
