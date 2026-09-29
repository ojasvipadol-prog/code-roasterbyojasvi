"use client";

import React from "react";

interface ErrorMessageDrawerProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export default function ErrorMessageDrawer({
  value,
  onChange,
  onClose,
}: ErrorMessageDrawerProps) {
  return (
    <div className="bg-[#EFF2FB] border-b-2 border-[#141414] px-5 py-3 flex flex-col gap-2 transition-all">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-black uppercase text-[#141414] flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#D9503F]"></span>
          ATTACH COMPILER TRACEBACK / TERMINAL ERROR (OPTIONAL)
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-neutral-500 hover:text-[#141414] font-mono text-xs font-bold"
        >
          Dismiss ✕
        </button>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        placeholder="Paste your TypeError, SyntaxError, or runtime traceback here (e.g. TypeError: unsupported operand type(s) for +=)..."
        className="w-full bg-white border-2 border-[#141414] rounded-lg p-2.5 font-mono text-xs text-[#141414] focus:outline-none focus:ring-2 focus:ring-[#141414] resize-none"
      />
    </div>
  );
}
