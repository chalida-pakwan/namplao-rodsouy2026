# น้ำเปล่ารถสวย — Next.js 2025 Starter

เว็บไซต์ขายรถมือสอง ดีไซน์ทันสมัย โหลดไว ใช้งานง่าย พร้อมฟังก์ชันหลักครบ:
- ลิสต์รถ + ค้นหา/กรองทันใจ (Client-side)
- หน้ารายละเอียด + แกลเลอรี + คำนวณไฟแนนซ์คร่าว ๆ
- ปุ่มติดต่อด่วน (โทร/LINE) ชัดเจน รองรับมือถือ (Bottom Nav)
- SEO 2025: JSON-LD (Vehicle), OpenGraph, ภาษาไทย
- โทนสีเหลือง-น้ำเงิน ปรับง่ายผ่าน `tailwind.config.ts`
- โครงสร้างพร้อมต่อยอดเชื่อมฐานข้อมูล (เช่น Supabase)

## เริ่มใช้งาน
```bash
npm i
npm run dev
# เปิด http://localhost:3000
```

## ปรับแต่งข้อมูลรถ
ดู/แก้ที่ `data/cars.ts` หรือเชื่อมฐานข้อมูลภายหลัง

## สีประจำแบรนด์
แก้ไข `tailwind.config.ts` > `theme.extend.colors.brand`

## ต่อฐานข้อมูล (แนะนำ)
- Supabase หรือ Firebase
- สร้างตาราง `cars` เก็บฟิลด์ตาม `data/cars.ts`
- ทำ API Route ใน `app/api/cars/route.ts` แล้ว fetch มาใช้แทน mock

## Deploy
- Vercel: แนะนำมาก (Next.js + Image Optimization)
- ตั้ง `revalidate` ให้หน้าไดนามิกเพื่อ ISR ที่ไวและคุ้มค่า
