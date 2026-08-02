export type Template = "minimal" | "color";

export interface CalendarSettings {
  bgColor: string;
  pageBgColor: string;
  accentColor: string;
  fillMode: "relleno" | "marco";
}

export const defaultSettings: CalendarSettings = {
  bgColor: "#f2eee4",
  pageBgColor: "#ffffff",
  accentColor: "#6f5a2f",
  fillMode: "relleno",
};

export interface MonthNotes {
  [day: number]: string;
}

export interface NotesStore {
  [monthKey: string]: MonthNotes;
}

export type SectionType = "notas" | "checklist" | "cita" | "habitos" | "prioridades";
export type SectionWidth = "normal" | "ancho";

export interface ChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export interface Habit {
  id: string;
  name: string;
  days: boolean[];
}

export interface ExtraSection {
  id: string;
  title: string;
  type: SectionType;
  content: string;
  items: ChecklistItem[];
  habits: Habit[];
  priorities: string[];
  width: SectionWidth;
}

export interface SectionsStore {
  [monthKey: string]: ExtraSection[];
}
