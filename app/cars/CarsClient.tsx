'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { cars as allCars, type Car } from '@/data/cars';
import CarCard from '@/components/CarCard';
import Filters from '@/components/Filters';
import Link from 'next/link';
import Image from 'next/image';
import { Car as CarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

const faqs = [
  { q: 'รถมือสองมีให้เลือกกี่คัน?', a: 'น้ำเปล่ารถสวยมีรถคุณภาพดีคัดสรรมาให้เลือกกว่า 100 คัน ทั้งรถเก๋ง กระบะ SUV รถครอบครัว อัปเดตรถใหม่เข้าทุกสัปดาห์' },
  { q: 'ดูรถ / ทดลองขับได้ที่ไหน?', a: 'สามารถนัดดูรถได้ที่ร้านน้ำเปล่ารถสวย เชียงใหม่ หรือทักผ่าน LINE เพื่อนัดเวลาสะดวก เปิดทุกวัน 09:00–18:00 น.' },
  { q: 'มีผ่อน / จัดไฟแนนซ์ได้ไหม?', a: 'มีครับ! เราให้บริการจัดสินเชื่อหลายสถาบันการเงิน ฟรีดาวน์ 0% (ตามเงื่อนไข) อนุมัติง่าย รวดเร็ว จัดเตรียมแค่บัตรประชาชน' },
  { q: 'รับประกันและตรวจสภาพรถอย่างไร?', a: 'ทุกคันผ่านการตรวจสภาพอย่างละเอียดโดยช่างผู้เชี่ยวชาญ พร้อมรับประกันหลังการขาย 1 ปี ไม่จำกัดกิโลเมตร' },
];

export default function CarsClient({ initialCars = [] }: { initialCars?: Car[] }) {
  const searchParams = useSearchParams();
  // If initialCars is empty (e.g. error), fallback to allCars from static data or empty array
  const sourceCars = initialCars.length > 0 ? initialCars : allCars;
  const [cars, setCars] = useState<Car[]>(sourceCars);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const brand = searchParams.get('brand');
    const price = searchParams.get('price');
    let list = sourceCars;
    if (brand) list = list.filter(c => c.brand.toLowerCase() === brand.toLowerCase());
    if (price) {
      const [min, max] = price.split('-').map(Number);
      list = list.filter(c => c.price >= min && c.price <= max);
    }
    setCars(list);
    setCurrentPage(1);
  }, [searchParams, sourceCars]);

  const totalPages = Math.ceil(cars.length / ITEMS_PER_PAGE);
  const paginatedCars = cars.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleFiltered = (list: Car[]) => {
    setCars(list);
    setCurrentPage(1);
  };

  return (
    <div className="mt-0">
      {/* Banner */}
      <section className="relative w-full">
        <Image
          src="/images/bandnerallcar.webp"
          alt="แบนเนอร์รถสวยพร้อมขาย"
          width={1920}
          height={650}
          priority
          sizes="100vw"
          className="w-full h-auto block"
        />

        <div className="absolute inset-0">
          <div className="container-responsive h-full flex items-center py-6 sm:py-10">
            <div className="max-w-xl px-4 sm:px-6 py-3 sm:py-4 text-brand-dark drop-shadow-md">
              <h1 className="text-2xl sm:text-3xl font-black drop-shadow-lg">รถสวยพร้อมขาย</h1>
              <p className="mt-1 sm:mt-2 text-slate-800 text-sm">ค้นหารถยนต์มือสองคุณภาพดี ตรวจสภาพครบถ้วน ฟรีดาวน์</p>
              <p className="mt-1 text-brand-blue font-semibold text-sm sm:text-base">
                ทั้งหมด {cars.length} คัน (หน้า {currentPage}/{totalPages || 1})
              </p>
              <div className="mt-3 sm:mt-4 flex gap-2 sm:gap-3 flex-wrap">
                <Link href="/contact" className="btn bg-brand-dark text-white font-bold px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-brand-blue">นัดดูรถ / ติดต่อ</Link>
                <Link href="/sell-car" className="btn bg-white text-brand-dark border border-brand-dark/20 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm hover:bg-slate-50">ฝากขายได้ราคาดี</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="container-responsive mt-4 sm:mt-6">
        <Filters cars={sourceCars} onFiltered={handleFiltered} />
      </div>

      {/* Grid */}
      <div className="container-responsive mt-4 sm:mt-6 min-h-[500px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {paginatedCars.map(c => <CarCard key={c.id} car={c} />)}
          {cars.length === 0 && (
            <div className="col-span-full text-center py-16 text-slate-500">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center">
                <CarIcon size={32} className="text-slate-400"/>
              </div>
              <p className="font-bold text-lg">ไม่พบรถตามเงื่อนไข</p>
              <p className="text-sm mt-2">ลองเปลี่ยนเงื่อนไขการค้นหา หรือ <Link href="/contact" className="text-brand-blue underline">ติดต่อเรา</Link> เพื่อสอบถาม</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 sm:mt-12 mb-8">
             <button 
               disabled={currentPage === 1}
               onClick={() => handlePageChange(currentPage - 1)}
               className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
               aria-label="Previous Page"
             >
               <ChevronLeft size={20} className="text-slate-600" />
             </button>
             
             <div className="flex items-center gap-1">
               {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                 // Simple logic: show first, last, and around current
                 // If total pages <= 7, show all
                 // Else show simplified range (omitted for clean simple implementation first)
                 const isCurrent = page === currentPage;
                 if (totalPages > 7 && Math.abs(page - currentPage) > 2 && page !== 1 && page !== totalPages) {
                    if (page === currentPage - 3 || page === currentPage + 3) return <span key={page} className="text-slate-400 px-1">...</span>;
                    return null;
                 }
                 
                 return (
                   <button
                     key={page}
                     onClick={() => handlePageChange(page)}
                     className={`w-10 h-10 rounded-lg font-bold text-sm transition-all duration-200
                       ${isCurrent 
                         ? 'bg-brand-primary text-white shadow-md scale-105' 
                         : 'text-slate-600 hover:bg-slate-100'
                       }`}
                   >
                     {page}
                   </button>
                 );
               })}
             </div>

             <button 
               disabled={currentPage === totalPages}
               onClick={() => handlePageChange(currentPage + 1)}
               className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
               aria-label="Next Page"
             >
               <ChevronRight size={20} className="text-slate-600" />
             </button>
          </div>
        )}
      </div>

      {/* FAQ */}
      <section className="container-responsive mt-12 border-t border-slate-200 pt-10 mb-8">

        <h2 className="text-xl sm:text-2xl font-black text-brand-dark mb-6">คำถามที่พบบ่อย (FAQ)</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="card overflow-hidden">
              <button
                className="w-full text-left px-5 py-4 font-semibold text-brand-dark flex items-center justify-between gap-4"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <span>{f.q}</span>
                <span className="text-xl shrink-0">{openFaq === i ? '▲' : '▾'}</span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-slate-600 text-sm border-t border-slate-100">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
