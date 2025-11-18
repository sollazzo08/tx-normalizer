import * as z from "zod";

export const RawTransactionSchema = z.object({
  date: z.string(),
  direction: z.enum(["debit", "credit"]),
  amount: z.string(),
  merchant: z.string().nullable,
  description: z.string()
});

export type RawTransaction = z.infer<typeof RawTransactionSchema>;

export const NormalizedTransactionSchema = z.object({
  id: z.string(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD"),
  merchantName: z.string().nullable,
  direction: z.string(),
  amount: z.number(),
  rawDescription: z.string(),
  categoryId: z.string().optional(),
  source: z.string(),
});

export type NormalizedTransaction = z.infer<typeof NormalizedTransactionSchema>;

export type NormalizedError = {
  rowIndex: number,
  message: string
}
