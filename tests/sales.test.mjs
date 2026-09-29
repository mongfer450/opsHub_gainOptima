import assert from "node:assert/strict";
import test from "node:test";
import { summarizeSales } from "../src/utils/sales.js";

test("today's MB/PT transactions reconcile to the cards", () => {
  const now = new Date(2026, 8, 29, 18);
  const result = summarizeSales([
    { date: new Date(2026, 8, 29, 9), type: "MB", package: "MB 1 Month", price: 2000, adjustedPrice: 1500, employee: "A" },
    { date: new Date(2026, 8, 29, 12), type: "PT", package: "PT 10 Sessions", price: 3000, employee: "B" },
    { date: new Date(2026, 8, 29, 14), type: "MB", package: "Day Pass", price: 500, customerType: "New" },
    { date: new Date(2026, 8, 28, 10), type: "MB", price: 900 },
    { date: new Date(2026, 8, 29, 15), type: "MB", price: "" },
  ], now);

  assert.deepEqual(result.todaySales, { club: 5000, mb: 2000, pt: 3000 });
  assert.equal(result.monthSales.club, 5900);
  assert.equal(result.todayTransactions.length, 3);
  assert.deepEqual(result.todayTransactions.map((item) => item.package), ["Day Pass", "PT 10 Sessions", "MB 1 Month"]);
  assert.equal(result.todayTransactions.find((item) => item.package === "MB 1 Month").amount, 1500);
  for (const type of ["MB", "PT"]) {
    const total = result.todayTransactions.filter((item) => item.type === type).reduce((sum, item) => sum + item.amount, 0);
    assert.equal(total, result.todaySales[type.toLowerCase()]);
  }
});

test("no qualifying sales produces an empty detail list", () => {
  const result = summarizeSales([{ date: new Date(2026, 8, 28), type: "PT", price: 100 }], new Date(2026, 8, 29));
  assert.equal(result.todayTransactions.length, 0);
  assert.equal(result.todaySales.pt, 0);
});
