import { RoastRequest, RoastResult } from "@/types/roast";

export async function requestRoast(payload: RoastRequest): Promise<RoastResult> {
  let response: Response;

  try {
    response = await fetch("/api/roast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    throw new Error(
      "Could not reach the server. Is 'npm run dev' still running? Please check your local connection."
    );
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || `Server error (${response.status}) while analyzing code.`);
  }

  if (!data || typeof data !== "object") {
    throw new Error("Invalid response received from roast server.");
  }

  return data as RoastResult;
}
