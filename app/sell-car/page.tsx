import Image from 'next/image';
import Link from 'next/link';
import { Phone, MessageCircle, CheckCircle, Car, ClipboardList, FileText } from 'lucide-react';
import SellCarForm from '@/components/SellCarForm';
import { buildMetadata } from '@/lib/seo';
import PageBreadcrumb from '@/components/PageBreadcrumb';

export const metadata = buildMetadata({
  title: 'รับซื้อรถเชียงใหม่ ให้ราคาสูง • ประเมินราคาฟรี | น้ำเปล่ารถสวย',
  description: 'รับซื้อรถยนต์มือสองเชียงใหม่และทั่วประเทศ ให้ราคายุติธรรม จ่ายเงินสดทันที ฟรีค่าดำเนินการ ปิดไฟแนนซ์ให้ ดูรถถึงที่โดยทีมงานมืออาชีพ',
  path: '/sell-car',
});

const brands = ['Toyota', 'Honda', 'Isuzu', 'Nissan', 'Mazda', 'Mitsubishi', 'Ford', 'Chevrolet', 'Suzuki', 'MG', 'Hyundai', 'Kia'];
const steps = [
  { num: '1', title: 'ติดต่อ LINE / โทร', desc: 'ส่งรูปรถและรายละเอียด' },
  { num: '2', title: 'นัดดูรถ', desc: 'ตรวจสอบสภาพรถจริง' },
  { num: '3', title: 'ประเมินราคา', desc: 'ให้ราคาที่ยุติธรรม' },
  { num: '4', title: 'รับเงินสด', desc: 'จ่ายเลยทันที' },
];

