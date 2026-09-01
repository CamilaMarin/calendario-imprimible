import type { ChecklistItem, ExtraSection, SectionType } from "../lib/types";
import CitaBlock from "./CitaBlock";
import HabitsBlock from "./HabitsBlock";
import PrioritiesBlock from "./PrioritiesBlock";

interface Props {
  sections: ExtraSection[];
  daysInMonth: number;
  onAdd: (type: SectionType) => void;
  onUpdate: (id: string, patch: Partial<ExtraSection>) => void;
  onRemove: (id: string) => void;
  onAddItem: (sectionId: string) => void;
  onUpdateItem: (sectionId: string, itemId: string, patch: Partial<ChecklistItem>) => void;
  onRemoveItem: (sectionId: string, itemId: string) => void;
  onAddHabit: (sectionId: string) => void;
  onUpdateHabitName: (sectionId: string, habitId: string, name: string) => void;
  onToggleHabitDay: (sectionId: string, habitId: string, dayIndex: number) => void;
  onRemoveHabit: (sectionId: string, habitId: string) => void;
  onUpdatePriority: (sectionId: string, index: number, text: string) => void;
}

const addButtons: { type: SectionType; label: string }[] = [
  { type: "notas", label: "+ Sección de notas" },
  { type: "checklist", label: "+ Checklist" },
  { type: "cita", label: "+ Cita / frase" },
  { type: "habitos", label: "+ Hábitos" },
  { type: "prioridades", label: "+ Prioridades" },
];

export default function ExtraSections({
  sections,
  daysInMonth,
  onAdd,
  onUpdate,
  onRemove,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  onAddHabit,
  onUpdateHabitName,
  onToggleHabitDay,
  onRemoveHabit,
  onUpdatePriority,
}: Props) {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`cal-bg-header group relative border cal-line-border p-4 ${
              section.width === "ancho" ? "sm:col-span-2" : ""
            }`}
          >
            <div className="no-print absolute right-3 top-3 flex gap-3 font-mono text-[11px] opacity-0 transition-opacity group-hover:opacity-100">
              <button
                onClick={() =>
                  onUpdate(section.id, { width: section.width === "ancho" ? "normal" : "ancho" })
                }
                className="cal-text-muted cal-hoverable"
              >
                {section.width === "ancho" ? "↔ angosto" : "↔ ancho"}
              </button>
              <button
                onClick={() => onRemove(section.id)}
                className="cal-text-muted cal-hoverable"
                aria-label="Eliminar sección"
              >
                eliminar ✕
              </button>
            </div>

            <input
              value={section.title}
              onChange={(e) => onUpdate(section.id, { title: e.target.value })}
              className="cal-text w-full bg-transparent font-display text-lg font-medium outline-none"
              placeholder="Título de la sección"
            />

            {section.type === "notas" ? (
              <textarea
                value={section.content}
                onChange={(e) => onUpdate(section.id, { content: e.target.value })}
                rows={4}
                className="cal-text-soft mt-2 min-h-[80px] w-full resize bg-transparent text-sm leading-relaxed outline-none"
                placeholder="Escribe aquí... (puedes arrastrar la esquina para agrandar en cualquier dirección)"
              />
            ) : section.type === "cita" ? (
              <div className="mt-2 py-2">
                <CitaBlock
                  content={section.content}
                  onChange={(text) => onUpdate(section.id, { content: text })}
                />
              </div>
            ) : section.type === "habitos" ? (
              <HabitsBlock
                habits={section.habits}
                daysInMonth={daysInMonth}
                onAddHabit={() => onAddHabit(section.id)}
                onUpdateName={(habitId, name) => onUpdateHabitName(section.id, habitId, name)}
                onToggleDay={(habitId, dayIndex) =>
                  onToggleHabitDay(section.id, habitId, dayIndex)
                }
                onRemoveHabit={(habitId) => onRemoveHabit(section.id, habitId)}
              />
            ) : section.type === "prioridades" ? (
              <PrioritiesBlock
                priorities={section.priorities}
                onUpdate={(i, text) => onUpdatePriority(section.id, i, text)}
              />
            ) : (
              <div className="mt-2 space-y-1.5">
                {section.items.map((item) => (
                  <div key={item.id} className="group/item flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={item.done}
                      onChange={(e) =>
                        onUpdateItem(section.id, item.id, { done: e.target.checked })
                      }
                      className="h-4 w-4 accent-current"
                    />
                    <input
                      value={item.text}
                      onChange={(e) =>
                        onUpdateItem(section.id, item.id, { text: e.target.value })
                      }
                      placeholder="Ítem..."
                      className={`cal-text-soft flex-1 bg-transparent text-sm outline-none ${
                        item.done ? "line-through opacity-60" : ""
                      }`}
                    />
                    <button
                      onClick={() => onRemoveItem(section.id, item.id)}
                      className="no-print cal-text-muted opacity-0 group-hover/item:opacity-100"
                      aria-label="Eliminar ítem"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => onAddItem(section.id)}
                  className="no-print cal-text-muted mt-1 font-mono text-[11px] uppercase tracking-wide cal-hoverable"
                >
                  + agregar ítem
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="no-print mt-4 flex flex-wrap gap-2">
        {addButtons.map((btn) => (
          <button
            key={btn.type}
            onClick={() => onAdd(btn.type)}
            className="border border-dashed border-line-strong px-4 py-2 font-mono text-xs uppercase tracking-wide text-ink-soft hover:border-ink hover:text-ink"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
