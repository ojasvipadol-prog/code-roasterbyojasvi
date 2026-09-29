"use client";

import React, { useRef } from "react";
import { LIMITS } from "@/config/app.config";

interface CodeEditorProps {
  code: string;
  onChange: (val: string) => void;
  language: string;
  errorLine?: number;
  onLoadSample: () => void;
  onClear: () => void;
}

export default function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
  onClear,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 12);

  // Sync scroll from textarea to line numbers gutter
  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // Support Tab key indentation with 4 spaces
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newCode = code.substring(0, start) + "    " + code.substring(end);
      onChange(newCode);

      // Re-position cursor after state update
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  return (
    <div className="lg:col-span-6 border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-[#141414] flex flex-col bg-[#171717] text-[#F7F3EA] min-h-[480px]">
      {/* Header Row */}
      <div className="bg-[#1f1f1f] border-b-2 border-[#141414] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#D9503F] border border-black/40 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#EDB13E] border border-black/40 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-[#4FA35A] border border-black/40 inline-block"></span>
          </div>
          <span className="ml-2 font-mono text-xs font-bold text-neutral-400">INPUT // SRC</span>
          <span className="text-neutral-600">/</span>
          <span className="font-mono text-xs font-bold text-white uppercase">{language}_SNIPPET</span>
        </div>

        {/* Utility Row Buttons */}
        <div className="flex items-center gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={onLoadSample}
            className="bg-[#2d2d2d] hover:bg-[#3d3d3d] text-neutral-200 px-2.5 py-1 rounded border border-neutral-700 hover:text-white transition-colors cursor-pointer"
          >
            [ SAMPLE BUG ]
          </button>
          <button
            type="button"
            onClick={onClear}
            className="bg-[#2d2d2d] hover:bg-[#D9503F]/20 hover:text-[#D9503F] text-neutral-400 px-2.5 py-1 rounded border border-neutral-700 transition-colors cursor-pointer"
          >
            [ CLEAR ]
          </button>
        </div>
      </div>

      {/* Code Surface with Gutters */}
      <div className="flex-1 flex overflow-hidden bg-[#171717] relative">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          className="select-none text-neutral-600 px-3 text-right flex flex-col font-mono text-xs py-3.5 border-r border-neutral-800 bg-[#141414] overflow-hidden"
        >
          {Array.from({ length: lineCount }).map((_, index) => {
            const lineNum = index + 1;
            const isErrorLine = errorLine === lineNum;
            return (
              <span
                key={lineNum}
                className={`leading-6 h-6 flex items-center justify-end ${
                  isErrorLine ? "text-[#D9503F] font-black scale-110" : ""
                }`}
              >
                {lineNum < 10 ? `0${lineNum}` : lineNum}
              </span>
            );
          })}
        </div>

        {/* Textarea Code Input */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="// Paste your Python, JavaScript, Java, C++, Go, or Rust code here...
// Then click 'Roast Me' or press Ctrl+Enter to get roasted!"
          className="flex-1 w-full bg-transparent p-3.5 font-mono text-xs sm:text-sm text-[#F7F3EA] leading-6 resize-none outline-none overflow-auto custom-scroll whitespace-pre tab-4"
        />
      </div>

      {/* Code Editor Footer Bar */}
      <div className="bg-[#1f1f1f] border-t border-neutral-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#4FA35A]"></span>
          <span className="capitalize">{language} · Active</span>
        </div>
        <div className="text-neutral-500">
          <span
            className={
              code.length > LIMITS.maxCodeLength ? "text-[#D9503F] font-bold" : "text-[#EDB13E] font-semibold"
            }
          >
            {code.length.toLocaleString()}
          </span>{" "}
          / {LIMITS.maxCodeLength.toLocaleString()} chars
        </div>
      </div>
    </div>
  );
}
