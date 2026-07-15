import React, { useEffect, useState } from "react";
import {
  Dumbbell,
  TrendingUp,
  Users,
  FileText,
  UserPlus,
  Wallet,
  ClipboardList,
  Receipt,
  ClipboardCheck,
  FileSignature,
  Grid3x3,
  CalendarDays,
  MessageCircle,
  Megaphone,
  Settings,
  ExternalLink,
  ChevronLeft,
} from "lucide-react";

const GOLD = "#C9A227";
const GOLD_DARK = "#7A5E12";

const REVENUE_SHEET_ID = "11JY-u1njafkk_zIQSX4N-FQIRvvXGoTwR9MWkNkT3s4";

// อ่านค่าจากช่องเดียวใน Google Sheet แบบ real-time โดยไม่ต้องมี backend
// (ใช้ Google Visualization API — sheet ต้องแชร์เป็น "Anyone with the link can view")
async function fetchCell(range) {
  const sheetName = encodeURIComponent("สรุปรวม");
  const url = `https://docs.google.com/spreadsheets/d/${REVENUE_SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}&range=${range}`;
  const res = await fetch(url);
  const text = await res.text();
  const jsonStart = text.indexOf("{");
  const jsonEnd = text.lastIndexOf("}");
  const json = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
  const row = json.table && json.table.rows && json.table.rows[0];
  const cell = row && row.c && row.c[0];
  return cell ? cell.v : null;
}

function fmtBaht(n) {
  if (n === null || n === undefined) return "—";
  return "฿" + Number(n).toLocaleString("en-US", { maximumFractionDigits: 0 });
}

const GYMMO_LOGO =
  "data:image/png;base64,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";

