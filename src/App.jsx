import React, { useState } from "react";
import {
  Dumbbell,
  TrendingUp,
  Users,
  CalendarDays,
  MessageCircle,
  Megaphone,
  Settings,
  FileText,
  X,
  ExternalLink,
  Grid3x3,
} from "lucide-react";

const GOLD = "#C9A227";
const GOLD_DARK = "#7A5E12";

const sections = [
  {
    id: "revenue",
    label: "รายรับ / รายจ่าย",
    icon: TrendingUp,
    items: [
      {
        label: "Gain Optima — Revenue",
        sub: "ยอดวันนี้ + รายวันทั้งเดือน",
        href: "https://docs.google.com/spreadsheets/d/11JY-u1njafkk_zIQSX4N-FQIRvvXGoTwR9MWkNkT3s4/edit",
      },
      {
        label: "คำนวณค่าคอม_PT",
        sub: "คอมมิชชั่น PT ต่อลูกค้า",
        href: "https://docs.google.com/spreadsheets/d/1cI4VGPDGgv1vvqWy2Rrtv7fTbBygAi_l9eaAl78M8hs/edit",
      },
      {
        label: "Expense Tracking",
        sub: "เช็คลิสต์รายเดือน + Rawdata",
        href: "https://docs.google.com/spreadsheets/d/13QUTSOoUkpCxTcgVsKu9RMXyT4PQQ-MhlByaWQXxIcg/edit",
      },
    ],
  },
  {
    id: "forms",
    label: "แบบฟอร์ม",
    icon: FileText,
    groups: [
      {
        groupLabel: null,
        items: [
          {
            label: "ฟอร์มสมัคร MB",
            sub: "สมัครสมาชิก MB",
            href: "https://docs.google.com/forms/d/e/1FAIpQLSdpAkyz7xEH185jI7OHEH19JIut2jWloa8dm44pIzGW0EgC6g/viewform",
          },
          {
            label: "ฟอร์มสมัคร PT",
            sub: "สมัครแพ็กเกจ PT",
            href: "https://docs.google.com/forms/d/e/1FAIpQLSePqvl8De-2pAWmY61xVLQX-R0iRjUifkd_uBU18p9b5VKU3g/viewform",
          },
          {
            label: "ฟอร์มเบิกเงิน",
            sub: "แบบฟอร์มขอเบิกเงิน",
            href: "https://docs.google.com/forms/d/e/1FAIpQLScxE2zxvT-EwHF1pKdNtKByBZk54ehqwNYMEbi_CFttiI9IFQ/viewform",
          },
        ],
      },
      {
        groupLabel: "หลังกรอกฟอร์ม",
        items: [
          {
            label: "หลังกรอก_PT/MB/เบิกเงิน",
            sub: "ข้อมูลดิบหลังปิดการขาย",
            href: "https://docs.google.com/spreadsheets/d/1OXyNdqlLjvT1lvfE-uIZSTaVqaUoe6VfKUgaY6xDjc0/edit",
          },
          {
            label: "รายการเบิกเงิน",
            sub: "สรุปรายการเบิกเงินทั้งหมด",
            href: "https://docs.google.com/spreadsheets/u/1/d/1VilTSeJGCDTw6mnEbZGVw9GPjbXwPNTKinElossaEPc/htmlview",
          },
        ],
      },
    ],
  },
  {
    id: "attendance",
    label: "การเข้างาน",
    icon: Users,
    items: [
      {
        label: "เช็คชื่อทำงาน_DB",
        sub: "ฟอร์มเช็คชื่อเข้างาน",
        href: "https://docs.google.com/spreadsheets/d/1xH5kKeXAqNaEZzheWAFZEKdQHbsMi55AipuoTkn_PoY/edit",
      },
    ],
  },
  {
    id: "other",
    label: "ระบบอื่นๆ",
    icon: Grid3x3,
    items: [
      { label: "Google Calendar", sub: "ตารางกะ / คลาส", href: "#" },
      { label: "LINE OA", sub: "แจ้งเตือนลูกค้า", href: "#" },
      { label: "Meta Ads", sub: "แคมเปญโฆษณา", href: "#" },
      {
        label: "Hub Config",
        sub: "NAME_MAPPING",
        href: "https://docs.google.com/spreadsheets/d/1IBc3ROAygTzOjohCjflnqHPNwxcpZuphpOitYYHF9nc/edit",
      },
    ],
  },
];

