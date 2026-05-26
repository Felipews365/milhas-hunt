import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "MilhasHunt — Encontre os melhores awards", template: "%s | MilhasHunt" },
  description: "Compare milhas entre Smiles, LATAM Pass, TudoAzul, Livelo e programas internacionais. Encontre o melhor custo-benefício para voar em milhas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
