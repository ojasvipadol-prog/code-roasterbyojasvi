import { NextRequest, NextResponse } from "next/server";
import { LIMITS, DEFAULTS, LANGUAGES, ROAST_LEVELS, PERSONAS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import { RoastRequest } from "@/types/roast";

export async function POST(req: NextRequest) {
  try {
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON in request body." }, { status: 400 });
    }

    const rawCode = typeof body.code === "string" ? body.code.trim() : "";
    const rawError = typeof body.errorMessage === "string" ? body.errorMessage.trim() : "";

    if (!rawCode) {
      return NextResponse.json(
        { error: "No code provided. Bhau, khali haath roast kaise karein? Paste some code!" },
        { status: 400 }
      );
    }

    if (rawCode.length > LIMITS.maxCodeLength) {
      return NextResponse.json(
        { error: `Code exceeds maximum allowed limit of ${LIMITS.maxCodeLength} characters.` },
        { status: 400 }
      );
    }

    if (rawError.length > LIMITS.maxErrorMessageLength) {
      return NextResponse.json(
        { error: `Error message exceeds maximum allowed limit of ${LIMITS.maxErrorMessageLength} characters.` },
        { status: 400 }
      );
    }

    const validLanguages = LANGUAGES.map((l) => l.id as string);
    const validLevels = ROAST_LEVELS.map((r) => r.id as string);
    const validPersonas = PERSONAS.map((p) => p.id as string);

    const language = validLanguages.includes(body.language) ? body.language : DEFAULTS.language;
    const roastLevel = validLevels.includes(body.roastLevel) ? body.roastLevel : DEFAULTS.roastLevel;
    const persona = validPersonas.includes(body.persona) ? body.persona : DEFAULTS.persona;

    const roastPayload: RoastRequest = {
      code: rawCode,
      language,
      roastLevel,
      persona,
      errorMessage: rawError || undefined,
    };

    const result = await analyzeCode(roastPayload);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("Roast API Error:", error);
    const errorMessage = error?.message || "Failed to generate roast. Gemini ne chai break le li!";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
