"use client";

import React, { useState, useEffect } from "react";
import { ReportState, RoastResult, RoastLevelId } from "@/types/roast";

interface RoastReportProps {
  state: ReportState;
  result: RoastResult | null;
  errorMsg: string | null;
  roastLevel: RoastLevelId;
  onRetry: () => void;
  onApplyFix: (fixedCode: string) => void;
  onLoadSample: () => void;
  onNewCode: () => void;
  onSpicierRoast: () => void;
}

const LOADING_MESSAGES = [
  "Compiler ki chai thandi ho rahi hai… ☕",
  "Sharma ji ke bete se comparison chal raha hai… 👨‍🏫",
  "Bhau, roast tayyar ho raha hai… 🔥",
  "Panchavati Express se bhi late hai tumhara logic… 🚂",
  "Garbage collector ne resign de diya… 🗑️",
  "Godavari bridge pe baith ke syntax check kar rahe hain… 🌉",
];

export default function RoastReport({
  state,
  result,
  errorMsg,
  roastLevel,
  onRetry,
  onApplyFix,
  onLoadSample,
  onNewCode,
  onSpicierRoast,
}: RoastReportProps) {
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [applied, setApplied] = useState(false);
  const [shared, setShared] = useState(false);

  // Rotate loading messages while in analyzing state
  useEffect(() => {
    if (state !== "loading") return;
    const interval = setInterval(() => {
      setLoadingIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, [state]);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleApply = (code: string) => {
    onApplyFix(code);
    setApplied(true);
    setTimeout(() => setApplied(false), 2500);
  };

  const handleShare = async () => {
    if (!result) return;
    const shareText = `🔥 My code got roasted on Code Roaster (DevFest Nashik 2026)!
Score: ${result.roastScore}/100 (${result.scoreLabel})
Verdict: "${result.roast}"`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Code Roaster Critique",
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      }
    } catch {
      // ignored
    }
  };

  return (
    <div className="lg:col-span-6 flex flex-col bg-[#F8F4EC] text-[#141414] min-h-[480px]">
      {/* Header Row */}
      <div className="bg-[#F0EAE1] border-b-2 border-[#141414] px-5 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-black uppercase text-neutral-600">AUDIT // REPORT</span>
          {state === "results" && (
            <span className="bg-[#EDB13E] text-[#141414] text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-[#141414]">
              VERDICT: {roastLevel.toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-700">
          <span
            className={`w-2 h-2 rounded-full ${
              state === "loading"
                ? "bg-[#EDB13E] animate-ping"
                : state === "results"
                ? "bg-[#4FA35A]"
                : state === "error"
                ? "bg-[#D9503F]"
                : "bg-neutral-400"
            }`}
          ></span>
          <span>
            {state === "loading"
              ? "ROASTING IN PROGRESS"
              : state === "results"
              ? "AUDIT REPORT READY"
              : state === "error"
              ? "CRITIQUE HALTED"
              : "READY"}
          </span>
        </div>
      </div>

      {/* Report Body Container */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-center overflow-y-auto">
        
        {/* 1. EMPTY STATE */}
        {state === "empty" && (
          <div className="text-center py-12 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border-2 border-[#141414] shadow-brutal flex items-center justify-center font-mono font-black text-2xl text-neutral-700">
              ?_?
            </div>
            <div className="max-w-md">
              <h3 className="font-black text-lg text-[#141414] uppercase tracking-tight">
                Your code is suspiciously quiet.
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-medium">
                Paste your code on the left, select your roast intensity, and let&apos;s see if it can survive the DevFest review.
              </p>
            </div>
            <button
              type="button"
              onClick={onLoadSample}
              className="bg-[#EDB13E] hover:bg-[#e2a433] text-[#141414] font-black text-xs px-5 py-2.5 rounded-full border-2 border-[#141414] shadow-brutal-sm cursor-pointer hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
            >
              [ TRY SAMPLE BUG → ]
            </button>
          </div>
        )}

        {/* 2. ANALYZING / LOADING STATE */}
        {state === "loading" && (
          <div className="text-center py-16 flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <div className="w-16 h-16 border-[3px] border-[#141414] bg-[#EDB13E] rounded-xl rotate-12 shadow-brutal flex items-center justify-center animate-spin">
                <span className="text-2xl -rotate-12">🔥</span>
              </div>
            </div>
            <div className="max-w-md">
              <span className="bg-[#141414] text-[#F8F4EC] text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold">
                ANALYZING AST & LOGIC
              </span>
              <h3 className="font-black text-base sm:text-lg text-[#141414] mt-3 min-h-[32px] transition-all">
                {LOADING_MESSAGES[loadingIndex]}
              </h3>
              <p className="text-xs font-mono text-neutral-500 mt-1">
                Gemini is cooking your roast and preparing your fix...
              </p>
            </div>
          </div>
        )}

        {/* 3. ERROR STATE */}
        {state === "error" && (
          <div className="text-center py-12 flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#D9503F]/10 border-2 border-[#D9503F] shadow-brutal-sm flex items-center justify-center text-3xl">
              ⚠️
            </div>
            <div className="max-w-md">
              <span className="bg-[#D9503F] text-white text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold">
                ROAST // INTERRUPTED
              </span>
              <h3 className="font-black text-lg text-[#141414] mt-2">
                Bhau, Gemini ne chai break le li!
              </h3>
              <p className="text-xs text-neutral-700 bg-white border border-[#141414] p-3 rounded-lg mt-2 font-mono text-left break-words">
                {errorMsg || "An unexpected error occurred while analyzing the code."}
              </p>
              {errorMsg?.includes("GEMINI_API_KEY") && (
                <div className="bg-[#FFF8E7] border border-[#EDB13E] p-2.5 rounded text-xs text-left mt-2 font-mono text-neutral-800">
                  💡 <strong>Tip:</strong> Open <code className="bg-white px-1 py-0.5 border border-dark rounded">.env</code> or <code className="bg-white px-1 py-0.5 border border-dark rounded">.env.local</code> in this folder, paste your API key from <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="text-blue-600 underline font-bold">Google AI Studio</a>, and retry!
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={onRetry}
              className="bg-[#EDB13E] hover:bg-[#e2a433] text-[#141414] font-black text-xs px-5 py-2.5 rounded-full border-2 border-[#141414] shadow-brutal-sm cursor-pointer transition-all"
            >
              [ RETRY ROAST → ]
            </button>
          </div>
        )}

        {/* 4. RESULTS STATE */}
        {state === "results" && result && (
          <div className="flex flex-col gap-5">
            
            {/* Savage Verdict Banner + Rubber Stamp Badge */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 bg-white border-2 border-[#141414] rounded-xl p-4 shadow-brutal-sm relative overflow-hidden">
              <div className="flex-1">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider text-[#D9503F] bg-[#D9503F]/10 px-2 py-0.5 rounded border border-[#D9503F]/30">
                  CRITICAL ROAST VERDICT
                </span>
                <h3 className="text-base sm:text-lg md:text-xl font-black mt-2 leading-tight text-[#141414]">
                  “{result.roast}”
                </h3>
              </div>

              {/* Rubber Stamp Badge (Tilted -3deg) */}
              <div className="transform -rotate-3 hover:rotate-0 transition-transform sm:self-center shrink-0">
                <div className="bg-[#EDB13E] border-[2.5px] border-[#141414] rounded-xl p-2.5 text-center shadow-brutal-sm min-w-[140px]">
                  <div className="text-[10px] font-mono font-black uppercase tracking-tighter text-[#141414]/80">
                    ROAST SCORE
                  </div>
                  <div className="text-3xl font-black font-mono tracking-tight text-[#141414] my-0.5">
                    {result.roastScore}
                    <span className="text-base text-[#141414]/70">/100</span>
                  </div>
                  <div className="bg-[#141414] text-[#F8F4EC] text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase leading-tight">
                    {result.scoreLabel}
                  </div>
                </div>
              </div>
            </div>

            {/* Issues List */}
            {result.issues && result.issues.length > 0 ? (
              result.issues.map((issue, idx) => (
                <div
                  key={idx}
                  className="bg-white border-2 border-[#141414] rounded-xl p-4 shadow-brutal-sm flex flex-col gap-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#141414] text-[#F8F4EC] font-mono font-black text-xs px-2 py-0.5 rounded">
                        LINE {issue.line < 10 ? `0${issue.line}` : issue.line}
                      </span>
                      <span className="font-mono text-xs font-bold text-neutral-800">
                        {issue.title}
                      </span>
                    </div>
                    <span
                      className={`font-mono text-[10px] font-black px-2.5 py-0.5 rounded-full border border-[#141414] ${
                        issue.severity === "FATAL BUG"
                          ? "bg-[#D9503F] text-white"
                          : issue.severity === "CODE SMELL"
                          ? "bg-[#EDB13E] text-[#141414]"
                          : "bg-[#4FA35A] text-white"
                      }`}
                    >
                      {issue.severity}
                    </span>
                  </div>

                  {/* Code Snippet */}
                  {issue.codeSnippet && (
                    <div className="bg-[#171717] text-[#F7F3EA] rounded p-2.5 font-mono text-xs border-l-4 border-[#D9503F] overflow-x-auto">
                      <code>{issue.codeSnippet}</code>
                    </div>
                  )}

                  {/* Roaster Diagnosis */}
                  <div className="bg-[#FFF8E7] border-l-4 border-[#EDB13E] p-3 rounded-r text-xs leading-relaxed text-neutral-800">
                    <span className="font-bold text-[#141414] font-mono uppercase text-[10px] block mb-1">
                      🗣️ Roaster Diagnosis:
                    </span>
                    <p className="font-medium">{issue.diagnosis}</p>
                  </div>

                  {/* Technical Fix Line */}
                  <div className="bg-neutral-100 rounded p-2.5 border border-neutral-300 text-xs">
                    <span className="text-neutral-500 font-mono text-[11px] font-bold">FIX: </span>
                    <span className="font-mono font-bold text-[#141414]">{issue.expected}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border-2 border-[#141414] rounded-xl p-4 shadow-brutal-sm text-center">
                <span className="text-2xl">✨</span>
                <p className="font-mono font-bold text-xs text-[#4FA35A] mt-1">
                  No critical bugs detected! Suspiciously clean code, bhau.
                </p>
              </div>
            )}

            {/* Redemption Arc Section */}
            {result.correctedCode && (
              <div className="bg-[#1E1E1E] text-[#F7F3EA] border-2 border-[#141414] rounded-xl p-4 shadow-brutal-sm flex flex-col gap-3">
                <div className="flex items-center justify-between border-b border-neutral-700 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#4FA35A] text-sm">✨</span>
                    <h4 className="font-black text-xs md:text-sm tracking-wide text-white uppercase">
                      REDEMPTION ARC — <span className="text-[#EDB13E] font-mono">Ab asli fix dekh, bhau.</span>
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(result.correctedCode)}
                      className="bg-[#EDB13E] hover:bg-[#dba134] text-[#141414] font-mono font-bold text-[11px] px-3 py-1 rounded border border-[#141414] flex items-center gap-1 shadow-brutal-sm cursor-pointer"
                    >
                      <span>{copied ? "✓ COPIED!" : "[ COPY ]"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleApply(result.correctedCode)}
                      className="bg-[#4FA35A] hover:bg-green-600 text-white font-mono font-bold text-[11px] px-3 py-1 rounded border border-[#141414] flex items-center gap-1 shadow-brutal-sm cursor-pointer"
                    >
                      <span>{applied ? "✓ APPLIED!" : "APPLY TO EDITOR ↵"}</span>
                    </button>
                  </div>
                </div>

                {/* Clean Corrected Code Snippet */}
                <div className="bg-[#141414] p-3 rounded font-mono text-xs leading-relaxed overflow-x-auto custom-scroll border border-neutral-800">
                  <pre className="text-[#F7F3EA] whitespace-pre">{result.correctedCode}</pre>
                </div>

                {/* Takeaway message */}
                {result.takeaway && (
                  <p className="text-xs text-neutral-300 font-mono italic border-t border-neutral-800 pt-2">
                    💬 {result.takeaway}
                  </p>
                )}
              </div>
            )}

            {/* Closing Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-neutral-300">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="bg-[#EDB13E] hover:bg-[#dba134] text-[#141414] font-black text-xs px-4 py-2 rounded-full border-2 border-[#141414] shadow-brutal-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{shared ? "COPIED TO CLIPBOARD!" : "SHARE ROAST"}</span>
                  <span className="font-mono">→</span>
                </button>
                <button
                  type="button"
                  onClick={onSpicierRoast}
                  className="bg-white hover:bg-neutral-100 text-[#141414] font-bold text-xs px-3.5 py-2 rounded-full border-2 border-[#141414] shadow-brutal-sm cursor-pointer"
                >
                  ROAST AGAIN, SPICIER 🌶️
                </button>
              </div>
              <button
                type="button"
                onClick={onNewCode}
                className="text-neutral-600 hover:text-[#141414] font-mono text-xs font-bold underline underline-offset-4 decoration-[#141414] cursor-pointer"
              >
                [ NEW CODE ]
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
