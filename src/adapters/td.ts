import { RawTransaction } from "../types";
import { normalizeTransactions } from "../core/normalizeTransaction";
import { parseCsv } from "../utils/csv";
// import fs from "fs";

function extractMerchant(rawDescription: string): string | undefined {
  const normalized = rawDescription.trim().replace(/\s+/g, " ");
  if (!normalized) return undefined;

  const tokens = normalized.split(" ");

  const apIndex = tokens.indexOf("AP");
  if (apIndex === -1) {
    return undefined;
  }

  const authIndex = apIndex + 1;
  const merchantStartIndex = authIndex + 1;

  if (merchantStartIndex >= tokens.length) {
    return undefined;
  }

  let merchantEndIndex = tokens.length;

  if (
    tokens.length >= 3 &&
    tokens[tokens.length - 2] === "*" &&
    /^[A-Z]{2}$/.test(tokens[tokens.length - 1])
  ) {
    merchantEndIndex = tokens.length - 3;
  }

  if (merchantEndIndex <= merchantStartIndex) {
    return undefined;
  }

  const merchantTokens = tokens.slice(merchantStartIndex, merchantEndIndex);

  while (
    merchantTokens.length > 0 &&
    /^[0-9]+$/.test(merchantTokens[merchantTokens.length - 1])
  ) {
    merchantTokens.pop();
  }

  if (merchantTokens.length === 0) {
    return undefined;
  }

  return merchantTokens.join(" ");
}

function mapDirection(rawDirection: string): "debit" | "credit" {
  if (rawDirection === "DEBIT") {
    return "debit";
  } else return "credit";
}

function mapRowtoRaw(row: Record<string, string>): RawTransaction {
  return {
    date: row["Date"],
    direction: mapDirection(row["Type"]),
    amount: row["Debit"] || row["Credit"],
    merchant: extractMerchant(row["Description"]),
    description: row["Description"],
  };
}

function rawTransactionsFromCsv(csvString: string): Array<RawTransaction> {
  const result: RawTransaction[] = [];

  const rawDataArray = parseCsv(csvString);

  for (let i = 0; i < rawDataArray.length; i++) {
    result.push(mapRowtoRaw(rawDataArray[i]));
  }

  return result;
}

export function importTdCsv(csvString: string) {
  const rawTransactions = rawTransactionsFromCsv(csvString);
  return normalizeTransactions(rawTransactions, "TD Bank");
}

// export function importTdCsvFromFile(filePath: string) {
//   const csvString = fs.readFileSync(filePath, "utf-8");
//   return importTdCsv(csvString);
// }
