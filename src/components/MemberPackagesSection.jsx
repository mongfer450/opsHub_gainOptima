import { Dumbbell, UserPlus } from "lucide-react";
import { GOLD, GOLD_DARK } from "../config/constants";

export function MemberPackagesSection({ memberPackages, loading }) {
  return (
    <div className="wrap" style={{ marginTop: 20 }}>
      <div className="sectionTitle" style={{ fontWeight: 700, marginBottom: 10 }}>สมาชิกซื้อแพ็กเกจเดือนนี้</div>
      {loading ? (
        <div style={{ padding: 16, fontSize: 12.5, color: "#9CA3AF", background: "#FFFFFF", border: "1px solid #ECE9E1", borderRadius: 16 }}>
          กำลังโหลด...
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
          <PackageCard title="MB" icon={UserPlus} data={memberPackages.mb} />
          <PackageCard title="PT" icon={Dumbbell} data={memberPackages.pt} />
        </div>
      )}
    </div>
  );
}

function PackageCard({ title, icon: Icon, data }) {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #ECE9E1", borderRadius: 16, padding: "14px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
        <div style={{ width: 26, height: 26, borderRadius: 8, background: `${GOLD}1A`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={13} color={GOLD_DARK} />
        </div>
        <span style={{ fontSize: 12.5, fontWeight: 700 }}>{title}</span>
      </div>
      {Object.entries(data).length === 0 ? (
        <div style={{ fontSize: 11, color: "#9CA3AF" }}>ยังไม่มีข้อมูล</div>
      ) : (
        Object.entries(data).map(([customerType, count]) => (
          <div key={customerType} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
            <span style={{ minWidth: 0, overflowWrap: "anywhere", fontSize: 11, color: "#9CA3AF" }}>{customerType}</span>
            <span style={{ flexShrink: 0, fontSize: 13, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: "#111318" }}>{count}</span>
          </div>
        ))
      )}
    </div>
  );
}
