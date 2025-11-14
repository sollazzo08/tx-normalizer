import { NormalizedTransaction,RawTransaction } from "../types";
import { parseToIsoDate } from "../utils/parseDate";


export function normalizeTransaction(rawTransaction: RawTransaction, source: string): NormalizedTransaction {

  const normalizedDate = parseToIsoDate(rawTransaction.date);
  const amount = parseFloat(rawTransaction.amount || "0");

  const result = {
    id: "124",
    date: normalizedDate,
    amount: amount,
    merchantName: "test",
    direction: "credit",
    rawDescription: rawTransaction.description,
    categoryId: "test",
    source: source

  }


  return result;
}

export function normalizeTransactions(normalizedTransaction: NormalizedTransaction, source: string): Array<NormalizedTransaction> {



  return null;
}
