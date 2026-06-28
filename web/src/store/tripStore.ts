import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { GeneratedItinerary, Trip, TripRequest, TripStatus } from "@/types";
import { useAuthStore } from "@/store/authStore";

const COVER_IMAGES = [
  "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
  "https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?w=1200&q=80",
  "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=80",
  "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&q=80",
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
  "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1200&q=80",
];

function pickCover(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return COVER_IMAGES[hash % COVER_IMAGES.length];
}

interface TripState {
  trips: Trip[];
  recentlyViewed: string[];
  _demoSeeded: boolean;
  seedDemoTrips: () => void;
  addTrip: (request: TripRequest, itinerary: GeneratedItinerary, name?: string, status?: TripStatus) => Trip;
  updateItinerary: (id: string, itinerary: GeneratedItinerary) => void;
  renameTrip: (id: string, name: string) => void;
  setStatus: (id: string, status: TripStatus) => void;
  toggleFavorite: (id: string) => void;
  duplicateTrip: (id: string) => Trip | undefined;
  deleteTrip: (id: string) => void;
  getTrip: (id: string) => Trip | undefined;
  markViewed: (id: string) => void;
}

export const useTripStore = create<TripState>()(
  persist(
    (set, get) => ({
      trips: [],
      recentlyViewed: [],
      _demoSeeded: false,

      seedDemoTrips: () => {
        if (get()._demoSeeded) return;
        const authStore = useAuthStore.getState();
        const isDemo = authStore.isDemo;
        if (!isDemo) return;
        const samples = authStore.getSampleTrips();
        if (!samples || samples.length === 0) return;

        const now = Date.now();
        const seeded: Trip[] = samples.map((s) => ({
          id: crypto.randomUUID(),
          name: s.name,
          request: s.request,
          itinerary: s.itinerary,
          status: s.status,
          favorite: s.favorite,
          coverImage: pickCover(s.itinerary.destination),
          createdAt: now - Math.floor(Math.random() * 86400000 * 30),
          updatedAt: now - Math.floor(Math.random() * 86400000 * 3),
        }));
        set({ trips: seeded, _demoSeeded: true, recentlyViewed: [seeded[0].id] });
      },

      addTrip: (request, itinerary, name, status) => {
        const now = Date.now();
        const trip: Trip = {
          id: crypto.randomUUID(),
          name: name ?? `${itinerary.destination} Escape`,
          request,
          itinerary,
          status: status ?? "upcoming",
          favorite: false,
          coverImage: pickCover(itinerary.destination),
          createdAt: now,
          updatedAt: now,
        };
        set({ trips: [trip, ...get().trips] });
        return trip;
      },

      updateItinerary: (id, itinerary) =>
        set({
          trips: get().trips.map((t) =>
            t.id === id ? { ...t, itinerary, updatedAt: Date.now() } : t,
          ),
        }),

      renameTrip: (id, name) =>
        set({
          trips: get().trips.map((t) => (t.id === id ? { ...t, name, updatedAt: Date.now() } : t)),
        }),

      setStatus: (id, status) =>
        set({
          trips: get().trips.map((t) => (t.id === id ? { ...t, status, updatedAt: Date.now() } : t)),
        }),

      toggleFavorite: (id) =>
        set({
          trips: get().trips.map((t) => (t.id === id ? { ...t, favorite: !t.favorite } : t)),
        }),

      duplicateTrip: (id) => {
        const original = get().trips.find((t) => t.id === id);
        if (!original) return undefined;
        const now = Date.now();
        const copy: Trip = {
          ...original,
          id: crypto.randomUUID(),
          name: `${original.name} (Copy)`,
          status: "draft",
          favorite: false,
          createdAt: now,
          updatedAt: now,
        };
        set({ trips: [copy, ...get().trips] });
        return copy;
      },

      deleteTrip: (id) =>
        set({
          trips: get().trips.filter((t) => t.id !== id),
          recentlyViewed: get().recentlyViewed.filter((r) => r !== id),
        }),

      getTrip: (id) => get().trips.find((t) => t.id === id),

      markViewed: (id) => {
        const filtered = get().recentlyViewed.filter((r) => r !== id);
        set({ recentlyViewed: [id, ...filtered].slice(0, 8) });
      },
    }),
    { name: "voyage-trips" },
  ),
);
