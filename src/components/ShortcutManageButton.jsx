import { useState } from "react";
import { Settings2 } from "lucide-react";
import { GOLD_DARK, SHORTCUTS_SHEET_GID, SHORTCUTS_SHEET_ID, SHORTCUTS_WEB_APP_URL } from "../config/constants";
import { ShortcutEditor } from "./ShortcutEditor";

const sheetUrl = `https://docs.google.com/spreadsheets/d/${SHORTCUTS_SHEET_ID}/edit?gid=${SHORTCUTS_SHEET_GID}`;

export function ShortcutManageButton({ shortcuts, onChanged }) {
  const [managing, setManaging] = useState(false);
  const style = { display: "grid", placeItems: "center", width: 32, height: 32, flexShrink: 0, border: "1px solid #ECE9E1", borderRadius: 8, background: "#FFFFFF", color: GOLD_DARK, cursor: "pointer", textDecoration: "none" };

  return (
    <>
      {SHORTCUTS_WEB_APP_URL ? (
        <button type="button" onClick={() => setManaging(true)} className="tap" aria-label="จัดการลิงก์" title="จัดการลิงก์" style={style}>
          <Settings2 size={16} />
        </button>
      ) : (
        <a href={sheetUrl} target="_blank" rel="noopener noreferrer" className="tap" aria-label="แก้ไขลิงก์ใน Google Sheet" title="แก้ไขลิงก์ใน Google Sheet" style={style}>
          <Settings2 size={16} />
        </a>
      )}
      {managing && <ShortcutEditor shortcuts={shortcuts} onClose={() => setManaging(false)} onSaved={onChanged} />}
    </>
  );
}
