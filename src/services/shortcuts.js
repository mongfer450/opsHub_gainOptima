import { SHORTCUTS_SHEET_GID, SHORTCUTS_SHEET_ID, SHORTCUTS_WEB_APP_URL } from "../config/constants";

function request(callbackParams) {
  if (!SHORTCUTS_WEB_APP_URL) {
    return Promise.reject(new Error("ยังไม่ได้ตั้งค่า Apps Script Web App URL"));
  }
  return new Promise((resolve, reject) => {
    const callbackName = `shortcutCallback_${crypto.randomUUID().replaceAll("-", "")}`;
    const url = new URL(SHORTCUTS_WEB_APP_URL);
    url.searchParams.set("callback", callbackName);
    url.searchParams.set("_", String(Date.now()));
    Object.entries(callbackParams).forEach(([key, value]) => url.searchParams.set(key, value));

    const script = document.createElement("script");
    const timer = setTimeout(() => finish(new Error("อ่าน Shortcut ไม่สำเร็จ กรุณาลองใหม่")), 15000);
    function finish(error, value) {
      clearTimeout(timer);
      script.remove();
      delete window[callbackName];
      if (error) reject(error);
      else resolve(value);
    }
    window[callbackName] = (data) => finish(null, data);
    script.onerror = () => finish(new Error("เชื่อมต่อ Apps Script ไม่สำเร็จ"));
    script.src = url.toString();
    document.head.appendChild(script);
  });
}

export async function fetchShortcuts() {
  const query = encodeURIComponent("select A,B,C,D,E,F,G,H");
  const url = `https://docs.google.com/spreadsheets/d/${SHORTCUTS_SHEET_ID}/gviz/tq?tqx=out:json&gid=${SHORTCUTS_SHEET_GID}&tq=${query}&_=${Date.now()}`;
  let response;
  try {
    response = await fetch(url, { cache: "no-store" });
  } catch {
    throw new Error("เว็บอ่านชีต Shortcut ไม่ได้ กรุณาตรวจสิทธิ์การแชร์ชีต");
  }
  if (!response.ok) throw new Error(`Google Sheets ตอบกลับ ${response.status}`);
  const text = await response.text();
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("รูปแบบข้อมูล Shortcut ไม่ถูกต้อง");
  const data = JSON.parse(text.slice(start, end + 1));
  if (data.status !== "ok") throw new Error(data.errors?.[0]?.message || "อ่าน Shortcut ไม่สำเร็จ");
  const items = (data.table?.rows || []).map(({ c = [] }) => ({
    id: String(c[0]?.v || ""),
    label: String(c[1]?.v || ""),
    url: String(c[2]?.v || ""),
    description: String(c[3]?.v || ""),
    icon: String(c[4]?.v || "link"),
    placement: String(c[5]?.v || "list"),
    sortOrder: Number(c[6]?.v || 0),
    enabled: c[7]?.v === true || String(c[7]?.v).toLowerCase() === "true",
  }));
  return items
    .filter((item) => item?.id && item?.label && /^https?:\/\//i.test(item.url))
    .sort((a, b) => Number(a.sortOrder) - Number(b.sortOrder));
}

export async function saveShortcut(action, shortcut, adminToken) {
  if (!SHORTCUTS_WEB_APP_URL) throw new Error("ยังไม่ได้ตั้งค่า Apps Script Web App URL");
  const requestId = crypto.randomUUID();
  const body = new URLSearchParams({
    requestId,
    action,
    token: adminToken,
    shortcut: JSON.stringify(shortcut),
  });
  await fetch(SHORTCUTS_WEB_APP_URL, { method: "POST", mode: "no-cors", body });

  for (let attempt = 0; attempt < 12; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const status = await request({ action: "status", requestId });
    if (status?.pending) continue;
    if (!status?.ok) throw new Error(status?.error || "บันทึก Shortcut ไม่สำเร็จ");
    return fetchShortcuts();
  }
  throw new Error("ยังยืนยันการบันทึกไม่ได้ กรุณาตรวจชีตแล้วลองใหม่");
}
