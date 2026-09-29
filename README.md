# Gain Optima Ops Hub

Dashboard ยอดขายจากแท็บ `DATA2` พร้อมทางลัดที่อ่านจาก Google Sheets

## เริ่มใช้งาน

```bash
npm ci
npm run dev
```

## ข้อมูล Dashboard

- แหล่งยอดขาย: [Gain Optima — Revenue / DATA2](https://docs.google.com/spreadsheets/d/11JY-u1njafkk_zIQSX4N-FQIRvvXGoTwR9MWkNkT3s4/edit?gid=755413768)
- อ่านผ่าน Google Visualization API ทุก 60 วินาที โดยไม่ต้องมี backend
- ใช้เวลาในคอลัมน์ A, ประเภท MB/PT ใน B, ราคา E และยอดแก้ไข F (ถ้ามี) สำหรับยอดเดือนนี้และวันนี้
- ประเภทลูกค้า H สำหรับจำนวนตามประเภทจริง และพนักงาน I สำหรับรายละเอียดพนักงาน
- การเข้างานยังใช้แหล่งเดิม

## ทางลัด

- ข้อมูลอยู่ใน [Gain Optima Ops Hub Shortcuts](https://docs.google.com/spreadsheets/d/1vFQAZLiQtGnEgiacK3zE48qNyrFD70Y16Kb3639Lt4g/edit?gid=1236504074) แท็บ `Shortcuts`
- หน้าเว็บอ่านชีตทุก 60 วินาทีผ่าน Google Visualization API จึงต้องแชร์ชีตเป็น “ทุกคนที่มีลิงก์: ผู้ดู”
- ทุกลิงก์เปิดแท็บใหม่ ไม่มีหมวดและไม่มีการเก็บลิงก์ใน localStorage
- `Placement` เป็น `header` หรือ `list`; `Enabled` ควบคุมการแสดงผล

### เปิดการแก้ไขลิงก์บนเว็บ

1. เปิดชีต Shortcuts ด้วยบัญชีเจ้าของ แล้วไปที่ **ส่วนขยาย → Apps Script**
2. วางโค้ดจาก `ShortcutConfig.gs` ลงในไฟล์ `Code.gs` แล้วบันทึก
3. ไปที่ **การตั้งค่าโปรเจกต์ → Script properties** เพิ่ม `SHORTCUT_ADMIN_TOKEN` เป็นรหัสสุ่มยาวอย่างน้อย 20 ตัวอักษร เก็บรหัสนี้ไว้กับเจ้าของ ไม่ใส่ลงในซอร์สโค้ด
4. **Deploy → New deployment → Web app** เลือก **Execute as: Me** และ **Who has access: Anyone** แล้วอนุญาตสิทธิ์ที่ Google ขอ
5. สำหรับพรีวิวในเครื่อง ใส่ URL ที่ลงท้าย `/exec` ในไฟล์ `.env.local` เป็น `VITE_SHORTCUTS_WEB_APP_URL=<URL>` แล้วเริ่ม dev server หรือ build ใหม่
6. สำหรับ GitHub Pages ตั้ง Actions variable ชื่อ `SHORTCUTS_WEB_APP_URL` เป็น URL เดียวกัน แล้วรัน workflow deploy ใหม่

ปุ่มจัดการลิงก์ในหน้าเว็บต้องใช้รหัสผู้ดูแลทุกครั้งที่เปิดหน้าใหม่ รหัสไม่ถูกบันทึกใน localStorage

## การเข้างาน

- อ่านจากชีต [เช็คชื่อทำงาน_DB](https://docs.google.com/spreadsheets/d/1xH5kKeXAqNaEZzheWAFZEKdQHbsMi55AipuoTkn_PoY/edit?gid=123735032) ทุก 60 วินาที
- ใช้แท็บ `gid=123735032` และคอลัมน์ A (เวลาเช็คชื่อ), B (ชื่อพนักงาน)
- ดึงเฉพาะรายการของวันปัจจุบันตามเวลาไทย จึงไม่ต้องโหลดประวัติทั้งหมดเมื่อชีตโตขึ้น
- ชีตต้องตั้งการเข้าถึงทั่วไปเป็น “ทุกคนที่มีลิงก์: ผู้ดู” เพื่อให้เว็บแอปที่ไม่มีระบบล็อกอินอ่านผ่าน Google Visualization API ได้
- หากสิทธิ์หายหรือชีตอ่านไม่ได้ หน้าจอจะแสดงข้อผิดพลาดแทนข้อความ “ยังไม่มีใครเช็คอินวันนี้”

ชีตต้องเปิดสิทธิ์อ่านให้ผู้ใช้เว็บแอปเข้าถึงได้ หากอ่านไม่ได้ Dashboard จะแสดงข้อผิดพลาด

## Build

```bash
npm run build
```
