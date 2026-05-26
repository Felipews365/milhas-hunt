# MilhasHunt

Buscador de passagens aéreas em milhas para uso pessoal. Compara estimativas de custo em milhas entre 10 programas de fidelidade e abre os sites de cada programa com a busca pré-preenchida.

## Stack

- **Next.js 15** (App Router, TypeScript strict)
- **Tailwind CSS v4** — usa `@import "tailwindcss"` no globals.css, **sem** tailwind.config.ts
- **TanStack Query v5** — `placeholderData: (prev) => prev` para evitar flash ao refetch
- **Radix UI** — Popover, Select, Label, Slot (componentes customizados em `src/components/ui/`)
- **date-fns v4** — formatação e cálculos de data
- **Zod** — validação dos parâmetros de busca

## Comandos

```bash
npm run dev -- --port 3002   # usar 3002 para evitar conflito com FareHunt na 3001
npm run build
npx tsc --noEmit
```

## Estrutura

```
src/
  app/
    page.tsx                   # Homepage: hero, rotas populares, programas
    search/page.tsx            # Página de resultados (Suspense wrapper)
    api/awards/search/route.ts # GET endpoint de busca
  features/award-search/
    components/
      search-form.tsx          # Formulário com AirportInput + DatePickerInput
      results-shell.tsx        # Shell de resultados + botão "Abrir em todos"
      award-result-card.tsx    # Card por programa com estimativa
    hooks/use-award-search.ts
    utils/parse-url-params.ts
  components/ui/
    airport-input.tsx          # Dropdown aeroporto via Radix Popover (portal)
    date-picker-input.tsx      # Calendário customizado via Radix Popover (portal)
    badge.tsx, button.tsx, input.tsx, skeleton.tsx, select.tsx, label.tsx
  lib/
    airports.ts                # ~100 aeroportos BR + internacionais
    award-estimates.ts         # Estimativas por rota/cabine/programa
    formatters.ts              # formatMiles, formatCurrency, formatDate
    constants.ts               # ALL_PROGRAM_CODES, CABIN_OPTIONS, POPULAR_ROUTES
  types/
    program.ts                 # ProgramCode, Program, PROGRAMS, BR_PROGRAMS, INTL_PROGRAMS
    award.ts                   # AwardOffer, AwardSearchParams, CabinClass, CABIN_LABELS
  services/award-search/
    search-awards.ts           # Chama generateEstimates() — sem API externa por padrão
```

## Programas suportados

| Código | Nome | seats.aero source |
|--------|------|-------------------|
| smiles | Smiles (GOL) | gol |
| latam | LATAM Pass | sem suporte |
| azul | TudoAzul | azul |
| livelo | Livelo | sem suporte |
| united | United MileagePlus | united |
| american | AAdvantage | american |
| lifemiles | LifeMiles | lifemiles |
| aeroplan | Aeroplan | aeroplan |
| emirates | Emirates Skywards | emirates |
| turkish | Miles&Smiles | turkish |

## Como as estimativas funcionam

`src/lib/award-estimates.ts` classifica a rota em 5 tipos baseado nos aeroportos:
- `domestic` — ambos BR
- `regional` — América do Sul
- `northamerica` — América do Norte / México / Caribe
- `transatlantic` — Europa / África
- `asia_me` — Ásia / Oriente Médio / Oceania

Cada programa tem `AWARD_CHART` com faixas `[min, max]` milhas por tipo e cabine. Valor exibido = meio da faixa com variação determinística por programa (±5% via hash) para cada um mostrar número diferente.

## Integração seats.aero (opcional)

Se `SEATS_AERO_API_KEY` estiver no `.env.local`, usa dados reais para 8 programas. LATAM e Livelo sempre usam estimativas.

## Decisões de arquitetura

- **Radix Popover Portal** nos inputs de aeroporto e data — evita ser cortado pelo `overflow-hidden` da seção hero e herdar `text-white`
- **Calendário sem dependência externa** — implementado manualmente em `date-picker-input.tsx`
- **Estimativas transparentes** — label "Estimativa" em cada card; botão "Abrir em todos os programas" abre cada site com busca pré-preenchida via `window.open()`
- **Uso pessoal** — sem auth, sem DB, sem analytics
