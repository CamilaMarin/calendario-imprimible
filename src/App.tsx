import { useEffect, useState } from "react";
import { addMonths, subMonths, format, getDaysInMonth } from "date-fns";
import { es } from "date-fns/locale";
import MonthSelector from "./components/MonthSelector";
import CalendarGrid from "./components/CalendarGrid";
import TemplatePicker from "./components/TemplatePicker";
import SettingsPanel from "./components/SettingsPanel";
import ExtraSections from "./components/ExtraSections";
import { useNotes } from "./hooks/useNotes";
import { useSettings } from "./hooks/useSettings";
import { useSections } from "./hooks/useSections";
import { getContrastPalette } from "./lib/color";
import type { Template } from "./lib/types";

export default function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState<"monday" | "sunday">("monday");
  const [template, setTemplate] = useState<Template>("minimal");
  const { notes, setDayNote } = useNotes();
  const { settings, updateSetting, reset } = useSettings();
  const {
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
  } = useSections();

  const monthKey = format(currentDate, "yyyy-MM");
  const monthNotes = notes[monthKey] ?? {};
  const monthSections = sections[monthKey] ?? [];
  const daysInMonth = getDaysInMonth(currentDate);

  // El color elegido se aplica en la raíz del documento (no solo en la
  // grilla) para que la página impresa completa lo herede — así no queda
  // un margen blanco alrededor del calendario al imprimir.
  // El fondo de página (--page-bg) y el fondo del calendario (--cal-bg) son
  // independientes a propósito: la página por defecto queda blanca, y el
  // color del calendario solo se aplica dentro del área imprimible.
  // El color de texto (--cal-ink) se calcula automáticamente según el
  // contraste contra --cal-bg, para que nunca quede texto oscuro sobre
  // fondo oscuro (o claro sobre claro) sin que el usuario tenga que elegir
  // un color de texto aparte.
  useEffect(() => {
    const effectiveCalBg = settings.fillMode === "marco" ? "#ffffff" : settings.bgColor;
    const palette = getContrastPalette(effectiveCalBg);

    document.documentElement.style.setProperty("--page-bg", settings.pageBgColor);
    document.documentElement.style.setProperty("--cal-bg", effectiveCalBg);
    document.documentElement.style.setProperty("--cal-accent", settings.accentColor);
    document.documentElement.style.setProperty("--cal-line", settings.lineColor);
    document.documentElement.style.setProperty("--cal-ink", palette.ink);
    document.documentElement.style.setProperty("--cal-ink-soft", palette.soft);
    document.documentElement.style.setProperty("--cal-ink-muted", palette.muted);
  }, [settings]);

  return (
    <div className="min-h-screen px-6 py-10 font-body text-ink print:p-0 md:px-12">
      <div className="no-print mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
            Herramientas / Organización
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold">
            Creador de calendario para imprimir
          </h1>
          <p className="mt-2 max-w-lg text-sm text-ink-soft">
            Elige el mes, agrega notas por día y descarga o imprime tu
            calendario. Tus notas se guardan solas en este navegador.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="border border-line-strong px-4 py-2 font-mono text-sm hover:bg-paper-dark"
        >
          Imprimir / guardar PDF ↓
        </button>
      </div>

      <TemplatePicker template={template} onChange={setTemplate} />
      <SettingsPanel settings={settings} onChange={updateSetting} onReset={reset} />

      <MonthSelector
        label={format(currentDate, "MMMM yyyy", { locale: es })}
        onPrev={() => setCurrentDate((d) => subMonths(d, 1))}
        onNext={() => setCurrentDate((d) => addMonths(d, 1))}
        weekStart={weekStart}
        onWeekStartChange={setWeekStart}
      />

      <div
        className={`print-area mt-6 ${settings.fillMode === "marco" ? "cal-frame" : ""}`}
      >
        <CalendarGrid
          currentDate={currentDate}
          weekStart={weekStart}
          notes={monthNotes}
          onNoteChange={(day, text) => setDayNote(monthKey, day, text)}
          template={template}
        />

        <ExtraSections
          sections={monthSections}
          daysInMonth={daysInMonth}
          onAdd={(type) => addSection(monthKey, type)}
          onUpdate={(id, patch) => updateSection(monthKey, id, patch)}
          onRemove={(id) => removeSection(monthKey, id)}
          onAddItem={(sectionId) => addItem(monthKey, sectionId)}
          onUpdateItem={(sectionId, itemId, patch) => updateItem(monthKey, sectionId, itemId, patch)}
          onRemoveItem={(sectionId, itemId) => removeItem(monthKey, sectionId, itemId)}
          onAddHabit={(sectionId) => addHabit(monthKey, sectionId, daysInMonth)}
          onUpdateHabitName={(sectionId, habitId, name) =>
            updateHabitName(monthKey, sectionId, habitId, name)
          }
          onToggleHabitDay={(sectionId, habitId, dayIndex) =>
            toggleHabitDay(monthKey, sectionId, habitId, dayIndex)
          }
          onRemoveHabit={(sectionId, habitId) => removeHabit(monthKey, sectionId, habitId)}
          onUpdatePriority={(sectionId, index, text) =>
            updatePriority(monthKey, sectionId, index, text)
          }
        />
      </div>
    </div>
  );
}
