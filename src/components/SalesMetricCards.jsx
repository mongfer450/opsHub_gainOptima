import { GOLD_DARK } from "../config/constants";
import { fmtBaht } from "../utils/formatters";

export function SalesMetricCards({ monthSales, todaySales, todaySalesLoading }) {
  const cards = [
    { label: "คลับรวม", month: monthSales.club, today: todaySales.club },
    { label: "MB", month: monthSales.mb, today: todaySales.mb },
    { label: "PT", month: monthSales.pt, today: todaySales.pt },
  ];

  return (
    <div className="metricGrid" style={{ marginBottom: 12 }}>
      {cards.map((card) => (
        <div
          key={card.label}
          style={{
            background: "#FFFFFF",
            border: "1px solid #ECE9E1",
            borderRadius: 16,
            padding: "14px 12px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 6 }}>{card.label}</div>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", color: GOLD_DARK }}>
            {fmtBaht(card.month)}
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: card.today > 0 ? "#16A34A" : "#9CA3AF",
              marginTop: 8,
              paddingTop: 8,
              borderTop: "1px solid #F0EEE8",
            }}
          >
            วันนี้ {todaySalesLoading ? "..." : fmtBaht(card.today)}
          </div>
        </div>
      ))}
    </div>
  );
}
