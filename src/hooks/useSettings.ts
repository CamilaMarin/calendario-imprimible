import { useEffect, useState } from "react";
import { defaultSettings, type CalendarSettings } from "../lib/types";

const STORAGE_KEY = "calendario-settings";

export function useSettings() {
  const [settings, setSettings] = useState<CalendarSettings>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? { ...defaultSettings, ...JSON.parse(raw) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  function updateSetting<K extends keyof CalendarSettings>(
    key: K,
    value: CalendarSettings[K],
  ) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function reset() {
    setSettings(defaultSettings);
  }

  return { settings, updateSetting, reset };
}
