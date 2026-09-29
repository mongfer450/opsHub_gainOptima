import { ArrowUpRight, Settings2 } from "lucide-react";
import { GOLD, GOLD_DARK } from "../config/constants";
import { ShortcutIcon } from "./ShortcutIcon";
import { ShortcutEditor } from "./ShortcutEditor";
import { useState } from "react";

export function ShortcutSection({ shortcuts, loading, error, onChanged }) {
  const [managing, setManaging] = useState(false);
  const visible = shortcuts.filter((item) => item.enabled && item.placement === "list");

  return (
    <section className="wrap" style={{ marginTop: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <h2 className="sectionTitle" style={{ margin: 0, fontWeight: 700 }}>ทางลัด</h2>
        <button type="button" onClick={() => setManaging(true)} className="tap" aria-label="จัดการลิงก์" title="จัดการลิงก์" style={{ display: "grid", placeItems: "center", width: 32, height: 32, border: "1px solid #ECE9E1", borderRadius: 8, background: "#FFFFFF", color: GOLD_DARK, cursor: "pointer" }}>
          <Settings2 size={16} />
        </button>
      </div>
      {loading ? (
        <div style={messageStyle}>กำลังโหลด...</div>
      ) : error ? (
        <div role="alert" style={{ ...messageStyle, color: "#A62B2B", background: "#FFF1F0", borderColor: "#F5C7C3" }}>โหลดทางลัดไม่สำเร็จ: {error}</div>
      ) : visible.length === 0 ? (
        <div style={messageStyle}>ยังไม่มีทางลัด</div>
      ) : (
        <div style={{ border: "1px solid #ECE9E1", borderRadius: 8, overflow: "hidden", background: "#FFFFFF" }}>
          {visible.map((item, index) => (
            <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer" className="tap" style={{ display: "flex", alignItems: "center", gap: 12, minHeight: 62, padding: "10px 14px", borderTop: index ? "1px solid #F0EEE8" : "none", textDecoration: "none", color: "#111318" }}>
              <span style={{ display: "grid", placeItems: "center", width: 34, height: 34, flexShrink: 0, borderRadius: 8, background: `${GOLD}1A` }}><ShortcutIcon name={item.icon} /></span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", fontWeight: 700, fontSize: 13, overflowWrap: "anywhere" }}>{item.label}</span>
                {item.description && <span style={{ display: "block", marginTop: 2, color: "#8B919D", fontSize: 11, overflowWrap: "anywhere" }}>{item.description}</span>}
              </span>
              <ArrowUpRight size={16} color={GOLD_DARK} style={{ flexShrink: 0 }} aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
      {managing && <ShortcutEditor shortcuts={shortcuts} onClose={() => setManaging(false)} onSaved={onChanged} />}
    </section>
  );
}

const messageStyle = {
  padding: 16,
  color: "#8B919D",
  background: "#FFFFFF",
  border: "1px solid #ECE9E1",
  borderRadius: 8,
  fontSize: 12.5,
};
