export type Airport = {
  iata: string;
  name: string;
  city: string;
  country: string;
};

export const AIRPORTS: Airport[] = [
  // Brasil
  { iata: "GRU", name: "Guarulhos", city: "São Paulo", country: "BR" },
  { iata: "CGH", name: "Congonhas", city: "São Paulo", country: "BR" },
  { iata: "VCP", name: "Viracopos", city: "Campinas", country: "BR" },
  { iata: "GIG", name: "Galeão", city: "Rio de Janeiro", country: "BR" },
  { iata: "SDU", name: "Santos Dumont", city: "Rio de Janeiro", country: "BR" },
  { iata: "BSB", name: "Presidente JK", city: "Brasília", country: "BR" },
  { iata: "SSA", name: "Dep. L. E. Magalhães", city: "Salvador", country: "BR" },
  { iata: "REC", name: "Guararapes", city: "Recife", country: "BR" },
  { iata: "FOR", name: "Pinto Martins", city: "Fortaleza", country: "BR" },
  { iata: "POA", name: "Salgado Filho", city: "Porto Alegre", country: "BR" },
  { iata: "CWB", name: "Afonso Pena", city: "Curitiba", country: "BR" },
  { iata: "BEL", name: "Val de Cans", city: "Belém", country: "BR" },
  { iata: "MAO", name: "Eduardo Gomes", city: "Manaus", country: "BR" },
  { iata: "FLN", name: "Hercílio Luz", city: "Florianópolis", country: "BR" },
  { iata: "NAT", name: "Governador Aluízio", city: "Natal", country: "BR" },
  { iata: "MCZ", name: "Zumbi dos Palmares", city: "Maceió", country: "BR" },
  { iata: "AJU", name: "Santa Maria", city: "Aracaju", country: "BR" },
  { iata: "JPA", name: "Castro Pinto", city: "João Pessoa", country: "BR" },
  { iata: "THE", name: "Senador Petrônio Portela", city: "Teresina", country: "BR" },
  { iata: "SLZ", name: "Marechal Cunha Machado", city: "São Luís", country: "BR" },
  { iata: "CGB", name: "Marechal Rondon", city: "Cuiabá", country: "BR" },
  { iata: "CGR", name: "Campo Grande", city: "Campo Grande", country: "BR" },
  { iata: "GYN", name: "Santa Genoveva", city: "Goiânia", country: "BR" },
  { iata: "PMW", name: "Brigadeiro Lysias Rodrigues", city: "Palmas", country: "BR" },
  { iata: "PVH", name: "Governador Jorge Teixeira", city: "Porto Velho", country: "BR" },
  { iata: "BVB", name: "Atlas Brasil Cantanhede", city: "Boa Vista", country: "BR" },
  { iata: "STM", name: "Maestro Wilson Fonseca", city: "Santarém", country: "BR" },
  { iata: "UDI", name: "Uberlândia", city: "Uberlândia", country: "BR" },
  { iata: "VIX", name: "Eurico Salles", city: "Vitória", country: "BR" },
  { iata: "CNF", name: "Tancredo Neves (Confins)", city: "Belo Horizonte", country: "BR" },
  { iata: "PLU", name: "Pampulha", city: "Belo Horizonte", country: "BR" },
  { iata: "IOS", name: "Jorge Amado", city: "Ilhéus", country: "BR" },
  { iata: "BPS", name: "Porto Seguro", city: "Porto Seguro", country: "BR" },
  { iata: "PMG", name: "Ponta Porã", city: "Ponta Porã", country: "BR" },
  // América do Sul
  { iata: "EZE", name: "Ministro Pistarini", city: "Buenos Aires", country: "AR" },
  { iata: "AEP", name: "Aeroparque Jorge Newbery", city: "Buenos Aires", country: "AR" },
  { iata: "SCL", name: "Arturo Merino Benítez", city: "Santiago", country: "CL" },
  { iata: "LIM", name: "Jorge Chávez", city: "Lima", country: "PE" },
  { iata: "BOG", name: "El Dorado", city: "Bogotá", country: "CO" },
  { iata: "MVD", name: "Carrasco", city: "Montevidéu", country: "UY" },
  { iata: "ASU", name: "Silvio Pettirossi", city: "Assunção", country: "PY" },
  { iata: "UIO", name: "Mariscal Sucre", city: "Quito", country: "EC" },
  { iata: "GYE", name: "José Joaquín de Olmedo", city: "Guayaquil", country: "EC" },
  { iata: "CCS", name: "Simón Bolívar", city: "Caracas", country: "VE" },
  { iata: "MDE", name: "José María Córdova", city: "Medellín", country: "CO" },
  // América do Norte
  { iata: "MIA", name: "Miami International", city: "Miami", country: "US" },
  { iata: "JFK", name: "John F. Kennedy", city: "Nova York", country: "US" },
  { iata: "EWR", name: "Newark Liberty", city: "Nova York", country: "US" },
  { iata: "LAX", name: "Los Angeles International", city: "Los Angeles", country: "US" },
  { iata: "ORD", name: "O'Hare International", city: "Chicago", country: "US" },
  { iata: "ATL", name: "Hartsfield-Jackson", city: "Atlanta", country: "US" },
  { iata: "IAD", name: "Dulles International", city: "Washington", country: "US" },
  { iata: "DFW", name: "Dallas/Fort Worth", city: "Dallas", country: "US" },
  { iata: "IAH", name: "George Bush Intercontinental", city: "Houston", country: "US" },
  { iata: "BOS", name: "Logan International", city: "Boston", country: "US" },
  { iata: "SFO", name: "San Francisco International", city: "São Francisco", country: "US" },
  { iata: "LAS", name: "Harry Reid International", city: "Las Vegas", country: "US" },
  { iata: "MCO", name: "Orlando International", city: "Orlando", country: "US" },
  { iata: "YYZ", name: "Pearson International", city: "Toronto", country: "CA" },
  { iata: "YUL", name: "Pierre Elliott Trudeau", city: "Montreal", country: "CA" },
  { iata: "MEX", name: "Benito Juárez", city: "Cidade do México", country: "MX" },
  { iata: "CUN", name: "Cancún International", city: "Cancún", country: "MX" },
  // Europa
  { iata: "LIS", name: "Humberto Delgado", city: "Lisboa", country: "PT" },
  { iata: "MAD", name: "Adolfo Suárez Madrid-Barajas", city: "Madri", country: "ES" },
  { iata: "BCN", name: "Josep Tarradellas Barcelona-El Prat", city: "Barcelona", country: "ES" },
  { iata: "CDG", name: "Charles de Gaulle", city: "Paris", country: "FR" },
  { iata: "LHR", name: "Heathrow", city: "Londres", country: "GB" },
  { iata: "LGW", name: "Gatwick", city: "Londres", country: "GB" },
  { iata: "AMS", name: "Amsterdam Schiphol", city: "Amsterdã", country: "NL" },
  { iata: "FRA", name: "Frankfurt am Main", city: "Frankfurt", country: "DE" },
  { iata: "MUC", name: "Franz Josef Strauss", city: "Munique", country: "DE" },
  { iata: "FCO", name: "Leonardo da Vinci (Fiumicino)", city: "Roma", country: "IT" },
  { iata: "MXP", name: "Malpensa", city: "Milão", country: "IT" },
  { iata: "ZRH", name: "Zurique", city: "Zurique", country: "CH" },
  { iata: "VIE", name: "Vienna International", city: "Viena", country: "AT" },
  { iata: "BRU", name: "Brussels Airport", city: "Bruxelas", country: "BE" },
  { iata: "CPH", name: "Copenhagen Kastrup", city: "Copenhague", country: "DK" },
  { iata: "ARN", name: "Stockholm Arlanda", city: "Estocolmo", country: "SE" },
  { iata: "HEL", name: "Helsinki-Vantaa", city: "Helsinque", country: "FI" },
  { iata: "OSL", name: "Oslo Gardermoen", city: "Oslo", country: "NO" },
  { iata: "WAW", name: "Chopin Airport", city: "Varsóvia", country: "PL" },
  { iata: "ATH", name: "Eleftherios Venizelos", city: "Atenas", country: "GR" },
  // Oriente Médio / África
  { iata: "DXB", name: "Dubai International", city: "Dubai", country: "AE" },
  { iata: "AUH", name: "Abu Dhabi International", city: "Abu Dhabi", country: "AE" },
  { iata: "DOH", name: "Hamad International", city: "Doha", country: "QA" },
  { iata: "IST", name: "Istanbul Airport", city: "Istambul", country: "TR" },
  { iata: "SAW", name: "Sabiha Gökçen", city: "Istambul", country: "TR" },
  { iata: "JNB", name: "O.R. Tambo International", city: "Joanesburgo", country: "ZA" },
  { iata: "CAI", name: "Cairo International", city: "Cairo", country: "EG" },
  { iata: "NBO", name: "Jomo Kenyatta", city: "Nairóbi", country: "KE" },
  // Ásia / Oceania
  { iata: "SIN", name: "Changi", city: "Singapura", country: "SG" },
  { iata: "HKG", name: "Hong Kong International", city: "Hong Kong", country: "HK" },
  { iata: "NRT", name: "Narita International", city: "Tóquio", country: "JP" },
  { iata: "HND", name: "Haneda", city: "Tóquio", country: "JP" },
  { iata: "ICN", name: "Incheon International", city: "Seul", country: "KR" },
  { iata: "PEK", name: "Capital International", city: "Pequim", country: "CN" },
  { iata: "PVG", name: "Pudong International", city: "Xangai", country: "CN" },
  { iata: "BKK", name: "Suvarnabhumi", city: "Bangkok", country: "TH" },
  { iata: "KUL", name: "Kuala Lumpur International", city: "Kuala Lumpur", country: "MY" },
  { iata: "SYD", name: "Kingsford Smith", city: "Sydney", country: "AU" },
  { iata: "MEL", name: "Tullamarine", city: "Melbourne", country: "AU" },
  { iata: "DEL", name: "Indira Gandhi International", city: "Nova Délhi", country: "IN" },
  { iata: "BOM", name: "Chhatrapati Shivaji Maharaj", city: "Mumbai", country: "IN" },
];

