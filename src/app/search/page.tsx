import { Suspense } from "react";
import type { Metadata } from "next";
import { ResultsShell } from "@/features/award-search/components/results-shell";

export const metadata: Metadata = { title: "Buscar milhas" };

export default function SearchPage() {
  return (
    <Suspense>
      <ResultsShell />
    </Suspense>
  );
}
