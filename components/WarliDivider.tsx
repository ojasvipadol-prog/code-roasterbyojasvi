"use client";

import React from "react";

export default function WarliDivider() {
  return (
    <div className="py-2 flex items-center justify-center gap-4 select-none">
      <div className="h-0.5 flex-1 bg-[#141414]/20"></div>
      <div className="bg-white border-2 border-[#141414] px-5 sm:px-6 py-1.5 rounded-full shadow-brutal-sm flex items-center gap-3 font-mono text-xs tracking-widest text-[#141414]">
        <span className="text-[#EDB13E]">▲</span>
        <span>▼</span>
        <span className="text-[#4C80F0]">▲</span>
        <span>▼</span>
        <span className="text-neutral-400">• • •</span>
        <span className="font-bold text-[10px] sm:text-[11px] uppercase tracking-normal">
          NASHIK · WARLI HERITAGE MEETS MODERN BRUTALISM
        </span>
        <span className="text-neutral-400">• • •</span>
        <span className="text-[#4FA35A]">▲</span>
        <span>▼</span>
        <span className="text-[#D9503F]">▲</span>
        <span>▼</span>
      </div>
      <div className="h-0.5 flex-1 bg-[#141414]/20"></div>
    </div>
  );
}
