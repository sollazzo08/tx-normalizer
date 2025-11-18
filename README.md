# **tx-normalizer**

*A lightweight, bank-agnostic transaction normalization engine for CSV bank exports.*

tx-normalizer converts messy, bank-specific CSV exports into a clean, consistent transaction format you can feed into budget apps, financial dashboards, personal finance tools, or machine learning pipelines.

It includes:

* **Bank adapters** (starting with TD Bank)
* **Core, bank-agnostic normalization**
* **Merchant extraction**
* **Date + amount normalization**
* **Error tracking**
* **CSV parsing utilities**

This project is intentionally simple, dependency-light, and easy to extend.

---

# Features

### Universal Normalization

All transactions are converted into a consistent schema:

```ts
NormalizedTransaction {
  id: string;
  date: string;          // ISO format YYYY-MM-DD
  direction: "debit" | "credit";
  amount: number;
  merchantName?: string;
  rawDescription: string;
  categoryId?: string;
  source: string;         // e.g. "TD Bank"
}
```

### Bank Adapters

Adapters convert raw CSV -> RawTransaction.
Version 1 includes:

* `TD Bank Adapter` (with merchant extraction)

Easily extendable for other banks

### Smart Merchant Extraction

For banks with structured-but-messy purchase descriptions (like TD):

* Extracts merchant segment
* Removes store numbers
* Normalizes spacing
* Falls back gracefully when patterns don’t match

### Error Tracking

The normalizer returns both:

* `normalized[]` – all valid transactions
* `errors[]` – rows that couldn’t be normalized

Useful for validating real-world CSV data.


# Installation (local or pending NPM publish)

If using locally:

```bash
git clone https://github.com/yourname/tx-normalizer
cd tx-normalizer
npm install
```

# Usage

## 1. Import the TD Bank adapter

```ts
import { importTdCsvFromFile } from "tx-normalizer/adapters/td";

const result = importTdCsvFromFile("./path/to/td-transactions.csv");

console.log(result.normalized);
console.log(result.errors);
```

---

## 2. Normalized Output Example

```json
{
  "id": "a12f3...",
  "date": "2025-01-12",
  "direction": "debit",
  "amount": 16.87,
  "merchantName": "7 ELEVEN",
  "rawDescription": "VISA DDA PUR AP 403454     7 ELEVEN 40085              MONROE        * NY",
  "source": "TD Bank"
}
```

---

# Example Project (included)

To run the example:

```bash
npm run start
```

This loads a sample TD CSV and prints normalized and error output.

---


# Roadmap (v2+)

* Add other bank adapters
* Add merchant aliasing (e.g., “MCDONALD S F12678” → “McDonald's”)
* Add category classification via user config
* Add CLI: `tx-normalizer path/to/csv --bank td`
* Publish to npm
* Add TypeScript declarations
* Add test suite with Jest

---

