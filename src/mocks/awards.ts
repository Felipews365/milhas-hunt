import type { AwardOffer } from "@/types/award";
import { PROGRAMS } from "@/types/program";

function makeOffer(
  id: string,
  program: AwardOffer["program"],
  origin: string,
  destination: string,
  date: string,
  cabin: AwardOffer["cabin"],
  miles: number,
  taxes: number,
  isDirect: boolean,
  availability: AwardOffer["availability"],
  airline: string,
  durationMinutes: number
): AwardOffer {
  return {
    id,
    program,
    origin,
    destination,
    departureDate: date,
    cabin,
    miles,
    taxes,
    currency: "BRL",
    isDirect,
    availability,
    airline,
    flightNumber: null,
    durationMinutes,
    bookingUrl: PROGRAMS[program].bookingUrl(origin, destination, date, cabin),
  };
}

export const MOCK_AWARDS: readonly AwardOffer[] = [
  // GRU → GIG (Nacional)
  makeOffer("1", "smiles",  "GRU", "GIG", "2026-07-15", "economy",  6500,   19, true,  "high",   "GOL",   70),
  makeOffer("2", "latam",   "GRU", "GIG", "2026-07-15", "economy",  7000,   25, true,  "high",   "LATAM", 65),
  makeOffer("3", "azul",    "GRU", "GIG", "2026-07-15", "economy",  7500,   20, false, "medium", "Azul",  95),
  makeOffer("4", "livelo",  "GRU", "GIG", "2026-07-15", "economy",  8000,   22, true,  "medium", "GOL",   70),
  makeOffer("5", "smiles",  "GRU", "GIG", "2026-07-15", "business", 16000,  89, true,  "low",    "GOL",   70),
  makeOffer("6", "latam",   "GRU", "GIG", "2026-07-15", "business", 18000, 110, true,  "medium", "LATAM", 65),

  // GRU → MIA (Internacional)
  makeOffer("7",  "smiles",   "GRU", "MIA", "2026-07-20", "economy",  45000, 380, true,  "medium", "GOL/AA",  570),
  makeOffer("8",  "latam",    "GRU", "MIA", "2026-07-20", "economy",  40000, 290, false, "high",   "LATAM",   600),
  makeOffer("9",  "united",   "GRU", "MIA", "2026-07-20", "economy",  35000, 210, true,  "high",   "United",  570),
  makeOffer("10", "american", "GRU", "MIA", "2026-07-20", "economy",  30000, 250, true,  "high",   "AA",      570),
  makeOffer("11", "lifemiles","GRU", "MIA", "2026-07-20", "economy",  27500, 180, true,  "medium", "United",  570),
  makeOffer("12", "aeroplan", "GRU", "MIA", "2026-07-20", "economy",  25000, 195, false, "high",   "United",  570),
  makeOffer("13", "smiles",   "GRU", "MIA", "2026-07-20", "business", 80000, 890, true,  "low",    "GOL/AA",  570),
  makeOffer("14", "united",   "GRU", "MIA", "2026-07-20", "business", 70000, 450, true,  "medium", "United",  570),
  makeOffer("15", "lifemiles","GRU", "MIA", "2026-07-20", "business", 63000, 380, true,  "medium", "United",  570),

  // GRU → LIS (Europa)
  makeOffer("16", "smiles",   "GRU", "LIS", "2026-08-10", "economy",  52000, 420, true,  "medium", "TAP/GOL", 660),
  makeOffer("17", "latam",    "GRU", "LIS", "2026-08-10", "economy",  50000, 380, true,  "high",   "LATAM",   660),
  makeOffer("18", "united",   "GRU", "LIS", "2026-08-10", "economy",  44000, 230, false, "high",   "TAP",     660),
  makeOffer("19", "turkish",  "GRU", "LIS", "2026-08-10", "economy",  40000, 310, false, "medium", "THY",     810),
  makeOffer("20", "aeroplan", "GRU", "LIS", "2026-08-10", "economy",  45000, 210, false, "high",   "TAP",     660),
  makeOffer("21", "lifemiles","GRU", "LIS", "2026-08-10", "economy",  38000, 190, false, "medium", "United",  750),
  makeOffer("22", "emirates", "GRU", "LIS", "2026-08-10", "business", 72000, 580, false, "low",    "Emirates",900),
  makeOffer("23", "united",   "GRU", "LIS", "2026-08-10", "business", 68000, 390, false, "medium", "TAP",     660),
  makeOffer("24", "turkish",  "GRU", "LIS", "2026-08-10", "business", 55000, 420, false, "medium", "THY",     810),

  // GRU → GRU de volta (round-trip hints)
  makeOffer("25", "smiles",  "GIG", "GRU", "2026-07-22", "economy",  6500,  19, true,  "high",   "GOL",   70),
  makeOffer("26", "latam",   "GIG", "GRU", "2026-07-22", "economy",  7000,  25, true,  "high",   "LATAM", 65),
  makeOffer("27", "azul",    "GIG", "GRU", "2026-07-22", "economy",  7500,  20, false, "medium", "Azul",  95),

  // SSA → GRU
  makeOffer("28", "smiles",  "SSA", "GRU", "2026-07-18", "economy",  8000,  22, true,  "high",   "GOL",   135),
  makeOffer("29", "latam",   "SSA", "GRU", "2026-07-18", "economy",  8500,  28, true,  "high",   "LATAM", 130),
  makeOffer("30", "azul",    "SSA", "GRU", "2026-07-18", "economy",  9000,  25, false, "medium", "Azul",  150),
];
