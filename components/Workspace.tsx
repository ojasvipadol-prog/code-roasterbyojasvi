"use client";

import React, { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ControlBar from "@/components/ControlBar";
import ErrorMessageDrawer from "@/components/ErrorMessageDrawer";
import CodeEditor from "@/components/CodeEditor";
import RoastReport from "@/components/RoastReport";
import WarliDivider from "@/components/WarliDivider";
import Footer from "@/components/Footer";
import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { LanguageId, RoastLevelId, PersonaId, ReportState, RoastResult } from "@/types/roast";
import { requestRoast } from "@/lib/api";

export default function Workspace() {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [roastLevel, setRoastLevel] = useState<RoastLevelId>(DEFAULTS.roastLevel);
  const [persona, setPersona] = useState<PersonaId>(DEFAULTS.persona);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);

  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string | null>(null);

  const isRoasting = reportState === "loading";

  // Error line highlight only active when code matches what was roasted
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues?.[0]?.line
      : undefined;

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    const trimmed = code.trim();
    if (!trimmed) {
      setApiError("No code provided. Bhau, khali haath roast kaise karein? Paste some code on the left!");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError(null);

    try {
      const result = await requestRoast({
        code: trimmed,
        language,
        roastLevel,
        persona,
        errorMessage: errorMessage.trim() || undefined,
      });

      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err: any) {
      console.error("Roast error:", err);
      setApiError(err?.message || "Something went wrong while connecting to the roasting engine.");
      setReportState("error");
    }
  }, [code, language, roastLevel, persona, errorMessage, isRoasting]);

  // Global Ctrl+Enter / Cmd+Enter shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRoast]);

  const handleLoadSample = () => {
    setCode(SAMPLE.code);
    setLanguage(SAMPLE.language);
    setErrorMessage(SAMPLE.errorMessage);
    setErrorDrawerOpen(true);
  };

  const handleClear = () => {
    setCode("");
    setErrorMessage("");
    setErrorDrawerOpen(false);
    setReportState("empty");
    setRoastResult(null);
    setRoastedCode("");
    setApiError(null);
  };

  const handleApplyFix = (fixedCode: string) => {
    setCode(fixedCode);
  };

  const handleSpicierRoast = () => {
    setRoastLevel("zanzanit");
    setTimeout(() => {
      handleRoast();
    }, 100);
  };

  const handleNewCode = () => {
    setCode("");
    setReportState("empty");
    setRoastResult(null);
    setRoastedCode("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 w-full flex-1 flex flex-col gap-6 pb-6">
        <Hero />

        {/* MAIN SPLIT-PANE TOOL CARD */}
        <div className="bg-[#F8F4EC] border-[3px] border-[#141414] rounded-[22px] shadow-brutal-lg overflow-hidden flex flex-col">
          {/* Control Bar */}
          <ControlBar
            roastLevel={roastLevel}
            onRoastLevelChange={setRoastLevel}
            persona={persona}
            onPersonaChange={setPersona}
            language={language}
            onLanguageChange={setLanguage}
            errorDrawerOpen={errorDrawerOpen}
            onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
            onRoast={handleRoast}
            isRoasting={isRoasting}
          />

          {/* Collapsible Error Message Drawer */}
          {errorDrawerOpen && (
            <ErrorMessageDrawer
              value={errorMessage}
              onChange={setErrorMessage}
              onClose={() => setErrorDrawerOpen(false)}
            />
          )}

          {/* Split Pane Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] bg-[#171717]">
            <CodeEditor
              code={code}
              onChange={setCode}
              language={language}
              errorLine={errorLine}
              onLoadSample={handleLoadSample}
              onClear={handleClear}
            />

            <RoastReport
              state={reportState}
              result={roastResult}
              errorMsg={apiError}
              roastLevel={roastLevel}
              onRetry={handleRoast}
              onApplyFix={handleApplyFix}
              onLoadSample={handleLoadSample}
              onNewCode={handleNewCode}
              onSpicierRoast={handleSpicierRoast}
            />
          </div>
        </div>

        <WarliDivider />

        <Footer />
      </main>
    </div>
  );
}
