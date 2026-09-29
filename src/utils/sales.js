import { isLeaderboardExcludedName } from "./employees.js";

function amount(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : null;
}

function emptySales() {
  return { club: 0, mb: 0, pt: 0 };
}

function emptyPackages() {
  return { mb: {}, pt: {} };
}

export function summarizeSales(records, now = new Date()) {
  const monthSales = emptySales();
  const todaySales = emptySales();
  const memberPackages = emptyPackages();
  const byEmployee = new Map();

  for (const row of records) {
    const type = String(row.type || "").trim().toUpperCase();
    if (!row.date || (type !== "MB" && type !== "PT")) continue;
    if (row.date.getFullYear() !== now.getFullYear() || row.date.getMonth() !== now.getMonth()) continue;

    const value = amount(row.adjustedPrice) ?? amount(row.price);
    if (value === null) continue;

    monthSales[type.toLowerCase()] += value;
    monthSales.club += value;

    if (row.date.getDate() === now.getDate()) {
      todaySales[type.toLowerCase()] += value;
      todaySales.club += value;
    }

    const customerType = String(row.customerType || "").trim();
    const counts = memberPackages[type.toLowerCase()];
    if (customerType) counts[customerType] = (counts[customerType] || 0) + 1;

    const employee = String(row.employee || "").trim();
    if (employee && !isLeaderboardExcludedName(employee)) {
      const current = byEmployee.get(employee) || { name: employee, mb: 0, pt: 0 };
      current[type.toLowerCase()] += value;
      byEmployee.set(employee, current);
    }
  }

  return { monthSales, todaySales, memberPackages, employeeSales: [...byEmployee.values()].sort((a, b) => b.pt - a.pt) };
}
