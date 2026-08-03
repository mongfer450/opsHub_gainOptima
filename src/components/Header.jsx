import { ListChecks, LogOut } from "lucide-react";
import { GAIN_LOGO, GYMMO_LOGO } from "../assets/logos";
import { GOLD, GOLD_DARK } from "../config/constants";

export function Header({ onLogout }) {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        background: `linear-gradient(120deg, #1A1712 0%, ${GOLD_DARK} 55%, ${GOLD} 100%)`,
        boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
      }}
    >
      <div className="wrap" style={{ padding: "14px 0 12px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              className="avatar"
              style={{
                borderRadius: "50%",
                background: "#FFFFFF",
                border: `2px solid ${GOLD}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                overflow: "hidden",
                padding: 3,
              }}
            >
              <img src={GAIN_LOGO} alt="Gain Optima" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div>
              <div className="titleBrand" style={{ color: "#EFE2BC", whiteSpace: "nowrap" }}>Gain Optima</div>
              <div className="titleMain" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#FFFFFF", whiteSpace: "nowrap" }}>
                Owner Console
              </div>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="tap"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "#FFFFFF14",
              border: "1px solid #FFFFFF2A",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <LogOut size={14} color="#FFFFFF" />
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <HeaderLink href="https://console.gymmo.app/th">
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "#FFFFFF",
                border: "1px solid #ECE9E1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                overflow: "hidden",
                padding: 2,
              }}
            >
              <img src={GYMMO_LOGO} alt="Gymmo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#111318", whiteSpace: "nowrap" }}>Gymmo Console</span>
          </HeaderLink>
          <HeaderLink href="https://docs.google.com/spreadsheets/d/11yqqQhfpjiDm_Trp9_8mhmP-kOXz7XrN7SZab4HL5sQ/edit?gid=1870528920#gid=1870528920">
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: `${GOLD}1A`,
                border: "1px solid #ECE9E1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <ListChecks size={13} color={GOLD_DARK} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#111318", whiteSpace: "nowrap" }}>Task Tracker</span>
          </HeaderLink>
        </div>
      </div>
    </div>
  );
}

function HeaderLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="tap"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 7,
        flex: 1,
        textDecoration: "none",
        background: "#FFFFFF",
        borderRadius: 12,
        padding: "6px 10px",
      }}
    >
      {children}
    </a>
  );
}
