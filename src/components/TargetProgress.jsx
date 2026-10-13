import { useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import { CLUB_TARGET } from "../config/constants";
import { fmtBaht } from "../utils/formatters";
import { dailyTarget, targetProgress, weeklyTarget } from "../utils/targets";
import "./TargetProgress.css";

const month = new Date();
const STORAGE_KEY = `gainOptimaOpsHubUpgradeTargets:${month.getFullYear()}-${month.getMonth() + 1}`;
function readTarget() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Number(saved?.club) > 0) return Number(saved.club);
  } catch {
    // Keep the configured targets when browser storage is unavailable.
  }
  return CLUB_TARGET;
}

function TargetRow({ label, actual, target, colorByStatus = false, onEdit }) {
  const reached = actual >= target;
  const { percent, tier, width } = targetProgress(actual, target);
  const statusClass = colorByStatus ? ` statusTarget ${reached ? "reached" : "remaining"}` : "";

  return (
    <div className={`ownerTargetRow${statusClass}`}>
      <div className="ownerTargetRowHeader">
        <span className="ownerTargetLabel">
          {label}
          {onEdit && <button className="ownerTargetEditButton" type="button" title="แก้ไขเป้าหมาย" aria-label="แก้ไขเป้าหมาย" onClick={onEdit}><Pencil size={16} /></button>}
        </span>
        <span className="ownerTargetAmounts"><strong>{fmtBaht(actual)}</strong> / {fmtBaht(target)}</span>
      </div>
      <div className={`ownerTargetGauge ${colorByStatus ? `gauge-${tier}` : ""}`} role="progressbar" aria-label={`${label} ความคืบหน้า`} aria-valuenow={Math.min(percent, 100)} aria-valuemin="0" aria-valuemax="100">
        <span style={{ width }} />
      </div>
      <div className={`ownerTargetDifference ${reached ? "reached" : "remaining"}`}>
        {percent}% {reached ? actual === target ? "ถึงเป้า" : `เกิน ${fmtBaht(actual - target)}` : `ขาดอีก ${fmtBaht(target - actual)}`}
      </div>
    </div>
  );
}

export function TargetProgress({ monthSales, weekSales, todaySales }) {
  const [clubTarget, setClubTarget] = useState(readTarget);
  const [draft, setDraft] = useState(clubTarget);
  const [editing, setEditing] = useState(false);

  function saveTargets(event) {
    event.preventDefault();
    const next = Number(draft);
    if (!Number.isFinite(next) || next <= 0) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ club: next }));
    } catch {
      return;
    }
    setClubTarget(next);
    setEditing(false);
  }

  return (
    <section className="ownerTargetsSection" aria-label="เป้าหมายยอดขาย">
      <div className="ownerTargetSummary">
        {editing ? (
          <form onSubmit={saveTargets}>
            <div className="ownerTargetEditGrid">
              <label>เป้ายอดขายรวม<input type="number" min="1" step="1" required value={draft} onChange={(event) => setDraft(event.target.value)} /></label>
            </div>
            <div className="ownerTargetActions">
              <button type="button" onClick={() => { setDraft(clubTarget); setEditing(false); }}><X size={15} /> ยกเลิก</button>
              <button type="submit"><Check size={15} /> บันทึก</button>
            </div>
          </form>
        ) : (
          <TargetRow label="ยอดเดือนนี้" actual={monthSales.club || 0} target={clubTarget} onEdit={() => { setDraft(clubTarget); setEditing(true); }} />
        )}
      </div>
      <div className="ownerTargetPeriodGrid" role="region" aria-label="เป้าหมายรายสัปดาห์และรายวัน">
        <div className="ownerTargetGroup"><TargetRow label="สัปดาห์นี้" actual={weekSales.club || 0} target={weeklyTarget(clubTarget)} colorByStatus /></div>
        <div className="ownerTargetGroup"><TargetRow label="วันนี้" actual={todaySales.club || 0} target={dailyTarget(new Date(), clubTarget)} colorByStatus /></div>
      </div>
    </section>
  );
}
