import { useState } from "react";
import { Check, Pencil, Target, X } from "lucide-react";
import { CLUB_TARGET, GOLD, GOLD_DARK, PT_TARGET } from "../config/constants";
import { fmtBaht } from "../utils/formatters";

const month = new Date();
const STORAGE_KEY = `gainOptimaOpsHubUpgradeTargets:${month.getFullYear()}-${month.getMonth() + 1}`;
const DEFAULT_TARGETS = { club: CLUB_TARGET, pt: PT_TARGET };

function readTargets() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Number(saved?.club) > 0 && Number(saved?.pt) > 0) {
      return { club: Number(saved.club), pt: Number(saved.pt) };
    }
  } catch {
    // Fall back to the configured targets if browser storage is unavailable.
  }
  return DEFAULT_TARGETS;
}

export function TargetProgress({ monthSales }) {
  const [targets, setTargets] = useState(readTargets);
  const [draft, setDraft] = useState(targets);
  const [editing, setEditing] = useState(false);

  function saveTargets(event) {
    event.preventDefault();
    const next = { club: Number(draft.club), pt: Number(draft.pt) };
    if (!Number.isFinite(next.club) || next.club <= 0 || !Number.isFinite(next.pt) || next.pt <= 0) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      return;
    }
    setTargets(next);
    setEditing(false);
  }

  function cancelEdit() {
    setDraft(targets);
    setEditing(false);
  }

  return (
    <section style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
        <div className="sectionTitle" style={{ fontWeight: 700 }}>เป้าหมายเดือนนี้</div>
        {!editing && (
          <button type="button" onClick={() => setEditing(true)} aria-label="แก้ไขเป้าหมาย" title="แก้ไขเป้าหมาย" className="tap" style={iconButtonStyle}>
            <Pencil size={16} />
          </button>
        )}
      </div>
      <div className="targetPanel" style={{ background: "#FFFFFF", border: "1px solid #ECE9E1", borderRadius: 16 }}>
        {editing ? (
          <form onSubmit={saveTargets}>
            <div className="targetInputs">
              <TargetInput label="เป้ายอดขายรวม" value={draft.club} onChange={(value) => setDraft({ ...draft, club: value })} />
              <TargetInput label="เป้า PT" value={draft.pt} onChange={(value) => setDraft({ ...draft, pt: value })} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 14 }}>
              <button type="button" onClick={cancelEdit} className="tap" style={commandButtonStyle}><X size={14} /> ยกเลิก</button>
              <button type="submit" className="tap" style={{ ...commandButtonStyle, background: GOLD_DARK, color: "#FFFFFF", borderColor: GOLD_DARK }}><Check size={14} /> บันทึก</button>
            </div>
          </form>
        ) : (
          <>
            <ProgressRow label="ยอดขายรวม" value={monthSales.club} target={targets.club} suffix="ของเป้า" />
            <div style={{ height: 1, background: "#F0EEE8", margin: "16px 0" }} />
            <ProgressRow label="เป้าหมาย PT" value={monthSales.pt} target={targets.pt} suffix="ของเป้า PT" />
          </>
        )}
      </div>
    </section>
  );
}

function TargetInput({ label, value, onChange }) {
  return (
    <label style={{ display: "grid", gap: 6, fontSize: 12, fontWeight: 600, minWidth: 0 }}>
      {label}
      <input type="number" min="1" step="1" required value={value} onChange={(event) => onChange(event.target.value)} style={{ width: "100%", minWidth: 0, padding: "10px 12px", fontSize: 16, color: "#111318", border: "1px solid #D9D6CE", borderRadius: 8, fontFamily: "inherit" }} />
    </label>
  );
}

function ProgressRow({ label, value, target, suffix }) {
  const pct = Math.min(100, Math.round((value / target) * 100));
  return (
    <>
      <div className="targetRow" style={{ marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
          <Target size={14} color={GOLD_DARK} style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 12.5, fontWeight: 600 }}>{label}</span>
        </div>
        <span style={{ fontSize: 12, color: "#9CA3AF" }}>
          <b style={{ color: GOLD_DARK, fontFamily: "'Space Grotesk', sans-serif" }}>{fmtBaht(value)}</b> / {fmtBaht(target)}
        </span>
      </div>
      <div style={{ height: 10, background: "#F0EEE8", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${GOLD_DARK}, ${GOLD})`, borderRadius: 6 }} />
      </div>
      <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 6 }}>
        ทำได้แล้ว {pct}% {suffix} · เหลืออีก {fmtBaht(Math.max(0, target - value))}
      </div>
    </>
  );
}

const iconButtonStyle = {
  display: "grid",
  placeItems: "center",
  width: 32,
  height: 32,
  border: "1px solid #ECE9E1",
  borderRadius: 8,
  background: "#FFFFFF",
  color: GOLD_DARK,
  cursor: "pointer",
};

const commandButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 5,
  minHeight: 36,
  padding: "7px 12px",
  border: "1px solid #D9D6CE",
  borderRadius: 8,
  background: "#FFFFFF",
  color: "#111318",
  fontFamily: "inherit",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
};
