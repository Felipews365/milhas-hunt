"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AirportInput } from "@/components/ui/airport-input";
import { DatePickerInput } from "@/components/ui/date-picker-input";
import { CABIN_OPTIONS } from "@/lib/constants";
import type { CabinClass } from "@/types/award";

type Props = {
  initialOrigin?: string;
  initialDestination?: string;
  initialDate?: string;
  initialCabin?: CabinClass;
  compact?: boolean;
};

export function SearchForm({
  initialOrigin = "",
  initialDestination = "",
  initialDate = "",
  initialCabin = "economy",
  compact = false,
}: Props) {
  const router = useRouter();
  const [origin, setOrigin] = useState(initialOrigin);
  const [destination, setDestination] = useState(initialDestination);
  const [departDate, setDepartDate] = useState(initialDate);
  const [cabin, setCabin] = useState<CabinClass>(initialCabin);

  const today = new Date().toISOString().split("T")[0];

  function swap() {
    setOrigin(destination);
    setDestination(origin);
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!origin || !destination || !departDate) return;
    const params = new URLSearchParams({
      origin,
      destination,
      departDate,
      cabin,
      adults: "1",
    });
    router.push(`/search?${params.toString()}`);
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-2">
        <div className="flex items-end gap-1">
          <AirportInput value={origin} onChange={setOrigin} placeholder="GRU" className="w-24" />
          <button
            type="button"
            onClick={swap}
            className="flex h-10 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
          >
            <ArrowLeftRight className="h-3.5 w-3.5" />
          </button>
          <AirportInput value={destination} onChange={setDestination} placeholder="MIA" className="w-24" />
        </div>

        <DatePickerInput
          value={departDate}
          onChange={setDepartDate}
          min={today}
          className="w-44"
          placeholder="Data de ida"
        />

        <Select value={cabin} onValueChange={(v) => setCabin(v as CabinClass)}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CABIN_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button type="submit" className="shrink-0">
          <Search className="h-4 w-4" />
          <span className="ml-2">Buscar</span>
        </Button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Origin / Destination */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
        <div className="space-y-1.5">
          <Label htmlFor="origin">Origem</Label>
          <AirportInput id="origin" value={origin} onChange={setOrigin} placeholder="GRU" />
        </div>

        <button
          type="button"
          onClick={swap}
          className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors"
          aria-label="Trocar origem e destino"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </button>

        <div className="space-y-1.5">
          <Label htmlFor="destination">Destino</Label>
          <AirportInput id="destination" value={destination} onChange={setDestination} placeholder="MIA" />
        </div>
      </div>

      {/* Date + Cabin */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="departDate">Data de ida</Label>
          <DatePickerInput
            id="departDate"
            value={departDate}
            onChange={setDepartDate}
            min={today}
            placeholder="Selecione a data"
          />
        </div>

        <div className="space-y-1.5">
          <Label>Cabine</Label>
          <Select value={cabin} onValueChange={(v) => setCabin(v as CabinClass)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CABIN_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" size="lg" className="w-full gap-2">
        <Search className="h-4 w-4" />
        Buscar milhas
      </Button>
    </form>
  );
}
