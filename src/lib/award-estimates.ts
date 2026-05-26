import type { ProgramCode } from "@/types/program";
import type { CabinClass, AwardOffer } from "@/types/award";
import { PROGRAMS } from "@/types/program";

const BR_AIRPORTS = new Set([
  "GRU","GIG","CGH","SDU","BSB","SSA","REC","FOR","POA","CWB","BEL","MAO",
  "FLN","VCP","GYN","NAT","MCZ","AJU","THE","CGB","SLZ","STM","PVH","CZS",
  "PMW","JPA","CGR","IMP","XIG","PNZ","MCP","BVB","TFF","OPS","PPB","JDO",
  "UDI","BPS","IOS","VAG","ITB","MOC","PLU","CNF","VIX","PMG",
]);

const LATAM_AIRPORTS = new Set([
  "BUE","EZE","AEP","SCL","LIM","BOG","MDE","CTG","UIO","GYE","MVD","ASU",
  "MIA","JFK","LAX","ORD","GRU","GIG","LIS","MAD","FCO","CDG","LHR","AMS",
]);

type RouteType = "domestic" | "regional" | "transatlantic" | "northamerica" | "asia_me";

function classifyRoute(origin: string, destination: string): RouteType {
  const o = origin.toUpperCase();
  const d = destination.toUpperCase();

  if (BR_AIRPORTS.has(o) && BR_AIRPORTS.has(d)) return "domestic";

  const NA = new Set(["MIA","JFK","LAX","ORD","EWR","BOS","SFO","DFW","ATL","IAD","YYZ","YUL","MEX","CUN","GDL"]);
  const EU = new Set(["LIS","MAD","BCN","CDG","LHR","AMS","FRA","FCO","MXP","ZRH","VIE","BRU","CPH","ARN","HEL","OSL","WAW"]);
  const ASIA_ME = new Set(["DXB","AUH","DOH","IST","SIN","BKK","HKG","NRT","ICN","PEK","PVG","SYD","MEL","JNB","NBO","CAI"]);
  const REGIONAL = new Set(["BUE","EZE","SCL","LIM","BOG","MDE","CTG","UIO","GYE","MVD","ASU","CCS","GIG","GRU","SDU","CGH"]);

  if (NA.has(d) || NA.has(o)) return "northamerica";
  if (EU.has(d) || EU.has(o)) return "transatlantic";
  if (ASIA_ME.has(d) || ASIA_ME.has(o)) return "asia_me";
  if (REGIONAL.has(d) || REGIONAL.has(o)) return "regional";

  return "transatlantic"; // fallback for unknown
}

// Award chart estimates per program per route type per cabin
// Values represent [min, max] miles range — we pick a realistic midpoint per program
type ChartEntry = {
  economy: [number, number];
  premium_economy: [number, number];
  business: [number, number];
  first: [number, number];
};

