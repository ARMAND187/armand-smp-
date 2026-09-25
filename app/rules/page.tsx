import type { Metadata } from "next";

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

      <div className="z-10 w-full max-w-4xl flex flex-col gap-8">
        
        {/* Header */}
        <section className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter font-montserrat mb-4">
            <span className="text-slate-50">📜 RAWCHY</span><span className="text-[#00E5FF]">SMP</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-slate-200 mb-6">
            Server Rules | یاساکانی سێرڤەری ڕاوچی
          </h2>
          <div className="max-w-2xl mx-auto bg-[#111827]/80 border border-slate-800 rounded-xl p-6 shadow-lg backdrop-blur-sm" dir="rtl">
            <p className="text-slate-300 text-lg leading-relaxed font-medium mb-3">بەخێربێن بۆ سێرڤەری ڕاوچی!</p>
            <p className="text-slate-400 leading-relaxed mb-3">بۆ پاراستنی ژینگەیەکی ئارام و دادپەروەر بۆ هەموو یاریزانان، تکایە پابەندی یاساکانی سێرڤەر بن.</p>
            <p className="text-slate-400 leading-relaxed">شکاندنی یاساکان دەتوانێت ببێتە هۆی سزا.</p>
          </div>
        </section>

        {/* Rules Container */}
        <div className="grid grid-cols-1 gap-6">
          
          {/* Rule 1 */}
          <div className="bg-[#0A0F16] border-l-4 border-l-[#00E5FF] border-y border-r border-slate-800/80 rounded-r-xl p-6 md:p-8 hover:bg-[#0D141E] transition-colors shadow-md">
            <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 font-montserrat tracking-wide">1. Respect & Chat 💬</h3>
            <h4 className="text-lg text-[#00E5FF] mb-4 font-bold" dir="rtl">ڕێزگرتن و چات</h4>
            <div className="text-slate-300 space-y-4 leading-loose text-base md:text-lg" dir="rtl">
              <p>جنێودان، قسەی نەشیاو، و سوکایەتی کردن بە یاریزانان یان ستاف بە هەموو شێوەیەک قەدەغەیە.</p>
              <p>سپام کردن، واتا ناردنی نامەی دووبارە، و ڕیکلام کردن بۆ سێرڤەری تر قەدەغەیە.</p>
              <p>بەکارهێنانی چاتی دەنگی بۆ بێزارکردنی خەڵک یان لێدانی دەنگی زۆر بەرز قەدەغەیە.</p>
            </div>
          </div>

          {/* Rule 2 */}
          <div className="bg-[#0A0F16] border-l-4 border-l-[#00E5FF] border-y border-r border-slate-800/80 rounded-r-xl p-6 md:p-8 hover:bg-[#0D141E] transition-colors shadow-md">
            <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 font-montserrat tracking-wide">2. Cheats & Hacks ⚔️</h3>
            <h4 className="text-lg text-[#00E5FF] mb-4 font-bold" dir="rtl">هاک و فێڵکردن</h4>
            <div className="text-slate-300 space-y-4 leading-loose text-base md:text-lg" dir="rtl">
              <p>بەکارهێنانی هەر جۆرە هاک، چییت، یان مۆدێکی قەدەغەکراو بە هەموو شێوەیەک قەدەغەیە.</p>
              <p>بەکارهێنانی <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Auto Clicker</span> و <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Macro</span> بە توندی قەدەغەیە.</p>
              <div className="mt-6 bg-[#111827] border border-slate-700/50 rounded-lg p-4 text-sm md:text-base border-r-2 border-r-[#00E5FF]">
                <p className="font-bold text-[#00E5FF] mb-1">تێبینی:</p>
                <p>سێرڤەرەکە سیستەمی دژە-هاک بەکاردەهێنێت. بەکارهێنانی هاک یان فێڵ دەتوانێت ببێتە هۆی سزا یان باند.</p>
              </div>
            </div>
          </div>

          {/* Rule 3 */}
          <div className="bg-[#0A0F16] border-l-4 border-l-[#00E5FF] border-y border-r border-slate-800/80 rounded-r-xl p-6 md:p-8 hover:bg-[#0D141E] transition-colors shadow-md">
            <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 font-montserrat tracking-wide">3. Exploits & Server Lag 🛑</h3>
            <h4 className="text-lg text-[#00E5FF] mb-4 font-bold" dir="rtl">گلیچ و تێکدانی سێرڤەر</h4>
            <div className="text-slate-300 space-y-4 leading-loose text-base md:text-lg" dir="rtl">
              <p>کۆپیکردنی ئایتم بە هەر شێوەیەک قەدەغەیە.</p>
              <p>بەکارهێنانی <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Bug</span>، <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Glitch</span>، یان هەر هەڵەیەکی سێرڤەر بۆ بەرژەوەندی خۆت قەدەغەیە.</p>
              <p>دروستکردنی <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Lag Machine</span> یان هەوڵدان بۆ تێکدانی کارکردنی سێرڤەر قەدەغەیە و دەتوانێت ببێتە هۆی باندی هەمیشەیی.</p>
            </div>
          </div>

          {/* Rule 4 */}
          <div className="bg-[#0A0F16] border-l-4 border-l-[#00E5FF] border-y border-r border-slate-800/80 rounded-r-xl p-6 md:p-8 hover:bg-[#0D141E] transition-colors shadow-md">
            <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 font-montserrat tracking-wide">4. Economy & Trading 💰</h3>
            <h4 className="text-lg text-[#00E5FF] mb-4 font-bold" dir="rtl">ئابووری و کڕین و فرۆشتن</h4>
            <div className="text-slate-300 space-y-4 leading-loose text-base md:text-lg" dir="rtl">
              <p>گۆڕینەوەی شتومەکی نێو یاری، <span dir="ltr" className="inline-block text-[#22C55E] font-bold mx-1">Money</span>، <span dir="ltr" className="inline-block text-[#00E5FF] font-bold mx-1">Pul</span>، یان هەر شتێکی سێرڤەر بە پارەی ڕاستەقینە بەبێ ڕێگەپێدانی ڕاوچی قەدەغەیە.</p>
              <p>فێڵکردن لە یاریزانانی تر لە کاتی مامەڵەکردن قەدەغەیە.</p>
            </div>
          </div>

          {/* Rule 5 */}
          <div className="bg-[#0A0F16] border-l-4 border-l-[#00E5FF] border-y border-r border-slate-800/80 rounded-r-xl p-6 md:p-8 hover:bg-[#0D141E] transition-colors shadow-md">
            <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 font-montserrat tracking-wide">5. Stat Boosting 📊</h3>
            <h4 className="text-lg text-[#00E5FF] mb-4 font-bold" dir="rtl">فێڵکردن لە ئامارەکان</h4>
            <div className="text-slate-300 space-y-4 leading-loose text-base md:text-lg" dir="rtl">
              <p>هێنانی ئەکاونتی فەیک یان بەکارهێنانی ئەکاونتی تر تەنها بۆ زیادکردنی <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Kills</span>، <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Duel Wins</span>، <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Bounty</span>، یان هەر ئامارێکی تر قەدەغەیە.</p>
              <p>ئەگەر <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Stat Boosting</span> بسەلمێندرێت، ئامارەکان دەتوانرێت بسڕدرێنەوە یان ڕێسێت بکرێن.</p>
            </div>
          </div>

          {/* Rule 6 */}
          <div className="bg-[#0A0F16] border-l-4 border-l-[#00E5FF] border-y border-r border-slate-800/80 rounded-r-xl p-6 md:p-8 hover:bg-[#0D141E] transition-colors shadow-md">
            <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 font-montserrat tracking-wide">6. Account Theft 🔐</h3>
            <h4 className="text-lg text-[#00E5FF] mb-4 font-bold" dir="rtl">دزینی ئەکاونت</h4>
            <div className="text-slate-300 space-y-4 leading-loose text-base md:text-lg" dir="rtl">
              <p>هەوڵدان بۆ چوونە ناو ئەکاونتی یاریزانێکی تر، دزینی ئەکاونت، یان بەکارهێنانی ئەکاونتی کەسێکی تر بەبێ ڕەزامەندی خاوەنەکە قەدەغەیە.</p>
              <p>بۆ یاریزانانی <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Cracked / Offline Mode</span>، هەوڵدان بۆ بەکارهێنانی ناسنامەی یاریزانێکی تر قەدەغەیە.</p>
            </div>
          </div>

        </div>

        {/* General Staff Note */}
        <div className="mt-8 bg-[#111827] border border-red-500/30 rounded-xl p-6 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <div className="flex flex-col gap-4">
            <div dir="rtl">
              <h3 className="text-xl font-bold text-red-400 mb-2 flex items-center gap-2">
                تێبینی گشتی <span dir="ltr" className="text-red-500">| ⚠️ General Note</span>
              </h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                ئەدمین و ستافی <span dir="ltr" className="inline-block font-semibold">RawchySMP</span> دەتوانن بە پێی جۆر، توندی، دووبارەبوونەوە، و بارودۆخی سەرپێچی سزای گونجاو هەڵبژێرن.
              </p>
              <p className="text-slate-400 mb-3">سزا دەتوانێت بریتی بێت لە:</p>
            </div>
            <div className="flex flex-wrap gap-2" dir="ltr">
              <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-sm font-semibold border border-red-500/20">Warning</span>
              <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-sm font-semibold border border-red-500/20">Mute</span>
              <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-sm font-semibold border border-red-500/20">Temporary Ban</span>
              <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-sm font-semibold border border-red-500/20">Statistics Reset</span>
              <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-sm font-semibold border border-red-500/20">Data Reset</span>
              <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-sm font-semibold border border-red-500/20">Permanent Ban</span>
            </div>
            <div dir="rtl">
                <p className="text-slate-400 text-sm mt-2">یاساکان دەکرێت لە هەر کاتێکدا نوێ بکرێنەوە.</p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center border-t border-slate-800/50 pt-6">
          <p className="text-slate-500 text-sm">Rules may be updated when necessary.</p>
        </div>

      </div>
    </main>
  );
}
