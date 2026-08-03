import { useEffect, useState } from "react";
import { AttendanceSection } from "./components/AttendanceSection";
import { CategoryLinksSection } from "./components/CategoryLinksSection";
import { GlobalStyles } from "./components/GlobalStyles";
import { Header } from "./components/Header";
import { LoginGate } from "./components/LoginGate";
import { MemberPackagesSection } from "./components/MemberPackagesSection";
import { SalesOverview } from "./components/SalesOverview";
import { TargetProgress } from "./components/TargetProgress";
import {
  fetchEmployeeSales,
  fetchMemberPackages,
  fetchMonthSales,
  fetchTodayAttendance,
  fetchTodaySales,
} from "./services/sheets";

const EMPTY_SALES = { mb: 0, pt: 0, club: 0 };
const EMPTY_PACKAGES = {
  mb: { newCount: 0, renewCount: 0, otherCount: 0 },
  pt: { newCount: 0, renewCount: 0, otherCount: 0 },
};

function usePollingResource(loader, onSuccess, onError, onSettled, intervalMs = 60000) {
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const result = await loader();
        if (!cancelled) onSuccess(result);
      } catch (error) {
        onError(error);
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
  const [unlocked, setUnlocked] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  const [attendanceToday, setAttendanceToday] = useState([]);
  const [attendanceLoading, setAttendanceLoading] = useState(true);

  const [employeeSales, setEmployeeSales] = useState([]);
  const [showEmployeeDetail, setShowEmployeeDetail] = useState(false);

  const [todaySales, setTodaySales] = useState(EMPTY_SALES);
  const [todaySalesLoading, setTodaySalesLoading] = useState(true);

  const [monthSales, setMonthSales] = useState(EMPTY_SALES);
  const [monthSalesLoading, setMonthSalesLoading] = useState(true);

  const [memberPackages, setMemberPackages] = useState(EMPTY_PACKAGES);
  const [memberPackagesLoading, setMemberPackagesLoading] = useState(true);

  usePollingResource(
    fetchTodaySales,
    setTodaySales,
    (error) => console.error("โหลดยอดขายวันนี้ไม่สำเร็จ", error),
    () => setTodaySalesLoading(false)
  );

  usePollingResource(
    fetchMonthSales,
    setMonthSales,
    (error) => console.error("โหลดยอดขายเดือนนี้ไม่สำเร็จ", error),
    () => setMonthSalesLoading(false)
  );

  usePollingResource(
    fetchMemberPackages,
    setMemberPackages,
    (error) => console.error("โหลดข้อมูลสมาชิกซื้อแพ็กเกจไม่สำเร็จ", error),
    () => setMemberPackagesLoading(false)
  );

  usePollingResource(
    fetchTodayAttendance,
    setAttendanceToday,
    (error) => console.error("โหลดรายการเข้างานวันนี้ไม่สำเร็จ", error),
    () => setAttendanceLoading(false)
  );

  usePollingResource(
    fetchEmployeeSales,
    setEmployeeSales,
    (error) => console.error("โหลดยอดขายพนักงานไม่สำเร็จ", error),
    () => {}
  );

  if (!unlocked) {
    return <LoginGate onUnlock={() => setUnlocked(true)} />;
  }

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
      <Header onLogout={() => setUnlocked(false)} />
      <SalesOverview
        monthSales={monthSales}
        monthSalesLoading={monthSalesLoading}
        todaySales={todaySales}
        todaySalesLoading={todaySalesLoading}
        employeeSales={employeeSales}
        showEmployeeDetail={showEmployeeDetail}
        onToggleEmployeeDetail={() => setShowEmployeeDetail((visible) => !visible)}
      />
      <TargetProgress monthSales={monthSales} monthSalesLoading={monthSalesLoading} />
      <MemberPackagesSection memberPackages={memberPackages} loading={memberPackagesLoading} />
      <AttendanceSection attendanceToday={attendanceToday} loading={attendanceLoading} />
      <CategoryLinksSection
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        onBack={() => setActiveCategory(null)}
      />
    </div>
  );
}
