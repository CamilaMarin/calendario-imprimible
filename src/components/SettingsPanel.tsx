import type { CalendarSettings } from "../lib/types";

interface Props {
  settings: CalendarSettings;
  onChange: <K extends keyof CalendarSettings>(key: K, value: CalendarSettings[K]) => void;
  onReset: () => void;
}

export default function SettingsPanel({ settings, onChange, onReset }: Props) {
  return (
    <div className="no-print flex flex-wrap items-center gap-5 border-b border-line py-4 font-mono text-xs uppercase tracking-wide text-ink-soft">
      <label className="flex items-center gap-2">
        Fondo del calendario
        <input
          type="color"
          value={settings.bgColor}
          onChange={(e) => onChange("bgColor", e.target.value)}
          className="h-7 w-7 cursor-pointer border border-line-strong bg-transparent p-0"
        />
      </label>

      <label className="flex items-center gap-2">
        Fondo de página
        <input
          type="color"
          value={settings.pageBgColor}
          onChange={(e) => onChange("pageBgColor", e.target.value)}
          className="h-7 w-7 cursor-pointer border border-line-strong bg-transparent p-0"
        />
      </label>

      <label className="flex items-center gap-2">
        Color de líneas
        <input
          type="color"
          value={settings.lineColor}
          onChange={(e) => onChange("lineColor", e.target.value)}
          className="h-7 w-7 cursor-pointer border border-line-strong bg-transparent p-0"
        />
      </label>

      <label className="flex items-center gap-2">
        Acento
        <input
          type="color"
          value={settings.accentColor}
          onChange={(e) => onChange("accentColor", e.target.value)}
          className="h-7 w-7 cursor-pointer border border-line-strong bg-transparent p-0"
        />
      </label>

      <div className="flex items-center gap-2">
        Estilo
        <button
          onClick={() => onChange("fillMode", "relleno")}
          className={`border-b-2 px-2 py-1 normal-case ${
            settings.fillMode === "relleno" ? "border-moss text-ink" : "border-transparent"
          }`}
        >
          Relleno
        </button>
        <button
          onClick={() => onChange("fillMode", "marco")}
          className={`border-b-2 px-2 py-1 normal-case ${
            settings.fillMode === "marco" ? "border-moss text-ink" : "border-transparent"
          }`}
        >
          Marco (ahorra tinta)
        </button>
      </div>

      <button onClick={onReset} className="underline underline-offset-4 hover:text-ink">
        Restablecer
      </button>
    </div>
  );
}
