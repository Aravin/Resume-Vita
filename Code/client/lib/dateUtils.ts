export type YearMonth = { year: number; month: number };

export function parseYearMonth(value?: string | null): YearMonth | null {
  if (!value || typeof value !== "string") return null;
  const parts = value.split("-");
  if (parts.length < 2) return null;
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  if (Number.isNaN(year) || Number.isNaN(month)) return null;
  return { year, month };
}

export function yearMonthToNumber(ym: YearMonth) {
  return ym.year * 12 + (ym.month - 1);
}

export function isStartBeforeEnd(start?: string | null, end?: string | null): boolean {
  const s = parseYearMonth(start);
  const e = parseYearMonth(end);
  if (!s || !e) return false;
  return yearMonthToNumber(s) < yearMonthToNumber(e);
}

export function isSameMonth(a?: string | null, b?: string | null): boolean {
  const x = parseYearMonth(a);
  const y = parseYearMonth(b);
  if (!x || !y) return false;
  return x.year === y.year && x.month === y.month;
}
