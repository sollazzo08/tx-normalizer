import {
  NormalizedTransaction,
  NormalizedError,
  RawTransaction,
} from "../types";
import { parseToIsoDate } from "../utils/parseDate";

// Browser + Node-safe ID generator
function generateId(): string {
  // Try web-style crypto (works in browsers + modern Node)
  const globalCrypto =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    typeof globalThis !== "undefined" ? (globalThis as any).crypto : undefined;

  if (globalCrypto && typeof globalCrypto.randomUUID === "function") {
    return globalCrypto.randomUUID();
  }

  // Fallback: good-enough random string
  return (
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2, 10)
  );
}

function normalizeTransaction(
  rawTransaction: RawTransaction,
  source: string,
): NormalizedTransaction {
  const normalizedDate = parseToIsoDate(rawTransaction.date);
  const normalizedAmount = parseFloat(rawTransaction.amount || "0");

  const result: NormalizedTransaction = {
    id: generateId(),
    date: normalizedDate,
    amount: normalizedAmount,
    merchantName: rawTransaction.merchant,
    direction: rawTransaction.direction,
    rawDescription: rawTransaction.description,
    categoryId: undefined, // TODO: categorization later
    source,
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
  const normalized: NormalizedTransaction[] = [];
  const errors: NormalizedError[] = [];

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
        message,
      });
    }
  }

  return { normalized, errors };
}
