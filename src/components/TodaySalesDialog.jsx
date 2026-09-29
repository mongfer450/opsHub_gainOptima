import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { GOLD_DARK } from "../config/constants";
import { fmtBaht, fmtThaiDate, fmtTime } from "../utils/formatters";

export function TodaySalesDialog({ type, transactions, total, onClose }) {
  const closeButton = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const onKeyDown = (event) => {
      if (event.key === "Escape") onCloseRef.current();
      if (event.key === "Tab") {
        event.preventDefault();
        closeButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, []);

  return (
    <div
      role="presentation"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 50, display: "grid", placeItems: "center", padding: 12, background: "rgba(17,19,24,.56)" }}
    >
      <div role="dialog" aria-modal="true" aria-labelledby="today-sales-title" style={{ width: "min(100%, 560px)", maxHeight: "min(90dvh, 760px)", display: "flex", flexDirection: "column", overflow: "hidden", background: "#FFFFFF", borderRadius: 8, boxShadow: "0 16px 40px rgba(0,0,0,.18)" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "16px 16px 12px", borderBottom: "1px solid #ECE9E1" }}>
          <div>
            <h2 id="today-sales-title" style={{ margin: 0, fontSize: 17 }}>รายการขาย {type} วันนี้</h2>
            <div style={{ marginTop: 4, fontSize: 11, color: "#8B919D" }}>{fmtThaiDate(new Date())}</div>
          </div>
          <button ref={closeButton} type="button" onClick={onClose} aria-label="ปิด" title="ปิด" style={{ display: "grid", placeItems: "center", width: 32, height: 32, flexShrink: 0, border: "1px solid #ECE9E1", borderRadius: 6, background: "#FFFFFF", color: GOLD_DARK, cursor: "pointer" }}><X size={17} /></button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, padding: "12px 16px", background: "#FAF8F1", fontSize: 12 }}>
          <span>{transactions.length} รายการ</span>
          <strong style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, color: GOLD_DARK }}>{fmtBaht(total)}</strong>
        </div>
        <div style={{ overflowY: "auto", padding: "0 16px 8px" }}>
          {transactions.length === 0 ? (
            <div style={{ padding: "24px 0", textAlign: "center", fontSize: 12, color: "#8B919D" }}>วันนี้ยังไม่มีรายการขาย {type}</div>
          ) : transactions.map((item, index) => (
            <div key={`${item.date.getTime()}-${index}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, padding: "13px 0", borderBottom: "1px solid #ECE9E1" }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, overflowWrap: "anywhere" }}>{item.package || "ไม่ระบุแพ็กเกจ"}</div>
                <div style={{ marginTop: 4, fontSize: 11, color: "#8B919D", overflowWrap: "anywhere" }}>
                  {[fmtTime(item.date), item.customerType, item.employee].filter(Boolean).join(" · ")}
                </div>
              </div>
              <strong style={{ flexShrink: 0, fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: GOLD_DARK }}>{fmtBaht(item.amount)}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
