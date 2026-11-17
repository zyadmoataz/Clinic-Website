export function toIsoDate(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function addDaysIso(offsetDays: number, base = new Date()): string {
  return toIsoDate(new Date(base.getFullYear(), base.getMonth(), base.getDate() + offsetDays));
}

export function parseLocalDate(dateStr: string | Date): Date {
  if (dateStr instanceof Date) return dateStr;
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dateStr).trim());
  if (isoMatch) {
    return new Date(Number(isoMatch[1]), Number(isoMatch[2]) - 1, Number(isoMatch[3]));
  }
  return new Date(dateStr);
}
