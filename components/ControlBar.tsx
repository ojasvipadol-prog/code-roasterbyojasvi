"use client";

import React from "react";
import { ROAST_LEVELS, PERSONAS, LANGUAGES } from "@/config/app.config";
import { LanguageId, RoastLevelId, PersonaId } from "@/types/roast";

interface ControlBarProps {
  roastLevel: RoastLevelId;
  onRoastLevelChange: (level: RoastLevelId) => void;
  persona: PersonaId;
  onPersonaChange: (persona: PersonaId) => void;
  language: LanguageId;
  onLanguageChange: (language: LanguageId) => void;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
  onRoast: () => void;
  isRoasting: boolean;
}

export default function ControlBar({
  roastLevel,
  onRoastLevelChange,
  persona,
  onPersonaChange,
  language,
  onLanguageChange,
  errorDrawerOpen,
  onToggleErrorDrawer,
  onRoast,
  isRoasting,
}: ControlBarProps) {
  return (
    <div className="bg-white border-b-[3px] border-[#141414] px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
      {/* 1. Roast Level Segmented Control */}
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs font-black uppercase text-neutral-600 tracking-wider hidden sm:inline">
          TEEKHAPAN:
        </span>
        <div className="inline-flex bg-[#F8F4EC] p-1 rounded-full border-2 border-[#141414] shadow-brutal-sm">
          {ROAST_LEVELS.map((lvl) => {
            const isSelected = roastLevel === lvl.id;
            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => onRoastLevelChange(lvl.id as RoastLevelId)}
                title={lvl.description}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                  isSelected
                    ? "bg-[#EDB13E] text-[#141414] border-2 border-[#141414] shadow-brutal-pressed font-black"
                    : "text-neutral-700 hover:bg-neutral-200"
                }`}
              >
                <span>{lvl.label}</span>
                <span className="text-[10px]">{lvl.emoji}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Middle Controls: Persona & Language & Error Toggle */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Persona Selector */}
        <div className="relative">
          <select
            value={persona}
            onChange={(e) => onPersonaChange(e.target.value as PersonaId)}
            className="appearance-none bg-[#F8F4EC] hover:bg-amber-100/60 border-2 border-[#141414] rounded-full pl-3.5 pr-8 py-1.5 text-xs font-bold text-[#141414] shadow-brutal-sm cursor-pointer outline-none focus:ring-2 focus:ring-[#141414]"
          >
            {PERSONAS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.emoji} {p.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-[#141414]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        {/* Language Selector */}
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none bg-[#F8F4EC] hover:bg-neutral-200 border-2 border-[#141414] rounded-full pl-3.5 pr-8 py-1.5 text-xs font-mono font-bold text-[#141414] shadow-brutal-sm cursor-pointer outline-none focus:ring-2 focus:ring-[#141414]"
          >
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-[#141414]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
            </svg>
          </div>
        </div>

        {/* Error Message Drawer Toggle */}
        <button
          type="button"
          onClick={onToggleErrorDrawer}
          className={`border-2 rounded-full px-3 py-1.5 text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
            errorDrawerOpen
              ? "border-[#141414] bg-[#141414] text-white shadow-brutal-sm"
              : "border-dashed border-[#141414]/60 hover:border-[#141414] bg-[#F8F4EC]/50 hover:bg-white text-neutral-700"
          }`}
        >
          <span className="font-bold text-sm leading-none">{errorDrawerOpen ? "−" : "+"}</span>
          <span>ERROR MESSAGE</span>
        </button>
      </div>

      {/* 3. Primary CTA Button */}
      <button
        type="button"
        onClick={onRoast}
        disabled={isRoasting}
        className={`bg-[#EDB13E] hover:bg-[#e2a433] text-[#141414] font-black text-sm px-6 py-2.5 rounded-full border-[2.5px] border-[#141414] shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-brutal-sm active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex items-center gap-2 tracking-wide uppercase ${
          isRoasting ? "opacity-75 cursor-not-allowed animate-pulse" : "cursor-pointer"
        }`}
      >
        {isRoasting ? (
          <>
            <span>ANALYZING...</span>
            <span className="animate-spin text-base">⏳</span>
          </>
        ) : (
          <>
            <span>Roast Me / भाजून काढ</span>
            <span className="text-base">🔥</span>
            <span className="font-mono text-base font-bold">→</span>
          </>
        )}
      </button>
    </div>
  );
}
