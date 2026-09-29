import { ChevronRight } from "lucide-react";
import { GOLD_DARK } from "../config/constants";
import { fmtBaht } from "../utils/formatters";

export function SalesMetricCards({ monthSales, todaySales, todaySalesLoading, onSelect }) {
  const cards = [
    { label: "คลับรวม", month: monthSales.club, today: todaySales.club },
    { label: "MB", month: monthSales.mb, today: todaySales.mb, type: "MB" },
    { label: "PT", month: monthSales.pt, today: todaySales.pt, type: "PT" },
  ];

  return (
    <div className="metricGrid" style={{ marginBottom: 12 }}>
      {cards.map((card) => {
        const Card = card.type ? "button" : "div";
        return (
        <Card
          key={card.label}
          {...(card.type ? { type: "button", onClick: () => onSelect(card.type), "aria-label": `ดูรายการขาย ${card.type} วันนี้` } : {})}
          className={`metricCard${card.type ? " tap" : ""}`}
          style={{
            background: "#FFFFFF",
            border: "1px solid #ECE9E1",
            borderRadius: 16,
            textAlign: "center",
            position: "relative",
            width: "100%",
            color: "inherit",
            fontFamily: "inherit",
            cursor: card.type ? "pointer" : "default",
          }}
        >
          <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 6 }}>{card.label}</div>
          {card.type && <ChevronRight size={14} aria-hidden="true" style={{ position: "absolute", right: 8, top: 10, color: GOLD_DARK }} />}
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
        </Card>
        );
      })}
    </div>
  );
}
