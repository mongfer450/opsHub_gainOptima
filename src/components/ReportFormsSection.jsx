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

export function ReportFormsSection() {
  return (
    <section className="wrap" style={{ marginTop: 28 }} aria-labelledby="report-forms-title">
      <h2 id="report-forms-title" className="sectionTitle" style={{ margin: "0 0 10px", fontWeight: 700 }}>ฟอร์มกรอกแจ้ง</h2>
      <div style={{ border: "1px solid #ECE9E1", borderRadius: 8, overflow: "hidden", background: "#FFFFFF" }}>
        {forms.map(({ label, href, Icon }, index) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="tap" style={{ display: "flex", alignItems: "center", gap: 12, minHeight: 62, padding: "10px 14px", borderTop: index ? "1px solid #F0EEE8" : "none", textDecoration: "none", color: "#111318" }}>
            <span style={{ display: "grid", placeItems: "center", width: 34, height: 34, flexShrink: 0, borderRadius: 8, background: `${GOLD}1A`, color: GOLD_DARK }}><Icon size={17} aria-hidden="true" /></span>
            <span style={{ flex: 1, minWidth: 0, fontWeight: 700, fontSize: 13 }}>{label}</span>
            <ArrowUpRight size={16} color={GOLD_DARK} style={{ flexShrink: 0 }} aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  );
}
