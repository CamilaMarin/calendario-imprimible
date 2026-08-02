import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday as checkIsToday,
} from "date-fns";
import { es } from "date-fns/locale";
import DayCell from "./DayCell";
import type { MonthNotes, Template } from "../lib/types";

interface Props {
  currentDate: Date;
  weekStart: "monday" | "sunday";
  notes: MonthNotes;
  onNoteChange: (day: number, text: string) => void;
  template: Template;
}

const weekdayLabelsMonday = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const weekdayLabelsSunday = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export default function CalendarGrid({
  currentDate,
  weekStart,
  notes,
  onNoteChange,
  template,
}: Props) {
  const weekStartsOn = weekStart === "monday" ? 1 : 0;
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const gridStart = startOfWeek(monthStart, { weekStartsOn });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });
  const labels = weekStart === "monday" ? weekdayLabelsMonday : weekdayLabelsSunday;

  return (
    <>
      <p className="cal-text mb-2 hidden font-display text-2xl font-medium capitalize print:block">
        {format(currentDate, "MMMM yyyy", { locale: es })}
      </p>
      <div className="grid grid-cols-7 gap-px bg-line">
        {labels.map((label) => (
          <div
            key={label}
            className="cal-bg-header cal-text-soft px-2 py-1 text-center font-mono text-[11px] uppercase tracking-wide"
          >
            {label}
          </div>
        ))}
        {days.map((date) => (
          <DayCell
            key={date.toISOString()}
            day={date.getDate()}
            isCurrentMonth={isSameMonth(date, currentDate)}
            isToday={checkIsToday(date)}
            note={isSameMonth(date, currentDate) ? notes[date.getDate()] ?? "" : ""}
            onChange={(text) => onNoteChange(date.getDate(), text)}
            template={template}
          />
        ))}
      </div>
    </>
  );
}
