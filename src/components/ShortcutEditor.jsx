import { useState } from "react";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { GOLD_DARK, SHORTCUTS_WEB_APP_URL } from "../config/constants";
import { saveShortcut } from "../services/shortcuts";
import { ShortcutIcon } from "./ShortcutIcon";

const ICON_OPTIONS = [
  ["link", "ลิงก์"],
  ["gymmo", "Gymmo"],
  ["list", "รายการ"],
  ["trending", "ยอดขาย"],
  ["calculator", "คำนวณ"],
  ["wallet", "ค่าใช้จ่าย"],
  ["folder", "โฟลเดอร์"],
];

function blankShortcut(shortcuts) {
  return {
    id: crypto.randomUUID().replaceAll("-", ""),
    label: "",
    url: "",
    description: "",
    icon: "link",
    placement: "list",
    sortOrder: Math.max(0, ...shortcuts.map((item) => Number(item.sortOrder) || 0)) + 10,
    enabled: true,
  };
}

export function ShortcutEditor({ shortcuts, onClose, onSaved }) {
  const [draft, setDraft] = useState(null);
  const [adminToken, setAdminToken] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    if (!adminToken.trim()) {
      setError("กรุณาใส่รหัสผู้ดูแล");
      return;
    }
    if (!draft.url.startsWith("https://")) {
      setError("ลิงก์ต้องขึ้นต้นด้วย https://");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const items = await saveShortcut("upsert", draft, adminToken);
      onSaved(items);
      setDraft(null);
    } catch (cause) {
      setError(cause.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove(item) {
    if (!adminToken.trim()) {
      setError("กรุณาใส่รหัสผู้ดูแล");
      return;
    }
    if (!window.confirm(`ลบลิงก์ "${item.label}"?`)) return;
    setSaving(true);
    setError("");
    try {
      const items = await saveShortcut("delete", { id: item.id }, adminToken);
      onSaved(items);
      if (draft?.id === item.id) setDraft(null);
    } catch (cause) {
      setError(cause.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }} style={{ position: "fixed", inset: 0, zIndex: 40, display: "grid", placeItems: "center", padding: 16, background: "rgba(17,19,24,.55)" }}>
      <div role="dialog" aria-modal="true" aria-label="จัดการลิงก์" style={{ width: "min(100%, 620px)", maxHeight: "min(90vh, 760px)", overflowY: "auto", background: "#FFFFFF", borderRadius: 8, padding: "18px", boxShadow: "0 16px 40px rgba(0,0,0,.18)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 17 }}>จัดการลิงก์</h2>
          <button type="button" onClick={onClose} aria-label="ปิด" title="ปิด" style={iconButton}><X size={17} /></button>
        </div>
        {!SHORTCUTS_WEB_APP_URL && <div role="alert" style={errorStyle}>ยังไม่เชื่อมระบบจัดการลิงก์</div>}
        <label style={fieldStyle}>
          รหัสผู้ดูแล
          <input type="password" autoComplete="off" value={adminToken} onChange={(event) => setAdminToken(event.target.value)} style={inputStyle} />
        </label>
        {error && <div role="alert" style={errorStyle}>{error}</div>}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "18px 0 8px" }}>
          <h3 style={{ margin: 0, fontSize: 13 }}>ลิงก์ทั้งหมด</h3>
          <button type="button" onClick={() => { setDraft(blankShortcut(shortcuts)); setError(""); }} disabled={!SHORTCUTS_WEB_APP_URL || saving} style={commandButton}><Plus size={15} /> เพิ่มลิงก์</button>
        </div>
        <div style={{ borderTop: "1px solid #ECE9E1" }}>
          {shortcuts.map((item) => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 0", borderBottom: "1px solid #ECE9E1" }}>
              <ShortcutIcon name={item.icon} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, overflowWrap: "anywhere" }}>{item.label}</div>
                <div style={{ fontSize: 10.5, color: "#8B919D" }}>{item.placement === "header" ? "ส่วนหัว" : "รายการ"}{item.enabled ? "" : " · ซ่อน"}</div>
              </div>
              <button type="button" onClick={() => { setDraft({ ...item }); setError(""); }} disabled={!SHORTCUTS_WEB_APP_URL || saving} aria-label={`แก้ไข ${item.label}`} title="แก้ไข" style={iconButton}><Pencil size={15} /></button>
              <button type="button" onClick={() => remove(item)} disabled={!SHORTCUTS_WEB_APP_URL || saving} aria-label={`ลบ ${item.label}`} title="ลบ" style={{ ...iconButton, color: "#B42318" }}><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
        {draft && (
          <form onSubmit={submit} style={{ marginTop: 18, borderTop: "1px solid #ECE9E1", paddingTop: 16 }}>
            <h3 style={{ margin: "0 0 12px", fontSize: 13 }}>{shortcuts.some((item) => item.id === draft.id) ? "แก้ไขลิงก์" : "เพิ่มลิงก์"}</h3>
            <div style={{ display: "grid", gap: 12 }}>
              <Field label="ชื่อ" required value={draft.label} onChange={(value) => setDraft({ ...draft, label: value })} />
              <Field label="URL" type="url" required value={draft.url} onChange={(value) => setDraft({ ...draft, url: value })} />
              <Field label="คำอธิบาย" value={draft.description} onChange={(value) => setDraft({ ...draft, description: value })} />
              <div className="shortcutFormGrid">
                <label style={fieldStyle}>ตำแหน่ง
                  <select value={draft.placement} onChange={(event) => setDraft({ ...draft, placement: event.target.value })} style={inputStyle}>
                    <option value="list">รายการ</option>
                    <option value="header">ส่วนหัว</option>
                  </select>
                </label>
                <label style={fieldStyle}>ไอคอน
                  <select value={draft.icon} onChange={(event) => setDraft({ ...draft, icon: event.target.value })} style={inputStyle}>
                    {ICON_OPTIONS.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                  </select>
                </label>
              </div>
              <div className="shortcutFormGrid">
                <Field label="ลำดับ" type="number" min="0" max="9999" required value={draft.sortOrder} onChange={(value) => setDraft({ ...draft, sortOrder: value })} />
                <label style={{ ...fieldStyle, display: "flex", alignItems: "center", gap: 8, paddingTop: 18 }}>
                  <input type="checkbox" checked={draft.enabled} onChange={(event) => setDraft({ ...draft, enabled: event.target.checked })} />
                  แสดงลิงก์
                </label>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
              <button type="button" onClick={() => setDraft(null)} disabled={saving} style={commandButton}>ยกเลิก</button>
              <button type="submit" disabled={saving} style={{ ...commandButton, background: GOLD_DARK, borderColor: GOLD_DARK, color: "#FFFFFF" }}><Check size={15} /> {saving ? "กำลังบันทึก..." : "บันทึก"}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = "text", ...rest }) {
  return <label style={fieldStyle}>{label}<input type={type} value={value} onChange={(event) => onChange(event.target.value)} style={inputStyle} {...rest} /></label>;
}

const fieldStyle = { display: "grid", gap: 5, fontSize: 11.5, fontWeight: 700, minWidth: 0 };
const inputStyle = { width: "100%", minWidth: 0, height: 38, padding: "7px 10px", border: "1px solid #D9D6CE", borderRadius: 6, background: "#FFFFFF", color: "#111318", fontFamily: "inherit", fontSize: 13 };
const iconButton = { display: "grid", placeItems: "center", width: 30, height: 30, flexShrink: 0, border: "1px solid #ECE9E1", borderRadius: 6, background: "#FFFFFF", color: GOLD_DARK, cursor: "pointer" };
const commandButton = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, minHeight: 34, padding: "6px 10px", border: "1px solid #D9D6CE", borderRadius: 6, background: "#FFFFFF", color: "#111318", fontFamily: "inherit", fontSize: 11.5, fontWeight: 700, cursor: "pointer" };
const errorStyle = { padding: 10, marginBottom: 10, border: "1px solid #F5C7C3", borderRadius: 6, background: "#FFF1F0", color: "#A62B2B", fontSize: 11.5 };
