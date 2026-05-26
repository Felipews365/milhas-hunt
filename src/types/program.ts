export type ProgramCode =
  | "smiles"
  | "latam"
  | "azul"
  | "livelo"
  | "united"
  | "american"
  | "lifemiles"
  | "aeroplan"
  | "emirates"
  | "turkish";

export type Program = {
  code: ProgramCode;
  name: string;
  shortName: string;
  color: string;
  bgColor: string;
  textColor: string;
  country: "BR" | "US" | "CA" | "AE" | "TR" | "CO";
  bookingUrl: (origin: string, destination: string, date: string, cabin: string) => string;
};

export const PROGRAMS: Record<ProgramCode, Program> = {
  smiles: {
    code: "smiles",
    name: "Smiles (GOL)",
    shortName: "Smiles",
    color: "#FF6B00",
    bgColor: "#fff4ed",
    textColor: "#c2410c",
    country: "BR",
    bookingUrl: (o, d, date) =>
      `https://www.smiles.com.br/passagens#/results?originAirportCode=${o}&destinationAirportCode=${d}&departureDate=${date}&adults=1&tripType=1&cabin=Y&isFlexible=false`,
  },
  latam: {
    code: "latam",
    name: "LATAM Pass",
    shortName: "LATAM Pass",
    color: "#E31837",
    bgColor: "#fff1f2",
    textColor: "#be123c",
    country: "BR",
    bookingUrl: (o, d, date) =>
      `https://www.latamairlines.com/br/pt/oferta-voos?origin=${o}&destination=${d}&outbound=${date}&adt=1&inf=0&chd=0&cabin=Y&redemption=true&trip=OW`,
  },
  azul: {
    code: "azul",
    name: "TudoAzul",
    shortName: "TudoAzul",
    color: "#0052CC",
    bgColor: "#eff6ff",
    textColor: "#1d4ed8",
    country: "BR",
    bookingUrl: (o, d, date) =>
      `https://www.voeazul.com.br/br/pt/home/selecionar-voo?departing=${o}&arriving=${d}&departureDate=${date}&adults=1&children=0&infants=0&isReward=true`,
  },
  livelo: {
    code: "livelo",
    name: "Livelo",
    shortName: "Livelo",
    color: "#7C3AED",
    bgColor: "#f5f3ff",
    textColor: "#6d28d9",
    country: "BR",
    bookingUrl: (o, d, date) =>
      `https://www.livelo.com.br/viagens/passagens?origem=${o}&destino=${d}&dataIda=${date}&adultos=1&criancas=0&bebes=0&classe=Y`,
  },
  united: {
    code: "united",
    name: "United MileagePlus",
    shortName: "MileagePlus",
    color: "#002244",
    bgColor: "#f0f4ff",
    textColor: "#1e3a8a",
    country: "US",
    bookingUrl: (o, d, date) =>
      `https://www.united.com/en/us/fsr/choose-flights?f=${o}&t=${d}&d=${date}&tt=1&at=1&cbm=miles`,
  },
  american: {
    code: "american",
    name: "AAdvantage",
    shortName: "AAdvantage",
    color: "#C8102E",
    bgColor: "#fff1f2",
    textColor: "#991b1b",
    country: "US",
    bookingUrl: (o, d, date) =>
      `https://www.aa.com/booking/search?locale=en_US&pax=1&adult=1&type=OneWay&searchType=Award&cabin=&carriers=ALL&outboundConnection=wtp&origin=${o}&destination=${d}&departureDate=${date}`,
  },
  lifemiles: {
    code: "lifemiles",
    name: "LifeMiles",
    shortName: "LifeMiles",
    color: "#E41E29",
    bgColor: "#fff1f2",
    textColor: "#b91c1c",
    country: "CO",
    bookingUrl: (o, d, date) =>
      `https://www.lifemiles.com/flight/search?origin=${o}&destination=${d}&departureDate=${date}&passengers=1&cabin=ECONOMY&tripType=OW&isAward=true`,
  },
  aeroplan: {
    code: "aeroplan",
    name: "Aeroplan",
    shortName: "Aeroplan",
    color: "#F01428",
    bgColor: "#fff1f2",
    textColor: "#be123c",
    country: "CA",
    bookingUrl: (o, d, date) =>
      `https://www.aircanada.com/aeroplan/redeem/availability/outbound?org0=${o}&dest0=${d}&departureDate0=${date}&ADT=1&YTH=0&CHD=0&INF=0&INS=0&marketCode=INT`,
  },
  emirates: {
    code: "emirates",
    name: "Emirates Skywards",
    shortName: "Skywards",
    color: "#C69A4A",
    bgColor: "#fefce8",
    textColor: "#a16207",
    country: "AE",
    bookingUrl: (o, d, date) =>
      `https://www.emirates.com/br/portuguese/book/award-flight/?origin=${o}&destination=${d}&departureDate=${date}&adults=1`,
  },
  turkish: {
    code: "turkish",
    name: "Miles&Smiles",
    shortName: "Miles&Smiles",
    color: "#C8102E",
    bgColor: "#fff1f2",
    textColor: "#991b1b",
    country: "TR",
    bookingUrl: (o, d, _date) =>
      `https://www.turkishairlines.com/en-int/flights/?from=${o}&to=${d}&triptype=S&adult=1&child=0&infant=0&cabin=Y&redeemmiles=true`,
  },
};

export const BR_PROGRAMS: ProgramCode[] = ["smiles", "latam", "azul", "livelo"];
export const INTL_PROGRAMS: ProgramCode[] = ["united", "american", "lifemiles", "aeroplan", "emirates", "turkish"];
