import Link from 'next/link';
import { MessageCircle, Phone, CheckCircle, AlertCircle, CalendarCheck, CreditCard, ClipboardList, Briefcase, Building2, Gift, Zap } from 'lucide-react';
import CreditCheckForm from '@/components/CreditCheckForm';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'เช็คเครดิต ตรวจสอบเครดิต | น้ำเปล่ารถสวย',
  description: 'ตรวจสอบเครดิตฟรี ก่อนตัดสินใจซื้อรถมือสอง ปรึกษาไฟแนนซ์ฟรี น้ำเปล่ารถสวย เชียงใหม่',
  path: '/credit-check',
});

const creditFactors = [
  { icon: CalendarCheck, label: 'ประวัติการชำระเงิน', good: 'ชำระตรงเวลาสม่ำเสมอ', bad: 'มีประวัติค้างชำระ' },
  { icon: CreditCard, label: 'ภาระหนี้ปัจจุบัน', good: 'มีหนี้น้อย อัตราส่วนหนี้ต่อรายได้ต่ำ', bad: 'มีหนี้มาก ภาระสูง' },
  { icon: ClipboardList, label: 'ประวัติเครดิต', good: 'มีประวัติเครดิตยาวนาน ไม่มีปัญหา', bad: 'ไม่มีประวัติเครดิตหรือมีปัญหา' },
  { icon: Briefcase, label: 'ความมั่นคงของรายได้', good: 'งานประจำ มีรายได้สม่ำเสมอ', bad: 'รายได้ไม่แน่นอน อาชีพอิสระ' },
];

const tips = [
  'ชำระหนี้ที่ค้างอยู่ให้เรียบร้อยก่อนยื่นขอสินเชื่อ',
  'ไม่ควรยื่นขอสินเชื่อหลายที่พร้อมกัน เพราะจะกระทบคะแนนเครดิต',
  'มีรายได้ประจำ และสามารถแสดงหลักฐานรายได้ได้',
  'ดาวน์เพิ่มช่วยให้อนุมัติง่ายขึ้นสำหรับเครดิตที่ไม่แข็งแรง',
  'ติดต่อปรึกษาทีมงานน้ำเปล่ารถสวยฟรี ก่อนตัดสินใจ',
];

