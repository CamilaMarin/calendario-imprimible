import type { Template } from "../lib/types";

interface Props {
  template: Template;
  onChange: (t: Template) => void;
}

export default function TemplatePicker({ template, onChange }: Props) {
  return (
    <div className="no-print flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-ink-soft">
      Plantilla
      <button
        onClick={() => onChange("minimal")}
        className={`border-b-2 px-2 py-1 ${
          template === "minimal" ? "border-moss text-ink" : "border-transparent"
        }`}
      >
        Minimalista
      </button>
      <button
        onClick={() => onChange("color")}
        className={`border-b-2 px-2 py-1 ${
          template === "color" ? "border-moss text-ink" : "border-transparent"
        }`}
      >
        Con acento
      </button>
    </div>
  );
}
