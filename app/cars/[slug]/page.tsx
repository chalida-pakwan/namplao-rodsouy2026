import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCarBySlug } from '@/lib/shopify';
import { formatNumber, formatPriceTHB } from '@/lib/format';
import { ShieldCheck, Calendar, Gauge, Cog, Fuel } from 'lucide-react';
import FinanceCalculator from '@/components/FinanceCalculator';
import ContactBar from '@/components/ContactBar';
import ShareButtons from '@/components/ShareButtons';
import CarGallery from './CarGallery';
import { buildMetadata, getSiteUrl } from '@/lib/seo';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const car = await getCarBySlug(params.slug);

  if (!car) {
    return buildMetadata({
      title: 'ไม่พบรถ | น้ำเปล่รถสวย',
      description: 'ไม่พบรายการรถที่คุณค้นหา',
      path: `/cars/${params.slug}`,
      noIndex: true,
    });
  }

  const title = `${car.title} | น้ำเปล่รถสวย`;
  const description = `รถมือสอง ${car.brand} ${car.model} ปี ${car.year} ราคา ${formatPriceTHB(car.price)} คัดสภาพพร้อมขาย`; 
  const image = car.heroImage || car.gallery?.[0];

  return buildMetadata({
    title,
    description,
    path: `/cars/${car.slug}`,
    openGraphType: 'article',
    image,
  });
}

export default async function CarDetail({ params }: { params: { slug: string } }) {
  const car = await getCarBySlug(params.slug);
  
  if (!car) {
    return notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: car.title,
    brand: car.brand,
    model: car.model,
    vehicleModelDate: String(car.year),
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: car.mileageKm,
      unitCode: 'KMT'
    },
    offers: {
      '@type': 'Offer',
      price: car.price,
      priceCurrency: 'THB',
      availability: car.sold ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock'
    },
    image: car.gallery
  };

  const domain = process.env.NEXT_PUBLIC_SITE_URL || getSiteUrl();
  const url = `${domain}/cars/${car.slug}`;

  return (
    <div className="container-responsive mt-6 space-y-8 pb-12 sm:pb-16 bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Gallery (7 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <CarGallery images={car.gallery} title={car.title} />
          
          <ShareButtons title={car.title} url={url} />

          {/* Description Block */}
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hidden lg:block">
             <div className="flex items-center gap-2 mb-4">
               <ShieldCheck className="text-brand-primary h-6 w-6" /> 
               <h3 className="font-bold text-xl text-slate-900">รายละเอียดรถเพิ่มเติม</h3>
             </div>
             
             {/* Guarantee Badge */}
             <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex gap-3 text-green-800 text-sm">
                <ShieldCheck className="shrink-0 h-5 w-5" />
                <div>
                 <span className="font-bold block text-green-900">น้ำเปล่ารถสวย การันตีคุณภาพ</span>
                   ✓ ไม่มีข้อบกพร่อง ✓ ไม่ชนหนัก ✓ ไม่เคยผ่านน้ำท่วม ✓ ไม่มีความเสียหายจากไฟไหม้
                </div>
             </div>

             <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 text-slate-700 whitespace-pre-wrap leading-relaxed">
               {car.description}
             </div>
             
             {car.features.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-slate-800 mb-3">อุปกรณ์เสริม / Options</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {car.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600 bg-white px-3 py-2 rounded-lg border border-slate-100 shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
             )}
          </div>
        </div>

        {/* Right Column: Key Info & Actions (5 cols) */}
        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          {/* Header Info */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              {car.title}
            </h1>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-brand-primary">
                {formatPriceTHB(car.price)}
              </span>
              {car.sold && <span className="text-red-500 font-bold border border-red-500 px-2 rounded">ขายแล้ว</span>}
            </div>
            
            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-3 py-4 border-y border-slate-100">
               <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
                  <Calendar className="text-brand-primary w-5 h-5 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block">ปีจดทะเบียน</span>
                    <span className="font-bold text-slate-700">{car.year}</span>
                  </div>
               </div>
               <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
                  <Gauge className="text-brand-primary w-5 h-5 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block">เลขไมล์</span>
                    <span className="font-bold text-slate-700">{formatNumber(car.mileageKm)} กม.</span>
                  </div>
               </div>
               <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
                  <Cog className="text-brand-primary w-5 h-5 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block">เกียร์</span>
                    <span className="font-bold text-slate-700">{car.transmission}</span>
                  </div>
               </div>
               <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-50">
                  <Fuel className="text-brand-primary w-5 h-5 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block">เชื้อเพลิง</span>
                    <span className="font-bold text-slate-700">{car.fuel}</span>
                  </div>
               </div>
            </div>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 p-4 border-b border-slate-100">
               <h3 className="font-bold text-slate-800">คำนวณค่างวด</h3>
             </div>
             <div className="p-4">
                <FinanceCalculator price={car.price} />
             </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-3">
             <ContactBar />
             <p className="text-center text-xs text-slate-400">
               * เงื่อนไขไฟแนนซ์เป็นไปตามที่บริษัทกำหนด
             </p>
          </div>

          {/* Mobile Description (Visible only below lg) */}
          <div className="lg:hidden space-y-4 pt-6 border-t border-slate-100">
             <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">
               รายละเอียเพิ่มเติม
             </h3>
             <div className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
               {car.description}
             </div>
             {car.features.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Options</h4>
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    {car.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
             )}
          </div>

        </div>
      </div>
    </div>
  );
}
