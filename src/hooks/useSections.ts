import { useEffect, useState } from "react";
import type {
  ChecklistItem,
  ExtraSection,
  Habit,
  SectionsStore,
  SectionType,
} from "../lib/types";

const STORAGE_KEY = "calendario-secciones";

const titleByType: Record<SectionType, string> = {
  notas: "Notas",
  checklist: "Checklist",
  cita: "Frase del mes",
  habitos: "Hábitos",
  prioridades: "Prioridades del mes",
};

export function useSections() {
  const [sections, setSections] = useState<SectionsStore>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as SectionsStore) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
  }, [sections]);

  function addSection(monthKey: string, type: SectionType) {
    const newSection: ExtraSection = {
      id: crypto.randomUUID(),
      title: titleByType[type],
      type,
      content: "",
      items: [],
      habits: [],
      priorities: type === "prioridades" ? ["", "", ""] : [],
      width: type === "cita" || type === "habitos" ? "ancho" : "normal",
    };
    setSections((prev) => ({
      ...prev,
      [monthKey]: [...(prev[monthKey] ?? []), newSection],
    }));
  }

  function updateSection(monthKey: string, id: string, patch: Partial<ExtraSection>) {
    setSections((prev) => ({
      ...prev,
      [monthKey]: (prev[monthKey] ?? []).map((s) =>
        s.id === id ? { ...s, ...patch } : s,
      ),
    }));
  }

  function removeSection(monthKey: string, id: string) {
    setSections((prev) => ({
      ...prev,
      [monthKey]: (prev[monthKey] ?? []).filter((s) => s.id !== id),
    }));
  }

  // Checklist
  function addItem(monthKey: string, sectionId: string) {
    const newItem: ChecklistItem = { id: crypto.randomUUID(), text: "", done: false };
    setSections((prev) => ({
      ...prev,
      [monthKey]: (prev[monthKey] ?? []).map((s) =>
        s.id === sectionId ? { ...s, items: [...s.items, newItem] } : s,
      ),
    }));
  }

  function updateItem(
    monthKey: string,
    sectionId: string,
    itemId: string,
    patch: Partial<ChecklistItem>,
  ) {
    setSections((prev) => ({
      ...prev,
      [monthKey]: (prev[monthKey] ?? []).map((s) =>
        s.id === sectionId
          ? { ...s, items: s.items.map((i) => (i.id === itemId ? { ...i, ...patch } : i)) }
          : s,
      ),
    }));
  }

  function removeItem(monthKey: string, sectionId: string, itemId: string) {
    setSections((prev) => ({
      ...prev,
      [monthKey]: (prev[monthKey] ?? []).map((s) =>
        s.id === sectionId ? { ...s, items: s.items.filter((i) => i.id !== itemId) } : s,
      ),
    }));
  }

  // Hábitos
  function addHabit(monthKey: string, sectionId: string, daysInMonth: number) {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: "",
      days: Array(daysInMonth).fill(false),
    };
    setSections((prev) => ({
      ...prev,
      [monthKey]: (prev[monthKey] ?? []).map((s) =>
        s.id === sectionId ? { ...s, habits: [...s.habits, newHabit] } : s,
      ),
    }));
  }

  function updateHabitName(monthKey: string, sectionId: string, habitId: string, name: string) {
    setSections((prev) => ({
      ...prev,
      [monthKey]: (prev[monthKey] ?? []).map((s) =>
        s.id === sectionId
          ? { ...s, habits: s.habits.map((h) => (h.id === habitId ? { ...h, name } : h)) }
          : s,
      ),
    }));
  }

  function toggleHabitDay(monthKey: string, sectionId: string, habitId: string, dayIndex: number) {
    setSections((prev) => ({
      ...prev,
      [monthKey]: (prev[monthKey] ?? []).map((s) =>
        s.id === sectionId
          ? {
              ...s,
              habits: s.habits.map((h) =>
                h.id === habitId
                  ? {
                      ...h,
                      days: h.days.map((d, i) => (i === dayIndex ? !d : d)),
                    }
                  : h,
              ),
            }
          : s,
      ),
    }));
  }

  function removeHabit(monthKey: string, sectionId: string, habitId: string) {
    setSections((prev) => ({
      ...prev,
      [monthKey]: (prev[monthKey] ?? []).map((s) =>
        s.id === sectionId ? { ...s, habits: s.habits.filter((h) => h.id !== habitId) } : s,
      ),
    }));
  }

  // Prioridades
  function updatePriority(monthKey: string, sectionId: string, index: number, text: string) {
    setSections((prev) => ({
      ...prev,
      [monthKey]: (prev[monthKey] ?? []).map((s) =>
        s.id === sectionId
          ? { ...s, priorities: s.priorities.map((p, i) => (i === index ? text : p)) }
          : s,
      ),
    }));
  }

  return {
    sections,
    addSection,
    updateSection,
    removeSection,
    addItem,
    updateItem,
    removeItem,
    addHabit,
    updateHabitName,
    toggleHabitDay,
    removeHabit,
    updatePriority,
  };
}
