import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="w-full border-b border-slate-800/50 bg-[#05070A]/80 backdrop-blur-md sticky top-0 z-50 font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
              <img src="/rawchysmp-logo.jpg" alt="Logo" className="w-8 h-8 rounded-full border border-slate-700/50 group-hover:border-[#00E5FF]/50 transition-colors" />
              <span className="text-xl font-black tracking-tighter text-slate-50 uppercase drop-shadow-sm group-hover:text-white transition-colors">
                RAWCHY<span className="text-[#00E5FF]">SMP</span>
              </span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-8">
                <Link href="/" className="text-[#CBD5E1] hover:text-[#00E5FF] px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:bg-[#111827]/50">
                  Home
                </Link>
                <Link href="/leaderboards" className="text-[#00E5FF] hover:text-[#00E5FF] px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-all duration-200 hover:bg-[#111827]/50 shadow-[0_2px_0_0_#00E5FF]">
                  Leaderboards
                </Link>
              </div>
            </div>
          </div>
          {/* Mobile menu simple */}
          <div className="flex md:hidden space-x-4">
            <Link href="/" className="text-[#CBD5E1] hover:text-[#00E5FF] text-xs font-bold uppercase transition-colors">
              Home
            </Link>
            <Link href="/leaderboards" className="text-[#00E5FF] hover:text-[#00E5FF] text-xs font-bold uppercase transition-colors">
              Leaderboards
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
