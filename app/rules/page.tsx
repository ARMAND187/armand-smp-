import type { Metadata } from "next";

import { RulesContent } from "./RulesContent";

export const metadata: Metadata = {
  title: "RawchySMP Server Rules | Official Rules",
  description: "Official RawchySMP Minecraft server rules covering chat, cheats, exploits, economy, stat boosting, account security and player conduct.",
  alternates: {
    canonical: "https://rawchysmp.com/rules",
  },
};

export default function RulesPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center py-12 px-4 md:px-8 font-sans">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('/bg-warrior.jpg')" }}></div>
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#00E5FF]/5 to-transparent z-0 pointer-events-none"></div>

      <RulesContent />

      {/* Footer Note */}
      <div className="z-10 w-full max-w-4xl mt-8 text-center border-t border-slate-800/50 pt-6">
        <p className="text-slate-500 text-sm">Rules may be updated when necessary.</p>
      </div>
    </main>
  );
}
