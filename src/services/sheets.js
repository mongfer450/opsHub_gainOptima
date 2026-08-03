import { ATTENDANCE_SHEET_ID, ATTENDANCE_SHEET_TAB, REVENUE_SHEET_ID } from "../config/constants";
import { parseGvizDate } from "../utils/formatters";

export async function fetchTodayAttendance() {
  const sheetName = encodeURIComponent(ATTENDANCE_SHEET_TAB);
  const url = `https://docs.google.com/spreadsheets/d/${ATTENDANCE_SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}&range=A2:B500`;
  const res = await fetch(url);
  const text = await res.text();
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  const json = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
  const rows = (json.table && json.table.rows) || [];
  const today = new Date();

  return rows
    .map((r) => {
      const timeCell = r.c && r.c[0];
      const nameCell = r.c && r.c[1];
      const date = timeCell ? parseGvizDate(timeCell.v) : null;
      const name = nameCell ? nameCell.v : null;
      return { date, name };
    })
    .filter(
      (item) =>
        item.date &&
        item.name &&
        item.date.getFullYear() === today.getFullYear() &&
        item.date.getMonth() === today.getMonth() &&
        item.date.getDate() === today.getDate()
    )
    .sort((a, b) => a.date - b.date);
}

async function gvizQuery(tq) {
  const sheetName = encodeURIComponent("DATA");
  const url = `https://docs.google.com/spreadsheets/d/${REVENUE_SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}&tq=${encodeURIComponent(tq)}`;
  const res = await fetch(url);
  const text = await res.text();
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  const json = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
  const rows = (json.table && json.table.rows) || [];
  return rows.map((r) => ({ label: r.c?.[0]?.v ?? null, value: r.c?.[1]?.v ?? 0 }));
}

export async function fetchEmployeeSales() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const [mbRows, ptRows] = await Promise.all([
    gvizQuery(`SELECT K, SUM(I) WHERE E = 'MB' AND C = ${month} AND D = ${year} GROUP BY K`),
    gvizQuery(`SELECT K, SUM(I) WHERE E = 'PT' AND C = ${month} AND D = ${year} GROUP BY K`),
  ]);
  const map = {};
  mbRows.forEach((r) => {
    if (!r.label) return;
    map[r.label] = map[r.label] || { mb: 0, pt: 0 };
    map[r.label].mb = r.value;
  });
  ptRows.forEach((r) => {
    if (!r.label) return;
    map[r.label] = map[r.label] || { mb: 0, pt: 0 };
    map[r.label].pt = r.value;
  });
  return Object.entries(map)
    .map(([name, v]) => ({ name, mb: v.mb, pt: v.pt }))
    .sort((a, b) => b.pt - a.pt);
}

export async function fetchTodaySales() {
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const rows = await gvizQuery(`SELECT E, SUM(I) WHERE B = date '${dateStr}' GROUP BY E`);
  let mb = 0;
  let pt = 0;
  rows.forEach((r) => {
    if (r.label === "MB") mb = r.value;
    if (r.label === "PT") pt = r.value;
  });
  return { mb, pt, club: mb + pt };
}

export async function fetchMonthSales() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const rows = await gvizQuery(`SELECT E, SUM(I) WHERE C = ${month} AND D = ${year} GROUP BY E`);
  let mb = 0;
  let pt = 0;
  rows.forEach((r) => {
    if (r.label === "MB") mb = r.value;
    if (r.label === "PT") pt = r.value;
  });
  return { mb, pt, club: mb + pt };
}

export async function fetchMemberPackages() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const [mbRows, ptRows] = await Promise.all([
    gvizQuery(`SELECT L, COUNT(A) WHERE E = 'MB' AND C = ${month} AND D = ${year} GROUP BY L`),
    gvizQuery(`SELECT L, COUNT(A) WHERE E = 'PT' AND C = ${month} AND D = ${year} GROUP BY L`),
  ]);
  const parse = (rows) => {
    const out = { newCount: 0, renewCount: 0, otherCount: 0 };
    rows.forEach((r) => {
      const label = (r.label || "").trim().toLowerCase();
      if (label === "new") out.newCount = r.value;
      else if (label === "renew") out.renewCount = r.value;
      else out.otherCount += r.value;
    });
    return out;
  };
  return { mb: parse(mbRows), pt: parse(ptRows) };
}
