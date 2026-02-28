import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Phone, Car, Shield, Wallet, Truck, FileText, Award } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import PageBreadcrumb from '@/components/PageBreadcrumb';

export const metadata = buildMetadata({
  title: 'เกี่ยวกับเรา | น้ำเปล่ารถสวย รถมือสองเชียงใหม่',
  description:
    'น้ำเปล่ารถสวย ศูนย์รวมรถบ้านคุณภาพดีในเชียงใหม่ มีประสบการณ์มากกว่า 10 ปี คัดสรรรถคุณภาพ บริการด้วยความจริงใจ',
  path: '/about',
});

const highlights = [
  { icon: Car, title: 'รถบ้านแท้ 100%', desc: 'คัดสรรรถคุณภาพดีจากเจ้าของขายตรง ไม่ผ่านคนกลาง' },
  { icon: Shield, title: 'รับประกัน 1 ปี', desc: 'รับประกันเครื่องยนต์และเกียร์ไม่จำกัดกิโลเมตร' },
  { icon: Wallet, title: 'ฟรีดาวน์ 0%', desc: 'ออกรถได้ไม่ต้องวางเงินดาวน์ ตามเงื่อนไขไฟแนนซ์' },
  { icon: Truck, title: 'ส่งฟรีทั่วไทย', desc: 'บริการส่งรถถึงบ้านฟรีทุกจังหวัด' },
  { icon: FileText, title: 'เอกสารครบถ้วน', desc: 'มีเล่มทะเบียน พรบ. เอกสารถูกต้องตามกฎหมาย' },
  { icon: Award, title: 'ประสบการณ์ 10+ ปี', desc: 'ความเชี่ยวชาญในธุรกิจรถมือสองมากกว่า 10 ปี' },
];

const story = [
  {
    title: 'จุดเริ่มต้นของน้ำเปล่ารถสวย',
    desc: 'น้ำเปล่ารถสวยเริ่มต้นจากความหลงใหลในรถยนต์และความต้องการหารถคุณภาพดีให้ลูกค้า จากประสบการณ์การซื้อรถครั้งแรกที่ต้องเสี่ยงดวงเพราะขาดความรู้เรื่องรถยนต์ จึงเป็นแรงบันดาลใจให้เข้าสู่วงการรถมือสอง',
  },
  {
    title: 'ก้าวสู่วงการรถมือสองเชียงใหม่',
    desc: 'ด้วยความซื่อสัตย์ จริงใจ และใส่ใจลูกค้าทุกราย ทำให้ได้รับความไว้วางใจจากลูกค้าทั่วเชียงใหม่และภาคเหนือ จนขยายมาเป็นร้านรถมือสองออนไลน์ที่ให้บริการลูกค้าทั่วประเทศ',
  },
  {
    title: 'น้ำเปล่ารถสวยในปัจจุบัน',
    desc: 'วันนี้ เรามีทีมขาย ทีมจัดส่ง ทีมบริการจัดสินเชื่อให้ทั่วประเทศ คัดเลือกเฉพาะรถบ้านแท้ รถมือเดียว พร้อมรับประกันเครื่องเกียร์ 1 ปี ไม่จำกัดกิโลเมตร เป้าหมายคือ "การทำให้รถมือสองซื้อง่าย ปลอดภัย อุ่นใจ ไว้ใจได้"',
  },
  {
    title: 'มาตรฐานการให้บริการ',
    desc: 'ลูกค้าสามารถขอดูตรวจสอบเล่มทะเบียนได้ทุกคันทุกหน้าแบบไม่มีปกปิด เพราะสิ่งที่เราเน้นคือความโปร่งใสและความซื่อสัตย์ในทุกขั้นตอน',
  },
];

