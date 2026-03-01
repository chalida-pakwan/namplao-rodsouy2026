import { Suspense } from 'react';
import CarsClient from './CarsClient';
import { getCars } from '@/lib/shopify';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'รถสวยพร้อมขาย | น้ำเปล่ารถสวย รถมือสองเชียงใหม่',
  description: 'รวมรถมือสองคัดคุณภาพ รถสวยพร้อมขาย ตรวจสภาพครบถ้วน ฟรีดาวน์ (ตามเงื่อนไข) น้ำเปล่ารถสวย เชียงใหม่',
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
  
  // สร้าง Schema.org ItemList สำหรับสินค้าทั้งหมดในหน้านี้ เพื่อเพิ่มโอกาสติด Google (Rich Snippet)
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'url': 'https://namplaousedcars.com/cars',
    'numberOfItems': cars.length,
    'itemListElement': cars.slice(0, 10).map((car, index) => ({ // จำกัด 10 คันแรกเพื่อไม่ต้องใส่เยอะเกินไปจน payload ใหญ่
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@type': 'Product',
        'url': `https://namplaousedcars.com/cars/${car.slug}`,
        'name': car.title,
        'image': car.heroImage,
        'offers': {
          '@type': 'Offer',
          'price': car.price,
          'priceCurrency': 'THB',
          'availability': 'https://schema.org/InStock'
        }
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <CarsClient initialCars={cars} />
    </>
  );
}


