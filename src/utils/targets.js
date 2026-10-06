export function targetProgress(actual, target) {
  const ratio = target > 0 ? actual / target : 0;
  return {
    percent: Math.round(ratio * 100),
    tier: ratio < 0.5 ? "low" : ratio < 1 ? "mid" : "high",
    width: `${Math.min(ratio * 100, 100)}%`,
  };
}

export function dailyTarget(now, monthlyTarget) {
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  return Math.ceil(monthlyTarget / daysInMonth);
}

export function weeklyTarget(monthlyTarget) {
  return Math.ceil(monthlyTarget / 4);
}
