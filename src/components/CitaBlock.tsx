import { useEffect, useRef, useState } from "react";

interface Props {
  content: string;
  onChange: (text: string) => void;
}

export default function CitaBlock({ content, onChange }: Props) {
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-crece con el contenido, para que una frase larga nunca quede
  // cortada dentro de una caja de altura fija.
  useEffect(() => {
    if (editing && textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [editing, content]);

  if (editing) {
    return (
      <textarea
        ref={textareaRef}
        autoFocus
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setEditing(false)}
        rows={1}
        className="cal-text mx-auto block w-full resize-y overflow-y-auto bg-transparent text-center font-display text-xl italic leading-snug outline-none"
        placeholder="Escribe la frase o cita aquí..."
      />
    );
  }

  return (
    <button onClick={() => setEditing(true)} className="mx-auto block w-full text-center">
      <q className="cal-quote cal-text font-display text-xl italic leading-snug">
        {content || "Escribe la frase o cita aquí..."}
      </q>
    </button>
  );
}
