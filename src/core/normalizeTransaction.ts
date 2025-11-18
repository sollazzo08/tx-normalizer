import { NormalizedTransaction,RawTransaction } from "../types";
import { parseToIsoDate } from "../utils/parseDate";
import crypto from "crypto";


export function normalizeTransaction(rawTransaction: RawTransaction, source: string): NormalizedTransaction {

  const normalizedDate = parseToIsoDate(rawTransaction.date);
  const normalizedAmount = parseFloat(rawTransaction.amount || "0");

  const result = {
    id: crypto.randomUUID(),
    date: normalizedDate,
    amount: normalizedAmount,
    merchantName: rawTransaction.description.trim(),
    direction: rawTransaction.direction,
    rawDescription: rawTransaction.description,
    categoryId: undefined, //TODO need a way to categorize each transaction
    source: source

  }


  return result;
}

// export function normalizeTransactions(normalizedTransaction: NormalizedTransaction, source: string): Array<NormalizedTransaction> {



//   return null;
// }
