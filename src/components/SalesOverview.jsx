import { EMPLOYEE_TARGETS, GOLD_DARK } from "../config/constants";
import { fmtBaht } from "../utils/formatters";

export function SalesOverview({
  monthSales,
  monthSalesLoading,
  todaySales,
  todaySalesLoading,
  employeeSales,
  showEmployeeDetail,
  onToggleEmployeeDetail,
}) {
  return (
    <div className="wrap" style={{ marginTop: 20 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
        <div className="sectionTitle" style={{ fontWeight: 700 }}>ยอดขาย</div>
        <div style={{ fontSize: 10, color: "#9CA3AF" }}>เดือนนี้ / วันนี้</div>
      </div>

      {monthSalesLoading ? (
        <div style={{ padding: 16, fontSize: 12.5, color: "#9CA3AF", background: "#FFFFFF", border: "1px solid #ECE9E1", borderRadius: 16 }}>
          กำลังโหลด...
        </div>
      ) : (
        <>
          <div className="grid" style={{ marginBottom: 12 }}>
            {[
              { label: "คลับรวม", month: monthSales.club, today: todaySales.club },
              { label: "MB", month: monthSales.mb, today: todaySales.mb },
              { label: "PT", month: monthSales.pt, today: todaySales.pt },
            ].map((c) => (
              <div
                key={c.label}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #ECE9E1",
                  borderRadius: 16,
                  padding: "14px 12px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 6 }}>{c.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: GOLD_DARK }}>
                  {fmtBaht(c.month)}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: c.today > 0 ? "#16A34A" : "#9CA3AF",
                    marginTop: 8,
                    paddingTop: 8,
                    borderTop: "1px solid #F0EEE8",
                  }}
                >
                  {todaySalesLoading ? "..." : fmtBaht(c.today)}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={onToggleEmployeeDetail}
            className="tap"
            style={{
              width: "100%",
              background: "#FFFFFF",
              border: "1px solid #ECE9E1",
              borderRadius: 14,
              padding: "10px 16px",
              fontSize: 12.5,
              fontWeight: 600,
              color: GOLD_DARK,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {showEmployeeDetail ? "ซ่อนรายละเอียดพนักงาน ▲" : "ดูรายละเอียดพนักงาน ▼"}
          </button>
          {showEmployeeDetail && <EmployeeLeaderboard employeeSales={employeeSales} />}
        </>
      )}
    </div>
  );
}

function EmployeeLeaderboard({ employeeSales }) {
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
                    {remaining === 0 ? "≥ เป้า" : `< ${fmtBaht(remaining)}`}
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
  const salesByName = new Map(employeeSales.map((row) => [normalizeName(row.name), row]));
  const targetNames = new Set(EMPLOYEE_TARGETS.map((row) => normalizeName(row.name)));

  const targetRows = EMPLOYEE_TARGETS.map((targetRow) => {
    const sales = salesByName.get(normalizeName(targetRow.name));
    return {
      name: targetRow.name,
      mb: sales?.mb || 0,
      pt: sales?.pt || 0,
      target: targetRow.target,
    };
  });

  const extraRows = employeeSales
    .filter((row) => !targetNames.has(normalizeName(row.name)))
    .map((row) => ({ ...row, target: null }));

  return [...targetRows, ...extraRows].sort((a, b) => (b.pt || 0) - (a.pt || 0));
}

function normalizeName(name) {
  return String(name || "").trim().toLowerCase();
}
