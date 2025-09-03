'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  className?: string;
  placeholder?: string;
  suggestions?: string[];
  onSelectSuggestion?: (value: string) => void;
};

export default function SearchBox({
  className = 'ml-2 w-56 rounded-full border border-neutral-300 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-black/10',
  placeholder = 'Search',
  suggestions = [],
  onSelectSuggestion,
}: Props) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const filtered = q.length
    ? suggestions.filter((s) => s.toLowerCase().includes(q.toLowerCase())).slice(0, 5)
    : suggestions.slice(0, 5);

  return (
    <div className="relative" ref={boxRef}>
      <input
        aria-label="Search"
        placeholder={placeholder}
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          if (!open) setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        autoComplete="off"
        suppressHydrationWarning
        className={className}
      />

      {open && filtered.length > 0 && (
        <div
          role="listbox"
          className="absolute left-0 right-0 mt-2 rounded-xl border border-neutral-200 bg-white p-2 shadow-lg"
        >
          <ul>
            {filtered.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  className="block w-full rounded-md px-3 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100"
                  onClick={() => {
                    setQ(s);
                    setOpen(false);
                    onSelectSuggestion?.(s);
                  }}
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
