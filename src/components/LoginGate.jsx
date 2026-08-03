import { useState } from "react";
import { Lock } from "lucide-react";
import { GOLD_DARK, OWNER_PASSWORD_HASH } from "../config/constants";

export function LoginGate({ onUnlock }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hash = await sha256(password);
    if (hash === OWNER_PASSWORD_HASH) onUnlock();
    else setError(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F7F6F3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: "'Inter','Noto Sans Thai',sans-serif",
      }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;500;600;700&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap');`}</style>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 340,
          background: "#FFFFFF",
          border: "1px solid #ECE9E1",
          borderRadius: 20,
          padding: "32px 28px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: `linear-gradient(120deg, #1A1712 0%, ${GOLD_DARK} 55%, #C9A227 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <Lock size={22} color="#FFFFFF" />
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 4 }}>Owner Console</div>
        <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 20 }}>กรอกรหัสผ่านเพื่อเข้าใช้งาน</div>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          autoFocus
          placeholder="รหัสผ่าน"
          style={{
            width: "100%",
            fontSize: 14,
            padding: "12px 14px",
            border: `1px solid ${error ? "#DC2626" : "#ECE9E1"}`,
            borderRadius: 12,
            outline: "none",
            fontFamily: "inherit",
            textAlign: "center",
            marginBottom: error ? 8 : 16,
          }}
        />
        {error && <div style={{ fontSize: 11.5, color: "#DC2626", marginBottom: 12 }}>รหัสผ่านไม่ถูกต้อง</div>}
        <button
          type="submit"
          style={{
            width: "100%",
            background: GOLD_DARK,
            color: "#FFFFFF",
            border: "none",
            borderRadius: 12,
            padding: "12px 0",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
}

async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
