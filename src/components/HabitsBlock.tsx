import type { Habit } from "../lib/types";

interface Props {
  habits: Habit[];
  daysInMonth: number;
  onAddHabit: () => void;
  onUpdateName: (habitId: string, name: string) => void;
  onToggleDay: (habitId: string, dayIndex: number) => void;
  onRemoveHabit: (habitId: string) => void;
}

export default function HabitsBlock({
  habits,
  daysInMonth,
  onAddHabit,
  onUpdateName,
  onToggleDay,
  onRemoveHabit,
}: Props) {
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="mt-2 overflow-x-auto">
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="w-28" />
            {days.map((d) => (
              <th
                key={d}
                className="cal-text-muted h-5 w-5 border cal-line-border font-mono text-[9px] font-normal"
              >
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {habits.map((habit) => (
            <tr key={habit.id} className="group/habit">
              <td className="pr-2">
                <div className="flex items-center gap-1">
                  <input
                    value={habit.name}
                    onChange={(e) => onUpdateName(habit.id, e.target.value)}
                    placeholder="Hábito..."
                    className="cal-text w-full bg-transparent text-sm outline-none"
                  />
                  <button
                    onClick={() => onRemoveHabit(habit.id)}
                    className="no-print cal-text-muted cal-hoverable text-[11px] opacity-0 group-hover/habit:opacity-100"
                    aria-label="Eliminar hábito"
                  >
                    ✕
                  </button>
                </div>
              </td>
              {habit.days.map((done, i) => (
                <td
                  key={i}
                  onClick={() => onToggleDay(habit.id, i)}
                  className={`h-5 w-5 cursor-pointer border cal-line-border text-center ${
                    done ? "cal-bg-muted" : ""
                  }`}
                >
                  {done && <span className="cal-accent-text text-[11px]">✓</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={onAddHabit}
        className="no-print cal-text-muted cal-hoverable mt-2 font-mono text-[11px] uppercase tracking-wide"
      >
        + agregar hábito
      </button>
    </div>
  );
}