export default function AboutPage() {
  return (
    <div className="mt-0">
      {/* Hero */}
      <section className="relative w-full">
        <Image
          src="/images/about.webp"
          alt="เกี่ยวกับน้ำเปล่ารถสวย"
          width={1920}
          height={650}
          priority
          sizes="100vw"
          className="w-full h-auto block"
        />

        <div className="absolute inset-0">
          <div className="container-responsive h-full flex items-center py-6 sm:py-10">
            <div className="max-w-xl md:max-w-2xl lg:max-w-3xl px-4 sm:px-6 py-3 sm:py-4 text-white drop-shadow-md">
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight drop-shadow-lg text-brand-yellow">
                เกี่ยวกับน้ำเปล่ารถสวย
              </h1>
              <p className="mt-2 sm:mt-3 text-brand-yellow font-bold max-w-2xl text-xs sm:text-base md:text-lg lg:text-xl drop-shadow-md">
                เพราะอะไรถึงได้รับความไว้วางใจจากลูกค้าทั่วประเทศ
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-responsive mt-5 sm:mt-6">
        <PageBreadcrumb items={[{ label: 'เกี่ยวกับเรา' }]} />
      </section>

        {/* Story */}
        <section className="container-responsive mt-12 sm:mt-16">
          <h2 className="text-2xl font-black text-brand-dark mb-8">เรื่องราวของเรา</h2>
          <div className="space-y-6">
            {story.map((s, i) => (
              <div key={i} className="card p-6 border-l-4 border-brand-blue">
                <h3 className="font-bold text-brand-dark text-lg mb-2">{s.title}</h3>
                <p className="text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
          <blockquote className="mt-8 bg-brand-yellow/10 border-l-4 border-brand-yellow rounded-xl p-6">
            <p className="font-bold text-brand-dark text-lg">
              &quot;โอกาสมีอยู่ทุกที่ เงินมีอยู่ทุกที่ในอากาศ อยู่ที่คุณจะเห็นมันหรือไม่&quot;
            </p>
            <p className="mt-2 text-slate-600 text-sm">
              และสิ่งที่ทำให้น้ำเปล่ารถสวยได้รับความไว้วางใจจาก ลูกค้าทั่วประเทศ เคล็ดลับคือ <strong>&quot;ความจริงใจ&quot;</strong> นั่นเอง
            </p>
          </blockquote>
        </section>

{/* Highlights */}
      <section className="w-full mt-12 sm:mt-16 bg-slate-50 py-12">
        <div className="container-responsive">
          <h2 className="text-2xl font-black text-brand-dark text-center mb-2">จุดเด่นของเรา</h2>
          <p className="text-center text-slate-500 mb-8">เหตุผลที่ลูกค้าเลือกเชื่อมั่นและกลับมาใช้บริการซ้ำ</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {highlights.map(h => (
              <div key={h.title} className="card p-5 text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                  <h.icon size={24} className="text-brand-blue"/>
                </div>
                <h3 className="font-bold text-brand-dark">{h.title}</h3>
                <p className="text-sm text-slate-500 mt-2">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container-responsive mt-12 sm:mt-16 mb-8 sm:mb-12">
      <div className="card p-6 sm:p-8 bg-gradient-to-r from-brand-dark to-brand-blue text-white text-center">
        <h2 className="text-2xl font-black">ซื้อรถมือสองที่ไหนดี ให้ปลอดภัยไม่ถูกหลอก?</h2>
        <p className="mt-2 text-white/80">ลองติดต่อสอบถามน้ำเปล่ารถสวยได้เลย ให้คำปรึกษาฟรี</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="https://line.me/R/ti/p/@931prrnt" target="_blank"
            className="btn bg-green-500 text-white font-bold px-6 py-3 hover:bg-green-600">
            <MessageCircle size={20}/> แชท LINE ฟรี
          </a>
          <a href="tel:0947251267"
            className="btn bg-brand-yellow text-brand-dark font-bold px-6 py-3 hover:bg-yellow-300">
            <Phone size={20}/> โทร 094-725-1267
          </a>
          <Link href="/cars" className="btn bg-white/10 text-white border border-white/30 px-6 py-3 hover:bg-white/20">
            ดูรถทั้งหมด →
          </Link>
        </div>
      </div>
      </section>
    </div>
  );
}
