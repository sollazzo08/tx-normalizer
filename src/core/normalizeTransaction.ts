import {
  NormalizedTransaction,
  NormalizedError,
  RawTransaction,
} from "../types";
import { parseToIsoDate } from "../utils/parseDate";
import crypto from "crypto";

function normalizeTransaction(
  rawTransaction: RawTransaction,
  source: string,
): NormalizedTransaction {
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
    source: source,
  };

  return result;
}

export function normalizeTransactions(
  listOfRawTransactions: Array<RawTransaction>,
  source: string,
): {
  normalized: Array<NormalizedTransaction>;
  errors: Array<NormalizedError>;
} {
  const normalized = [];
  const errors = [];

  for (let i = 0; i < listOfRawTransactions.length; i++) {
    try {
      const rowItem = normalizeTransaction(listOfRawTransactions[i], source);
      normalized.push(rowItem);
    } catch (error) {
      let message = "Unknown error";

      if (error instanceof Error) {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      } else {
        message = JSON.stringify(error);
      }
      errors.push({
        rowIndex: i,
        message: message,
      });
    }
  }

  return { normalized, errors };
}
