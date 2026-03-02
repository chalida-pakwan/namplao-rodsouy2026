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
import BackButton from './BackButton';
import PageBreadcrumb from '@/components/PageBreadcrumb';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const car = await getCarBySlug(params.slug);

  if (!car) {
    return buildMetadata({
      title: 'ไม่พบรถ | น้ำเปล่ารถสวย',
      description: 'ไม่พบรายการรถที่คุณค้นหา',
      path: `/cars/${params.slug}`,
      noIndex: true,
    });
  }

  const title = `${car.title} | น้ำเปล่ารถสวย`;
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

  const transmissionMap = {
    'AT': 'เกียร์อัตโนมัติ (AT)',
    'MT': 'เกียร์ธรรมดา (MT)'
  };

  const fuelMap = {
    'Diesel': 'ดีเซล',
    'Benzine': 'เบนซิน',
    'Hybrid': 'ไฮบริด',
    'EV': 'ไฟฟ้า'
  };

  // Product Schema (Rich Snippet) - Helps Google understand this is a specific vehicle for sale
  // Merged Product and Vehicle to provide price and condition details.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['Product', 'Vehicle'],
    name: car.title,
    description: car.description || `รถมือสอง ${car.brand} ${car.model} ปี ${car.year} ราคา ${car.price} บาท คัดสภาพพร้อมขาย`,
    brand: {
      '@type': 'Brand',
      name: car.brand
    },
    model: car.model,
    vehicleModelDate: String(car.year),
    bodyType: 'Used Car',
    mileageFromOdometer: {
      '@type': 'QuantitativeValue',
      value: car.mileageKm,
      unitCode: 'KMT'
    },
    vehicleTransmission: car.transmission ? transmissionMap[car.transmission] : undefined,
    fuelType: car.fuel ? fuelMap[car.fuel] : undefined,
    offers: {
      '@type': 'Offer',
      price: car.price,
      priceCurrency: 'THB',
      itemCondition: 'https://schema.org/UsedCondition',
      availability: car.sold ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
      url: `https://namplaousedcars.com/cars/${car.slug}`,
      seller: {
        '@type': 'AutoDealer',
        name: 'น้ำเปล่ารถสวย',
        image: 'https://namplaousedcars.com/images/logo.png',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'เชียงใหม่',
          addressCountry: 'TH'
        }
      }
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

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <BackButton />
        <PageBreadcrumb
          items={[
            { label: 'รถสวยพร้อมขาย', href: '/cars' },
            { label: car.title },
          ]}
        />
      </div>

