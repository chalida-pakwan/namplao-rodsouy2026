import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Phone, Flame, Shield, Truck, CreditCard } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'โปรโมชั่น | น้ำเปล่ารถสวย รถมือสองเชียงใหม่',
  description: 'โปรโมชั่นพิเศษ ฟรีดาวน์ 0% ดอกเบี้ยต่ำ รับประกัน 1 ปี จัดส่งฟรีทั่วประเทศ',
  path: '/promotion',
});

const promos = [
  {
    icon: Flame,
    badge: 'HOT DEAL',
    title: 'ฟรีดาวน์ 0%',
    desc: 'ออกรถได้เลย ไม่ต้องวางเงินดาวน์ สำหรับลูกค้าที่มีเครดิตดี อนุมัติง่าย รวดเร็ว',
    detail: 'เงื่อนไข: ขึ้นอยู่กับการพิจารณาของสถาบันการเงิน',
    color: 'from-brand-blue to-brand-dark',
  },
  {
    icon: Shield,
    badge: 'พิเศษสุด',
    title: 'รับประกัน 1 ปีฟรี',
    desc: 'ซื้อรถทุกคันรับประกันเครื่องยนต์และเกียร์ 1 ปีเต็ม ไม่จำกัดกิโลเมตร',
    detail: 'ไม่มีค่าใช้จ่ายเพิ่มเติม รับประกันทันทีหลังรับรถ',
    color: 'from-green-600 to-green-800',
  },
  {
    icon: Truck,
    badge: 'บริการพิเศษ',
    title: 'จัดส่งฟรีทั่วประเทศ',
    desc: 'บริการส่งรถถึงบ้านฟรีทุกจังหวัดทั่วไทย ลูกค้าไม่ต้องเดินทางมารับเอง',
    detail: 'ระยะเวลาจัดส่ง 1-3 วันทำการ',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: CreditCard,
    badge: 'ไฟแนนซ์',
    title: 'ดอกเบี้ยพิเศษ',
    desc: 'อัตราดอกเบี้ยพิเศษจากสถาบันการเงินชั้นนำ ผ่อนสบาย ค่างวดต่ำ เริ่มต้นเพียง 3,000 บาท/เดือน',
    detail: 'ติดต่อสอบถามเงื่อนไขเพิ่มเติมได้เลย',
    color: 'from-purple-600 to-purple-800',
  },
];

export default function PromotionPage() {
  return (
    <div className="mt-0">
      {/* Banner Image */}
      <section className="relative w-full">
        <Image
          src="/images/promotion.webp"
          alt="โปรโมชั่นน้ำเปล่ารถสวย"
          width={1920}
          height={650}
          priority
          sizes="100vw"
          className="w-full h-auto block"
        />

        <div className="absolute inset-0">
          <div className="container-responsive h-full flex items-center justify-center py-6 sm:py-10">
            <div className="max-w-xl md:max-w-2xl lg:max-w-3xl px-4 sm:px-6 py-3 sm:py-4 text-white drop-shadow-md text-center">
              <p className="text-brand-yellow font-semibold text-xs sm:text-sm md:text-base mb-1 sm:mb-2">ข้อเสนอพิเศษ</p>
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight drop-shadow-lg">โปรโมชั่นพิเศษ</h1>
              <p className="mt-2 sm:mt-3 text-white/90 max-w-2xl mx-auto text-xs sm:text-base md:text-lg lg:text-xl">
                สิทธิพิเศษสำหรับลูกค้าน้ำเปล่ารถสวย ฟรีดาวน์ รับประกัน จัดส่งฟรี ทุกคัน
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Promos Grid */}
      <section className="container-responsive mt-10 sm:mt-12">
        <div className="grid md:grid-cols-2 gap-6">
          {promos.map((p, i) => (
            <div key={i} className={`rounded-2xl bg-gradient-to-br ${p.color} text-white p-6`}>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
                <p.icon size={13}/>{p.badge}
              </span>
              <h2 className="mt-4 text-2xl font-black">{p.title}</h2>
              <p className="mt-2 text-white/80">{p.desc}</p>
              <p className="mt-3 text-xs text-white/50">* {p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Finance info */}
      <section className="container-responsive mt-12 sm:mt-16 card p-5 sm:p-6">
        <h2 className="text-xl font-black text-brand-dark mb-4 flex items-center gap-2"><CreditCard size={20} className="text-brand-blue"/> บริการจัดสินเชื่อพิเศษ</h2>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          {[
            { label: 'ดาวน์', val: '0%', sub: 'ฟรีดาวน์ (ตามเงื่อนไข)' },
            { label: 'ผ่อนนาน', val: '84', sub: 'เดือน (7 ปี)' },
            { label: 'เงื่อนไข', val: 'ง่าย', sub: 'อนุมัติรวดเร็ว' },
          ].map(s => (
            <div key={s.label} className="bg-slate-50 rounded-xl p-5">
              <div className="text-sm text-slate-500">{s.label}</div>
              <div className="text-4xl font-black text-brand-blue mt-1">{s.val}</div>
              <div className="text-sm text-slate-500 mt-1">{s.sub}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-400 text-center">
          * เงื่อนไขเป็นไปตามที่สถาบันการเงินกำหนด ติดต่อสอบถามรายละเอียดเพิ่มเติม
        </p>
      </section>

      {/* CTA */}
      <section className="container-responsive mt-10 sm:mt-12 mb-8 sm:mb-12 bg-brand-dark rounded-2xl p-6 sm:p-8 text-white text-center">
        <h2 className="text-2xl font-black">รับโปรโมชั่นพิเศษวันนี้</h2>
        <p className="mt-2 text-white/70">ทักหาเราผ่าน LINE หรือโทรสอบถามเลย ทีมงานพร้อมช่วยเหลือ</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="https://line.me/R/ti/p/@931prrnt" target="_blank"
            className="btn bg-green-500 text-white font-bold px-6 py-3 hover:bg-green-600">
            <MessageCircle size={20}/> ทัก LINE รับโปร
          </a>
          <a href="tel:0947251267"
            className="btn bg-brand-yellow text-brand-dark font-bold px-6 py-3 hover:bg-yellow-300">
            <Phone size={20}/> โทร 094-725-1267
          </a>
          <Link href="/cars" className="btn bg-white/10 text-white border border-white/30 px-6 py-3 hover:bg-white/20">
            ดูรถทั้งหมด →
          </Link>
        </div>
        <p className="mt-4 text-xs text-white/40">คำนวณค่างวดล่วงหน้าได้ที่ <Link href="/payment-calculator" className="underline">หน้าคำนวณค่างวด</Link></p>
      </section>
    </div>
  );
}
