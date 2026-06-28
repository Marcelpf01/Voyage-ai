import { chatCompletion, extractJson, type ChatRole } from "@/lib/ai";
import type { GeneratedItinerary, TripRequest } from "@/types";

function daysBetween(start: string, end: string): number {
  const a = new Date(start).getTime();
  const b = new Date(end).getTime();
  const diff = Math.round((b - a) / (1000 * 60 * 60 * 24)) + 1;
  return Math.min(Math.max(diff, 1), 10);
}

const ITINERARY_SCHEMA = `{
  "destination": string,
  "country": string,
  "centerLat": number,
  "centerLng": number,
  "overview": string (2-3 elegant sentences),
  "days": [{
    "day": number,
    "date": "YYYY-MM-DD",
    "title": string,
    "morning":   { "title": string, "summary": string, "places": Place[] },
    "afternoon": { "title": string, "summary": string, "places": Place[] },
    "evening":   { "title": string, "summary": string, "places": Place[] },
    "estimatedCost": number
  }],
  "budget": { "hotels": number, "flights": number, "food": number, "transportation": number, "entertainment": number, "shopping": number },
  "weatherTips": string[],
  "packingSuggestions": string[],
  "safetyAdvice": string[],
  "travelHacks": string[],
  "hiddenGems": string[]
}
Place = {
  "name": string,
  "category": "hotel" | "restaurant" | "museum" | "activity" | "landmark" | "nature" | "shopping",
  "description": string (one vivid sentence),
  "lat": number, "lng": number,
  "estimatedCost": number (per person, in the requested currency, 0 if free),
  "durationMinutes": number,
  "travelTimeFromPrevious": string (e.g. "8 min walk")
}`;

export async function generateItinerary(request: TripRequest): Promise<GeneratedItinerary> {
  const numDays = daysBetween(request.startDate, request.endDate);

  const system: ChatRole = {
    role: "system",
    content:
      "You are Voyage AI, a world-class luxury travel concierge. You design impeccable, realistic, day-by-day itineraries with precise, real geographic coordinates for every place. You ALWAYS respond with a single valid JSON object and nothing else — no prose, no markdown fences.",
  };

  const user: ChatRole = {
    role: "user",
    content: `Design a ${numDays}-day itinerary for ${request.travelers} traveler(s).

Destination: ${request.destination}
Dates: ${request.startDate} to ${request.endDate}
Total budget: ${request.budget} ${request.currency}
Travel style: ${request.style}
Interests: ${request.interests.join(", ") || "general sightseeing"}
Walking tolerance: ${request.walkingDistance}
Transportation preference: ${request.transportation}
Accommodation level: ${request.hotelLevel}

Requirements:
- Use REAL, well-known and hidden-gem places with ACCURATE latitude/longitude.
- Each day must have morning, afternoon, and evening segments with 1-3 places each, plus at least one restaurant suggestion per day.
- Respect the budget: the sum of the budget breakdown should be close to ${request.budget} ${request.currency}.
- Tailor everything to the chosen style and interests.
- Provide 3-5 items each for weatherTips, packingSuggestions, safetyAdvice, travelHacks, and hiddenGems.
- centerLat/centerLng must be the city center coordinates.

Respond ONLY with JSON matching exactly this shape:
${ITINERARY_SCHEMA}`,
  };

  const raw = await chatCompletion([system, user], { temperature: 0.8, maxTokens: 9000 });
  const itinerary = extractJson<GeneratedItinerary>(raw);

  // Defensive normalization so the UI never crashes on partial AI output.
  itinerary.days = (itinerary.days ?? []).map((d, i) => ({
    ...d,
    day: d.day ?? i + 1,
    morning: d.morning ?? { title: "Morning", summary: "", places: [] },
    afternoon: d.afternoon ?? { title: "Afternoon", summary: "", places: [] },
    evening: d.evening ?? { title: "Evening", summary: "", places: [] },
    estimatedCost: d.estimatedCost ?? 0,
  }));
  itinerary.budget = itinerary.budget ?? {
    hotels: 0,
    flights: 0,
    food: 0,
    transportation: 0,
    entertainment: 0,
    shopping: 0,
  };
  itinerary.weatherTips ??= [];
  itinerary.packingSuggestions ??= [];
  itinerary.safetyAdvice ??= [];
  itinerary.travelHacks ??= [];
  itinerary.hiddenGems ??= [];

  return itinerary;
}

export async function askAssistant(
  itinerary: GeneratedItinerary,
  history: ChatRole[],
  question: string,
): Promise<string> {
  const system: ChatRole = {
    role: "system",
    content: `You are Voyage AI's in-trip travel assistant for a trip to ${itinerary.destination}, ${itinerary.country}. You know this itinerary:\n${JSON.stringify(
      { overview: itinerary.overview, days: itinerary.days.map((d) => ({ day: d.day, title: d.title })) },
    )}\nAnswer concisely and warmly. Give specific, actionable travel advice. Keep responses under 140 words unless the user asks for detail.`,
  };

  return chatCompletion([system, ...history.slice(-8), { role: "user", content: question }], {
    temperature: 0.7,
    maxTokens: 800,
  });
}
