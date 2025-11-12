import { parseCsv } from "../src/utils/csv";

const csv = `
Date,Type,Amount,Description
2025-01-01,DEBIT,-45.23,AMAZON
2025-01-02,DEP,1200.00,PAYROLL
`;

const rows = parseCsv(csv);
console.log("Parsed rows:", rows);
