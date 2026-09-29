import { LEADERBOARD_EXCLUDED_NAMES } from "../config/constants.js";

export function normalizeEmployeeName(name) {
  return String(name || "").trim().toLowerCase();
}

export function isLeaderboardExcludedName(name) {
  const normalizedName = normalizeEmployeeName(name);
  return LEADERBOARD_EXCLUDED_NAMES.some((excludedName) => normalizeEmployeeName(excludedName) === normalizedName);
}
