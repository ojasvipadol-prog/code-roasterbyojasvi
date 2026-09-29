"use client";

import React from "react";

export default function Navbar() {
  return (
    <header className="sticky top-4 z-50 px-4 max-w-7xl mx-auto w-full mb-3">
      <div className="bg-[#F8F4EC] border-[2.5px] border-[#141414] rounded-full px-4 sm:px-6 py-2.5 shadow-brutal flex items-center justify-between gap-3">
        {/* Left: GDG Nashik Logo */}
        <div className="flex items-center gap-2">
          <a
            href="https://devfest26.gdgnashik.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-white px-3 py-1 rounded-full border-2 border-[#141414] shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-transform select-none"
            title="Google Developer Groups Nashik"
          >
            <img
              src="/assests/GDG-Nashik_Logo.svg"
              alt="GDG Nashik"
              className="h-6 sm:h-7 w-auto object-contain"
            />
          </a>
        </div>

        {/* Center: CODE ROASTER v2 Badge */}
        <div className="flex items-center">
          <div className="flex items-center gap-2 bg-[#EDB13E] border-2 border-[#141414] px-3.5 sm:px-4 py-1.5 rounded-full shadow-brutal-sm font-black text-xs uppercase tracking-wider text-[#141414]">
            <span className="text-base animate-pulse">🔥</span>
            <span className="hidden sm:inline">CODE ROASTER</span>
            <span className="sm:hidden">ROASTER</span>
            <span className="bg-[#141414] text-[#F8F4EC] text-[10px] px-2 py-0.5 rounded-full font-mono">
              v2.0-DESI
            </span>
          </div>
        </div>

        {/* Right: Official DevFest '26 Logo */}
        <div className="flex items-center">
          <a
            href="https://devfest26.gdgnashik.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-[#FFF8E7] border-2 border-[#141414] px-3 py-1 rounded-full shadow-brutal-sm hover:translate-x-[1px] hover:translate-y-[1px] transition-transform select-none"
            title="DevFest Nashik 2026"
          >
            <img
              src="/assests/DevFest-26'_Logo.svg"
              alt="DevFest 26' Nashik"
              className="h-5 sm:h-6 w-auto object-contain"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
