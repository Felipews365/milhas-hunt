"use client";

import { useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Plane, ArrowRight, RotateCcw, ExternalLink, Info } from "lucide-react";
import { useAwardSearch } from "../hooks/use-award-search";
import { parseAwardSearchParams } from "../utils/parse-url-params";
import { AwardResultCard } from "./award-result-card";
import { SearchForm } from "./search-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CABIN_LABELS } from "@/types/award";
import { PROGRAMS } from "@/types/program";
import { formatDate } from "@/lib/formatters";

export function ResultsShell() {
  const searchParams = useSearchParams();
  const params = useMemo(() => parseAwardSearchParams(searchParams), [searchParams]);

  const { data, isLoading, isFetching, isError } = useAwardSearch(params);

  const offers = data?.offers ?? [];
  const isRefreshing = isFetching && !isLoading;

  const openAllPrograms = useCallback(() => {
    if (!params) return;
    const { origin, destination, departDate, cabin } = params;
    const programs = offers.length > 0
      ? offers.map((o) => o.program)
      : (Object.keys(PROGRAMS) as (keyof typeof PROGRAMS)[]);

    for (const code of programs) {
      const url = PROGRAMS[code].bookingUrl(origin, destination, departDate, cabin);
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, [params, offers]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-blue-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
              <Plane className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">MilhasHunt</span>
          </Link>

          {params && (
            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 font-mono text-sm font-bold text-white">
                <span>{params.origin}</span>
                <ArrowRight className="h-3.5 w-3.5 text-white/50" />
                <span>{params.destination}</span>
              </div>
              <Badge variant="secondary" className="text-xs">{CABIN_LABELS[params.cabin]}</Badge>
              <span className="text-sm text-blue-300">{formatDate(params.departDate)}</span>
            </div>
          )}
        </div>
      </header>

      {/* Search bar compact */}
      <div className="border-b border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto max-w-6xl">
          {params ? (
            <SearchForm
              initialOrigin={params.origin}
              initialDestination={params.destination}
              initialDate={params.departDate}
              initialCabin={params.cabin}
              compact
            />
          ) : (
            <SearchForm compact />
          )}
        </div>
      </div>

      {/* Main content */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {/* No params */}
        {!params && (
          <div className="flex flex-col items-center gap-4 py-24 text-slate-400">
            <Plane className="h-12 w-12" />
            <p className="text-lg font-medium">Faça uma busca para ver os resultados</p>
          </div>
        )}

        {/* Loading */}
        {params && isLoading && (
          <>
            <div className="mb-6">
              <Skeleton className="h-7 w-64" />
              <Skeleton className="mt-2 h-4 w-40" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-52" />
              ))}
            </div>
          </>
        )}

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center gap-4 py-24 text-red-500">
            <p className="text-lg font-medium">Erro ao buscar. Tente novamente.</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RotateCcw className="mr-2 h-4 w-4" /> Tentar novamente
            </Button>
          </div>
        )}

        {/* Results */}
        {params && !isLoading && !isError && (
          <>
            {/* Summary */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">
                  {params.origin} → {params.destination}
                </h1>
                <p className="mt-0.5 text-sm text-slate-500">
                  {formatDate(params.departDate)} · {CABIN_LABELS[params.cabin]} ·{" "}
                  {isRefreshing ? (
                    <span className="text-blue-600 animate-pulse">Atualizando...</span>
                  ) : (
                    <span>{offers.length} {offers.length === 1 ? "programa" : "programas"}</span>
                  )}
                </p>
              </div>

              {/* "Open all" button */}
              {offers.length > 0 && (
                <Button
                  onClick={openAllPrograms}
                  className="gap-2 bg-blue-700 hover:bg-blue-800 shrink-0"
                >
                  <ExternalLink className="h-4 w-4" />
                  Abrir em todos os programas
                </Button>
              )}
            </div>

            {/* Estimate notice */}
            {offers.length > 0 && (
              <div className="mb-6 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <span>
                  <strong>Valores estimados</strong> com base nas tabelas de cada programa.
                  Clique em qualquer card ou em <strong>Abrir em todos</strong> para ver a disponibilidade real no site do programa.
                </span>
              </div>
            )}

            {/* Best value highlight */}
            {offers.length > 0 && (
              <div className="mb-6 hidden sm:block">
                <p className="text-xs text-slate-400 mb-1">A partir de</p>
                <p className="text-3xl font-black text-blue-700 leading-none">
                  {new Intl.NumberFormat("pt-BR").format(offers[0].miles)}
                  <span className="text-base font-semibold text-slate-500 ml-1">milhas</span>
                </p>
                <p className="text-xs text-slate-500 mt-0.5">via {PROGRAMS[offers[0].program].name}</p>
              </div>
            )}

            {/* Empty */}
            {offers.length === 0 && (
              <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-white py-24 text-slate-400">
                <Plane className="h-10 w-10" />
                <p className="text-lg font-medium">Nenhum resultado para essa rota</p>
                <p className="text-sm">Tente datas diferentes ou outra cabine</p>
                <Button variant="outline" asChild>
                  <Link href="/">Voltar ao início</Link>
                </Button>
              </div>
            )}

            {/* Cards grid */}
            {offers.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {offers.map((offer, index) => (
                  <AwardResultCard
                    key={offer.id}
                    offer={offer}
                    rank={index + 1}
                    isBestValue={index === 0}
                  />
                ))}
              </div>
            )}

            {/* Disclaimer */}
            {offers.length > 0 && (
              <p className="mt-8 text-center text-xs text-slate-400">
                Os valores são estimativas baseadas nas tabelas de premiação de cada programa. Confirme a disponibilidade e o custo exato no site de cada programa antes de resgatar.
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
