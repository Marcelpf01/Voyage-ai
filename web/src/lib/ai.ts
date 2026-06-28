/**
 * Rork AI Gateway client.
 * Wraps the OpenAI-compatible chat completions endpoint exposed by the Rork
 * Toolkit proxy. Used for itinerary generation and the travel assistant chat.
 */

const TOOLKIT_URL = import.meta.env.EXPO_PUBLIC_TOOLKIT_URL as string;
const TOOLKIT_KEY = import.meta.env.EXPO_PUBLIC_RORK_TOOLKIT_SECRET_KEY as string;

/** Gemini 3 Flash: fast, 1M context, strong structured-JSON generation. */
export const TRIP_MODEL = "google/gemini-3-flash";

export interface ChatRole {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatOptions {
  temperature?: number;
  maxTokens?: number;
  signal?: AbortSignal;
}

export async function chatCompletion(messages: ChatRole[], options: ChatOptions = {}): Promise<string> {
  const res = await fetch(`${TOOLKIT_URL}/v2/vercel/v1/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOOLKIT_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: TRIP_MODEL,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 8000,
    }),
    signal: options.signal,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`AI request failed (${res.status}): ${body.slice(0, 200)}`);
  }

  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("The travel assistant returned an empty response.");
  return content;
}

/** Extract a JSON object from a model response that may include prose or code fences. */
export function extractJson<T>(raw: string): T {
  let text = raw.trim();
  const fenceMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) text = fenceMatch[1].trim();

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("Could not parse a valid itinerary from the AI response.");
  }
  const slice = text.slice(start, end + 1);
  return JSON.parse(slice) as T;
}
