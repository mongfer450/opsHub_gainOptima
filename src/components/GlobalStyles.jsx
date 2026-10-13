export function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600;700&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap');
      * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      .tap { transition: transform 0.15s ease, box-shadow 0.15s ease; }
      .tap:active { transform: scale(0.97); }

      .wrap { max-width: 1040px; margin: 0 auto; padding-left: 20px; padding-right: 20px; }
      .avatar { width: 32px; height: 32px; flex-shrink: 0; }
      .titleBrand { font-size: 10px; }
      .titleMain { font-size: 13px; }
      .sectionTitle { font-size: 14px; }
      .metricGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
      .metricGrid > :first-child { grid-column: 1 / -1; }
      .metricCard { padding: 12px 8px; }
      .targetPanel { padding: 12px; }
      .targetInputs { display: grid; grid-template-columns: 1fr; gap: 12px; }
      .shortcutFormGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
      .targetRow { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
      .attendanceGrid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
      .attendanceChip { display: flex; align-items: baseline; justify-content: center; gap: 5px; background: #FFFFFF; border: 1px solid #ECE9E1; border-radius: 10px; padding: 8px 6px; min-width: 0; }
      .iconCard { padding: 14px 8px 12px; }
      .iconCardIcon { width: 38px; height: 38px; }
      .ownerHeaderActions { position: relative; display: flex; align-items: center; gap: 8px; min-width: 0; flex-shrink: 0; }
      .ownerHeaderMenuButton { display: grid; place-items: center; width: 36px; height: 36px; flex-shrink: 0; border: 1px solid rgba(255,255,255,.35); border-radius: 8px; background: rgba(255,255,255,.12); color: #fff; cursor: pointer; }
      .ownerHeaderMenuButton:hover { background: rgba(255,255,255,.2); }
      .ownerHeaderMenuButton:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
      .ownerHeaderMenu { position: absolute; top: calc(100% + 14px); right: 0; width: min(360px, calc(100vw - 32px)); max-height: calc(100dvh - 80px); overflow-y: auto; padding: 12px; border: 1px solid #ece9e1; border-radius: 8px; background: #fff; box-shadow: 0 14px 36px rgba(0,0,0,.18); color: #111318; }
      .ownerHeaderMenuSection + .ownerHeaderMenuSection { margin-top: 14px; padding-top: 14px; border-top: 1px solid #f0eee8; }
      .ownerHeaderMenuTitle { margin: 0 0 8px; font-size: 12px; font-weight: 700; }

      @media (max-width: 420px) {
        .ownerHeaderShortcutLabel { display: none; }
      }

      @media (min-width: 640px) {
        .metricGrid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .metricGrid > :first-child { grid-column: auto; }
        .metricCard { padding: 14px 12px; }
        .targetPanel { padding: 16px 18px; }
        .attendanceGrid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .targetInputs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .avatar { width: 40px; height: 40px; }
        .titleBrand { font-size: 12px; }
        .titleMain { font-size: 16px; }
      }

      @media (min-width: 720px) {
        .avatar { width: 42px; height: 42px; }
        .titleMain { font-size: 17px; }
        .sectionTitle { font-size: 17px; }
        .metricGrid { gap: 16px; }
        .attendanceGrid { grid-template-columns: repeat(6, 1fr); gap: 10px; }
        .attendanceChip { padding: 10px 8px; }
        .iconCard { padding: 26px 16px 20px; }
        .iconCardIcon { width: 56px; height: 56px; }
        .tap:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.06); }
        .wrap { padding-left: 40px; padding-right: 40px; }
      }
    `}</style>
  );
}
