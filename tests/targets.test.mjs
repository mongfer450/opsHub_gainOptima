import assert from "node:assert/strict";
import test from "node:test";
import { dailyTarget, targetProgress, weeklyTarget } from "../src/utils/targets.js";

test("target gauge uses red below 50%, yellow below 100%, then green", () => {
  assert.equal(targetProgress(49, 100).tier, "low");
  assert.equal(targetProgress(50, 100).tier, "mid");
  assert.equal(targetProgress(100, 100).tier, "high");
  assert.equal(targetProgress(120, 100).width, "100%");
});

test("weekly and daily targets derive from the owner monthly target", () => {
  assert.equal(weeklyTarget(1500000), 375000);
  assert.equal(dailyTarget(new Date(2026, 9, 4), 1500000), 48388);
  assert.equal(dailyTarget(new Date(2026, 1, 4), 1500000), 53572);
});
