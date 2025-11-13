import {rawTransactionsFromCsv} from "../src/adapters/basicAdapter";

const csv = `
Date,Type,Amount,Description
2025-01-01,DEBIT,,AMAZON
2025-01-02,DEP,1200.00,PAYROLL
`;


const mappedRawTransaction = rawTransactionsFromCsv(csv);
console.log("Mapped Raw Transactions:", mappedRawTransaction);
