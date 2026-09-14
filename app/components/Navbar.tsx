import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-cyan-600 uppercase">
                RAWCHYSMP
              </span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-8">
                <Link href="/" className="text-zinc-300 hover:text-white px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors hover:bg-zinc-800/50">
                  Home
                </Link>
                <Link href="/leaderboards" className="text-cyan-400 hover:text-cyan-300 px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors hover:bg-zinc-800/50">
                  Leaderboards
                </Link>
              </div>
            </div>
          </div>
          {/* Mobile menu simple */}
          <div className="flex md:hidden space-x-4">
            <Link href="/" className="text-zinc-300 hover:text-white text-xs font-bold uppercase">
              Home
            </Link>
            <Link href="/leaderboards" className="text-cyan-400 hover:text-cyan-300 text-xs font-bold uppercase">
              Leaderboards
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
