import { Target } from "lucide-react";
import { CLUB_TARGET, GOLD, GOLD_DARK, PT_TARGET } from "../config/constants";
import { fmtBaht } from "../utils/formatters";

export function TargetProgress({ monthSales, monthSalesLoading }) {
  return (
    <div className="wrap" style={{ marginTop: 20 }}>
      <div className="sectionTitle" style={{ fontWeight: 700, marginBottom: 10 }}>เป้าหมายเดือนนี้</div>
      {monthSalesLoading ? (
        <div style={{ padding: 16, fontSize: 12.5, color: "#9CA3AF", background: "#FFFFFF", border: "1px solid #ECE9E1", borderRadius: 16 }}>
          กำลังโหลด...
        </div>
      ) : (
        <div style={{ background: "#FFFFFF", border: "1px solid #ECE9E1", borderRadius: 16, padding: "16px 18px" }}>
          <ProgressRow label="ยอดขายรวม" value={monthSales.club} target={CLUB_TARGET} suffix="ของเป้า" />
          <div style={{ height: 1, background: "#F0EEE8", margin: "16px 0" }} />
          <ProgressRow label="เป้าหมาย PT" value={monthSales.pt} target={PT_TARGET} suffix="ของเป้า PT" />
        </div>
      )}
    </div>
  );
}

function ProgressRow({ label, value, target, suffix }) {
  const pct = Math.min(100, Math.round((value / target) * 100));
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Target size={14} color={GOLD_DARK} />
          <span style={{ fontSize: 12.5, fontWeight: 600 }}>{label}</span>
        </div>
        <span style={{ fontSize: 12, color: "#9CA3AF" }}>
          <b style={{ color: GOLD_DARK, fontFamily: "'Space Grotesk', sans-serif" }}>{fmtBaht(value)}</b> / {fmtBaht(target)}
        </span>
      </div>
      <div style={{ height: 10, background: "#F0EEE8", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${GOLD_DARK}, ${GOLD})`, borderRadius: 6 }} />
      </div>
      <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 6 }}>
        ทำได้แล้ว {pct}% {suffix} · เหลืออีก {fmtBaht(Math.max(0, target - value))}
      </div>
    </>
  );
}