const AWARD_CHART: Record<ProgramCode, Record<RouteType, ChartEntry>> = {
  smiles: {
    domestic:      { economy: [8000,15000],   premium_economy: [12000,20000], business: [18000,30000],  first: [30000,50000] },
    regional:      { economy: [16000,28000],  premium_economy: [20000,35000], business: [35000,60000],  first: [60000,90000] },
    northamerica:  { economy: [25000,45000],  premium_economy: [35000,55000], business: [55000,90000],  first: [90000,140000] },
    transatlantic: { economy: [28000,50000],  premium_economy: [40000,60000], business: [60000,100000], first: [100000,160000] },
    asia_me:       { economy: [40000,70000],  premium_economy: [55000,85000], business: [80000,140000], first: [150000,220000] },
  },
  latam: {
    domestic:      { economy: [7000,13000],   premium_economy: [11000,18000], business: [16000,28000],  first: [28000,45000] },
    regional:      { economy: [15000,25000],  premium_economy: [18000,32000], business: [32000,55000],  first: [55000,85000] },
    northamerica:  { economy: [22000,40000],  premium_economy: [30000,50000], business: [50000,85000],  first: [85000,130000] },
    transatlantic: { economy: [25000,45000],  premium_economy: [38000,58000], business: [58000,95000],  first: [95000,150000] },
    asia_me:       { economy: [38000,65000],  premium_economy: [52000,80000], business: [75000,130000], first: [140000,210000] },
  },
  azul: {
    domestic:      { economy: [9000,16000],   premium_economy: [13000,22000], business: [20000,35000],  first: [35000,55000] },
    regional:      { economy: [17000,30000],  premium_economy: [22000,38000], business: [38000,65000],  first: [65000,95000] },
    northamerica:  { economy: [27000,48000],  premium_economy: [37000,58000], business: [58000,95000],  first: [95000,145000] },
    transatlantic: { economy: [30000,52000],  premium_economy: [42000,65000], business: [65000,105000], first: [105000,165000] },
    asia_me:       { economy: [42000,75000],  premium_economy: [58000,90000], business: [85000,145000], first: [155000,225000] },
  },
  livelo: {
    domestic:      { economy: [10000,18000],  premium_economy: [14000,24000], business: [22000,38000],  first: [38000,60000] },
    regional:      { economy: [18000,32000],  premium_economy: [24000,40000], business: [42000,70000],  first: [70000,100000] },
    northamerica:  { economy: [30000,52000],  premium_economy: [40000,62000], business: [62000,100000], first: [100000,155000] },
    transatlantic: { economy: [33000,55000],  premium_economy: [45000,70000], business: [70000,110000], first: [110000,170000] },
    asia_me:       { economy: [45000,80000],  premium_economy: [62000,95000], business: [90000,150000], first: [160000,230000] },
  },
  united: {
    domestic:      { economy: [8000,12500],   premium_economy: [12000,18000], business: [20000,35000],  first: [35000,55000] },
    regional:      { economy: [15000,22000],  premium_economy: [18000,28000], business: [30000,50000],  first: [55000,80000] },
    northamerica:  { economy: [18000,30000],  premium_economy: [25000,40000], business: [42000,75000],  first: [75000,120000] },
    transatlantic: { economy: [30000,60000],  premium_economy: [45000,70000], business: [70000,130000], first: [110000,180000] },
    asia_me:       { economy: [35000,80000],  premium_economy: [55000,90000], business: [90000,160000], first: [150000,240000] },
  },
  american: {
    domestic:      { economy: [7500,15000],   premium_economy: [12000,20000], business: [20000,35000],  first: [30000,50000] },
    regional:      { economy: [15000,25000],  premium_economy: [20000,32000], business: [35000,55000],  first: [55000,85000] },
    northamerica:  { economy: [20000,35000],  premium_economy: [28000,45000], business: [50000,85000],  first: [85000,130000] },
    transatlantic: { economy: [22500,55000],  premium_economy: [40000,65000], business: [57500,115000], first: [115000,180000] },
    asia_me:       { economy: [35000,70000],  premium_economy: [50000,85000], business: [80000,150000], first: [145000,230000] },
  },
  lifemiles: {
    domestic:      { economy: [8000,14000],   premium_economy: [11000,19000], business: [18000,32000],  first: [32000,52000] },
    regional:      { economy: [14000,24000],  premium_economy: [18000,30000], business: [32000,52000],  first: [52000,80000] },
    northamerica:  { economy: [20000,36000],  premium_economy: [28000,46000], business: [48000,80000],  first: [80000,125000] },
    transatlantic: { economy: [25000,45000],  premium_economy: [38000,58000], business: [60000,100000], first: [100000,155000] },
    asia_me:       { economy: [38000,68000],  premium_economy: [52000,82000], business: [82000,140000], first: [148000,220000] },
  },
  aeroplan: {
    domestic:      { economy: [6000,12500],   premium_economy: [10000,17500], business: [20000,32500],  first: [32500,52500] },
    regional:      { economy: [12500,20000],  premium_economy: [17500,27500], business: [27500,45000],  first: [45000,70000] },
    northamerica:  { economy: [15000,25000],  premium_economy: [22500,37500], business: [35000,65000],  first: [65000,110000] },
    transatlantic: { economy: [25000,55000],  premium_economy: [40000,65000], business: [55000,105000], first: [100000,165000] },
    asia_me:       { economy: [35000,75000],  premium_economy: [52500,87500], business: [87500,155000], first: [145000,235000] },
  },
  emirates: {
    domestic:      { economy: [10000,16000],  premium_economy: [14000,22000], business: [24000,40000],  first: [40000,65000] },
    regional:      { economy: [20000,35000],  premium_economy: [28000,45000], business: [45000,75000],  first: [75000,110000] },
    northamerica:  { economy: [35000,60000],  premium_economy: [48000,75000], business: [75000,125000], first: [125000,190000] },
    transatlantic: { economy: [32000,55000],  premium_economy: [45000,70000], business: [70000,115000], first: [115000,180000] },
    asia_me:       { economy: [30000,55000],  premium_economy: [42000,68000], business: [68000,115000], first: [115000,180000] },
  },
  turkish: {
    domestic:      { economy: [8000,14000],   premium_economy: [12000,19000], business: [19000,33000],  first: [33000,53000] },
    regional:      { economy: [16000,28000],  premium_economy: [22000,36000], business: [36000,60000],  first: [60000,90000] },
    northamerica:  { economy: [28000,50000],  premium_economy: [38000,60000], business: [60000,100000], first: [100000,155000] },
    transatlantic: { economy: [25000,45000],  premium_economy: [36000,57000], business: [57000,95000],  first: [95000,150000] },
    asia_me:       { economy: [25000,45000],  premium_economy: [36000,57000], business: [57000,95000],  first: [95000,155000] },
  },
};

