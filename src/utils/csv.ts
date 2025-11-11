
export function parseCsv(text: string):Array<Record<string,string>> {

  const headers = []; // TODO parse header first row in text
  const csvRow = text.split('\n');
  const parseCsvRows = [];

  for(let i = 0; i < csvRow.length; i++ ) {
    const cleanCsvRow = csvRow[i].trim();
    parseCsvRows.push(cleanCsvRow)
    if(cleanCsvRow.length === 0) continue;
  }

  return parseCsvRows; //TODO return object -> key, value
}
