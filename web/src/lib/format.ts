import type { PlaceCategory } from "@/types";

export function formatCurrency(amount: number, currency = "USD"): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${Math.round(amount).toLocaleString()}`;
  }
}

export function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear();
  if (sameMonth) {
    return `${s.toLocaleDateString("en-US", { month: "short" })} ${s.getDate()}–${e.getDate()}, ${e.getFullYear()}`;
  }
  return `${s.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", { ...opts, year: "numeric" })}`;
}

export function tripDurationDays(start: string, end: string): number {
  const diff = Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000) + 1;
  return Math.max(diff, 1);
}

export function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export const CATEGORY_META: Record<PlaceCategory, { label: string; color: string; emoji: string }> = {
  hotel: { label: "Stay", color: "#6366F1", emoji: "🏨" },
  restaurant: { label: "Dining", color: "#E0794B", emoji: "🍽️" },
  museum: { label: "Museum", color: "#A855F7", emoji: "🏛️" },
  activity: { label: "Activity", color: "#10B981", emoji: "🎯" },
  landmark: { label: "Landmark", color: "#C9A267", emoji: "📍" },
  nature: { label: "Nature", color: "#3F9D6B", emoji: "🌿" },
  shopping: { label: "Shopping", color: "#EC4899", emoji: "🛍️" },
  nightlife: { label: "Nightlife", color: "#8B5CF6", emoji: "🌃" },
};
