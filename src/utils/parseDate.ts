import { parse, isValid } from "date-fns";

const SUPPORTED_FORMATS = [
  "yyyy-MM-dd",   // 2025-11-14
  "MM/dd/yyyy",   // 11/14/2025
  "MM/dd/yy",     // 11/14/25
];

export function parseToIsoDate(input: string): string {
  for (const fmt of SUPPORTED_FORMATS) {
    const d = parse(input.trim(), fmt, new Date());
    if (isValid(d)) {
      // Return as YYYY-MM-DD string
      return d.toISOString().slice(0, 10);
    }
  }

  throw new Error(`Unsupported date format: "${input}"`);
}
