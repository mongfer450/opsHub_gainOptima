import { ATTENDANCE_SHEET_ID, ATTENDANCE_SHEET_GID, SALES_SHEET_ID, SALES_SHEET_GID } from "../config/constants";
import { parseGvizDate } from "../utils/formatters";
import { summarizeSales } from "../utils/sales";

function parseGvizResponse(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < start) throw new Error("รูปแบบข้อมูลจาก Google Sheets ไม่ถูกต้อง");
  const response = JSON.parse(text.slice(start, end + 1));
  if (response.status !== "ok") throw new Error(response.errors?.[0]?.message || "อ่าน Google Sheets ไม่สำเร็จ");
  return response.table?.rows || [];
}

async function fetchGviz(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (response.status === 401 || response.status === 403) {
    throw new Error("ชีตยังไม่อนุญาตให้เว็บแอปอ่านข้อมูล");
  }
  if (!response.ok) throw new Error(`Google Sheets ตอบกลับ ${response.status}`);
  return parseGvizResponse(await response.text());
}

export async function fetchSalesDashboard(now = new Date()) {
  const url = `https://docs.google.com/spreadsheets/d/${SALES_SHEET_ID}/gviz/tq?tqx=out:json&gid=${SALES_SHEET_GID}&tq=${encodeURIComponent("select A,B,D,E,F,H,I")}`;
  const rows = await fetchGviz(url);
  const records = rows.map(({ c = [] }) => ({
    date: parseGvizDate(c[0]?.v),
    type: c[1]?.v,
    package: c[2]?.v,
    price: c[3]?.v,
    adjustedPrice: c[4]?.v,
    customerType: c[5]?.v,
    employee: c[6]?.v,
  }));
  return summarizeSales(records, now);
}

export async function fetchTodayAttendance() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Bangkok", year: "numeric", month: "2-digit", day: "2-digit" })
      .formatToParts(new Date())
      .map(({ type, value }) => [type, value])
  );
  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);
  const start = `${year}-${parts.month}-${parts.day}`;
  const nextDate = new Date(Date.UTC(year, month - 1, day + 1));
  const end = `${nextDate.getUTCFullYear()}-${String(nextDate.getUTCMonth() + 1).padStart(2, "0")}-${String(nextDate.getUTCDate()).padStart(2, "0")}`;
  const query = `select A,B where A >= datetime '${start} 00:00:00' and A < datetime '${end} 00:00:00' order by A`;
  const url = `https://docs.google.com/spreadsheets/d/${ATTENDANCE_SHEET_ID}/gviz/tq?tqx=out:json&gid=${ATTENDANCE_SHEET_GID}&tq=${encodeURIComponent(query)}`;
  let rows;
  try {
    rows = await fetchGviz(url);
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("เว็บอ่านชีตเช็คชื่อไม่ได้ กรุณาตรวจสิทธิ์การแชร์ชีต");
    }
    throw error;
  }
  return rows
    .map((row) => ({ date: parseGvizDate(row.c?.[0]?.v), name: row.c?.[1]?.v }))
    .filter((item) => item.date && item.name && item.date.getFullYear() === year && item.date.getMonth() + 1 === month && item.date.getDate() === day)
    .sort((a, b) => a.date - b.date);
}
