'use client';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { cars as allCars, type Car } from '@/data/cars';
import CarCard from '@/components/CarCard';
import Filters from '@/components/Filters';
import Link from 'next/link';
import Image from 'next/image';
import { Car as CarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import PageBreadcrumb from '@/components/PageBreadcrumb';

const ITEMS_PER_PAGE = 12;

const RETURN_STATE_KEY = 'namplao:return:cars';

type ReturnState = {
  href: string;
  scrollY: number;
  page: number;
  ids: string[];
  ts: number;
};

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
  const [sortBy, setSortBy] = useState<string>('default');

  const pendingRestoreRef = useRef<ReturnState | null>(null);
  const didRestoreRef = useRef(false);

  const restoreFromState = (state: ReturnState) => {
    const byId = new Map(sourceCars.map((c) => [c.id, c] as const));
    const restoredList = state.ids.map((id) => byId.get(id)).filter(Boolean) as Car[];
    setCars(restoredList.length > 0 ? restoredList : sourceCars);
    setCurrentPage(state.page && state.page > 0 ? state.page : 1);
    pendingRestoreRef.current = state;
  };

  // Read restore state once (only on the client)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = sessionStorage.getItem(RETURN_STATE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as ReturnState;
      if (!parsed || typeof parsed.href !== 'string') return;
      // Ignore very old entries (15 minutes)
      if (typeof parsed.ts === 'number' && Date.now() - parsed.ts > 15 * 60 * 1000) return;
      if (parsed.href === `${window.location.pathname}${window.location.search}`) {
        restoreFromState(parsed);
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // If we have a pending restore for this exact URL, prefer restoring the saved list/page
    if (pendingRestoreRef.current && !didRestoreRef.current) {
      didRestoreRef.current = true;
      return;
    }

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

  // After restore, jump back to the exact scroll position
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const state = pendingRestoreRef.current;
    if (!state) return;

    // Wait a tick so the grid/pagination renders
    requestAnimationFrame(() => {
      window.scrollTo({ top: Math.max(0, state.scrollY || 0), behavior: 'auto' });
      pendingRestoreRef.current = null;
      try {
        sessionStorage.removeItem(RETURN_STATE_KEY);
      } catch {
        // ignore
      }
    });
  }, [cars.length, currentPage]);

  const handleNavigateToCar = () => {
    if (typeof window === 'undefined') return;
    try {
      const state: ReturnState = {
        href: `${window.location.pathname}${window.location.search}`,
        scrollY: window.scrollY,
        page: currentPage,
        ids: cars.map((c) => c.id),
        ts: Date.now(),
      };
      sessionStorage.setItem(RETURN_STATE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleFiltered = (list: Car[]) => {
    setCars(list);
    setCurrentPage(1);
    setSortBy('default'); // Reset sort when filter changes
  };

  // Sort the current cars list before paginating
  const sortedCars = useMemo(() => {
    const list = [...cars];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'year-desc':
        return list.sort((a, b) => {
          // Extract year from title (e.g. "Toyota Vios 2018") as a fallback if you add year to the data model later
          const yearA = parseInt(a.title.match(/(20\d{2})/)?.[0] || '0');
          const yearB = parseInt(b.title.match(/(20\d{2})/)?.[0] || '0');
          return yearB - yearA;
        });
      default:
        return list; // Keep original (usually newest first based on your data)
    }
  }, [cars, sortBy]);

  const totalPages = Math.ceil(sortedCars.length / ITEMS_PER_PAGE);
  const paginatedCars = sortedCars.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="mt-0">
      {/* Banner */}
      <section className="relative w-full">
        <Image
          src="/images/allcar.webp"
          alt="แบนเนอร์รถสวยพร้อมขาย"
          width={1920}
          height={650}
          priority
          sizes="100vw"
          className="w-full h-auto block"
        />

        <div className="absolute inset-0">
          <div className="container-responsive h-full flex items-center py-6 sm:py-10">
            <div className="max-w-xl md:max-w-2xl lg:max-w-3xl px-4 sm:px-6 py-3 sm:py-4 text-brand-dark drop-shadow-md">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black drop-shadow-lg">รถสวยพร้อมขาย</h1>
              <p className="mt-1 sm:mt-2 text-slate-800 text-sm sm:text-base md:text-lg lg:text-xl">
                ค้นหารถยนต์มือสองคุณภาพดี <br className="sm:hidden" />
                ตรวจสภาพครบถ้วน ฟรีดาวน์
              </p>
              <p className="mt-1 text-brand-blue font-semibold text-sm sm:text-base md:text-lg lg:text-xl">
                ทั้งหมด {cars.length} คัน (หน้า {currentPage}/{totalPages || 1})
              </p>
              <div className="mt-3 sm:mt-4 flex gap-2 sm:gap-3 flex-wrap">
                <Link href="/contact" className="btn bg-brand-dark text-white font-bold px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 text-xs sm:text-sm md:text-base lg:text-lg hover:bg-brand-blue">นัดดูรถ / ติดต่อ</Link>
                <Link href="/sell-car" className="btn bg-white text-brand-dark border border-brand-dark/20 px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 text-xs sm:text-sm md:text-base lg:text-lg hover:bg-slate-50">ฝากขายได้ราคาดี</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-responsive mt-4 sm:mt-5">
        <PageBreadcrumb items={[{ label: 'รถสวยพร้อมขาย' }]} />
      </section>

      {/* Filters & Sort */}
      <div className="container-responsive mt-4 sm:mt-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-end justify-between mb-4">
          <div className="w-full md:w-3/4">
            <Filters cars={sourceCars} onFiltered={handleFiltered} />
          </div>
          <div className="w-full md:w-1/4 min-w-[200px] shrink-0">
             <label htmlFor="sort" className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wide">
                จัดเรียงจาก
             </label>
             <div className="relative">
               <select
                 id="sort"
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
                 className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-[14px] pl-4 pr-10 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all cursor-pointer font-medium text-sm sm:text-base h-[54px]"
               >
                 <option value="default">แนะนำล่าสุด</option>
                 <option value="price-asc">ราคา: ต่ำไปสูง</option>
                 <option value="price-desc">ราคา: สูงไปต่ำ</option>
                 <option value="year-desc">ปีผลิต: ใหม่ล่าสุด</option>
               </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                 <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                 </svg>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* State: Results Info */}
      <div className="container-responsive mb-4 flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
         <span className="text-sm md:text-base text-slate-600 font-medium whitespace-nowrap overflow-hidden text-ellipsis">พบรถ <strong>{sortedCars.length}</strong> คัน</span>
         {sortedCars.length === 0 && (
           <button onClick={() => { setCars(sourceCars); setSortBy('default'); }} className="text-sm md:text-base text-brand-blue font-bold hover:underline bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm ml-2 shrink-0">
             ล้างการค้นหา
           </button>
         )}
      </div>

      {/* Grid */}
      <div className="container-responsive min-h-[500px] mb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {paginatedCars.map((c, index) => <CarCard key={c.id} car={c} onNavigate={handleNavigateToCar} priority={index < 4} />)}
          {sortedCars.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-500 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5 text-slate-300">
               <CarIcon size={40} />
             </div>
             <h3 className="text-xl font-bold text-slate-800 mb-2">ไม่พบรถที่คุณต้องการ</h3>
             <p className="text-slate-500 mb-6 text-sm md:text-base max-w-sm">ลองปรับเปลี่ยนตัวกรอง (เช่น ยี่ห้อ หรือราคา) หรือดูรถทั้งหมดเพื่อเริ่มต้นใหม่</p>
             <button 
               onClick={() => {
                 setCars(sourceCars);
                 setSortBy('default');
               }}
               className="btn bg-brand-dark text-white px-8 py-3 text-sm md:text-base rounded-full hover:bg-slate-800 transition-colors shadow-md font-bold"
             >
               ดูรถทั้งหมดที่มี
             </button>
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
