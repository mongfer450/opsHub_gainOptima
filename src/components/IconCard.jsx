import { GOLD, GOLD_DARK } from "../config/constants";
import { Pencil, Trash2 } from "lucide-react";

export function IconCard({ icon: Icon, label, description, onClick, href, editMode = false, onEdit, onDelete }) {
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
    position: "relative",
  };

  const controls = editMode ? (
    <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 5 }}>
      <button type="button" aria-label={`แก้ไข ${label}`} onClick={(event) => handleControlClick(event, onEdit)} className="tap" style={controlButtonStyle}>
        <Pencil size={12} color={GOLD_DARK} />
      </button>
      <button type="button" aria-label={`ลบ ${label}`} onClick={(event) => handleControlClick(event, onDelete)} className="tap" style={controlButtonStyle}>
        <Trash2 size={12} color="#DC2626" />
      </button>
    </div>
  ) : null;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="tap iconCard" style={style}>
        {controls}
        {content}
      </a>
    );
  }
  return (
    <button onClick={onClick} className="tap iconCard" style={style}>
      {controls}
      {content}
    </button>
  );
}

function handleControlClick(event, callback) {
  event.preventDefault();
  event.stopPropagation();
  callback?.();
}

const controlButtonStyle = {
  width: 26,
  height: 26,
  borderRadius: "50%",
  border: "1px solid #ECE9E1",
  background: "#FFFFFF",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  padding: 0,
};
