import type { CabinClass } from "@/types/award";
import type { ProgramCode } from "@/types/program";

export const CABIN_OPTIONS: { value: CabinClass; label: string }[] = [
  { value: "economy", label: "Econômica" },
  { value: "premium_economy", label: "Econômica Premium" },
  { value: "business", label: "Executiva" },
  { value: "first", label: "Primeira Classe" },
];

export const ALL_PROGRAM_CODES: ProgramCode[] = [
  "smiles", "latam", "azul", "livelo",
  "united", "american", "lifemiles", "aeroplan", "emirates", "turkish",
];

export const POPULAR_ROUTES = [
  { origin: "GRU", destination: "GIG", label: "São Paulo → Rio de Janeiro" },
  { origin: "GRU", destination: "MIA", label: "São Paulo → Miami" },
  { origin: "GRU", destination: "LIS", label: "São Paulo → Lisboa" },
  { origin: "GRU", destination: "CDG", label: "São Paulo → Paris" },
  { origin: "GRU", destination: "JFK", label: "São Paulo → Nova York" },
  { origin: "GRU", destination: "MAD", label: "São Paulo → Madrid" },
];

export const MOCK_DELAY_MS = 800;
