export function parseCsv(text: string): Array<Record<string, string>> {
  const csvRow = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const headers = csvRow[0].split(",");

  const parseCsvRows = [];

  for (let i = 0; i < csvRow.length; i++) {
    const cleanCsvRow = csvRow[i].trim();
    if (cleanCsvRow.length === 0) continue;
    parseCsvRows.push(cleanCsvRow.split(","));
  }

  for (let i = 0; i < headers.length; i++) {
    headers[i] = headers[i].trim();
  }

  const result = [];

  for (let rowIndex = 1; rowIndex < parseCsvRows.length; rowIndex++) {
    const values = parseCsvRows[rowIndex];
    const obj: Record<string, string> = {};

    for (let i = 0; i < headers.length; i++) {
      const key = headers[i].trim();
      const value = values[i].trim();
      obj[key] = value;
    }

    result.push(obj);
  }

  return result;
}
