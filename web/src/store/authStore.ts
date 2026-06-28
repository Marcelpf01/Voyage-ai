import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { AppUser } from "@/types";
import { ALL_SAMPLES, type SampleTrip } from "@/data/sampleTrips";

/**
 * Local-first auth store with demo mode support.
 * Demo users get instant access with pre-seeded sample trips.
 */

interface StoredCredential {
  email: string;
  password: string;
  user: AppUser;
}

interface AuthState {
  user: AppUser | null;
  isDemo: boolean;
  credentials: StoredCredential[];
  login: (email: string, password: string) => Promise<AppUser>;
  register: (name: string, email: string, password: string) => Promise<AppUser>;
  loginWithGoogle: () => Promise<AppUser>;
  loginAsDemo: () => AppUser;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (patch: Partial<Pick<AppUser, "name" | "avatar" | "email">>) => void;
  logout: () => void;
  deleteAccount: () => void;
  getSampleTrips: () => SampleTrip[];
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function avatarFor(seed: string): string {
  return `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear&fontFamily=Georgia`;
}

const DEMO_USER: AppUser = {
  id: "demo-user-001",
  name: "Alex Demo",
  email: "demo@voyage.ai",
  avatar: avatarFor("Demo User"),
  provider: "email",
  createdAt: Date.now(),
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isDemo: false,
      credentials: [],

      login: async (email, password) => {
        await delay(700);
        const match = get().credentials.find(
          (c) => c.email.toLowerCase() === email.toLowerCase() && c.password === password,
        );
        if (!match) throw new Error("Invalid email or password.");
        set({ user: match.user, isDemo: false });
        return match.user;
      },

      register: async (name, email, password) => {
        await delay(800);
        const exists = get().credentials.some((c) => c.email.toLowerCase() === email.toLowerCase());
        if (exists) throw new Error("An account with this email already exists.");
        const user: AppUser = {
          id: crypto.randomUUID(),
          name,
          email,
          avatar: avatarFor(name),
          provider: "email",
          createdAt: Date.now(),
        };
        set({ credentials: [...get().credentials, { email, password, user }], user, isDemo: false });
        return user;
      },

      loginWithGoogle: async () => {
        await delay(900);
        const existing = get().credentials.find((c) => c.user.provider === "google");
        if (existing) {
          set({ user: existing.user, isDemo: false });
          return existing.user;
        }
        const user: AppUser = {
          id: crypto.randomUUID(),
          name: "Alex Marlowe",
          email: "alex.marlowe@gmail.com",
          avatar: avatarFor("Alex Marlowe"),
          provider: "google",
          createdAt: Date.now(),
        };
        set({
          credentials: [...get().credentials, { email: user.email, password: "", user }],
          user,
          isDemo: false,
        });
        return user;
      },

      loginAsDemo: () => {
        set({ user: DEMO_USER, isDemo: true });
        return DEMO_USER;
      },

      resetPassword: async (email) => {
        await delay(700);
        const exists = get().credentials.some((c) => c.email.toLowerCase() === email.toLowerCase());
        if (!exists) throw new Error("We couldn't find an account with that email.");
      },

      updateProfile: (patch) => {
        const current = get().user;
        if (!current) return;
        const updated = { ...current, ...patch };
        set({
          user: updated,
          credentials: get().credentials.map((c) =>
            c.user.id === updated.id ? { ...c, user: updated } : c,
          ),
        });
      },

      logout: () => set({ user: null, isDemo: false }),

      deleteAccount: () => {
        const current = get().user;
        if (!current) return;
        set({
          user: null,
          isDemo: false,
          credentials: get().credentials.filter((c) => c.user.id !== current.id),
        });
      },

      getSampleTrips: () => ALL_SAMPLES,
    }),
    { name: "voyage-auth" },
  ),
);
