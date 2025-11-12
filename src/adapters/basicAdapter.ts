import { RawTransaction } from "../types";
import { parseCsv } from "../utils/csv";


function mapRowtoRaw(row: Record<string,string>): RawTransaction {

  return {
    date: row['Date'],
    transactionType: row['Type'] as "DEBIT" | "DEP" | "CREDIT",
    amount: parseFloat(row['Amount']),
    description: row['Description']
  }
}

//TODO add entry point function for adpater
