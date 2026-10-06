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
  const weekSales = emptySales();
  const todaySales = emptySales();
  const todayTransactions = [];
  const memberPackages = emptyPackages();
  const byEmployee = new Map();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStartDay = Math.floor((now.getDate() - 1) / 7) * 7 + 1;
  const weekStart = Date.UTC(now.getFullYear(), now.getMonth(), weekStartDay);

  for (const row of records) {
    const type = String(row.type || "").trim().toUpperCase();
    if (!row.date || (type !== "MB" && type !== "PT")) continue;
    if (row.date.getFullYear() !== now.getFullYear() || row.date.getMonth() !== now.getMonth()) continue;

    const value = amount(row.adjustedPrice) ?? amount(row.price);
    if (value === null) continue;

    monthSales[type.toLowerCase()] += value;
    monthSales.club += value;

    const saleDay = Date.UTC(row.date.getFullYear(), row.date.getMonth(), row.date.getDate());
    if (saleDay >= weekStart && saleDay <= today) {
      weekSales[type.toLowerCase()] += value;
      weekSales.club += value;
    }

    if (row.date.getDate() === now.getDate()) {
      todaySales[type.toLowerCase()] += value;
      todaySales.club += value;
      todayTransactions.push({
        date: row.date,
        type,
        package: String(row.package || "").trim(),
        customerType: String(row.customerType || "").trim(),
        employee: String(row.employee || "").trim(),
        amount: value,
      });
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

  return {
    monthSales,
    weekSales,
    todaySales,
    todayTransactions: todayTransactions.sort((a, b) => b.date - a.date),
    memberPackages,
    employeeSales: [...byEmployee.values()].sort((a, b) => b.pt - a.pt),
  };
}
