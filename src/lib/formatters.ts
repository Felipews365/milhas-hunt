import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatMiles(miles: number): string {
  return new Intl.NumberFormat("pt-BR").format(miles);
}

export function formatCurrency(amount: number, currency = "BRL"): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(iso: string): string {
  return format(parseISO(iso), "dd MMM yyyy", { locale: ptBR });
}

export function formatDateShort(iso: string): string {
  return format(parseISO(iso), "dd/MM/yyyy");
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

// Value score: estimated BRL per mile redeemed (higher = better deal)
export function calcValueScore(miles: number, taxes: number, estimatedRetailBRL: number): number {
  if (miles === 0) return 0;
  return Math.round(((estimatedRetailBRL - taxes) / miles) * 100) / 100;
}