export default function CreditCheckPage() {
  return (
    <div className="mt-0">
      {/* Hero */}
      <section className="w-full bg-gradient-to-r from-brand-dark to-brand-blue text-white">
        <div className="container-responsive py-14 sm:py-20">
          <h1 className="text-4xl md:text-5xl font-black">ประเมินสินเชื่อเบื้องต้น</h1>
          <p className="mt-3 text-white/80 max-w-xl">
            ประเมินคุณสมบัติแบบคร่าว ๆ ก่อนยื่นไฟแนนซ์จริง ช่วยวางแผนเงินดาวน์และเตรียมเอกสารได้ง่ายขึ้น
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="https://line.me/R/ti/p/@931prrnt" target="_blank"
              className="btn bg-green-500 text-white font-bold px-6 py-3 hover:bg-green-600">
              <MessageCircle size={20}/> ปรึกษาไฟแนนซ์ฟรี
            </a>
            <a href="tel:0947251267"
              className="btn bg-brand-yellow text-brand-dark font-bold px-6 py-3 hover:bg-yellow-300">
              <Phone size={20}/> โทร 094-725-1267
            </a>
          </div>
          <p className="mt-4 text-xs text-white/60">
            * การประเมินหน้านี้เป็นข้อมูลเบื้องต้น ไม่ใช่การตรวจเครดิตบูโร
          </p>
        </div>
      </section>

      {/* Form */}
      <CreditCheckForm />

      {/* What is credit */}
      <section className="container-responsive mt-12 sm:mt-16">
        <h2 className="text-2xl font-black text-brand-dark mb-4">เครดิตสำหรับรถยนต์คืออะไร?</h2>
        <p className="text-slate-600">
          เครดิตสำหรับการซื้อรถยนต์คือการประเมินความสามารถในการชำระหนี้ของคุณ
          โดยสถาบันการเงินจะพิจารณาจากหลายปัจจัย ก่อนอนุมัติสินเชื่อรถยนต์
        </p>
      </section>

      {/* Factors */}
      <section className="container-responsive mt-10 sm:mt-12">
        <h2 className="text-xl font-black text-brand-dark mb-6">ปัจจัยที่ส่งผลต่อการอนุมัติสินเชื่อ</h2>
        <div className="space-y-4">
          {creditFactors.map((f, i) => (
            <div key={i} className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-brand-blue/10 flex items-center justify-center shrink-0">
                  <f.icon size={18} className="text-brand-blue"/>
                </div>
                <h3 className="font-bold text-brand-dark">{f.label}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2 text-sm text-green-700 bg-green-50 rounded-lg p-3">
                  <CheckCircle size={16} className="shrink-0 mt-0.5"/>
                  <span>{f.good}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 rounded-lg p-3">
                  <AlertCircle size={16} className="shrink-0 mt-0.5"/>
                  <span>{f.bad}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="w-full mt-12 sm:mt-16 bg-slate-50 py-10">
        <div className="container-responsive">
          <h2 className="text-2xl font-black text-brand-dark mb-6">เคล็ดลับเพิ่มโอกาสอนุมัติสินเชื่อ</h2>
          <div className="space-y-3">
            {tips.map((t, i) => (
              <div key={i} className="flex items-start gap-3 card p-4">
                <div className="w-7 h-7 rounded-full bg-brand-blue text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {i + 1}
                </div>
                <p className="text-slate-600">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="container-responsive mt-12 sm:mt-16">
        <h2 className="text-2xl font-black text-brand-dark mb-6 text-center">ทำไมต้องปรึกษาน้ำเปล่ารถสวย?</h2>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          {[
            { icon: Building2, title: 'หลายธนาคาร', desc: 'มีพันธมิตรสถาบันการเงินหลายแห่ง เพิ่มโอกาสอนุมัติ' },
              { icon: Gift, title: 'ฟรีทุกขั้นตอน', desc: 'ไม่มีค่าใช้จ่ายในการปรึกษาและดำเนินการ' },
              { icon: Zap, title: 'อนุมัติรวดเร็ว', desc: 'ทีมงานดำเนินการให้ไว ได้คำตอบภายใน 24 ชั่วโมง' },
          ].map(f => (
            <div key={f.title} className="card p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                <f.icon size={24} className="text-brand-blue"/>
              </div>
              <h3 className="font-bold text-brand-dark">{f.title}</h3>
              <p className="text-sm text-slate-500 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-responsive mt-10 sm:mt-12 mb-8 sm:mb-12 bg-gradient-to-r from-brand-blue to-brand-dark rounded-2xl p-6 sm:p-8 text-white text-center">
        <h2 className="text-2xl font-black">ปรึกษาเรื่องเครดิตและสินเชื่อฟรี!</h2>
        <p className="mt-2 text-white/70">เราช่วยหาทางออกให้คุณได้รถในฝัน ไม่ว่าสถานการณ์จะเป็นอย่างไร</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="https://line.me/R/ti/p/@931prrnt" target="_blank"
            className="btn bg-green-500 text-white font-bold px-6 py-3 hover:bg-green-600">
            <MessageCircle size={20}/> ปรึกษา LINE ฟรี
          </a>
          <a href="tel:0947251267"
            className="btn bg-brand-yellow text-brand-dark font-bold px-6 py-3 hover:bg-yellow-300">
            <Phone size={20}/> โทร 094-725-1267
          </a>
        </div>
        <p className="mt-4 text-xs text-white/40">
          ลองคำนวณค่างวดก่อนได้ที่ <Link href="/payment-calculator" className="underline">หน้าคำนวณค่างวด</Link>
        </p>
      </section>
    </div>
  );
}
