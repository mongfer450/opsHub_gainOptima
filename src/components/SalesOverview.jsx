import { EmployeeLeaderboard } from "./EmployeeLeaderboard";
import { SalesMetricCards } from "./SalesMetricCards";
import { TargetProgress } from "./TargetProgress";

export function SalesOverview({
  monthSales,
  monthSalesLoading,
  todaySales,
  todaySalesLoading,
  employeeSales,
  error,
  showEmployeeDetail,
  onToggleEmployeeDetail,
}) {
  return (
    <div className="wrap" style={{ marginTop: 20 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
        <div className="sectionTitle" style={{ fontWeight: 700 }}>ยอดขาย</div>
        <div style={{ fontSize: 10, color: "#9CA3AF" }}>เดือนนี้ / วันนี้</div>
      </div>

      {error && (
        <div role="alert" style={{ padding: 12, marginBottom: 10, color: "#A62B2B", background: "#FFF1F0", border: "1px solid #F5C7C3", borderRadius: 8, fontSize: 12 }}>
          อ่านข้อมูลยอดขายไม่สำเร็จ: {error}
        </div>
      )}
      {error ? null : monthSalesLoading ? (
        <div style={{ padding: 16, fontSize: 12.5, color: "#9CA3AF", background: "#FFFFFF", border: "1px solid #ECE9E1", borderRadius: 16 }}>
          กำลังโหลด...
        </div>
      ) : (
        <>
          <TargetProgress monthSales={monthSales} />
          <SalesMetricCards monthSales={monthSales} todaySales={todaySales} todaySalesLoading={todaySalesLoading} />

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
              color: "#7A5E12",
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
