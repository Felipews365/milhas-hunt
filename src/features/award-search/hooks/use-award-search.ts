import { useQuery } from "@tanstack/react-query";
import type { AwardSearchParams, AwardSearchResult } from "@/types/award";

function buildUrl(params: AwardSearchParams): string {
  const sp = new URLSearchParams({
    origin: params.origin,
    destination: params.destination,
    departDate: params.departDate,
    cabin: params.cabin,
    adults: String(params.adults),
  });
  if (params.returnDate) sp.set("returnDate", params.returnDate);
  if (params.programs.length > 0) sp.set("programs", params.programs.join(","));
  return `/api/awards/search?${sp.toString()}`;
}

async function fetchAwards(url: string): Promise<AwardSearchResult> {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar awards");
  return res.json() as Promise<AwardSearchResult>;
}

export function useAwardSearch(params: AwardSearchParams | null) {
  return useQuery({
    queryKey: ["award-search", params] as const,
    queryFn: () => fetchAwards(buildUrl(params!)),
    enabled: params !== null,
    staleTime: 60_000,
    placeholderData: (prev) => prev,
  });
}
