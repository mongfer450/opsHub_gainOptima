import { GAIN_LOGO } from "../assets/logos";
import { GOLD, GOLD_DARK } from "../config/constants";
import { ShortcutIcon } from "./ShortcutIcon";

export function Header({ shortcuts = [] }) {
  const headerShortcuts = shortcuts.filter((item) => item.enabled && item.placement === "header");
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
      <div className="wrap" style={{ paddingTop: 12, paddingBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
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
            <div style={{ minWidth: 0 }}>
              <div className="titleBrand" style={{ color: "#EFE2BC", whiteSpace: "nowrap" }}>Gain Optima</div>
              <div className="titleMain" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#FFFFFF", overflowWrap: "anywhere" }}>
                Owner Console
              </div>
            </div>
          </div>
          {headerShortcuts.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flexShrink: 0 }}>
              {headerShortcuts.map((item) => <HeaderLink key={item.id} shortcut={item} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function HeaderLink({ shortcut }) {
  return (
    <a
      href={shortcut.url}
      target="_blank"
      rel="noopener noreferrer"
      className="tap"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        minHeight: 34,
        textDecoration: "none",
        background: "#FFFFFF",
        borderRadius: 8,
        padding: "6px 8px",
      }}
    >
      <ShortcutIcon name={shortcut.icon} size={16} />
      <span style={{ fontSize: 11, fontWeight: 700, color: "#111318", whiteSpace: "nowrap" }}>{shortcut.label}</span>
    </a>
  );
}
