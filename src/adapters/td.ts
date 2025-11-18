import { RawTransaction } from "../types";
import { parseCsv } from "../utils/csv";

function mapDirection(rawDirection: string): "debit" | "credit" {
  if (rawDirection === "DEBIT") {
    return "debit";
  } else return "credit";
}

function mapRowtoRaw(row: Record<string, string>): RawTransaction {
  return {
    date: row["Date"],
    direction: mapDirection(row["Type"]),
    amount: row["Amount"],
    description: row["Description"],
  };
}

export function rawTransactionsFromCsv(
  csvString: string,
): Array<RawTransaction> {
  const result = [];

  const rawDataArray = parseCsv(csvString);
  console.log(rawDataArray.length);

  for (let i = 0; i < rawDataArray.length; i++) {
    console.log(rawDataArray[i]);
    result.push(mapRowtoRaw(rawDataArray[i]));
  }

  return result;
}
