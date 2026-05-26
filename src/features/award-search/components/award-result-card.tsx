"use client";

import { useState } from "react";
import { ExternalLink, Zap, ArrowRight, Star, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROGRAMS } from "@/types/program";
import { formatMiles, formatCurrency, formatDate } from "@/lib/formatters";
import type { AwardOffer } from "@/types/award";
import { CABIN_LABELS } from "@/types/award";

type Props = {
  offer: AwardOffer;
  isBestValue?: boolean;
  rank: number;
};

export function AwardResultCard({ offer, isBestValue, rank }: Props) {
  const program = PROGRAMS[offer.program];
  const [copied, setCopied] = useState(false);

  function handleOpen() {
    const text = `${offer.origin} → ${offer.destination} · ${formatDate(offer.departureDate)} · ${CABIN_LABELS[offer.cabin]}`;
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
    window.open(offer.bookingUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      className={`relative rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md ${
        isBestValue ? "border-amber-400 ring-2 ring-amber-200" : "border-slate-200"
      }`}
    >
      {isBestValue && (
        <div className="absolute -top-3 left-4 flex items-center gap-1 rounded-full bg-amber-500 px-3 py-0.5 text-xs font-bold text-white shadow">
          <Star className="h-3 w-3" />
          Melhor estimativa
        </div>
      )}

      <div className="p-5">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white shadow-sm"
              style={{ backgroundColor: program.color }}
            >
              {rank}
            </div>
            <div>
              <p className="font-semibold text-slate-900">{program.name}</p>
              <p className="text-xs text-slate-400">
                {offer.isDirect ? (
                  <span className="flex items-center gap-1 text-green-600">
                    <Zap className="h-3 w-3" /> Voo direto
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <ArrowRight className="h-3 w-3" /> Pode ter escalas
                  </span>
                )}
              </p>
            </div>
          </div>
          <Badge variant={offer.cabin === "business" || offer.cabin === "first" ? "default" : "secondary"}>
            {CABIN_LABELS[offer.cabin]}
          </Badge>
        </div>

        {/* Miles */}
        <div className="mb-1">
          <p className="text-3xl font-black text-slate-900">
            {formatMiles(offer.miles)}
            <span className="ml-1 text-base font-semibold text-slate-500">milhas</span>
          </p>
          <p className="mt-0.5 text-sm text-slate-500">
            + {formatCurrency(offer.taxes, offer.currency)} em taxas
          </p>
        </div>

        <p className="mb-4 text-xs text-amber-600 font-medium">
          Estimativa — clique para ver preço real
        </p>

        {/* CTA */}
        <Button
          size="sm"
          className="w-full gap-2 transition-all"
          style={{ backgroundColor: copied ? "#16a34a" : program.color }}
          onClick={handleOpen}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Busca copiada! Cole no site
            </>
          ) : (
            <>
              Buscar no {program.shortName}
              <ExternalLink className="h-3.5 w-3.5" />
            </>
          )}
        </Button>

        {/* Clipboard hint */}
        {copied && (
          <p className="mt-2 text-center text-xs text-green-700 font-medium">
            Cole no campo de busca: <span className="font-bold">{offer.origin} → {offer.destination}</span>
          </p>
        )}
      </div>
    </div>
  );
}
