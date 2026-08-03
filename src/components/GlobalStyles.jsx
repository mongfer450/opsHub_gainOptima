export function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap');
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      .tap { transition: transform 0.15s ease, box-shadow 0.15s ease; }
      .tap:active { transform: scale(0.97); }

      .wrap { max-width: 1040px; margin: 0 auto; padding: 0 20px; }
      .avatar { width: 32px; height: 32px; flex-shrink: 0; }
      .titleBrand { font-size: 10px; }
      .titleMain { font-size: 13px; }
      .sectionTitle { font-size: 14px; }
      .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
      .attendanceGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
      .attendanceChip { display: flex; align-items: baseline; justify-content: center; gap: 5px; background: #FFFFFF; border: 1px solid #ECE9E1; border-radius: 10px; padding: 8px 6px; min-width: 0; }
      .iconCard { padding: 14px 8px 12px; }
      .iconCardIcon { width: 38px; height: 38px; }

      @media (min-width: 640px) {
        .avatar { width: 40px; height: 40px; }
        .titleBrand { font-size: 12px; }
        .titleMain { font-size: 16px; }
      }

      @media (min-width: 720px) {
        .avatar { width: 42px; height: 42px; }
        .titleMain { font-size: 17px; }
        .sectionTitle { font-size: 17px; }
        .grid { grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 16px; }
        .attendanceGrid { grid-template-columns: repeat(6, 1fr); gap: 10px; }
        .attendanceChip { padding: 10px 8px; }
        .iconCard { padding: 26px 16px 20px; }
        .iconCardIcon { width: 56px; height: 56px; }
        .tap:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.06); }
        .wrap { padding: 0 40px; }
      }
    `}</style>
  );
}