const FLAG: Record<string, string> = {
  BR: "🇧🇷", US: "🇺🇸", AR: "🇦🇷", CL: "🇨🇱", PE: "🇵🇪", CO: "🇨🇴",
  UY: "🇺🇾", PY: "🇵🇾", EC: "🇪🇨", VE: "🇻🇪", CA: "🇨🇦", MX: "🇲🇽",
  PT: "🇵🇹", ES: "🇪🇸", FR: "🇫🇷", GB: "🇬🇧", NL: "🇳🇱", DE: "🇩🇪",
  IT: "🇮🇹", CH: "🇨🇭", AT: "🇦🇹", BE: "🇧🇪", DK: "🇩🇰", SE: "🇸🇪",
  FI: "🇫🇮", NO: "🇳🇴", PL: "🇵🇱", GR: "🇬🇷", AE: "🇦🇪", QA: "🇶🇦",
  TR: "🇹🇷", ZA: "🇿🇦", EG: "🇪🇬", KE: "🇰🇪", SG: "🇸🇬", HK: "🇭🇰",
  JP: "🇯🇵", KR: "🇰🇷", CN: "🇨🇳", TH: "🇹🇭", MY: "🇲🇾", AU: "🇦🇺",
  IN: "🇮🇳",
};

export function getFlag(country: string): string {
  return FLAG[country] ?? "🌍";
}

export function searchAirports(query: string, limit = 8): Airport[] {
  const q = query.toLowerCase().trim();
  if (!q) return AIRPORTS.slice(0, limit);

  return AIRPORTS.filter(
    (a) =>
      a.iata.toLowerCase().includes(q) ||
      a.city.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q)
  ).slice(0, limit);
}
