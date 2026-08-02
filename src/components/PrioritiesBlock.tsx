interface Props {
  priorities: string[];
  onUpdate: (index: number, text: string) => void;
}

export default function PrioritiesBlock({ priorities, onUpdate }: Props) {
  return (
    <div className="mt-3 space-y-2">
      {priorities.map((text, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="cal-accent-text font-display text-2xl leading-none">{i + 1}</span>
          <input
            value={text}
            onChange={(e) => onUpdate(i, e.target.value)}
            placeholder="..."
            className="cal-text w-full border-b border-line bg-transparent pb-1 text-sm outline-none"
          />
        </div>
      ))}
    </div>
  );
}
