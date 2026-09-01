import { useState } from "react";
import type { Template } from "../lib/types";

interface Props {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  note: string;
  onChange: (text: string) => void;
  template: Template;
}

export default function DayCell({
  day,
  isCurrentMonth,
  isToday,
  note,
  onChange,
  template,
}: Props) {
  const [editing, setEditing] = useState(false);

  return (
    <div
      className={`flex min-h-[90px] flex-col border cal-line-border p-2 print:min-h-[80px] ${
        isCurrentMonth ? "cal-bg" : "cal-bg-muted"
      } ${template === "color" && isToday ? "cal-accent-border" : ""}`}
    >
      <span
        className={`font-mono text-xs ${
          isCurrentMonth ? "cal-text" : "cal-text-muted"
        } ${template === "color" && isToday ? `font-medium cal-accent-text` : ""}`}
      >
        {day}
      </span>

      {editing ? (
        <textarea
          autoFocus
          value={note}
          onChange={(e) => onChange(e.target.value)}
          onBlur={() => setEditing(false)}
          className="no-print cal-text-soft mt-1 flex-1 resize-none bg-transparent text-xs outline-none"
          placeholder="Nota..."
        />
      ) : (
        <button
          onClick={() => isCurrentMonth && setEditing(true)}
          className="cal-text-soft mt-1 flex-1 whitespace-pre-wrap text-left text-xs"
        >
          {note}
        </button>
      )}
    </div>
  );
}
