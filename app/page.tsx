import { Suspense } from 'react'
import Link from 'next/link'
import ContactBar from '@/components/ContactBar'
import HomeFeaturedCars from '@/components/HomeFeaturedCars'
import { Phone, Car, Shield, Zap, Truck, FileCheck, Clock, Wallet, MapPin } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'น้ำเปล่รถสวย | รถมือสองเชียงใหม่ คัดคุณภาพ ราคาดี',
  description:
    'น้ำเปล่รถสวย รถบ้านมือสองเชียงใหม่ คุณภาพระดับพรีเมียม คัดสรรทุกคัน ฟรีดาวน์ รับประกัน 1 ปี บริการไฟแนนซ์ครบวงจร จัดส่งฟรีทั่วประเทศ',
  path: '/',
})

export const revalidate = 60

const brands = ['Toyota', 'Honda', 'Isuzu', 'Nissan', 'Mazda', 'Mitsubishi', 'Ford', 'Chevrolet']
const priceRanges = [
  { label: 'ต่ำกว่า 2 แสน', query: '0-200000' },
  { label: '2–3 แสน', query: '200000-300000' },
  { label: '3–5 แสน', query: '300000-500000' },
  { label: '5–7 แสน', query: '500000-700000' },
  { label: '7 แสน+', query: '700000-9999999' },
]

const whyUs = [
  { icon: Car, title: 'รถบ้านแท้ 100%', desc: 'คัดสรรรถคุณภาพดีจากเจ้าของขายตรง ไม่ผ่านคนกลาง' },
  { icon: Shield, title: 'รับประกัน 1 ปี', desc: 'รับประกันเครื่องยนต์และเกียร์ไม่จำกัดกิโลเมตร' },
  { icon: Zap, title: 'ฟรีดาวน์ 0%', desc: 'ออกรถได้ไม่ต้องวางเงินดาวน์ ตามเงื่อนไขไฟแนนซ์' },
  { icon: Truck, title: 'ส่งฟรีทั่วไทย', desc: 'บริการส่งรถถึงบ้านฟรีทุกจังหวัด' },
  { icon: FileCheck, title: 'เอกสารครบถ้วน', desc: 'มีเล่มทะเบียน พร้บ. เอกสารถูกต้องตามกฎหมาย' },
  { icon: Clock, title: 'อนุมัติไว', desc: 'ไฟแนนซ์หลายสถาบัน เครดิตดีออกรถ 0 บาท*' },
]