// Typical taxes by route type in BRL (approximate)
const TAXES_BRL: Record<RouteType, Record<CabinClass, number>> = {
  domestic:      { economy: 85,   premium_economy: 95,   business: 120,  first: 150 },
  regional:      { economy: 250,  premium_economy: 300,  business: 450,  first: 600 },
  northamerica:  { economy: 850,  premium_economy: 950,  business: 1200, first: 1600 },
  transatlantic: { economy: 1200, premium_economy: 1400, business: 1800, first: 2200 },
  asia_me:       { economy: 1500, premium_economy: 1800, business: 2400, first: 3200 },
};

const ALL_PROGRAM_CODES: ProgramCode[] = [
  "smiles","latam","azul","livelo","united","american","lifemiles","aeroplan","emirates","turkish"
];

let _seed = 0;
function deterministicVariation(programCode: string, origin: string, destination: string, base: number): number {
  // Small deterministic variation so each program shows a different number
  const hash = [...(programCode + origin + destination)].reduce((a, c) => a + c.charCodeAt(0), 0);
  const jitter = ((hash % 11) - 5) / 100; // ±5%
  return Math.round(base * (1 + jitter) / 500) * 500;
}

export function generateEstimates(
  origin: string,
  destination: string,
  departDate: string,
  cabin: CabinClass,
  programs: readonly ProgramCode[] = ALL_PROGRAM_CODES
): AwardOffer[] {
  const routeType = classifyRoute(origin, destination);
  const taxes = TAXES_BRL[routeType][cabin];

  return programs
    .map((code): AwardOffer | null => {
      const chart = AWARD_CHART[code]?.[routeType]?.[cabin];
      if (!chart) return null;

      const [min, max] = chart;
      const base = Math.round((min + max) / 2 / 500) * 500;
      const miles = deterministicVariation(code, origin, destination, base);
      const p = PROGRAMS[code];

      return {
        id: `est-${code}-${origin}-${destination}-${cabin}`,
        program: code,
        origin,
        destination,
        departureDate: departDate,
        cabin,
        miles,
        taxes,
        currency: "BRL",
        isDirect: routeType === "domestic",
        availability: "medium",
        airline: "",
        flightNumber: null,
        durationMinutes: null,
        bookingUrl: p.bookingUrl(origin, destination, departDate, cabin),
      };
    })
    .filter((o): o is AwardOffer => o !== null)
    .sort((a, b) => a.miles - b.miles);
}