const categories = [
  {
    id: "revenue",
    label: "รายรับ / รายจ่าย",
    description: "ยอดขาย คอมมิชชั่น ค่าใช้จ่าย",
    icon: TrendingUp,
    items: [
      {
        label: "Gain Optima — Revenue",
        description: "ยอดวันนี้ + รายวันทั้งเดือน",
        icon: TrendingUp,
        href: "https://docs.google.com/spreadsheets/d/11JY-u1njafkk_zIQSX4N-FQIRvvXGoTwR9MWkNkT3s4/edit",
      },
      {
        label: "คำนวณค่าคอม_PT",
        description: "คอมมิชชั่น PT ต่อลูกค้า",
        icon: TrendingUp,
        href: "https://docs.google.com/spreadsheets/d/1cI4VGPDGgv1vvqWy2Rrtv7fTbBygAi_l9eaAl78M8hs/edit",
      },
      {
        label: "Expense Tracking",
        description: "เช็คลิสต์ค่าใช้จ่ายรายเดือน",
        icon: Wallet,
        href: "https://docs.google.com/spreadsheets/d/13QUTSOoUkpCxTcgVsKu9RMXyT4PQQ-MhlByaWQXxIcg/edit",
      },
    ],
  },
  {
    id: "forms",
    label: "แบบฟอร์ม",
    description: "ฟอร์มสมัครและขอเบิกเงิน",
    icon: FileText,
    items: [
      {
        label: "ฟอร์มสมัคร MB",
        description: "สมัครสมาชิก MB",
        icon: UserPlus,
        href: "https://docs.google.com/forms/d/e/1FAIpQLSdpAkyz7xEH185jI7OHEH19JIut2jWloa8dm44pIzGW0EgC6g/viewform",
      },
      {
        label: "ฟอร์มสมัคร PT",
        description: "สมัครแพ็กเกจ PT",
        icon: Dumbbell,
        href: "https://docs.google.com/forms/d/e/1FAIpQLSePqvl8De-2pAWmY61xVLQX-R0iRjUifkd_uBU18p9b5VKU3g/viewform",
      },
      {
        label: "ฟอร์มเบิกเงิน",
        description: "แบบฟอร์มขอเบิกเงิน",
        icon: Wallet,
        href: "https://docs.google.com/forms/d/e/1FAIpQLScxE2zxvT-EwHF1pKdNtKByBZk54ehqwNYMEbi_CFttiI9IFQ/viewform",
      },
    ],
  },
  {
    id: "records",
    label: "หลังกรอกฟอร์ม",
    description: "ข้อมูลหลังปิดการขาย + รายการเบิก",
    icon: ClipboardList,
    items: [
      {
        label: "หลังกรอก_PT/MB/เบิกเงิน",
        description: "ข้อมูลดิบหลังปิดการขาย",
        icon: ClipboardList,
        href: "https://docs.google.com/spreadsheets/d/1OXyNdqlLjvT1lvfE-uIZSTaVqaUoe6VfKUgaY6xDjc0/edit",
      },
      {
        label: "รายการเบิกเงิน",
        description: "สรุปรายการเบิกเงินทั้งหมด",
        icon: Receipt,
        href: "https://docs.google.com/spreadsheets/u/1/d/1VilTSeJGCDTw6mnEbZGVw9GPjbXwPNTKinElossaEPc/htmlview",
      },
    ],
  },
  {
    id: "contracts",
    label: "สัญญา",
    description: "เอกสารสัญญา MB และ PT",
    icon: FileSignature,
    items: [
      {
        label: "สัญญา MB",
        description: "เอกสารสัญญาสมาชิก MB",
        icon: FileSignature,
        href: "https://docs.google.com/document/d/1ey2s60EYX9TZ_wu9oAQ1ZcM2Al2ULaAtWYtOLt916Yg/edit?usp=share_link",
      },
      {
        label: "สัญญา PT",
        description: "เอกสารสัญญาแพ็กเกจ PT",
        icon: FileSignature,
        href: "https://docs.google.com/document/d/1nkHuz8ydD5jjrCZD_2zGuK_RacNCnt_RdHuP3fEzrps/edit?usp=sharing",
      },
    ],
  },
  {
    id: "attendance",
    label: "การเข้างาน",
    description: "เช็คชื่อเข้างานพนักงาน",
    icon: Users,
    items: [
      {
        label: "เช็คชื่อทำงาน_DB",
        description: "ฟอร์มเช็คชื่อเข้างานดิบ",
        icon: ClipboardCheck,
        href: "https://docs.google.com/spreadsheets/d/1xH5kKeXAqNaEZzheWAFZEKdQHbsMi55AipuoTkn_PoY/edit",
      },
    ],
  },
  {
    id: "other",
    label: "ระบบอื่นๆ",
    description: "ปฏิทิน โฆษณา ตั้งค่าระบบ",
    icon: Grid3x3,
    items: [
      {
        label: "Google Calendar",
        description: "ตารางกะ / ตารางคลาส",
        icon: CalendarDays,
        href: "#",
      },
      {
        label: "LINE OA",
        description: "แจ้งเตือนลูกค้า",
        icon: MessageCircle,
        href: "#",
      },
      {
        label: "Meta Ads",
        description: "แคมเปญโฆษณา",
        icon: Megaphone,
        href: "#",
      },
      {
        label: "Hub Config",
        description: "NAME_MAPPING + Shortcut Links",
        icon: Settings,
        href: "https://docs.google.com/spreadsheets/d/1IBc3ROAygTzOjohCjflnqHPNwxcpZuphpOitYYHF9nc/edit",
      },
    ],
  },
];

