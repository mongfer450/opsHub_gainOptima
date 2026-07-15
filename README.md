# Gain Optima — Ops Hub

หน้าเว็บ Ops Hub สำหรับ Gain Optima พร้อม deploy ขึ้น GitHub Pages

## วิธี Deploy (ทำครั้งเดียว)

### 1. สร้าง Repository บน GitHub
- ไปที่ https://github.com/new
- ตั้งชื่อ repo เช่น `gain-optima-hub`
- เลือก Public
- **ไม่ต้อง** ติ๊ก "Add README" (มีมาให้แล้ว)

### 2. อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ขึ้น repo
วิธีง่ายสุด (ไม่ต้องใช้คำสั่ง git):
- เปิดหน้า repo ที่สร้างไว้ → กด **Add file → Upload files**
- ลากไฟล์/โฟลเดอร์ทั้งหมดในนี้ (`package.json`, `vite.config.js`, `index.html`, `src/`, `.github/`) ใส่เข้าไป
- กด Commit

หรือถ้าถนัด command line:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/gain-optima-hub.git
git push -u origin main
```

### 3. เปิดใช้งาน GitHub Pages
- ไปที่ repo → **Settings → Pages**
- หัวข้อ "Build and deployment" → Source เลือก **GitHub Actions**
- (ไม่ต้องตั้งค่าอะไรเพิ่ม เพราะมีไฟล์ `.github/workflows/deploy.yml` เตรียมไว้ให้แล้ว)

### 4. รอ 1-2 นาที
- ไปที่แท็บ **Actions** ใน repo ดูสถานะการ build (จะขึ้นเครื่องหมายถูกเขียวเมื่อเสร็จ)
- เสร็จแล้วเว็บจะอยู่ที่:
  `https://<your-username>.github.io/gain-optima-hub/`

## วิธีแก้ไขเนื้อหาในอนาคต
แก้ไฟล์ `src/App.jsx` แล้ว push ขึ้น GitHub อีกครั้ง (หรือแก้ผ่านหน้าเว็บ GitHub โดยตรงก็ได้ที่ปุ่มดินสอ) — GitHub Actions จะ build และอัปเดตเว็บให้อัตโนมัติทุกครั้งที่ push เข้า branch `main`

## รันดูบนเครื่องตัวเอง (ไม่จำเป็นต้องทำ ถ้าจะ deploy อย่างเดียว)
```bash
npm install
npm run dev
```
