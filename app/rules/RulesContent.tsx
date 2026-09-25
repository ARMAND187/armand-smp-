"use client";

import { useState, useEffect } from "react";

type Language = "ckb" | "en";

export function RulesContent() {
  const [lang, setLang] = useState<Language>("ckb");

  useEffect(() => {
    const saved = localStorage.getItem("rawchysmp_rules_lang") as Language;
    if (saved === "en" || saved === "ckb") {
      // eslint-disable-next-line
      setLang(saved);
    }
  }, []);

  const handleLangChange = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("rawchysmp_rules_lang", newLang);
  };

  const isEn = lang === "en";

  return (
    <div className="z-10 w-full max-w-4xl flex flex-col gap-8">
      
      {/* Header & Language Switcher */}
      <section className="text-center mb-6 relative">
        {/* Language Switcher */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#111827] border border-slate-800 rounded-full p-1 flex items-center shadow-lg">
            <button
              onClick={() => handleLangChange("ckb")}
              aria-label="Show rules in Kurdish"
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${!isEn ? 'bg-[#00E5FF]/20 text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.2)]' : 'text-slate-400 hover:text-slate-200'}`}
            >
              کوردی
            </button>
            <button
              onClick={() => handleLangChange("en")}
              aria-label="Show rules in English"
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${isEn ? 'bg-[#00E5FF]/20 text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.2)]' : 'text-slate-400 hover:text-slate-200'}`}
            >
              English
            </button>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black tracking-tighter font-montserrat mb-4">
          <span className="text-slate-50">📜 Rawchy</span><span className="text-[#00E5FF]">SMP</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-slate-200 mb-6">
          {isEn ? "Server Rules" : "یاساکانی سێرڤەری ڕاوچی"}
        </h2>
        
        <div className="max-w-2xl mx-auto bg-[#111827]/80 border border-slate-800 rounded-xl p-6 shadow-lg backdrop-blur-sm" dir={isEn ? "ltr" : "rtl"}>
          {isEn ? (
            <>
              <p className="text-slate-300 text-lg leading-relaxed font-medium mb-3">Welcome to RawchySMP.</p>
              <p className="text-slate-400 leading-relaxed mb-3">To maintain a fair and enjoyable environment for all players, please follow the server rules.</p>
              <p className="text-slate-400 leading-relaxed">Violations may result in disciplinary action.</p>
            </>
          ) : (
            <>
              <p className="text-slate-300 text-lg leading-relaxed font-medium mb-3">بەخێربێن بۆ سێرڤەری ڕاوچی!</p>
              <p className="text-slate-400 leading-relaxed mb-3">بۆ پاراستنی ژینگەیەکی ئارام و دادپەروەر بۆ هەموو یاریزانان، تکایە پابەندی یاساکانی سێرڤەر بن.</p>
              <p className="text-slate-400 leading-relaxed">شکاندنی یاساکان دەتوانێت ببێتە هۆی سزا.</p>
            </>
          )}
        </div>
      </section>

      {/* Rules Container */}
      <div className="grid grid-cols-1 gap-6">
        
        {/* Rule 1 */}
        <div className="bg-[#0A0F16] border-l-4 border-l-[#00E5FF] border-y border-r border-slate-800/80 rounded-r-xl p-6 md:p-8 hover:bg-[#0D141E] transition-colors shadow-md">
          <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 font-montserrat tracking-wide">1. Respect & Chat 💬</h3>
          {!isEn && <h4 className="text-lg text-[#00E5FF] mb-4 font-bold" dir="rtl">ڕێزگرتن و چات</h4>}
          
          <div className={`text-slate-300 space-y-4 leading-loose text-base md:text-lg ${isEn ? 'mt-4' : ''}`} dir={isEn ? "ltr" : "rtl"}>
            {isEn ? (
              <>
                <p>Insults, inappropriate language, harassment, or disrespect toward players or staff are prohibited.</p>
                <p>Spam, repeated messages, and advertising other servers are prohibited.</p>
                <p>Using voice chat to intentionally annoy others or play excessively loud audio is prohibited.</p>
              </>
            ) : (
              <>
                <p>جنێودان، قسەی نەشیاو، و سوکایەتی کردن بە یاریزانان یان ستاف بە هەموو شێوەیەک قەدەغەیە.</p>
                <p>سپام کردن، واتا ناردنی نامەی دووبارە، و ڕیکلام کردن بۆ سێرڤەری تر قەدەغەیە.</p>
                <p>بەکارهێنانی چاتی دەنگی بۆ بێزارکردنی خەڵک یان لێدانی دەنگی زۆر بەرز قەدەغەیە.</p>
              </>
            )}
          </div>
        </div>

        {/* Rule 2 */}
        <div className="bg-[#0A0F16] border-l-4 border-l-[#00E5FF] border-y border-r border-slate-800/80 rounded-r-xl p-6 md:p-8 hover:bg-[#0D141E] transition-colors shadow-md">
          <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 font-montserrat tracking-wide">2. Cheats & Hacks ⚔️</h3>
          {!isEn && <h4 className="text-lg text-[#00E5FF] mb-4 font-bold" dir="rtl">هاک و فێڵکردن</h4>}
          
          <div className={`text-slate-300 space-y-4 leading-loose text-base md:text-lg ${isEn ? 'mt-4' : ''}`} dir={isEn ? "ltr" : "rtl"}>
            {isEn ? (
              <>
                <p>Using cheats, hacks, or prohibited modifications is not allowed.</p>
                <p>Auto Clickers and Macros are prohibited.</p>
                <div className="mt-6 bg-[#111827] border border-slate-700/50 rounded-lg p-4 text-sm md:text-base border-l-2 border-l-[#00E5FF]">
                  <p className="font-bold text-[#00E5FF] mb-1">Note:</p>
                  <p>RawchySMP uses anti-cheat systems. Using cheats or unfair advantages may result in punishment or a ban.</p>
                </div>
              </>
            ) : (
              <>
                <p>بەکارهێنانی هەر جۆرە هاک، چییت، یان مۆدێکی قەدەغەکراو بە هەموو شێوەیەک قەدەغەیە.</p>
                <p>بەکارهێنانی <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Auto Clicker</span> و <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Macro</span> بە توندی قەدەغەیە.</p>
                <div className="mt-6 bg-[#111827] border border-slate-700/50 rounded-lg p-4 text-sm md:text-base border-r-2 border-r-[#00E5FF] md:border-r-0 md:border-l-2 md:border-l-[#00E5FF]" dir="rtl">
                  <p className="font-bold text-[#00E5FF] mb-1">تێبینی:</p>
                  <p>سێرڤەرەکە سیستەمی دژە-هاک بەکاردەهێنێت. بەکارهێنانی هاک یان فێڵ دەتوانێت ببێتە هۆی سزا یان باند.</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Rule 3 */}
        <div className="bg-[#0A0F16] border-l-4 border-l-[#00E5FF] border-y border-r border-slate-800/80 rounded-r-xl p-6 md:p-8 hover:bg-[#0D141E] transition-colors shadow-md">
          <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 font-montserrat tracking-wide">3. Exploits & Server Lag 🛑</h3>
          {!isEn && <h4 className="text-lg text-[#00E5FF] mb-4 font-bold" dir="rtl">گلیچ و تێکدانی سێرڤەر</h4>}
          
          <div className={`text-slate-300 space-y-4 leading-loose text-base md:text-lg ${isEn ? 'mt-4' : ''}`} dir={isEn ? "ltr" : "rtl"}>
            {isEn ? (
              <>
                <p>Item duplication in any form is prohibited.</p>
                <p>Using bugs, glitches, or server errors for personal advantage is prohibited.</p>
                <p>Creating lag machines or intentionally attempting to disrupt server performance may result in a permanent ban.</p>
              </>
            ) : (
              <>
                <p>کۆپیکردنی ئایتم بە هەر شێوەیەک قەدەغەیە.</p>
                <p>بەکارهێنانی <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Bug</span>، <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Glitch</span>، یان هەر هەڵەیەکی سێرڤەر بۆ بەرژەوەندی خۆت قەدەغەیە.</p>
                <p>دروستکردنی <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Lag Machine</span> یان هەوڵدان بۆ تێکدانی کارکردنی سێرڤەر قەدەغەیە و دەتوانێت ببێتە هۆی باندی هەمیشەیی.</p>
              </>
            )}
          </div>
        </div>

        {/* Rule 4 */}
        <div className="bg-[#0A0F16] border-l-4 border-l-[#00E5FF] border-y border-r border-slate-800/80 rounded-r-xl p-6 md:p-8 hover:bg-[#0D141E] transition-colors shadow-md">
          <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 font-montserrat tracking-wide">4. Economy & Trading 💰</h3>
          {!isEn && <h4 className="text-lg text-[#00E5FF] mb-4 font-bold" dir="rtl">ئابووری و کڕین و فرۆشتن</h4>}
          
          <div className={`text-slate-300 space-y-4 leading-loose text-base md:text-lg ${isEn ? 'mt-4' : ''}`} dir={isEn ? "ltr" : "rtl"}>
            {isEn ? (
              <>
                <p>Trading in-game items, <span className="text-[#22C55E] font-bold">Money</span>, <span className="text-[#00E5FF] font-bold">Pul</span>, or server assets for real-world money is strictly prohibited.</p>
                <p>Scamming other players during trades is prohibited.</p>
              </>
            ) : (
              <>
                <p>گۆڕینەوەی شتومەکی نێو یاری، <span dir="ltr" className="inline-block text-[#22C55E] font-bold mx-1">Money</span>، <span dir="ltr" className="inline-block text-[#00E5FF] font-bold mx-1">Pul</span>، یان هەر شتێکی سێرڤەر بە پارەی ڕاستەقینە بە توندی قەدەغەیە.</p>
                <p>فێڵکردن لە یاریزانانی تر لە کاتی مامەڵەکردن قەدەغەیە.</p>
              </>
            )}
          </div>
        </div>

        {/* Rule 5 */}
        <div className="bg-[#0A0F16] border-l-4 border-l-[#00E5FF] border-y border-r border-slate-800/80 rounded-r-xl p-6 md:p-8 hover:bg-[#0D141E] transition-colors shadow-md">
          <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 font-montserrat tracking-wide">5. Stat Boosting 📊</h3>
          {!isEn && <h4 className="text-lg text-[#00E5FF] mb-4 font-bold" dir="rtl">فێڵکردن لە ئامارەکان</h4>}
          
          <div className={`text-slate-300 space-y-4 leading-loose text-base md:text-lg ${isEn ? 'mt-4' : ''}`} dir={isEn ? "ltr" : "rtl"}>
            {isEn ? (
              <>
                <p>Using fake accounts or other accounts to artificially increase Kills, Duel Wins, Bounty, or other statistics is prohibited.</p>
                <p>If stat boosting is confirmed, affected statistics may be reset.</p>
              </>
            ) : (
              <>
                <p>هێنانی ئەکاونتی فەیک یان بەکارهێنانی ئەکاونتی تر تەنها بۆ زیادکردنی <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Kills</span>، <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Duel Wins</span>، <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Bounty</span>، یان هەر ئامارێکی تر قەدەغەیە.</p>
                <p>ئەگەر <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Stat Boosting</span> بسەلمێندرێت، ئامارەکان دەتوانرێت بسڕدرێنەوە یان ڕێسێت بکرێن.</p>
              </>
            )}
          </div>
        </div>

        {/* Rule 6 */}
        <div className="bg-[#0A0F16] border-l-4 border-l-[#00E5FF] border-y border-r border-slate-800/80 rounded-r-xl p-6 md:p-8 hover:bg-[#0D141E] transition-colors shadow-md">
          <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-2 font-montserrat tracking-wide">6. Account Theft 🔐</h3>
          {!isEn && <h4 className="text-lg text-[#00E5FF] mb-4 font-bold" dir="rtl">دزینی ئەکاونت</h4>}
          
          <div className={`text-slate-300 space-y-4 leading-loose text-base md:text-lg ${isEn ? 'mt-4' : ''}`} dir={isEn ? "ltr" : "rtl"}>
            {isEn ? (
              <>
                <p>Attempting to access another player&apos;s account, steal an account, or use another player&apos;s identity without permission is prohibited.</p>
                <p>Attempting to impersonate another player in Cracked / Offline Mode is also prohibited.</p>
              </>
            ) : (
              <>
                <p>هەوڵدان بۆ چوونە ناو ئەکاونتی یاریزانێکی تر، دزینی ئەکاونت، یان بەکارهێنانی ئەکاونتی کەسێکی تر بەبێ ڕەزامەندی خاوەنەکە قەدەغەیە.</p>
                <p>بۆ یاریزانانی <span dir="ltr" className="inline-block text-slate-200 font-mono bg-slate-800 px-1.5 py-0.5 rounded text-sm mx-1">Cracked / Offline Mode</span>، هەوڵدان بۆ بەکارهێنانی ناسنامەی یاریزانێکی تر قەدەغەیە.</p>
              </>
            )}
          </div>
        </div>

      </div>

      {/* General Staff Note */}
      <div className="mt-8 bg-[#111827] border border-red-500/30 rounded-xl p-6 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
        <div className="flex flex-col gap-4">
          <div dir={isEn ? "ltr" : "rtl"}>
            <h3 className="text-xl font-bold text-red-400 mb-2 flex items-center gap-2">
              {isEn ? (
                <>⚠️ General Note</>
              ) : (
                <>تێبینی گشتی <span dir="ltr" className="text-red-500">| ⚠️ General Note</span></>
              )}
            </h3>
            {isEn ? (
              <>
                <p className="text-slate-300 leading-relaxed mb-4">
                  RawchySMP staff may choose an appropriate punishment depending on the type, severity, repetition, and circumstances of a violation.
                </p>
                <p className="text-slate-400 mb-3">Punishments may include:</p>
              </>
            ) : (
              <>
                <p className="text-slate-300 leading-relaxed mb-4">
                  ئەدمین و ستافی <span dir="ltr" className="inline-block font-semibold">RawchySMP</span> دەتوانن بە پێی جۆر، توندی، دووبارەبوونەوە، و بارودۆخی سەرپێچی سزای گونجاو هەڵبژێرن.
                </p>
                <p className="text-slate-400 mb-3">سزا دەتوانێت بریتی بێت لە:</p>
              </>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:flex md:flex-wrap md:items-center gap-3 md:gap-2 mt-2" dir="ltr">
            <span className="bg-red-500/10 text-red-400 px-2 py-2 md:px-3 md:py-1 rounded-lg md:rounded-full text-[11px] sm:text-xs md:text-sm font-semibold border border-red-500/20 shadow-sm flex items-center justify-center text-center">Warning</span>
            <span className="hidden md:inline text-slate-500 font-bold opacity-50">→</span>
            <span className="bg-red-500/10 text-red-400 px-2 py-2 md:px-3 md:py-1 rounded-lg md:rounded-full text-[11px] sm:text-xs md:text-sm font-semibold border border-red-500/20 shadow-sm flex items-center justify-center text-center">Mute</span>
            <span className="hidden md:inline text-slate-500 font-bold opacity-50">→</span>
            <span className="bg-red-500/10 text-red-400 px-2 py-2 md:px-3 md:py-1 rounded-lg md:rounded-full text-[11px] sm:text-xs md:text-sm font-semibold border border-red-500/20 shadow-sm flex items-center justify-center text-center">Temporary Ban</span>
            <span className="hidden md:inline text-slate-500 font-bold opacity-50">→</span>
            <span className="bg-red-500/10 text-red-400 px-2 py-2 md:px-3 md:py-1 rounded-lg md:rounded-full text-[11px] sm:text-xs md:text-sm font-semibold border border-red-500/20 shadow-sm flex items-center justify-center text-center">Statistics Reset</span>
            <span className="hidden md:inline text-slate-500 font-bold opacity-50">→</span>
            <span className="bg-red-500/10 text-red-400 px-2 py-2 md:px-3 md:py-1 rounded-lg md:rounded-full text-[11px] sm:text-xs md:text-sm font-semibold border border-red-500/20 shadow-sm flex items-center justify-center text-center">Data Reset</span>
            <span className="hidden md:inline text-slate-500 font-bold opacity-50">→</span>
            <span className="bg-red-500/10 text-red-400 px-2 py-2 md:px-3 md:py-1 rounded-lg md:rounded-full text-[11px] sm:text-xs md:text-sm font-semibold border border-red-500/20 shadow-sm flex items-center justify-center text-center">Permanent Ban</span>
          </div>
          
          <div dir={isEn ? "ltr" : "rtl"}>
              <p className="text-slate-400 text-sm mt-2">
                {isEn ? "Rules may be updated when necessary." : "یاساکان دەکرێت لە هەر کاتێکدا نوێ بکرێنەوە."}
              </p>
          </div>
        </div>
      </div>

    </div>
  );
}