export default function SellCarPage() {
  return (
    <div className="mt-0">
      {/* Banner Image */}
      <section className="relative w-full">
        <Image
          src="/images/sellcar.webp"
          alt="ฝากขายรถกับน้ำเปล่ารถสวย"
          width={1920}
          height={650}
          priority
          sizes="100vw"
          className="w-full h-auto block"
        />

        <div className="absolute inset-0">
          <div className="container-responsive h-full flex items-center py-6 sm:py-10">
            <div className="max-w-xl md:max-w-2xl lg:max-w-3xl px-4 sm:px-6 py-3 sm:py-4 text-white drop-shadow-md">
              <p className="text-brand-yellow font-semibold text-xs sm:text-sm md:text-base mb-1 sm:mb-2">แลกเทิร์น • รับซื้อทุกรุ่น ทุกยี่ห้อ</p>
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight drop-shadow-lg">
                ขายรถยนต์มือสอง
                <br />
                <span className="text-brand-yellow">ประเมินราคายุติธรรม</span>
              </h1>
              <p className="mt-2 sm:mt-3 text-white/90 max-w-2xl text-xs sm:text-base md:text-lg lg:text-xl">
                น้ำเปล่ารถสวย รับซื้อรถมือสองทุกยี่ห้อ ประเมินราคาฟรี แลกเทิร์นรถยนต์
                ให้ราคายุติธรรม จ่ายเงินสดทันที ดำเนินการเอกสารให้ครบถ้วน
              </p>
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-3">
                <a
                  href="https://line.me/R/ti/p/@931prrnt"
                  target="_blank"
                  className="btn bg-green-500 text-white font-bold px-2.5 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-2 lg:py-2.5 text-[11px] sm:text-sm md:text-base lg:text-lg hover:bg-green-600"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" /> ติดต่อทาง LINE
                </a>
                <a
                  href="tel:0947251267"
                  className="btn bg-white text-brand-dark font-bold px-2.5 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-2 lg:py-2.5 text-[11px] sm:text-sm md:text-base lg:text-lg hover:bg-brand-yellow"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" /> โทร 094-725-1267
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-responsive mt-5 sm:mt-6">
        <PageBreadcrumb items={[{ label: 'ขายรถ / ฝากขาย' }]} />
      </section>

      {/* Services */}
      <section className="container-responsive mt-10 sm:mt-12">
        <h2 className="text-2xl font-black text-brand-dark mb-6 text-center">บริการรับซื้อขายรถยนต์ครบวงจร</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card p-6 border-l-4 border-brand-blue">
            <h3 className="font-bold text-brand-dark text-lg mb-3 flex items-center gap-2"><Car size={18} className="text-brand-blue"/> รับซื้อรถทุกยี่ห้อ</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> รับซื้อรถยนต์ทุกยี่ห้อ ทุกรุ่น</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> ประเมินราคายุติธรรม ตามราคาตลาด</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> จ่ายเงินสดทันที ไม่มีค่าธรรมเนียม</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> ดำเนินการเอกสารให้ครบถ้วน</li>
            </ul>
          </div>
          <div className="card p-6 border-l-4 border-brand-yellow">
            <h3 className="font-bold text-brand-dark text-lg mb-3 flex items-center gap-2"><ClipboardList size={18} className="text-brand-blue"/> ประเมินราคาฟรี</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> ตรวจสอบสภาพรถโดยผู้เชี่ยวชาญ</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> ให้ราคาประเมินที่แม่นยำ</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> ไม่มีค่าใช้จ่ายในการประเมิน</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> ให้คำปรึกษาการซื้อขายฟรี</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full mt-10 sm:mt-12 bg-slate-50 py-10">
        <div className="container-responsive">
          <h2 className="text-2xl font-black text-brand-dark text-center mb-8">ทำไมต้องเลือกขายรถกับน้ำเปล่ารถสวย?</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { num: '10+', label: 'ปีประสบการณ์' },
              { num: '7', label: 'วัน ขายได้' },
              { num: '100%', label: 'โปร่งใส ไว้ใจได้' },
            ].map(s => (
              <div key={s.label} className="card p-6">
                <div className="text-4xl font-black text-brand-blue">{s.num}</div>
                <div className="text-sm text-slate-600 mt-2">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-600 mt-6 max-w-xl mx-auto text-sm">
            ด้วยประสบการณ์ยาวนานในธุรกิจรถยนต์ เรามีลูกค้าประจำมากมาย
            และเครือข่ายการขายที่กว้างขวาง ทำให้สามารถขายรถของคุณได้อย่างรวดเร็ว ภายใน 7 วัน
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="container-responsive mt-10 sm:mt-12">
        <h2 className="text-2xl font-black text-brand-dark text-center mb-8">ขั้นตอนการขายรถกับเรา</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={i} className="card p-5 text-center relative">
              <div className="w-12 h-12 rounded-full bg-brand-blue text-white font-black text-xl flex items-center justify-center mx-auto mb-3">
                {s.num}
              </div>
              <h3 className="font-bold text-brand-dark">{s.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="container-responsive mt-10 sm:mt-12">
        <h2 className="text-xl font-black text-brand-dark mb-4">รถยี่ห้อไหนที่เรารับซื้อ</h2>
        <p className="text-slate-600 text-sm mb-4">เรารับซื้อรถยนต์ทุกยี่ห้อ ไม่ว่าจะเป็น:</p>
        <div className="flex flex-wrap gap-2">
          {brands.map(b => (
            <span key={b} className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-sm font-medium text-brand-dark">
              {b}
            </span>
          ))}
          <span className="px-4 py-2 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-sm font-medium text-brand-blue">
            และทุกยี่ห้ออื่นๆ
          </span>
        </div>
      </section>

      {/* Documents */}
      <section className="container-responsive mt-8 sm:mt-10">
        <div className="card p-5 sm:p-6">
          <h3 className="font-bold text-brand-dark text-base sm:text-lg mb-4 flex items-center gap-2"><FileText size={18} className="text-brand-blue"/> เอกสารที่ต้องเตรียม</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-600">
            <ul className="space-y-2">
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> สำเนาบัตรประชาชนเจ้าของรถ</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> สำเนาทะเบียนบ้าน</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> เล่มทะเบียนรถ (หนังสือรับรองการจดทะเบียน)</li>
            </ul>
            <ul className="space-y-2">
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> ใบตรวจสภาพรถ (ถ้ามี)</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> กรมธรรม์ประกันภัย (ถ้ามี)</li>
              <li className="flex gap-2"><CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> ใบเสร็จค่างวด (กรณีผ่อน)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="container-responsive mt-8 sm:mt-10">
        <SellCarForm brands={brands} />
      </section>

      {/* CTA */}
      <section className="container-responsive mt-8 sm:mt-10 mb-8 sm:mb-12">
        <div className="bg-gradient-to-r from-brand-blue to-brand-dark rounded-2xl p-6 sm:p-8 text-white text-center">
          <h2 className="text-xl sm:text-2xl font-black">ติดต่อขายรถวันนี้ รับเงินเร็ว</h2>
        <p className="mt-2 text-white/80">ทีมงานของเราพร้อมให้คำปรึกษาและบริการที่ดีที่สุด</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="https://line.me/R/ti/p/@931prrnt" target="_blank"
            className="btn bg-green-500 text-white font-bold px-6 py-3 hover:bg-green-600">
            <MessageCircle size={20}/> แชท LINE
          </a>
          <a href="tel:0947251267"
            className="btn bg-brand-yellow text-brand-dark font-bold px-6 py-3 hover:bg-yellow-300">
            <Phone size={20}/> โทร 094-725-1267
          </a>
        </div>
        <p className="mt-4 text-xs text-white/50">
          ต้องการข้อมูลเพิ่มเติม? ดู <Link href="/payment-calculator" className="underline">คำนวณค่างวด</Link> หรือ <Link href="/credit-check" className="underline">ตรวจสอบเครดิต</Link>
        </p>
        </div>
      </section>
    </div>
  );
}
