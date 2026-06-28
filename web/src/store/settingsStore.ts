import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark";

interface SettingsState {
  theme: ThemeMode;
  emailNotifications: boolean;
  tripReminders: boolean;
  priceAlerts: boolean;
  defaultCurrency: string;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setPreference: (key: "emailNotifications" | "tripReminders" | "priceAlerts", value: boolean) => void;
  setCurrency: (currency: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      theme: "light",
      emailNotifications: true,
      tripReminders: true,
      priceAlerts: false,
      defaultCurrency: "USD",
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === "light" ? "dark" : "light" }),
      setPreference: (key, value) => set({ [key]: value } as Pick<SettingsState, typeof key>),
      setCurrency: (defaultCurrency) => set({ defaultCurrency }),
    }),
    { name: "voyage-settings" },
  ),
);
