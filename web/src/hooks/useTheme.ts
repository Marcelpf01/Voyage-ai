import { useEffect } from "react";

import { useSettingsStore } from "@/store/settingsStore";

/** Syncs the persisted theme preference with the <html> class. */
export function useThemeSync(): void {
  const theme = useSettingsStore((s) => s.theme);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
  }, [theme]);
}