<div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <CarGallery images={car.gallery} title={car.title} />
          
          <ShareButtons title={car.title} url={url} />

          {/* Desktop Description Block */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 hidden lg:block hover:shadow-md transition-shadow duration-300">
             <div className="flex items-center gap-2 mb-5">
               <ShieldCheck className="text-brand-primary h-7 w-7" /> 
               <h3 className="font-bold text-xl text-slate-900">รายละเอียดรถเพิ่มเติม</h3>
             </div>
             
             {/* Guarantee Badge */}
             <div className="bg-green-50/80 border border-green-200 rounded-2xl p-5 mb-5 flex gap-4 text-green-800 text-sm shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-bl-full -mr-4 -mt-4"></div>
                <ShieldCheck className="shrink-0 h-6 w-6 text-green-600 drop-shadow-sm mt-0.5" />
                <div>
                 <span className="font-bold block text-green-900 mb-1 text-base">น้ำเปล่ารถสวย การันตีคุณภาพ</span>
                 <p className="opacity-90 leading-relaxed font-medium">✓ ไม่มีข้อบกพร่อง ✓ ไม่ชนหนัก ✓ ไม่เคยผ่านน้ำท่วม ✓ ไม่มีความเสียหายจากไฟไหม้</p>
                </div>
             </div>

             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100/50 text-slate-700 whitespace-pre-wrap leading-relaxed">
               {car.description}
             </div>
             
             {car.features.length > 0 && (
                <div className="mt-8 border-t border-slate-200/60 pt-6">
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-brand-primary rounded-full"></span>
                    อุปกรณ์เสริม / Options
                  </h4>
                  <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
                    {car.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700 bg-white px-3.5 py-2.5 rounded-xl border border-slate-100 shadow-sm hover:border-brand-primary/30 transition-colors">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary shrink-0" />
                          <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
             )}
          </div>
        </div>

        {/* Right Column: Key Info & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          {/* Header Info */}
          <div className="bg-white p-5 lg:p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5">
            <h1 className="text-2xl sm:text-3xl lg:text-[1.75rem] font-black text-slate-900 leading-snug">
              {car.title}
            </h1>
            <div className="flex flex-wrap items-baseline gap-3 bg-brand-yellow/10 p-4 rounded-2xl border border-brand-yellow/20">
              <span className="text-3xl sm:text-4xl lg:text-[2.5rem] font-black text-brand-primary drop-shadow-sm">
                {formatPriceTHB(car.price)}
              </span>
              {car.sold ? (
                 <span className="text-white bg-red-600 text-sm font-bold px-3.5 py-1.5 rounded-full shadow-md animate-pulse">ขายแล้ว</span>
              ) : (car.price <= 1000000 && (
                 <span className="text-brand-dark bg-brand-yellow text-sm font-bold px-3.5 py-1.5 rounded-full shadow-sm">ฟรีดาวน์*</span>
              ))}
            </div>
            
            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
               <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-slate-50 transition-colors group">
                  <div className="bg-white p-2.5 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                     <Calendar className="text-brand-primary w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-bold uppercase tracking-wide mb-0.5">ปีจดทะเบียน</span>
                    <span className="font-bold text-slate-800">{car.year}</span>
                  </div>
               </div>
               {car.mileageKm > 0 && (
                 <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-slate-50 transition-colors group">
                    <div className="bg-white p-2.5 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                       <Gauge className="text-brand-primary w-5 h-5 shrink-0" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-bold uppercase tracking-wide mb-0.5">เลขไมล์</span>
                      <span className="font-bold text-slate-800">{formatNumber(car.mileageKm)} กม.</span>
                    </div>
                 </div>
               )}
               <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-slate-50 transition-colors group">
                  <div className="bg-white p-2.5 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                     <Cog className="text-brand-primary w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-bold uppercase tracking-wide mb-0.5">ระบบเกียร์</span>
                    <span className="font-bold text-slate-800">{transmissionMap[car.transmission]}</span>
                  </div>
               </div>
               <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-100 hover:bg-slate-50 transition-colors group">
                  <div className="bg-white p-2.5 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                     <Fuel className="text-brand-primary w-5 h-5 shrink-0" />
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block font-bold uppercase tracking-wide mb-0.5">เชื้อเพลิง</span>
                    <span className="font-bold text-slate-800">
                      {car.fuel && fuelMap[car.fuel as keyof typeof fuelMap] ? fuelMap[car.fuel as keyof typeof fuelMap] : '-'}
                    </span>
                  </div>
               </div>
            </div>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/10 rounded-bl-full -z-0"></div>
             <div className="bg-slate-50/50 p-5 border-b border-slate-100/50 relative z-10 flex items-center justify-between">
               <h3 className="font-bold text-slate-800 flex items-center gap-2">
                 <span className="w-1.5 h-6 bg-brand-primary rounded-full"></span>
                 ประเมินยอดจัดไฟแนนซ์
               </h3>
               <span className="text-xs text-brand-primary bg-brand-primary/10 px-2 py-1 rounded-md font-medium">ดอกเบี้ยเริ่มต้น 4.50%</span>
             </div>
             <div className="p-5 lg:p-6 relative z-10">
                <FinanceCalculator price={car.price} />
             </div>
          </div>
          
          {/* Contact */}
          <div className="space-y-4">
             <ContactBar />
             <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
               <p className="text-center text-[11px] text-slate-500 font-medium leading-relaxed">
                 * เงื่อนไขไฟแนนซ์, การฟรีดาวน์ และดอกเบี้ยพิเศษ เป็นไปตามที่บริษัทและสถาบันการเงินกำหนด<br className="hidden sm:block"/> บริษัทขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขโดยไม่ต้องแจ้งให้ทราบล่วงหน้า
               </p>
             </div>
          </div>

          {/* Mobile Description (Visible only below lg) */}
          <div className="lg:hidden space-y-5 pt-8 mt-2 border-t border-slate-200">
             <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">
               <ShieldCheck className="text-brand-primary h-6 w-6" /> รายละเอียดรถเพิ่มเติม
             </h3>
             
             {/* Mobile Guarantee */}
             <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3 text-green-800 text-sm shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/5 rounded-bl-full -mr-4 -mt-4"></div>
                <div>
                 <span className="font-bold block text-green-900 mb-1">น้ำเปล่ารถสวย การันตีคุณภาพ</span>
                 <p className="opacity-90 leading-relaxed font-medium text-xs">✓ ไม่มีข้อบกพร่อง ✓ ไม่ชนหนัก ✓ ไม่เคยผ่านน้ำท่วม ✓ ไม่มีความเสียหายจากไฟไหม้</p>
                </div>
             </div>

             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
               {car.description}
             </div>
             
             {car.features.length > 0 && (
                <div className="mt-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                     <span className="w-1 h-4 bg-brand-primary rounded-full"></span> Options เสริม
                  </h4>
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    {car.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                        <span className="truncate">{f}</span>
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
