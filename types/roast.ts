import { LANGUAGES, ROAST_LEVELS, PERSONAS, SEVERITIES } from "@/config/app.config";

export type LanguageId = (typeof LANGUAGES)[number]["id"];
export type RoastLevelId = (typeof ROAST_LEVELS)[number]["id"];
export type PersonaId = (typeof PERSONAS)[number]["id"];
export type Severity = (typeof SEVERITIES)[number];

export interface RoastRequest {
  language: LanguageId;
  code: string;
  roastLevel: RoastLevelId;
  persona?: PersonaId;
  errorMessage?: string;
}

export interface RoastIssue {
  line: number;
  severity: Severity;
  title: string;
  codeSnippet: string;
  diagnosis: string;
  expected: string;
}

export interface RoastResult {
  roast: string;
  roastScore: number;
  scoreLabel: string;
  issues: RoastIssue[];
  correctedCode: string;
  takeaway: string;
}

export type ReportState = "empty" | "loading" | "results" | "error";
