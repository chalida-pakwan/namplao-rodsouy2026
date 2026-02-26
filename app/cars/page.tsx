import { Suspense } from 'react';
import CarsClient from './CarsClient';
import { getCars } from '@/lib/shopify';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'รถสวยพร้อมขาย | น้ำเปล่รถสวย รถมือสองเชียงใหม่',
  description: 'รวมรถมือสองคัดคุณภาพ รถสวยพร้อมขาย ตรวจสภาพครบถ้วน ฟรีดาวน์ (ตามเงื่อนไข) น้ำเปล่รถสวย เชียงใหม่',
  path: '/cars',
});

export const revalidate = 60; // ISR every 60 seconds

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center text-slate-500 flex justify-center items-center custom-loading">กำลังโหลดรถคุณภาพดี...</div>}>
      <CarsList />
    </Suspense>
  );
}

async function CarsList() {
  const cars = await getCars();
  return <CarsClient initialCars={cars} />;
}

