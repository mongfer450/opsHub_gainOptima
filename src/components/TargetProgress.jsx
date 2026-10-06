import { useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import { CLUB_TARGET, PT_TARGET } from "../config/constants";
import { fmtBaht } from "../utils/formatters";
import { dailyTarget, targetProgress, weeklyTarget } from "../utils/targets";
import "./TargetProgress.css";

const month = new Date();
const STORAGE_KEY = `gainOptimaOpsHubUpgradeTargets:${month.getFullYear()}-${month.getMonth() + 1}`;
const DEFAULT_TARGETS = { club: CLUB_TARGET, pt: PT_TARGET };

function readTargets() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Number(saved?.club) > 0 && Number(saved?.pt) > 0 && Number(saved.pt) < Number(saved.club)) {
      return { club: Number(saved.club), pt: Number(saved.pt) };
    }
  } catch {
    // Keep the configured targets when browser storage is unavailable.
  }
  return DEFAULT_TARGETS;
}

function TargetRow({ label, actual, target, colorByStatus = false }) {
  const reached = actual >= target;
  const { percent, tier, width } = targetProgress(actual, target);
  const statusClass = colorByStatus ? ` statusTarget ${reached ? "reached" : "remaining"}` : "";

  return (
    <div className={`ownerTargetRow${statusClass}`}>
      <div className="ownerTargetRowHeader">
        <span className="ownerTargetLabel">{label}</span>
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
  const [targets, setTargets] = useState(readTargets);
  const [draft, setDraft] = useState(targets);
  const [editing, setEditing] = useState(false);
  const mbTarget = targets.club - targets.pt;

  function saveTargets(event) {
    event.preventDefault();
    const next = { club: Number(draft.club), pt: Number(draft.pt) };
    if (!Number.isFinite(next.club) || !Number.isFinite(next.pt) || next.pt <= 0 || next.pt >= next.club) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      return;
    }
    setTargets(next);
    setEditing(false);
  }

  return (
    <section className="ownerTargetsSection" aria-label="เป้าหมายยอดขาย">
      <div className="ownerTargetSummary">
        <TargetRow label="Target เดือนนี้" actual={monthSales.club || 0} target={targets.club} />
      </div>

        <div className="ownerTargetFlyout" role="region" aria-label="รายละเอียดเป้าหมาย">
          <div className="ownerTargetGroup">
            {editing ? (
              <form onSubmit={saveTargets}>
                <div className="ownerTargetEditGrid">
                  <label>เป้ายอดขายรวม<input type="number" min="1" step="1" required value={draft.club} onChange={(event) => setDraft({ ...draft, club: event.target.value })} /></label>
                  <label>เป้า PT<input type="number" min="1" max={Math.max(1, Number(draft.club) - 1)} step="1" required value={draft.pt} onChange={(event) => setDraft({ ...draft, pt: event.target.value })} /></label>
                </div>
                <div className="ownerTargetActions">
                  <button type="button" onClick={() => { setDraft(targets); setEditing(false); }}><X size={15} /> ยกเลิก</button>
                  <button type="submit"><Check size={15} /> บันทึก</button>
                </div>
              </form>
            ) : (
              <>
                <div className="ownerTargetToolbar">
                  <span>เป้าหมายเดือนนี้</span>
                  <button type="button" title="แก้ไขเป้าหมาย" aria-label="แก้ไขเป้าหมาย" onClick={() => { setDraft(targets); setEditing(true); }}><Pencil size={16} /></button>
                </div>
                <div className="ownerTargetMonthDetails">
                  <TargetRow label="PT" actual={monthSales.pt || 0} target={targets.pt} colorByStatus />
                  <TargetRow label="MB" actual={monthSales.mb || 0} target={mbTarget} colorByStatus />
                </div>
              </>
            )}
          </div>
          {!editing && (
            <div className="ownerTargetPeriodGrid">
              <div className="ownerTargetGroup"><TargetRow label="Target สัปดาห์" actual={weekSales.club || 0} target={weeklyTarget(targets.club)} colorByStatus /></div>
              <div className="ownerTargetGroup"><TargetRow label="Target วันนี้" actual={todaySales.club || 0} target={dailyTarget(new Date(), targets.club)} colorByStatus /></div>
            </div>
          )}
        </div>
    </section>
  );
}
