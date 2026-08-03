import { fmtThaiDate, fmtTime } from "../utils/formatters";

export function AttendanceSection({ attendanceToday, loading }) {
  return (
    <div className="wrap" style={{ marginTop: 20 }}>
      <div className="sectionTitle" style={{ fontWeight: 700, marginBottom: 10 }}>
        การเข้างานวันที่ {fmtThaiDate(new Date())}
      </div>
      {loading ? (
        <div style={{ padding: 16, fontSize: 12.5, color: "#9CA3AF", background: "#FFFFFF", border: "1px solid #ECE9E1", borderRadius: 16 }}>
          กำลังโหลด...
        </div>
      ) : attendanceToday.length === 0 ? (
        <div style={{ padding: 16, fontSize: 12.5, color: "#9CA3AF", background: "#FFFFFF", border: "1px solid #ECE9E1", borderRadius: 16 }}>
          ยังไม่มีใครเช็คอินวันนี้
        </div>
      ) : (
        <div className="attendanceGrid">
          {attendanceToday.map((row, i) => (
            <div key={i} className="attendanceChip">
              <span style={{ fontSize: 12.5, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row.name}</span>
              <span style={{ fontSize: 11, color: "#9CA3AF", fontFamily: "'Space Grotesk', sans-serif", flexShrink: 0 }}>{fmtTime(row.date)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
