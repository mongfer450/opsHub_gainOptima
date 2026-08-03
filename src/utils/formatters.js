export function fmtBaht(n) {
  if (n === null || n === undefined) return "-";
  return "฿" + Number(n).toLocaleString("en-US", { maximumFractionDigits: 0 });
}

export function parseGvizDate(v) {
  if (typeof v !== "string") return null;
  const m = v.match(/^Date\((\d+),(\d+),(\d+)(?:,(\d+),(\d+),(\d+))?\)$/);
  if (!m) return null;
  const [, y, mo, d, h, mi, s] = m.map((x) => (x === undefined ? 0 : Number(x)));
  return new Date(y, mo, d, h, mi, s);
}

export function fmtTime(d) {
  return d.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
}

const THAI_MONTHS_SHORT = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];

export function fmtThaiDate(d) {
  const buddhistYear = d.getFullYear() + 543;
  return `${d.getDate()} ${THAI_MONTHS_SHORT[d.getMonth()]} ${buddhistYear}`;
}
