import { useEffect, useState } from "react";
import type { NotesStore } from "../lib/types";

const STORAGE_KEY = "calendario-notas";

export function useNotes() {
  const [notes, setNotes] = useState<NotesStore>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as NotesStore) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  function setDayNote(monthKey: string, day: number, text: string) {
    setNotes((prev) => {
      const monthNotes = { ...(prev[monthKey] ?? {}) };
      if (text.trim() === "") {
        delete monthNotes[day];
      } else {
        monthNotes[day] = text;
      }
      return { ...prev, [monthKey]: monthNotes };
    });
  }

  return { notes, setDayNote };
}
