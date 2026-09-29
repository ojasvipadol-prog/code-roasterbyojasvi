export const APP = {
  name: "Code Roaster",
  edition: "Desi Edition",
  version: "v2.0-DESI",
  event: "DevFest Nashik 2026",
  tagline: "Paste your code. Pick your roast. Get humbled. Get the fix.",
  subTagline: "Desi debugging, powered by Gemini.",
} as const;

export const AI = {
  model: "gemini-3.5-flash-lite",
  modelLabel: "Gemini 3.5 Flash-Lite",
  fallbackModel: "gemini-3.8-flash",
  maxAttempts: 3,
} as const;

export const ROAST_LEVELS = [
  {
    id: "halka",
    label: "Halka",
    subtext: "Mild",
    emoji: "☕",
    description: "Mild and deadpan. Gentle jabs, mostly helpful.",
  },
  {
    id: "tikha",
    label: "Tikha",
    subtext: "Spicy",
    emoji: "🌶️",
    description: "Pointed and witty. Calls out every mistake directly with spicy Desi metaphors.",
  },
  {
    id: "zanzanit",
    label: "Zanzanit",
    subtext: "Nuclear",
    emoji: "🔥",
    description: "Maximum burn! Brutally savage Nashik street-style roast, but still technically accurate.",
  },
] as const;

export const PERSONAS = [
  {
    id: "standup",
    label: "Stand-up Roaster",
    tagline: "Punchlines & relatable engineering misery",
    emoji: "🎙️",
  },
  {
    id: "sharmaji",
    label: "Sharma ji ka Beta",
    tagline: "Bhai ne Google crack kar liya aur tu...",
    emoji: "👨‍🏫",
  },
  {
    id: "professor",
    label: "Strict Professor",
    tagline: "Zero in viva, Godavari mein fek dunga assignment",
    emoji: "📐",
  },
  {
    id: "hostelbhau",
    label: "Hostel Bhau",
    tagline: "Chai-samosa pe charcha aur code ka antim sanskar",
    emoji: "😎",
  },
] as const;

export const LANGUAGES = [
  { id: "python", label: "Python", extension: "py" },
  { id: "javascript", label: "JavaScript", extension: "js" },
  { id: "typescript", label: "TypeScript", extension: "ts" },
  { id: "java", label: "Java", extension: "java" },
  { id: "cpp", label: "C++", extension: "cpp" },
  { id: "c", label: "C", extension: "c" },
  { id: "go", label: "Go", extension: "go" },
  { id: "rust", label: "Rust", extension: "rs" },
] as const;

export const DEFAULTS = {
  language: "python",
  roastLevel: "tikha",
  persona: "standup",
} as const;

export const SEVERITIES = ["FATAL BUG", "CODE SMELL", "OPTIMIZATION"] as const;

export const LIMITS = {
  maxCodeLength: 20_000,
  maxErrorMessageLength: 4_000,
} as const;

export const SAMPLE = {
  language: "python" as const,
  code: `def calculate_grade(marks):
    # Trying to reward perfection
    if marks = 100:
        return "Sharma ji ka beta"
    
    total = 0
    grades = [marks, 90, 85]
    for m in grades:
        total += grades  # Adding the entire list instead of single element!
        
    return "Pass"

print(calculate_grade(100))`,
  errorMessage: `SyntaxError: invalid syntax. Maybe you meant '==' instead of '='?`,
} as const;
