const SHORTCUT_SHEET_ID = "1vFQAZLiQtGnEgiacK3zE48qNyrFD70Y16Kb3639Lt4g";
const SHORTCUT_TAB = "Shortcuts";
const SHORTCUT_HEADERS = ["ID", "Label", "URL", "Description", "Icon", "Placement", "SortOrder", "Enabled"];

function shortcutSheet_() {
  const sheet = SpreadsheetApp.openById(SHORTCUT_SHEET_ID).getSheetByName(SHORTCUT_TAB);
  if (!sheet) throw new Error("ไม่พบแท็บ Shortcuts");
  const headers = sheet.getRange(1, 1, 1, SHORTCUT_HEADERS.length).getValues()[0];
  if (headers.join("|") !== SHORTCUT_HEADERS.join("|")) throw new Error("หัวตาราง Shortcuts ไม่ตรงกับระบบ");
  return sheet;
}

function shortcutRows_() {
  const sheet = shortcutSheet_();
  if (sheet.getLastRow() < 2) return [];
  return sheet.getRange(2, 1, sheet.getLastRow() - 1, SHORTCUT_HEADERS.length).getValues()
    .filter((row) => row[0])
    .map((row) => ({
      id: String(row[0]),
      label: String(row[1]),
      url: String(row[2]),
      description: String(row[3] || ""),
      icon: String(row[4] || "link"),
      placement: String(row[5] || "list"),
      sortOrder: Number(row[6]) || 0,
      enabled: row[7] === true || String(row[7]).toLowerCase() === "true",
    }));
}

function jsonp_(callback, value) {
  if (!/^shortcutCallback_[A-Za-z0-9_]{1,100}$/.test(callback || "")) {
    return ContentService.createTextOutput("Invalid callback");
  }
  return ContentService.createTextOutput(callback + "(" + JSON.stringify(value) + ");")
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  try {
    if (params.action === "status") {
      if (!/^[a-f0-9-]{36}$/.test(params.requestId || "")) throw new Error("Request ID ไม่ถูกต้อง");
      const result = CacheService.getScriptCache().get("shortcut:" + params.requestId);
      return jsonp_(params.callback, result ? JSON.parse(result) : { pending: true });
    }
    return jsonp_(params.callback, { ok: true, items: shortcutRows_() });
  } catch (error) {
    return jsonp_(params.callback, { ok: false, error: error.message });
  }
}

function validateShortcut_(item) {
  const id = String(item.id || "").trim();
  const label = String(item.label || "").trim();
  const url = String(item.url || "").trim();
  const description = String(item.description || "").trim();
  const icon = String(item.icon || "link").trim();
  const placement = String(item.placement || "list").trim();
  const sortOrder = Number(item.sortOrder);
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(id)) throw new Error("ID ไม่ถูกต้อง");
  if (!label || label.length > 100 || /^[=+@-]/.test(label)) throw new Error("ชื่อลิงก์ไม่ถูกต้อง");
  if (!/^https:\/\/[A-Za-z0-9]/i.test(url) || url.length > 2000) throw new Error("ใช้ลิงก์ https เท่านั้น");
  if (description.length > 180 || /^[=+@-]/.test(description)) throw new Error("คำอธิบายไม่ถูกต้อง");
  if (!/^(gymmo|list|trending|calculator|wallet|folder|link)$/.test(icon)) throw new Error("ไอคอนไม่ถูกต้อง");
  if (placement !== "header" && placement !== "list") throw new Error("ตำแหน่งไม่ถูกต้อง");
  if (!Number.isInteger(sortOrder) || sortOrder < 0 || sortOrder > 9999) throw new Error("ลำดับไม่ถูกต้อง");
  return [id, label, url, description, icon, placement, sortOrder, item.enabled === true];
}

function changeShortcut_(action, item) {
  const sheet = shortcutSheet_();
  const lastRow = sheet.getLastRow();
  const ids = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, 1).getValues().flat().map(String) : [];
  const index = ids.indexOf(String(item.id));
  if (action === "delete") {
    if (index < 0) throw new Error("ไม่พบลิงก์ที่ต้องการลบ");
    sheet.deleteRow(index + 2);
    return;
  }
  if (action !== "upsert") throw new Error("คำสั่งไม่ถูกต้อง");
  const values = validateShortcut_(item);
  if (index < 0) sheet.appendRow(values);
  else sheet.getRange(index + 2, 1, 1, SHORTCUT_HEADERS.length).setValues([values]);
}

function doPost(e) {
  const params = e && e.parameter ? e.parameter : {};
  const requestId = String(params.requestId || "");
  if (!/^[a-f0-9-]{36}$/.test(requestId)) return ContentService.createTextOutput("Invalid request");
  let result;
  try {
    const expectedToken = PropertiesService.getScriptProperties().getProperty("SHORTCUT_ADMIN_TOKEN");
    if (!expectedToken || expectedToken.length < 20) throw new Error("ยังไม่ตั้งรหัสผู้ดูแลใน Script Properties");
    if (String(params.token || "") !== expectedToken) throw new Error("รหัสผู้ดูแลไม่ถูกต้อง");
    const item = JSON.parse(params.shortcut || "{}");
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      changeShortcut_(params.action, item);
      SpreadsheetApp.flush();
    } finally {
      lock.releaseLock();
    }
    result = { ok: true };
  } catch (error) {
    result = { ok: false, error: error.message };
  }
  CacheService.getScriptCache().put("shortcut:" + requestId, JSON.stringify(result), 300);
  return ContentService.createTextOutput("OK");
}
