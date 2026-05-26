import type { AwardSearchParams, AwardSearchResult } from "@/types/award";
import { generateEstimates } from "@/lib/award-estimates";
import { ALL_PROGRAM_CODES } from "@/lib/constants";

export async function searchAwards(params: AwardSearchParams): Promise<AwardSearchResult> {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 600));

  const programs = params.programs.length > 0 ? params.programs : [...ALL_PROGRAM_CODES];

  const offers = generateEstimates(
    params.origin,
    params.destination,
    params.departDate,
    params.cabin,
    programs,
  );

  return {
    offers,
    searchedAt: new Date().toISOString(),
    params,
  };
}
