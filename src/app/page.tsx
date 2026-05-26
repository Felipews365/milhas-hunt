import Link from "next/link";
import { Plane, TrendingDown, Zap, Globe, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchForm } from "@/features/award-search/components/search-form";
import { PROGRAMS, BR_PROGRAMS, INTL_PROGRAMS } from "@/types/program";
import { POPULAR_ROUTES } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-blue-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500">
              <Plane className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">MilhasHunt</span>
          </Link>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild className="text-blue-200 hover:text-white hover:bg-white/10">
              <Link href="/search">Buscar</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 px-4 py-20 text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-4 py-1.5 text-sm font-medium text-amber-300 ring-1 ring-amber-500/30">
            <Star className="h-3.5 w-3.5" />
            Compare {Object.keys(PROGRAMS).length} programas de uma vez
          </div>

          <h1 className="mb-5 text-4xl font-black tracking-tight sm:text-6xl">
            Voe mais longe{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              gastando menos milhas
            </span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-blue-200">
            Compare Smiles, LATAM Pass, TudoAzul, Livelo e programas internacionais
            em uma única busca. Descubra qual programa tem o melhor custo-benefício.
          </p>

          <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-2xl shadow-blue-950/50">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Popular routes */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-6 text-xl font-bold text-slate-900">Rotas populares</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_ROUTES.map((route) => {
              const d = new Date();
              d.setDate(d.getDate() + 30);
              const date = d.toISOString().split("T")[0];
              const href = `/search?origin=${route.origin}&destination=${route.destination}&departDate=${date}&cabin=economy&adults=1`;
              return (
                <Link key={`${route.origin}-${route.destination}`} href={href}
                  className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition-all hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-slate-900">
                      <span className="rounded bg-slate-200 px-1.5 py-0.5 text-xs">{route.origin}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                      <span className="rounded bg-slate-200 px-1.5 py-0.5 text-xs">{route.destination}</span>
                    </div>
                    <span className="text-sm text-slate-600">{route.label}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-500" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-2 text-xl font-bold text-slate-900">Programas suportados</h2>
          <p className="mb-6 text-sm text-slate-500">Brasileiros e internacionais — tudo em uma busca</p>
          <div className="mb-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Brasileiros</p>
            <div className="flex flex-wrap gap-3">
              {BR_PROGRAMS.map((code) => {
                const p = PROGRAMS[code];
                return (
                  <div key={code} className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm"
                    style={{ backgroundColor: p.bgColor, color: p.textColor }}>
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">Internacionais</p>
            <div className="flex flex-wrap gap-3">
              {INTL_PROGRAMS.map((code) => {
                const p = PROGRAMS[code];
                return (
                  <div key={code} className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm"
                    style={{ backgroundColor: p.bgColor, color: p.textColor }}>
                    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    {p.name}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: TrendingDown, title: "Menor custo em milhas", desc: "Ordenamos por custo real — milhas + taxas — para você ver o melhor deal de verdade." },
              { icon: Zap, title: "Resultados diretos primeiro", desc: "Destacamos voos diretos sem escalas para economizar seu tempo de viagem." },
              { icon: Globe, title: "10 programas de uma vez", desc: "Compare Smiles, LATAM, Azul, Livelo e 6 programas internacionais simultaneamente." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                  <Icon className="h-5 w-5 text-blue-700" />
                </div>
                <h3 className="mb-1.5 font-bold text-slate-900">{title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="mx-auto max-w-6xl px-4 text-center text-xs text-slate-400">
          MilhasHunt — uso pessoal. Os valores em milhas são estimados e podem variar nos sites dos programas.
        </div>
      </footer>
    </div>
  );
}
