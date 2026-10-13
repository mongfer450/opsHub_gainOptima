import { LEADERBOARD_EXCLUDED_NAMES } from "../config/constants.js";

export function normalizeEmployeeName(name) {
  const normalized = String(name || "").trim().toLowerCase();
  return normalized === "copter" ? "คอปเตอร์" : normalized;
}

export function isLeaderboardExcludedName(name) {
  const normalizedName = normalizeEmployeeName(name);
  return LEADERBOARD_EXCLUDED_NAMES.some((excludedName) => normalizeEmployeeName(excludedName) === normalizedName);
}
