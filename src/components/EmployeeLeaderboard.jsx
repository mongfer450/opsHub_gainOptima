import { EMPLOYEE_TARGETS } from "../config/constants";
import { isLeaderboardExcludedName, normalizeEmployeeName } from "../utils/employees";
import { fmtBaht } from "../utils/formatters";

export function EmployeeLeaderboard({ employeeSales }) {
  const rows = buildEmployeeTargetRows(employeeSales);

  return (
    <div style={{ marginTop: 10, background: "#FFFFFF", border: "1px solid #ECE9E1", borderRadius: 16, overflow: "hidden" }}>
      {rows.length === 0 ? (
        <div style={{ padding: 16, fontSize: 12.5, color: "#9CA3AF" }}>ยังไม่มีข้อมูลยอดขาย</div>
      ) : (
        rows.map((row, i) => {
          const rank = i + 1;
          const total = (row.mb || 0) + (row.pt || 0);
          const remaining = row.target ? Math.max(0, row.target - (row.pt || 0)) : null;
          const overTarget = row.target ? Math.max(0, (row.pt || 0) - row.target) : null;
          const medal =
            rank === 1
              ? { bg: "#FFF6DC", border: "#D4AF37", text: "#8A6D1D", label: "🥇" }
              : rank === 2
              ? { bg: "#F4F4F5", border: "#B0B3B8", text: "#5E6166", label: "🥈" }
              : rank === 3
              ? { bg: "#FBEEE3", border: "#C97F3C", text: "#8A501E", label: "🥉" }
              : null;

          return (
            <div
              key={row.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderTop: i === 0 ? "none" : "1px solid #F0EEE8",
                background: medal ? medal.bg : "transparent",
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  background: medal ? "#FFFFFF" : "#F5F5F3",
                  border: medal ? `1.5px solid ${medal.border}` : "1px solid #ECE9E1",
                  fontSize: medal ? 15 : 12.5,
                  fontWeight: 700,
                  color: medal ? medal.text : "#9CA3AF",
                }}
              >
                {medal ? medal.label : rank}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: medal ? 700 : 600, color: medal ? medal.text : "#111318" }}>{row.name}</div>
                <div style={{ fontSize: 10.5, color: "#9CA3AF", marginTop: 1 }}>
                  MB {fmtBaht(row.mb)} · รวม {fmtBaht(total)}
                </div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: medal ? medal.text : "#111318" }}>
                  {fmtBaht(row.pt)}
                </div>
                {row.target && (
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: remaining === 0 ? "#16A34A" : "#DC2626", marginTop: 3 }}>
                    {remaining === 0 ? `> ${fmtBaht(overTarget)}` : `< ${fmtBaht(remaining)}`}
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

function buildEmployeeTargetRows(employeeSales) {
  const visibleSales = employeeSales.filter((row) => !isLeaderboardExcludedName(row.name));
  const salesByName = new Map(visibleSales.map((row) => [normalizeEmployeeName(row.name), row]));
  const targetNames = new Set(EMPLOYEE_TARGETS.map((row) => normalizeEmployeeName(row.name)));

  const targetRows = EMPLOYEE_TARGETS.map((targetRow) => {
    const sales = salesByName.get(normalizeEmployeeName(targetRow.name));
    return {
      name: targetRow.name,
      mb: sales?.mb || 0,
      pt: sales?.pt || 0,
      target: targetRow.target,
    };
  });

  const extraRows = visibleSales
    .filter((row) => !targetNames.has(normalizeEmployeeName(row.name)))
    .map((row) => ({ ...row, target: null }));

  return [...targetRows, ...extraRows].sort((a, b) => (b.pt || 0) - (a.pt || 0));
}
