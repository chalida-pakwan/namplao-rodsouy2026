import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ContactBar from '@/components/ContactBar'
import HomeFeaturedCars from '@/components/HomeFeaturedCars'
import { Phone, Car, Shield, Zap, Truck, FileCheck, Clock, Wallet, MapPin } from 'lucide-react'
import { buildMetadata } from '@/lib/seo'

export const metadata = buildMetadata({
  title: 'น้ำเปล่ารถสวย | รถมือสองเชียงใหม่ คัดคุณภาพ ราคาดี',
  description:
    'น้ำเปล่ารถสวย รถบ้านมือสองเชียงใหม่ คุณภาพระดับพรีเมียม คัดสรรทุกคัน ฟรีดาวน์ รับประกัน 1 ปี บริการไฟแนนซ์ครบวงจร จัดส่งฟรีทั่วประเทศ',
  path: '/',
})

export const revalidate = 60

const brands = ['Toyota', 'Honda', 'Isuzu', 'Nissan', 'Mazda', 'Mitsubishi', 'Ford', 'Chevrolet']
const priceRanges = [
  { label: 'ต่ำกว่า 2 แสน', query: '0-200000' },
  { label: '2–3 แสน', query: '200000-300000' },
  { label: '3–5 แสน', query: '300000-500000' },
  { label: '5–7 แสน', query: '500000-700000' },
  { label: '7 แสน - 1 ล้าน', query: '700000-1000000' },
  { label: '1 ล้าน+', query: '1000000-10000000' },
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: 'น้ำเปล่ารถสวย',
    image: 'https://namplao-usedcars.com/images/Bandner.webp',
    description: 'น้ำเปล่ารถสวย รถบ้านมือสองเชียงใหม่ คุณภาพระดับพรีเมียม คัดสรรทุกคัน ฟรีดาวน์ รับประกัน 1 ปี บริการไฟแนนซ์ครบวงจร จัดส่งฟรีทั่วประเทศ',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chiang Mai',
      addressRegion: 'Chiang Mai',
      addressCountry: 'TH'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 18.7883,
      longitude: 98.9853
    },
    url: 'https://namplao-usedcars.com',
    telephone: '+66947251267',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '18:00'
      }
    ],
    priceRange: '฿฿'
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ─── Banner Image ─── */}
      <section className="relative w-full">
        <Image
          src="/images/Bandner.webp"
          alt="น้ำเปล่ารถสวย รถมือสองเชียงใหม่"
          width={1920}
          height={1080}
          className="w-full h-auto block object-cover"
          priority
          sizes="100vw"
        />
      </section>

      {/* ─── Hero Text Block ─── */}
      <section className="w-full bg-white">
        <div className="container-responsive pt-6 pb-8 sm:pt-8 sm:pb-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 relative">
            
            {/* Left: headline */}
            <div className="w-full lg:w-2/3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                น้ำเปล่ารถสวย<span className="sr-only"> รถมือสองเชียงใหม่</span>
                <span className="block text-brand-blue">รถบ้านคัดพิเศษ</span>
              </h1>
              <p className="mt-4 text-slate-500 text-sm sm:text-base max-w-xl leading-relaxed">
                <span className="font-semibold text-gray-700">รถมือสองเชียงใหม่ คุณภาพพรีเมียม</span> คัดเฉพาะรถมือเดียว ตรวจสอบประวัติทุกคัน ฟรีดาวน์ ผ่อนถูก
                รับประกัน&nbsp;1&nbsp;ปี จัดส่งฟรีทั่วประเทศ
              </p>
              
              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <Link href="/cars"
                  className="btn bg-brand-blue text-white font-bold px-6 py-3 text-sm sm:text-base hover:bg-brand-dark transition-colors shadow-lg shadow-brand-blue/30 rounded-full flex items-center justify-center gap-1.5">
                  <Car size={18}/> เลือกซื้อรถยนต์
                </Link>
                <Link href="/sell-car"
                  className="btn bg-brand-yellow text-gray-900 font-bold px-6 py-3 text-sm sm:text-base hover:brightness-95 transition-all shadow-lg shadow-brand-yellow/30 rounded-full flex items-center justify-center gap-1.5">
                  <Wallet size={18}/> ฝากขายรถ
                </Link>
                <a href="tel:0947251267"
                  className="btn bg-white text-brand-blue font-bold px-6 py-3 text-sm sm:text-base border-2 border-brand-blue hover:bg-brand-blue hover:text-white transition-colors rounded-full flex items-center justify-center gap-1.5">
                  <Phone size={18}/> โทรเลย
                </a>
              </div>
            </div>

            {/* Right: Badge aligned with title */}
            <div className="mt-4 lg:mt-0 lg:ml-auto flex justify-center lg:justify-end">
               <div className="inline-flex items-center gap-3 px-4 py-2">
                  <div className="text-brand-blue">
                    <Shield size={28} className="drop-shadow-sm" />
                  </div>
                  <div className="text-left">
                     <div className="text-lg sm:text-xl font-bold text-gray-800 drop-shadow-sm leading-tight">รถมือสองเชียงใหม่</div>
                     <div className="text-sm sm:text-base text-gray-600 font-medium">คุณภาพระดับพรีเมียม</div>
                  </div>
               </div>
            </div>
            
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
            <div key={f.title} className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 p-4 sm:p-5 flex gap-3 sm:gap-4 items-start bg-brand-blue border-brand-blue/30">
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <f.icon size={22} className="text-white drop-shadow-md" />
              </div>
              <div>
                <div className="font-bold text-white text-base sm:text-lg mb-0.5">{f.title}</div>
                <p className="text-sm text-blue-50 leading-snug">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Featured Cars ─── */}
      <section className="container-responsive mt-8 sm:mt-10">
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

      {/* ─── Testimonials (Reviews) ─── */}
      <section className="w-full bg-slate-50 py-12 sm:py-16">
        <div className="container-responsive">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">ลูกค้าที่ไว้วางใจเรา</h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base">ส่วนหนึ่งของความประทับใจจากลูกค้าที่ออกรถกับ น้ำเปล่ารถสวย</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="text-slate-600 text-sm md:text-base italic mb-4">&quot;รถสภาพสวยมากครับ ตรงปก ทางเต็นท์ให้คำแนะนำดีมาก ประทับใจเรื่องการรับประกันและบริการหลังการขายครับ ออกรถง่ายกว่าที่คิดเยอะเลย&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue font-bold">ส</div>
                <div>
                  <div className="text-sm font-bold text-gray-900">คุณสมชาย</div>
                  <div className="text-xs text-slate-500">ออกรถยี่ห้อ Toyota</div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
               <p className="text-slate-600 text-sm md:text-base italic mb-4">&quot;เป็นผู้หญิงมาซื้อรถคนเดียวตอนแรกก็กลัวโดนหลอก แต่เซลล์ให้ข้อมูลละเอียด เช็คประวัติให้ดูหมดทุกคัน บริการส่งรถให้ถึงหน้าบ้านเลยค่ะ&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">น</div>
                <div>
                  <div className="text-sm font-bold text-gray-900">คุณนฤมล</div>
                  <div className="text-xs text-slate-500">ออกรถยี่ห้อ Honda</div>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative">
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
              </div>
              <p className="text-slate-600 text-sm md:text-base italic mb-4">&quot;ติดแบล็คลิสต์เคยโทรไปปรึกษาหลายที่บอกไม่ผ่าน แต่มาที่นี่พี่ๆ ช่วยดันเคสให้เต็มที่จนออกรถได้จริง ขอบคุณมากๆ ครับ ได้รถไว้ขับไปทำงานแล้ว&quot;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">ก</div>
                <div>
                   <div className="text-sm font-bold text-gray-900">คุณกิตติ</div>
                   <div className="text-xs text-slate-500">ออกรถยี่ห้อ Isuzu</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section className="container-responsive mt-12 sm:mt-16 py-10">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-brand-dark tracking-tight">คำถามที่พบบ่อย (FAQ)</h2>
          <p className="mt-2 text-slate-500 text-sm sm:text-base">ข้อสงสัยยอดฮิตเกี่ยวกับการออกรถมือสองกับเรา</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { q: 'ติดแบล็คลิสต์ หรือบูโร สามารถออกรถได้ไหม?', a: 'สามารถออกรถได้ครับ ทางเรามีทีมงานผู้เชี่ยวชาญด้านไฟแนนซ์คอยให้คำปรึกษาและช่วยดันเคสให้ผ่านตามเงื่อนไขที่กำหนด' },
            { q: 'ไม่มีคนค้ำประกัน ออกรถได้ไหม?', a: 'ได้ครับ หากลูกค้ามีฐานเงินเดือนและอายุงานเข้าเกณฑ์ของทางไฟแนนซ์ ก็สามารถออกรถคนเดียวโดยไม่ต้องใช้คนค้ำประกันได้ครับ' },
            { q: 'รถทุกคันมีการรับประกันไหม?', a: 'รับประกัน 1 ปีเต็มครับ! ครอบคลุมทั้งเครื่องยนต์และเกียร์ (ไม่จำกัดระยะทาง) พร้อมบริการช่วยเหลือฉุกเฉิน 24 ชั่วโมง' },
            { q: 'มีบริการจัดส่งรถต่างจังหวัดไหม?', a: 'เรามีบริการจัดส่งรถฟรีทั่วประเทศไทยครับ ด้วยรถสไลด์ที่ปลอดภัย ส่งตรงถึงหน้าบ้านท่านแน่นอน' }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-brand-blue/50 transition-colors">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                <span className="text-brand-blue">Q:</span> {faq.q}
              </h3>
              <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed pl-7">
                {faq.a}
              </p>
            </div>
          ))}
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
