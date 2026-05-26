import type { ProgramCode } from "./program";

export type CabinClass = "economy" | "premium_economy" | "business" | "first";

export type Availability = "high" | "medium" | "low";

export type AwardOffer = {
  readonly id: string;
  readonly program: ProgramCode;
  readonly origin: string;
  readonly destination: string;
  readonly departureDate: string;
  readonly cabin: CabinClass;
  readonly miles: number;
  readonly taxes: number;
  readonly currency: string;
  readonly isDirect: boolean;
  readonly availability: Availability;
  readonly airline: string;
  readonly flightNumber: string | null;
  readonly durationMinutes: number | null;
  readonly bookingUrl: string;
};

export type AwardSearchParams = {
  readonly origin: string;
  readonly destination: string;
  readonly departDate: string;
  readonly returnDate?: string;
  readonly cabin: CabinClass;
  readonly adults: number;
  readonly programs: readonly ProgramCode[];
};

export type AwardSearchResult = {
  readonly offers: readonly AwardOffer[];
  readonly searchedAt: string;
  readonly params: AwardSearchParams;
};

export const CABIN_LABELS: Record<CabinClass, string> = {
  economy: "Econômica",
  premium_economy: "Econômica Premium",
  business: "Executiva",
  first: "Primeira Classe",
};
