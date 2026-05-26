import type { ProgramCode } from "@/types/program";
import type { CabinClass } from "@/types/award";

export const SEATS_AERO_BASE = "https://seats.aero/partnerapi";

// Maps our ProgramCode to seats.aero source strings
export const PROGRAM_TO_SOURCE: Partial<Record<ProgramCode, string>> = {
  smiles: "gol",
  azul: "azul",
  united: "united",
  american: "american",
  lifemiles: "lifemiles",
  aeroplan: "aeroplan",
  emirates: "emirates",
  turkish: "turkish",
  // latam and livelo are not supported by seats.aero
};

export const SOURCE_TO_PROGRAM: Record<string, ProgramCode> = {
  gol: "smiles",
  azul: "azul",
  united: "united",
  american: "american",
  lifemiles: "lifemiles",
  aeroplan: "aeroplan",
  emirates: "emirates",
  turkish: "turkish",
};

// seats.aero cabin string values
const CABIN_TO_SA: Record<CabinClass, string> = {
  economy: "economy",
  premium_economy: "economy", // fallback
  business: "business",
  first: "first",
};

// Cabin prefix in the response fields (Y=economy, W=premium, J=business, F=first)
const CABIN_TO_PREFIX: Record<CabinClass, "Y" | "W" | "J" | "F"> = {
  economy: "Y",
  premium_economy: "W",
  business: "J",
  first: "F",
};

export function cabinToSAParam(cabin: CabinClass): string {
  return CABIN_TO_SA[cabin];
}

export function cabinToPrefix(cabin: CabinClass): "Y" | "W" | "J" | "F" {
  return CABIN_TO_PREFIX[cabin];
}

export type SARoute = {
  ID: string;
  OriginAirport: string;
  OriginRegion: string;
  DestinationAirport: string;
  DestinationRegion: string;
  Source: string;
};

export type SAAvailability = {
  ID: string;
  RouteID: string;
  Route: SARoute;
  Date: string;
  ParsedDate: string;
  YAvailable: boolean;
  WAvailable: boolean;
  JAvailable: boolean;
  FAvailable: boolean;
  YMileageCost: string;
  WMileageCost: string;
  JMileageCost: string;
  FMileageCost: string;
  YMileageCostRaw: number;
  WMileageCostRaw: number;
  JMileageCostRaw: number;
  FMileageCostRaw: number;
  TaxesCurrency: string;
  YTotalTaxes: number;
  WTotalTaxes: number;
  JTotalTaxes: number;
  FTotalTaxes: number;
  YRemainingSeats: number;
  WRemainingSeats: number;
  JRemainingSeats: number;
  FRemainingSeats: number;
  YAirlines: string;
  WAirlines: string;
  JAirlines: string;
  FAirlines: string;
  Source: string;
};

export type SASearchResponse = {
  data: SAAvailability[];
  count: number;
  hasMore: boolean;
  cursor: number;
};

export async function seatsAeroSearch(params: {
  origin: string;
  destination: string;
  date: string;
  cabin: CabinClass;
  sources: string[];
  apiKey: string;
}): Promise<SAAvailability[]> {
  const url = new URL(`${SEATS_AERO_BASE}/search`);
  url.searchParams.set("origin_airport", params.origin);
  url.searchParams.set("destination_airport", params.destination);
  url.searchParams.set("start_date", params.date);
  url.searchParams.set("end_date", params.date);
  url.searchParams.set("cabins", cabinToSAParam(params.cabin));
  url.searchParams.set("sources", params.sources.join(","));
  url.searchParams.set("take", "100");

  const res = await fetch(url.toString(), {
    headers: { "Partner-Authorization": params.apiKey },
    next: { revalidate: 300 }, // cache 5 min
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`seats.aero error ${res.status}: ${text}`);
  }

  const json: SASearchResponse = await res.json();
  return json.data ?? [];
}
