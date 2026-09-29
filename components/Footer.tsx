"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="mt-2 text-center flex flex-col items-center gap-3 pb-6">
      <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center text-xs font-semibold text-neutral-800">
        {/* GDG Nashik Badge */}
        <a
          href="https://devfest26.gdgnashik.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-white border-2 border-[#141414] px-3.5 py-1.5 rounded-full shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-transform"
        >
          <img src="/assests/GDG_Logo.svg" alt="GDG Logo" className="h-4 sm:h-5 w-auto" />
          <span className="font-mono font-bold text-[#141414] text-xs">Google Developer Groups Nashik</span>
        </a>

        <span className="text-neutral-400 font-bold">×</span>

        {/* Pre-DevFest Nashik 2026 Badge */}
        <a
          href="https://devfest26.gdgnashik.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#FFF8E7] border-2 border-[#141414] px-3.5 py-1.5 rounded-full shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-transform"
        >
          <img src="/assests/Pre-DevFest_Logo.svg" alt="Pre-DevFest Logo" className="h-4 sm:h-5 w-auto" />
        </a>
      </div>

      <div className="flex items-center gap-2 flex-wrap justify-center text-xs font-medium text-neutral-700">
        <span>Built with</span>
        <span className="text-[#D9503F] text-sm animate-pulse">❤️</span>
        <span>for DevFest Nashik 2026 by Google Developer Groups Nashik</span>
      </div>

      <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-500 flex-wrap justify-center">
        <span>Pre-DevFest &apos;26 Nashik Edition</span>
        <span>•</span>
        <span>Google Gemini AI Engine</span>
        <span>•</span>
        <span>Made at GDG Nashik Pre-DevFest Workshop</span>
      </div>
    </footer>
  );
}
