"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();

  const isHome = pathname === '/';
  const isLeaderboards = pathname === '/leaderboards';

  return (
    <nav className="w-full border-b border-slate-800/50 bg-[#05070A]/80 backdrop-blur-md sticky top-0 z-50 font-montserrat">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center">
            <Link href="/" aria-label="RawchySMP home" className="flex-shrink-0 flex min-h-11 items-center gap-2 group">
              <Image src="/rawchysmp-logo.jpg" alt="RawchySMP logo" width={32} height={32} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-700/50 group-hover:border-[#00E5FF]/50 transition-colors" />
              <span className="hidden min-[360px]:inline text-sm sm:text-xl font-black tracking-tighter text-slate-50 uppercase drop-shadow-sm group-hover:text-white transition-colors">
                RAWCHY<span className="text-[#00E5FF]">SMP</span>
              </span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-8">
                <Link 
                  href="/" 
                  aria-current={isHome ? "page" : undefined}
                  className={`min-h-11 px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:bg-[#111827]/50 inline-flex items-center ${isHome ? 'text-[#00E5FF] shadow-[0_2px_0_0_#00E5FF]' : 'text-[#CBD5E1] hover:text-[#00E5FF]'}`}
                >
                  Home
                </Link>
                <Link 
                  href="/leaderboards" 
                  aria-current={isLeaderboards ? "page" : undefined}
                  className={`min-h-11 px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:bg-[#111827]/50 inline-flex items-center ${isLeaderboards ? 'text-[#00E5FF] shadow-[0_2px_0_0_#00E5FF]' : 'text-[#CBD5E1] hover:text-[#00E5FF]'}`}
                >
                  Leaderboards
                </Link>
              </div>
            </div>
          </div>
          <div className="flex md:hidden space-x-2">
            <Link 
              href="/" 
              aria-current={isHome ? "page" : undefined}
              className={`min-h-11 text-[11px] px-2 py-2 font-bold uppercase transition-colors inline-flex items-center ${isHome ? 'text-[#00E5FF] shadow-[0_2px_0_0_#00E5FF]' : 'text-[#CBD5E1] hover:text-[#00E5FF]'}`}
            >
              Home
            </Link>
            <Link 
              href="/leaderboards" 
              aria-current={isLeaderboards ? "page" : undefined}
              className={`min-h-11 text-[11px] px-2 py-2 font-bold uppercase transition-colors inline-flex items-center ${isLeaderboards ? 'text-[#00E5FF] shadow-[0_2px_0_0_#00E5FF]' : 'text-[#CBD5E1] hover:text-[#00E5FF]'}`}
            >
              Leaderboards
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
