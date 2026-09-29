"use client";

import React from "react";

export default function Hero() {
  return (
    <section className="text-center pt-2 pb-1 relative">
      {/* Eyebrow Pill */}
      <div className="inline-flex items-center gap-2 bg-white border-2 border-[#141414] px-4 py-1 rounded-full shadow-brutal-sm font-mono text-xs font-bold uppercase tracking-wider mb-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#D9503F] animate-ping"></span>
        <span className="font-extrabold text-[#141414]">CODE BOL RAHA HAI · मला वाचवा!</span>
        <span className="text-neutral-300 font-normal">|</span>
        <span className="text-neutral-600 font-mono hidden sm:inline">AI-POWERED CODE ROAST</span>
      </div>

      {/* Hero Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase flex items-center justify-center gap-3 text-[#141414]">
        <span>Code Roaster</span>
        <span className="text-[#EDB13E] drop-shadow-[2px_2px_0px_#141414] font-mono italic">
          (&apos;देशी&apos;)
        </span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base font-semibold text-neutral-800 mt-2 px-4">
        Paste your code. Pick your roast. Get humbled. Get the fix. <br className="hidden sm:inline" />
        <span className="bg-[#FFF4D4] border border-[#141414]/20 px-2.5 py-0.5 rounded font-mono text-xs text-[#141414] inline-block mt-1">
          Desi debugging, powered by Google Gemini.
        </span>
      </p>
    </section>
  );
}
