import type { AwardSearchParams, CabinClass } from "@/types/award";
import type { ProgramCode } from "@/types/program";
import { ALL_PROGRAM_CODES } from "@/lib/constants";

type Reader = { get: (k: string) => string | null };

export function parseAwardSearchParams(sp: Reader): AwardSearchParams | null {
  const origin = sp.get("origin");
  const destination = sp.get("destination");
  const departDate = sp.get("departDate");
  if (!origin || !destination || !departDate) return null;

  const programsRaw = sp.get("programs");
  const programs = programsRaw
    ? (programsRaw.split(",").filter((p) => ALL_PROGRAM_CODES.includes(p as ProgramCode)) as ProgramCode[])
    : [];

  return {
    origin: origin.toUpperCase(),
    destination: destination.toUpperCase(),
    departDate,
    returnDate: sp.get("returnDate") ?? undefined,
    cabin: (sp.get("cabin") as CabinClass | null) ?? "economy",
    adults: parseInt(sp.get("adults") ?? "1", 10) || 1,
    programs,
  };
}
