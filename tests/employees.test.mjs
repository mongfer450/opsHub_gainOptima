import assert from "node:assert/strict";
import test from "node:test";

import { EMPLOYEE_TARGETS } from "../src/config/constants.js";
import { normalizeEmployeeName } from "../src/utils/employees.js";

test("KPI targets include Kaem and Copter without duplicate identities", () => {
  const targets = new Map(EMPLOYEE_TARGETS.map(({ name, target }) => [normalizeEmployeeName(name), target]));

  assert.equal(targets.get(normalizeEmployeeName("แก้ม")), 80000);
  assert.equal(targets.get(normalizeEmployeeName("Copter")), 80000);
  assert.equal(targets.get(normalizeEmployeeName("คอปเตอร์")), 80000);
  assert.equal(targets.size, EMPLOYEE_TARGETS.length);
  assert.equal(80000 - 37200, 42800);
});
