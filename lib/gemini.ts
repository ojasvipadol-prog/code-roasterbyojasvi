import { GoogleGenAI, Type } from "@google/genai";
import { AI, SEVERITIES } from "@/config/app.config";
import { RoastRequest, RoastResult } from "@/types/roast";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";

const roastResponseSchema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "Overall savage verdict and headline critique",
    },
    roastScore: {
      type: Type.INTEGER,
      description: "Roast intensity score from 0 to 100",
    },
    scoreLabel: {
      type: Type.STRING,
      description: "Punchy subtitle for the rubber stamp badge",
    },
    issues: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          line: { type: Type.INTEGER, description: "1-based line number" },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "Severity level",
          },
          title: { type: Type.STRING, description: "Short issue title" },
          codeSnippet: { type: Type.STRING, description: "Problematic code line" },
          diagnosis: { type: Type.STRING, description: "Funny explanation" },
          expected: { type: Type.STRING, description: "Technical fix instruction" },
        },
        required: ["line", "severity", "title", "codeSnippet", "diagnosis", "expected"],
      },
      description: "Array of detected issues",
    },
    correctedCode: {
      type: Type.STRING,
      description: "Complete fixed code snippet without markdown fences",
    },
    takeaway: {
      type: Type.STRING,
      description: "Encouraging final takeaway for the developer",
    },
  },
  required: ["roast", "roastScore", "scoreLabel", "issues", "correctedCode", "takeaway"],
};

// Built-in workshop offline fallback roast for when the key is not set or network is offline
export const WORKSHOP_OFFLINE_ROAST: RoastResult = {
  roast: "Yeh code nahi, Panchavati Express ki general boghi hai — crowded, chaotic, aur bina ticket ke crash hone wala logic!",
  roastScore: 72,
  scoreLabel: "ATTENDANCE SHORT, CODE BHI SHORT!",
  issues: [
    {
      line: 3,
      severity: "FATAL BUG",
      title: "Condition check mein assignment ka blunder",
      codeSnippet: "if marks = 100:",
      diagnosis: "Bhau, comparison operator (==) ke bajaye assignment operator (=) chipka diya! Aise toh semester mein back pakki hai. Godavari bridge pe baith ke Python syntax padh le pehle!",
      expected: "Use '==' instead of '=' to compare equality in an if condition.",
    },
    {
      line: 8,
      severity: "CODE SMELL",
      title: "Poori list add karke memory ka antim sanskar",
      codeSnippet: "total += grades",
      diagnosis: "Bhai, loop ke andar single element 'm' add karna tha, tu har iteration mein poori list chipka raha hai. Python ka garbage collector bhi resign de dega!",
      expected: "Replace 'total += grades' with 'total += m' to accumulate numbers.",
    },
  ],
  correctedCode: `def calculate_grade(marks):
    # Properly comparing equality
    if marks == 100:
        return "Sharma ji ka beta"
    
    total = 0
    grades = [marks, 90, 85]
    for m in grades:
        total += m  # Correctly accumulating each mark
        
    return "Pass"

print(calculate_grade(100))`,
  takeaway: "Chinta mat kar bhau. Code bhi gym jaisa hai — jitna repeat karoge, utna muscle memory better hoga! DevFest Nashik 2026 mein milte hain. 🚀",
};

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
    // If no key is set yet, check if it's the demo/workshop sample or return clear guidance
    if (request.code.includes("marks = 100") || request.code.includes("calculate_grade")) {
      return WORKSHOP_OFFLINE_ROAST;
    }
    throw new Error(
      "GEMINI_API_KEY is missing! Please paste your key from https://aistudio.google.com/apikey into your .env or .env.local file."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const promptText = buildUserPrompt(request);

  const modelsToTry = [AI.model, AI.fallbackModel, "gemini-flash-latest", "gemini-3.5-flash"];
  let lastError: unknown = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: promptText,
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
          temperature: 0.8,
        },
      });

      const responseText = response.text?.trim();
      if (!responseText) {
        throw new Error("Gemini returned an empty response.");
      }

      const parsed = JSON.parse(responseText);

      return {
        roast: parsed.roast || "Code thoda ajeeb hai, par fix mil gaya hai!",
        roastScore: typeof parsed.roastScore === "number" ? parsed.roastScore : 75,
        scoreLabel: parsed.scoreLabel || "CODE UNDER REVIEW",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode || request.code,
        takeaway: parsed.takeaway || "Keep learning and debugging!",
      };
    } catch (err: any) {
      lastError = err;
      console.warn(`Attempt with model ${model} failed:`, err?.message || err);
      // If error is invalid API key or quota, don't keep cycling models fruitlessly
      if (err?.status === 400 || err?.status === 403) {
        throw new Error(
          `Gemini API Error (${err?.status}): ${err?.message || "Invalid API key or request"}. Check your .env file.`
        );
      }
    }
  }

  // Fallback to offline roast if sample code and API failed
  if (request.code.includes("marks = 100") || request.code.includes("calculate_grade")) {
    return WORKSHOP_OFFLINE_ROAST;
  }

  throw new Error(
    `Failed to generate roast after trying models: ${lastError instanceof Error ? lastError.message : String(lastError)}`
  );
}