// การ์ดแบบเดียวกันทั้งหมด — ไอคอนบน + ชื่อ + คำอธิบายสั้นๆ
// ใช้ทั้งการ์ดหมวดหมู่ (หน้าแรก) และการ์ดลิงก์ (หลังคลิกเข้าหมวด)
function IconCard({ icon: Icon, label, description, onClick, href }) {
  const content = (
    <>
      <div className="iconCardIcon" style={{ borderRadius: 14, background: `${GOLD}1A`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={22} color={GOLD_DARK} />
      </div>
      <div style={{ fontSize: 13.5, fontWeight: 700, textAlign: "center", lineHeight: 1.3 }}>{label}</div>
      <div style={{ fontSize: 10.5, color: "#9CA3AF", textAlign: "center", lineHeight: 1.3 }}>{description}</div>
    </>
  );

  const style = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    textDecoration: "none",
    color: "#111318",
    background: "#FFFFFF",
    border: "1px solid #ECE9E1",
    borderRadius: 18,
    boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
    cursor: "pointer",
    fontFamily: "inherit",
  };

  if (href) {
    return (
      <a href={href} className="tap iconCard" style={style}>
        {content}
      </a>
    );
  }
  return (
    <button onClick={onClick} className="tap iconCard" style={style}>
      {content}
    </button>
  );
}

export default function OpsHubOwnerConsole() {
  const [clubSales, setClubSales] = useState(null);
  const [ptSales, setPtSales] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [club, pt] = await Promise.all([fetchCell("A5"), fetchCell("C7")]);
        if (!cancelled) {
          setClubSales(club);
          setPtSales(pt);
        }
      } catch (e) {
        console.error("โหลดยอดขาย real-time ไม่สำเร็จ", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    const interval = setInterval(load, 60000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        .tap { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .tap:active { transform: scale(0.97); }

        .wrap { max-width: 1040px; margin: 0 auto; padding: 0 20px; }
        .headerInner { padding: 12px 0; display: flex; align-items: center; justify-content: center; flex-wrap: nowrap; gap: 24px; }
        .avatar { width: 32px; height: 32px; flex-shrink: 0; }
        .titleBrand { font-size: 10px; }
        .titleMain { font-size: 13px; }
        .sectionTitle { font-size: 14px; }
        .sectionIcon { width: 15px; height: 15px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .iconCard { padding: 20px 12px 16px; }
        .iconCardIcon { width: 48px; height: 48px; }
        .dashRow { display: flex; gap: 8px; flex-shrink: 1; min-width: 0; }
        .dashCard { padding: 8px 12px; min-width: 0; }
        .dashLabel { font-size: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .dashValue { font-size: 13px; white-space: nowrap; }
        .labelFull { display: none; }
        .labelShort { display: inline; }
        .gymmoBanner { padding: 16px 18px; }
        .gymmoLogo { width: 52px; height: 52px; }

        @media (min-width: 640px) {
          .avatar { width: 40px; height: 40px; }
          .titleBrand { font-size: 12px; }
          .titleMain { font-size: 16px; }
          .dashCard { padding: 10px 14px; }
          .dashLabel { font-size: 10px; }
          .dashValue { font-size: 16px; }
          .labelFull { display: inline; }
          .labelShort { display: none; }
        }

        @media (min-width: 720px) {
          .headerInner { padding: 16px 0; gap: 16px; justify-content: space-between; }
          .avatar { width: 42px; height: 42px; }
          .titleMain { font-size: 17px; }
          .sectionTitle { font-size: 17px; }
          .sectionIcon { width: 18px; height: 18px; }
          .grid { grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 16px; }
          .iconCard { padding: 26px 16px 20px; }
          .iconCardIcon { width: 56px; height: 56px; }
          .tap:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.06); }
          .wrap { padding: 0 40px; }
          .dashCard { padding: 8px 16px; }
        }
      `}</style>

      {/* Header (frozen) + Real-time dashboard */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: `linear-gradient(120deg, #1A1712 0%, ${GOLD_DARK} 55%, ${GOLD} 100%)`,
          borderRadius: "0 0 26px 26px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        }}
      >
        <div className="wrap headerInner">
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div
              className="avatar"
              style={{
                borderRadius: "50%",
                background: "#FFFFFF18",
                border: `2px solid ${GOLD}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Dumbbell size={16} color="#FFFFFF" />
            </div>
            <div>
              <div className="titleBrand" style={{ color: "#EFE2BC", whiteSpace: "nowrap" }}>Gain Optima</div>
              <div
                className="titleMain"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#FFFFFF", whiteSpace: "nowrap" }}
              >
                Owner Console
              </div>
            </div>
          </div>

          {/* Mini dashboard: ยอดขายคลับ + ยอดขายทีม PT — อยู่แถวเดียวกับหัวข้อ ไม่ตัดบรรทัด */}
          <div className="dashRow">
            <div className="dashCard tap" style={{ background: "#FFFFFF14", border: "1px solid #FFFFFF2A", borderRadius: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ADE80", flexShrink: 0 }} />
                <span className="dashLabel" style={{ color: "#EFE2BC", letterSpacing: "0.01em" }}>
                  <span className="labelShort">คลับ</span>
                  <span className="labelFull">ยอดขายคลับ · REAL-TIME</span>
                </span>
              </div>
              <div className="dashValue" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#FFFFFF" }}>
                {loading ? "…" : fmtBaht(clubSales)}
              </div>
            </div>
            <div className="dashCard tap" style={{ background: "#FFFFFF14", border: "1px solid #FFFFFF2A", borderRadius: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ADE80", flexShrink: 0 }} />
                <span className="dashLabel" style={{ color: "#EFE2BC", letterSpacing: "0.01em" }}>
                  <span className="labelShort">ทีม PT</span>
                  <span className="labelFull">ยอดขายทีม PT · REAL-TIME</span>
                </span>
              </div>
              <div className="dashValue" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#FFFFFF" }}>
                {loading ? "…" : fmtBaht(ptSales)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        {activeCategory === null ? (
          <>
            {/* Featured: Gymmo Console — ลิงก์เดียว กดครั้งเดียวเข้าเลย */}
            <div style={{ marginTop: 24 }}>
              <a
                href="https://console.gymmo.app/th"
                className="tap gymmoBanner"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  textDecoration: "none",
                  color: "#111318",
                  background: "#FFFFFF",
                  border: `1px solid ${GOLD}55`,
                  borderRadius: 20,
                  boxShadow: "0 4px 14px rgba(201,162,39,0.15)",
                  maxWidth: 460,
                }}
              >
                <div
                  className="gymmoLogo"
                  style={{
                    borderRadius: 14,
                    background: "#FFFFFF",
                    border: "1px solid #ECE9E1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  <img src={GYMMO_LOGO} alt="Gymmo" style={{ width: "70%", height: "70%", objectFit: "contain" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: GOLD_DARK, fontWeight: 700, letterSpacing: "0.03em" }}>
                    FITNESS MANAGEMENT
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>Gymmo Console</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 1 }}>สมาชิก · ธุรกรรม · บิลลิ่ง</div>
                </div>
                <ExternalLink size={16} color={GOLD_DARK} />
              </a>
            </div>

            {/* หน้าแรก: การ์ดหมวดหมู่ — ไอคอน + ชื่อ + คำอธิบายสั้นๆ */}
            <div style={{ marginTop: 32 }}>
              <div className="grid">
                {categories.map((cat) => (
                  <IconCard
                    key={cat.id}
                    icon={cat.icon}
                    label={cat.label}
                    description={cat.description}
                    onClick={() => setActiveCategory(cat.id)}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* หลังคลิกหมวด: การ์ดลิงก์แต่ละอัน — ไอคอน + ชื่อ + คำอธิบายสั้นๆ */}
            <div style={{ marginTop: 24, display: "flex", alignItems: "center", gap: 8 }}>
              <button
                onClick={() => setActiveCategory(null)}
                className="tap"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "#FFFFFF",
                  border: "1px solid #ECE9E1",
                  cursor: "pointer",
                }}
              >
                <ChevronLeft size={18} color={GOLD_DARK} />
              </button>
              <div className="sectionTitle" style={{ fontWeight: 700 }}>
                {categories.find((c) => c.id === activeCategory)?.label}
              </div>
            </div>
            <div className="grid" style={{ marginTop: 16 }}>
              {categories
                .find((c) => c.id === activeCategory)
                ?.items.map((item) => (
                  <IconCard key={item.label} icon={item.icon} label={item.label} description={item.description} href={item.href} />
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
