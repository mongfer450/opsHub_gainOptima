import { ArrowUpRight, ClipboardPenLine, Wallet } from "lucide-react";
import { GOLD, GOLD_DARK } from "../config/constants";

const forms = [
  {
    label: "แจ้งยอด MB/PT",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSeY3RwJgORN0xg5dtaZ6jc3SrSUkWjBBmQyghL-7x2itfoBYQ/viewform",
    Icon: ClipboardPenLine,
  },
  {
    label: "เบิกเงิน",
    href: "https://docs.google.com/forms/d/e/1FAIpQLScxE2zxvT-EwHF1pKdNtKByBZk54ehqwNYMEbi_CFttiI9IFQ/viewform",
    Icon: Wallet,
  },
];

export function ReportFormsSection({ onNavigate }) {
  return (
    <section className="ownerHeaderMenuSection" aria-labelledby="report-forms-title">
      <h2 id="report-forms-title" className="ownerHeaderMenuTitle">ฟอร์มกรอกแจ้ง</h2>
      <div style={{ border: "1px solid #ECE9E1", borderRadius: 8, overflow: "hidden", background: "#FFFFFF" }}>
        {forms.map(({ label, href, Icon }, index) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer" onClick={onNavigate} className="tap" style={{ display: "flex", alignItems: "center", gap: 10, minHeight: 46, padding: "8px 10px", borderTop: index ? "1px solid #F0EEE8" : "none", textDecoration: "none", color: "#111318" }}>
            <span style={{ display: "grid", placeItems: "center", width: 30, height: 30, flexShrink: 0, borderRadius: 6, background: `${GOLD}1A`, color: GOLD_DARK }}><Icon size={16} aria-hidden="true" /></span>
            <span style={{ flex: 1, minWidth: 0, fontWeight: 700, fontSize: 12 }}>{label}</span>
            <ArrowUpRight size={15} color={GOLD_DARK} style={{ flexShrink: 0 }} aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}