export default function HomePage() {
  return (
    <div>
      {/* ─── Banner Image ─── */}
      <section className="relative w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/Bandner.webp"
          alt="น้ำเปล่ารถสวย รถมือสองเชียงใหม่"
          width={1920}
          height={1080}
          className="w-full h-auto block"
        />
      </section>

      {/* ─── Hero Text Block ─── */}
      <section className="w-full bg-white">
        <div className="container-responsive pt-6 pb-8 sm:pt-8 sm:pb-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 relative">
            
            {/* Left: headline */}
            <div className="w-full lg:w-2/3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                น้ำเปล่ารถสวย
                <span className="block text-brand-blue">รถบ้านคัดพิเศษ</span>
              </h1>
              <p className="mt-4 text-slate-500 text-sm sm:text-base max-w-xl leading-relaxed">
                คัดเฉพาะรถมือเดียว ตรวจสอบประวัติทุกคัน ฟรีดาวน์ ผ่อนถูก
                รับประกัน&nbsp;1&nbsp;ปี จัดส่งฟรีทั่วประเทศ
              </p>
              
              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <Link href="/cars"
                  className="btn bg-brand-blue text-white font-bold px-6 py-3 text-sm sm:text-base hover:bg-brand-dark transition-colors shadow-lg shadow-brand-blue/30 rounded-full">
                  <Car size={18}/> เลือกซื้อรถยนต์
                </Link>
                <Link href="/sell-car"
                  className="btn bg-brand-yellow text-gray-900 font-bold px-6 py-3 text-sm sm:text-base hover:brightness-95 transition-all shadow-lg shadow-brand-yellow/30 rounded-full">
                  <Wallet size={18}/> ฝากขายรถ
                </Link>
                <a href="tel:0947251267"
                  className="btn bg-white text-brand-blue font-bold px-6 py-3 text-sm sm:text-base border-2 border-brand-blue hover:bg-brand-blue hover:text-white transition-colors rounded-full">
                  <Phone size={18}/> โทรเลย
                </a>
              </div>
            </div>

            {/* Right: Badge aligned with title (Modified as requested) */}
            <div className="mt-2 lg:mt-0 lg:ml-auto">
               <div className="inline-flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-xl border border-slate-100 transform rotate-1 hover:rotate-0 transition-transform duration-300 ring-4 ring-slate-50">
                  <div className="w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center text-brand-dark animate-pulse shadow-inner">
                    <Shield size={24} />
                  </div>
                  <div className="text-left">
                     <div className="text-base sm:text-lg font-black text-brand-dark leading-tight">รถมือสองเชียงใหม่</div>
                     <div className="text-sm text-slate-500 font-medium">คุณภาพระดับพรีเมียม</div>
                  </div>
               </div>
            </div>
            
          </div>

          {/* Trust chips */}
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              { icon: Car, label: 'รถบ้านแท้ 100%' },
              { icon: Shield, label: 'รับประกัน 1 ปี' },
              { icon: Zap, label: 'ฟรีดาวน์ 0%' },
              { icon: Truck, label: 'จัดส่งฟรีทั่วไทย' },
              { icon: FileCheck, label: 'เอกสารครบถ้วน' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium bg-slate-100 text-slate-700 rounded-full px-3 py-1.5 border border-slate-200">
                <Icon size={13} className="text-brand-blue"/>{label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Us ─── */}
      <section className="container-responsive mt-12 sm:mt-16">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-brand-dark">ทำไมต้องเลือกน้ำเปล่ารถสวย?</h2>
          <p className="text-slate-500 mt-2 text-sm">ศูนย์รวมรถบ้านคุณภาพดี คัดสรรคุณภาพทุกคัน ตรวจสอบโดยผู้เชี่ยวชาญ</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {whyUs.map(f => (
            <div key={f.title} className="card p-4 sm:p-5 flex gap-3 sm:gap-4 items-start">
              <div className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                <f.icon size={18} className="text-brand-blue" />
              </div>
              <div>
                <div className="font-bold text-brand-dark text-sm sm:text-base">{f.title}</div>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Search / Browse ─── */}
      <section className="w-full mt-12 sm:mt-16 py-10 sm:py-14 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">ค้นหารถที่คุณต้องการ</h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base">เลือกช่วงราคาหรือยี่ห้อที่สนใจ ให้เราช่วยหารถที่ใช่สำหรับคุณ</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Price Filter */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-brand-blue">
                  <Wallet size={20} />
                </div>
                <h3 className="font-bold text-lg text-slate-800">ค้นหาตามงบประมาณ</h3>
              </div>
              <nav aria-label="ค้นหาตามช่วงราคา">
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {priceRanges.map((r) => (
                    <li key={r.query}>
                      <Link
                        href={`/cars?price=${r.query}`}
                        className="group flex flex-col items-center justify-center h-full min-h-[50px] rounded-xl border border-slate-200 bg-slate-50 hover:bg-brand-blue hover:border-brand-blue transition-all duration-200"
                      >
                        <span className="text-sm font-semibold text-slate-600 group-hover:text-white">{r.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Brand Filter */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600">
                  <Car size={20} />
                </div>
                <h3 className="font-bold text-lg text-slate-800">ค้นหาตามยี่ห้อ</h3>
              </div>
              <nav aria-label="ค้นหาตามยี่ห้อ">
                <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {brands.map((b) => (
                    <li key={b}>
                      <Link
                        href={`/cars?brand=${b.toLowerCase()}`}
                        className="group flex flex-col items-center justify-center h-full min-h-[50px] rounded-xl border border-slate-200 bg-slate-50 hover:bg-brand-yellow hover:border-brand-yellow hover:text-brand-dark transition-all duration-200"
                      >
                         <span className="text-sm font-semibold text-slate-600 group-hover:text-brand-dark">{b}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          
          <div className="mt-8 sm:mt-10 text-center">
            <Link href="/cars" className="inline-flex items-center gap-2 bg-brand-dark text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-brand-dark/20">
              <Car size={18} /> ดูรถทั้งหมดในสต็อก
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Featured Cars ─── */}
      <section className="container-responsive mt-12 sm:mt-16">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-dark">รถแนะนำเข้าใหม่</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-0.5">คัดสรรมาเพื่อคุณโดยเฉพาะ ผ่านการตรวจสอบอย่างละเอียด</p>
          </div>
          <Link href="/cars" className="text-brand-blue font-semibold text-sm hover:underline whitespace-nowrap ml-4">ดูทั้งหมด →</Link>
        </div>
        <Suspense fallback={<div className="h-96 w-full animate-pulse bg-slate-100 rounded-xl" />}>
          <HomeFeaturedCars />
        </Suspense>
        <div className="mt-6 sm:mt-8 text-center">
          <Link href="/cars" className="btn-primary px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base">
            ดูรถทั้งหมด →
          </Link>
        </div>
      </section>

      {/* ─── Contact CTA ─── */}
      <section className="container-responsive mt-8 sm:mt-12">
        <ContactBar />
      </section>

      {/* ─── Sell Car CTA ─── */}
      <section className="container-responsive mt-6 sm:mt-8 mb-8 sm:mb-12">
        <div className="rounded-2xl bg-gradient-to-r from-brand-blue to-brand-dark text-white p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div>
              <h2 className="text-lg sm:text-2xl font-black">อยากขายรถ? ประเมินราคาฟรี รับซื้อทันที</h2>
              <p className="mt-1 sm:mt-2 text-white/80 text-sm">ราคายุติธรรม จ่ายเงินสดทันที ดำเนินการเอกสารให้ครบถ้วน</p>
            </div>
            <div className="flex gap-2 sm:gap-3 shrink-0 flex-wrap">
              <a href="tel:0947251267"
                className="btn bg-white text-brand-dark font-bold px-4 sm:px-5 py-2.5 text-sm hover:bg-brand-yellow">
                <Phone size={16} /> โทรเลย
              </a>
              <Link href="/sell-car"
                className="btn bg-brand-yellow text-brand-dark font-bold px-4 sm:px-5 py-2.5 text-sm hover:bg-yellow-300">
                ขายรถกับเรา →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
