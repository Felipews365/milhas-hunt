import { z } from "zod";

const PROGRAM_CODES = ["smiles", "latam", "azul", "livelo", "united", "american", "lifemiles", "aeroplan", "emirates", "turkish"] as const;
const CABIN_CLASSES = ["economy", "premium_economy", "business", "first"] as const;

export const AwardSearchSchema = z.object({
  origin: z.string().length(3).toUpperCase(),
  destination: z.string().length(3).toUpperCase(),
  departDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  returnDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  cabin: z.enum(CABIN_CLASSES).default("economy"),
  adults: z.coerce.number().int().min(1).max(9).default(1),
  programs: z.array(z.enum(PROGRAM_CODES)).optional(),
});

export type AwardSearchInput = z.infer<typeof AwardSearchSchema>;
