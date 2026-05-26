"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { MapPin } from "lucide-react";
import { searchAirports, getFlag, type Airport } from "@/lib/airports";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (iata: string) => void;
  placeholder?: string;
  id?: string;
  className?: string;
};

export function AirportInput({ value, onChange, placeholder = "GRU", id, className }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);

  const results = searchAirports(query, 8);
  const selected = searchAirports(value || "ZZZ", 300).find((a) => a.iata === value);

  function select(airport: Airport) {
    onChange(airport.iata);
    setOpen(false);
    setQuery("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted((h) => Math.min(h + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlighted((h) => Math.max(h - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (results[highlighted]) select(results[highlighted]); }
    else if (e.key === "Escape") setOpen(false);
  }

  return (
    <Popover.Root open={open} onOpenChange={(o) => { setOpen(o); if (!o) setQuery(""); }}>
      <Popover.Trigger asChild>
        <button
          id={id}
          type="button"
          className={cn(
            "flex h-10 w-full flex-col items-center justify-center rounded-md border bg-white px-3 transition hover:border-slate-300",
            open ? "border-blue-500 ring-2 ring-blue-200" : "border-slate-200",
            className
          )}
        >
          {value ? (
            <>
              <span className="font-mono text-base font-bold tracking-widest text-slate-900 uppercase leading-tight">
                {value}
              </span>
              {selected && (
                <span className="text-[10px] text-slate-400 leading-tight">
                  {getFlag(selected.country)} {selected.city}
                </span>
              )}
            </>
          ) : (
            <span className="font-mono text-base font-bold tracking-widest text-slate-300">
              {placeholder}
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          sideOffset={6}
          align="start"
          className="z-50 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl outline-none"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {/* Search input */}
          <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2.5">
            <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
            <input
              autoFocus
              type="text"
              value={query}
              placeholder="Cidade ou código IATA (ex: GRU)"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
              onChange={(e) => { setQuery(e.target.value); setHighlighted(0); }}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Results */}
          <ul className="max-h-64 overflow-y-auto py-1">
            {results.length === 0 && (
              <li className="px-4 py-3 text-sm text-slate-400">Nenhum aeroporto encontrado</li>
            )}
            {results.map((airport, i) => (
              <li key={airport.iata}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                    i === highlighted ? "bg-blue-50" : "hover:bg-slate-50"
                  )}
                  onMouseEnter={() => setHighlighted(i)}
                  onClick={() => select(airport)}
                >
                  <span className="text-base leading-none">{getFlag(airport.country)}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-slate-900">{airport.iata}</span>
                      <span className="truncate text-sm text-slate-700">{airport.city}</span>
                    </div>
                    <p className="truncate text-xs text-slate-400">{airport.name}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
