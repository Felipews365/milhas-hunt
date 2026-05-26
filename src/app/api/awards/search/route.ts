import { NextResponse } from "next/server";
import { AwardSearchSchema } from "@/validators/award-search-schema";
import { searchAwards } from "@/services/award-search/search-awards";
import { ALL_PROGRAM_CODES } from "@/lib/constants";
import type { ProgramCode } from "@/types/program";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const raw = Object.fromEntries(searchParams);

  const programsRaw = searchParams.get("programs");
  const programs = programsRaw
    ? (programsRaw.split(",").filter((p) => ALL_PROGRAM_CODES.includes(p as ProgramCode)) as ProgramCode[])
    : [...ALL_PROGRAM_CODES];

  const parsed = AwardSearchSchema.safeParse({ ...raw, programs });
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Parâmetros inválidos", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const result = await searchAwards({ ...parsed.data, programs });
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro interno";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
