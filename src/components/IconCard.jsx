import { GOLD, GOLD_DARK } from "../config/constants";

export function IconCard({ icon: Icon, label, description, onClick, href }) {
  const content = (
    <>
      <div className="iconCardIcon" style={{ borderRadius: 14, background: `${GOLD}1A`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={18} color={GOLD_DARK} />
      </div>
      <div style={{ fontSize: 11.5, fontWeight: 700, textAlign: "center", lineHeight: 1.25 }}>{label}</div>
      <div style={{ fontSize: 9, color: "#9CA3AF", textAlign: "center", lineHeight: 1.25 }}>{description}</div>
    </>
  );

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    textDecoration: "none",
    color: "#111318",
    background: "#FFFFFF",
    border: "1px solid #ECE9E1",
    borderRadius: 18,
    boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
    cursor: "pointer",
    fontFamily: "inherit",
  };

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="tap iconCard" style={style}>
        {content}
      </a>
    );
  }
  return (
    <button onClick={onClick} className="tap iconCard" style={style}>
      {content}
    </button>
  );
}
