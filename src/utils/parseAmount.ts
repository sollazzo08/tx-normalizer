export function parseAmount(amount: string, direction: string): number {

  const cleaned = amount.replace(/[^0-9.-]+/g, "");

  let value = parseFloat(cleaned);
  if (isNaN(value)) {
    throw new Error(`Invalid amount: ${amount}`);
  }

  const dir = direction.toLowerCase();

  if (dir === "debit" && value > 0) value = -value;
  if (dir === "credit" && value < 0) value = Math.abs(value);

  return value;
}
