import { useEffect, useState } from "react";
import { AttendanceSection } from "./components/AttendanceSection";
import { GlobalStyles } from "./components/GlobalStyles";
import { Header } from "./components/Header";
import { MemberPackagesSection } from "./components/MemberPackagesSection";
import { SalesOverview } from "./components/SalesOverview";
import { ShortcutSection } from "./components/ShortcutSection";
import {
  fetchSalesDashboard,
  fetchTodayAttendance,
} from "./services/sheets";
import { fetchShortcuts } from "./services/shortcuts";

const EMPTY_SALES = { mb: 0, pt: 0, club: 0 };
const EMPTY_PACKAGES = {
  mb: {},
  pt: {},
};

function usePollingResource(loader, onSuccess, onError, onSettled, intervalMs = 60000) {
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = await loader();
        if (!cancelled) onSuccess(result);
      } catch (error) {
        if (!cancelled) onError(error);
      } finally {
        if (!cancelled) onSettled();
      }
    }

    load();
    const interval = setInterval(load, intervalMs);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);
}

export default function OpsHubOwnerConsole() {
  const [attendanceToday, setAttendanceToday] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(true);
  const [attendanceError, setAttendanceError] = useState("");
  const [shortcuts, setShortcuts] = useState([]);
  const [shortcutsLoading, setShortcutsLoading] = useState(true);
  const [shortcutsError, setShortcutsError] = useState("");

  const [employeeSales, setEmployeeSales] = useState([]);
  const [showEmployeeDetail, setShowEmployeeDetail] = useState(false);
  const [todaySales, setTodaySales] = useState(EMPTY_SALES);
  const [monthSales, setMonthSales] = useState(EMPTY_SALES);
  const [memberPackages, setMemberPackages] = useState(EMPTY_PACKAGES);
  const [salesLoading, setSalesLoading] = useState(true);
  const [salesError, setSalesError] = useState("");

  usePollingResource(
    fetchSalesDashboard,
    (dashboard) => {
      setMonthSales(dashboard.monthSales);
      setTodaySales(dashboard.todaySales);
      setMemberPackages(dashboard.memberPackages);
      setEmployeeSales(dashboard.employeeSales);
      setSalesError("");
    },
    (error) => {
      setSalesError(error.message || "โหลดข้อมูลยอดขายไม่สำเร็จ");
      setMonthSales(EMPTY_SALES);
      setTodaySales(EMPTY_SALES);
      setMemberPackages(EMPTY_PACKAGES);
      setEmployeeSales([]);
    },
    () => setSalesLoading(false)
  );

  usePollingResource(
    fetchTodayAttendance,
    (rows) => {
      setAttendanceToday(rows);
      setAttendanceError("");
    },
    (error) => {
      setAttendanceToday([]);
      setAttendanceError(error.message || "โหลดรายการเข้างานไม่สำเร็จ");
    },
    () => setAttendanceLoading(false)
  );

  usePollingResource(
    fetchShortcuts,
    (items) => {
      setShortcuts(items);
      setShortcutsError("");
    },
    (error) => setShortcutsError(error.message || "โหลดทางลัดไม่สำเร็จ"),
    () => setShortcutsLoading(false)
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F6F3",
        color: "#111318",
        fontFamily: "'Inter','Noto Sans Thai',sans-serif",
        paddingBottom: 48,
      }}
    >
      <GlobalStyles />
      <Header shortcuts={shortcuts} />
      <SalesOverview
        monthSales={monthSales}
        monthSalesLoading={salesLoading}
        todaySales={todaySales}
        todaySalesLoading={salesLoading}
        employeeSales={employeeSales}
        error={salesError}
        showEmployeeDetail={showEmployeeDetail}
        onToggleEmployeeDetail={() => setShowEmployeeDetail((visible) => !visible)}
      />
      {!salesError && <MemberPackagesSection memberPackages={memberPackages} loading={salesLoading} />}
      <AttendanceSection attendanceToday={attendanceToday} loading={attendanceLoading} error={attendanceError} />
      <ShortcutSection
        shortcuts={shortcuts}
        loading={shortcutsLoading}
        error={shortcutsError}
        onChanged={(items) => {
          setShortcuts(items);
          setShortcutsError("");
        }}
      />
    </div>
  );
}