function CategoryModal({ section, onClose }) {
  if (!section) return null;
  const Icon = section.icon;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#FFFFFF",
          borderRadius: "20px 20px 0 0",
          padding: "10px 20px 28px",
          maxHeight: "75vh",
          overflowY: "auto",
        }}
      >
        <div style={{ width: 36, height: 4, background: "#E5E5E5", borderRadius: 2, margin: "8px auto 18px" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: `${GOLD}22`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon size={17} color={GOLD_DARK} />
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>
              {section.label}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "#F5F5F5", border: "none", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <X size={15} color="#6B7280" />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {section.groups
            ? section.groups.map((group, gi) => (
                <div key={group.groupLabel || `group-${gi}`} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {group.groupLabel && (
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: GOLD_DARK,
                        letterSpacing: "0.04em",
                        marginTop: gi === 0 ? 0 : 6,
                        marginBottom: -2,
                      }}
                    >
                      {group.groupLabel.toUpperCase()}
                    </div>
                  )}
                  {group.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="tap"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        textDecoration: "none",
                        color: "#111318",
                        background: "#FAFAFA",
                        border: "1px solid #EFEFEF",
                        borderRadius: 14,
                        padding: "14px 16px",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 600 }}>{item.label}</div>
                        <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{item.sub}</div>
                      </div>
                      <ExternalLink size={15} color={GOLD_DARK} />
                    </a>
                  ))}
                </div>
              ))
            : section.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="tap"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textDecoration: "none",
                    color: "#111318",
                    background: "#FAFAFA",
                    border: "1px solid #EFEFEF",
                    borderRadius: 14,
                    padding: "14px 16px",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600 }}>{item.label}</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>{item.sub}</div>
                  </div>
                  <ExternalLink size={15} color={GOLD_DARK} />
                </a>
              ))}
        </div>
      </div>
    </div>
  );
}

export default function OpsHubGoldTheme() {
  const [openSection, setOpenSection] = useState(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: 480,
        margin: "0 auto",
        background: "#F7F6F3",
        color: "#111318",
        fontFamily: "'Inter','Noto Sans Thai',sans-serif",
        paddingBottom: 40,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        .tap { transition: transform 0.12s ease; }
        .tap:active { transform: scale(0.97); }
      `}</style>

      {/* Header */}
      <div
        style={{
          background: `linear-gradient(160deg, #1A1712 0%, ${GOLD_DARK} 60%, ${GOLD} 100%)`,
          padding: "26px 20px 30px",
          borderRadius: "0 0 26px 26px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#FFFFFF18",
              border: `2px solid ${GOLD}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Dumbbell size={22} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontSize: 13, color: "#EFE2BC" }}>Gain Optima</div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 19, color: "#FFFFFF" }}>
              Ops Hub
            </div>
          </div>
        </div>
      </div>

      {/* Featured: Gymmo Console */}
      <div style={{ padding: "20px 20px 0" }}>
        <a
          href="https://console.gymmo.app/th"
          className="tap"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            textDecoration: "none",
            color: "#111318",
            background: "#FFFFFF",
            border: `1px solid ${GOLD}55`,
            borderRadius: 20,
            padding: "16px 18px",
            boxShadow: "0 4px 14px rgba(201,162,39,0.15)",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
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
            <img
              src="data:image/png;base64,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"
              alt="Gymmo"
              style={{ width: 36, height: 36, objectFit: "contain" }}
            />
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

      {/* Category grid */}
      <div style={{ padding: "22px 20px 0" }}>
        <div style={{ fontSize: 13, color: "#8A8578", marginBottom: 12 }}>แตะหมวดหมู่เพื่อดูระบบที่เกี่ยวข้อง</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setOpenSection(section)}
                className="tap"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  background: "#FFFFFF",
                  border: "1px solid #ECE9E1",
                  borderRadius: 18,
                  padding: "22px 14px 16px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  color: "inherit",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 15,
                    background: `${GOLD}1A`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={24} color={GOLD_DARK} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700 }}>{section.label}</div>
                  <div style={{ fontSize: 10.5, color: "#9CA3AF", marginTop: 3 }}>
                    {(section.items ? section.items.length : section.groups.reduce((sum, g) => sum + g.items.length, 0))} ระบบ
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <CategoryModal section={openSection} onClose={() => setOpenSection(null)} />
    </div>
  );
}
