interface RawTransaction {
  date: string,
  transactionType: "DEBIT" | "DEP" | "CREDIT",
  amount: number,
  description: string

}

interface NormalizedTransaction {
  id: string,
  date: string,
  merchantName: string,
  direction: "debit" | "credit";
  amount: number,
  rawDescription: string
  categoryId?: string
  source: string
}

export { RawTransaction, NormalizedTransaction };
