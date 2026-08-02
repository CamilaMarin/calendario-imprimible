interface Props {
  label: string;
  onPrev: () => void;
  onNext: () => void;
  weekStart: "monday" | "sunday";
  onWeekStartChange: (v: "monday" | "sunday") => void;
}

export default function MonthSelector({
  label,
  onPrev,
  onNext,
  weekStart,
  onWeekStartChange,
}: Props) {
  return (
    <div className="no-print flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onPrev}
          aria-label="Mes anterior"
          className="border border-line-strong px-3 py-1.5 font-mono text-sm hover:bg-paper-dark"
        >
          ←
        </button>
        <h2 className="font-display text-xl font-medium capitalize">{label}</h2>
        <button
          onClick={onNext}
          aria-label="Mes siguiente"
          className="border border-line-strong px-3 py-1.5 font-mono text-sm hover:bg-paper-dark"
        >
          →
        </button>
      </div>

      <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-ink-soft">
        Semana empieza en
        <select
          value={weekStart}
          onChange={(e) => onWeekStartChange(e.target.value as "monday" | "sunday")}
          className="border border-line bg-paper px-2 py-1 text-ink"
        >
          <option value="monday">Lunes</option>
          <option value="sunday">Domingo</option>
        </select>
      </label>
    </div>
  );
}
