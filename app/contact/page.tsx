import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle, MapPin, Clock, Facebook } from 'lucide-react';
import ContactForm from "@/components/ContactForm";
import { buildMetadata } from '@/lib/seo';
import PageBreadcrumb from '@/components/PageBreadcrumb';

export const metadata = buildMetadata({
  title: 'ติดต่อเรา | น้ำเปล่ารถสวย รถมือสองเชียงใหม่',
  description: 'ติดต่อน้ำเปล่ารถสวย โทร 094-725-1267 LINE @931prrnt เปิดทุกวัน 09:00-18:00 น. เชียงใหม่',
  path: '/contact',
});

const contacts = [
  {
    icon: Phone,
    title: 'โทรศัพท์',
    value: '094-725-1267',
    href: 'tel:0947251267',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: MessageCircle,
    title: 'LINE Official',
    value: '@931prrnt',
    href: 'https://line.me/R/ti/p/@931prrnt',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Facebook,
    title: 'Facebook',
    value: 'น้ำเปล่ารถสวย',
    href: 'https://www.facebook.com',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: MapPin,
    title: 'ที่อยู่',
    value: 'เชียงใหม่',
    href: 'https://maps.app.goo.gl/3ZUdPvoKoqjKNXsk7',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: Clock,
    title: 'เวลาทำการ',
    value: 'เปิดทุกวัน 09:00–18:00 น.',
    href: null,
    color: 'bg-orange-50 text-orange-600',
  },
];

export default function ContactPage() {
  return (
    <div className="mt-0">
      {/* Hero */}
      <section className="relative w-full">
        <Image
          src="/images/contact.webp"
          alt="ติดต่อเรา น้ำเปล่ารถสวย"
          width={1920}
          height={650}
          priority
          sizes="100vw"
          className="w-full h-auto block"
        />

        <div className="absolute inset-0">
          <div className="container-responsive h-full flex items-center py-6 sm:py-10">
            <div className="max-w-xl md:max-w-2xl lg:max-w-3xl px-4 sm:px-6 py-3 sm:py-4 text-white drop-shadow-md">
              <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight drop-shadow-lg text-brand-blue">
                ติดต่อเรา
              </h1>
              <p className="mt-2 sm:mt-3 text-brand-blue font-bold max-w-2xl text-xs sm:text-base md:text-lg lg:text-xl drop-shadow-md">
                น้ำเปล่ารถสวย รถมือสองเชียงใหม่ พร้อมให้บริการทุกวัน
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-responsive mt-5 sm:mt-6">
        <PageBreadcrumb items={[{ label: 'ติดต่อเรา' }]} />
      </section>

      <div className="container-responsive mt-10 grid lg:grid-cols-2 gap-8">
        {/* Contact info */}
        <div>
          <h2 className="text-2xl font-black text-brand-dark mb-6">ช่องทางติดต่อ</h2>
          <div className="space-y-4">
            {contacts.map((c, i) => (
              <div key={i} className="card p-4 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.color}`}>
                  <c.icon size={22}/>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-500">{c.title}</p>
                  {c.href ? (
                    <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined}
                      className="font-bold text-brand-dark hover:text-brand-blue transition-colors">
                      {c.value}
                    </a>
                  ) : (
                    <p className="font-bold text-brand-dark">{c.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick CTA */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <a href="https://line.me/R/ti/p/@931prrnt" target="_blank"
              className="btn bg-green-500 text-white font-bold py-3 justify-center hover:bg-green-600">
              <MessageCircle size={18}/> ทัก LINE
            </a>
            <a href="tel:0947251267"
              className="btn bg-brand-blue text-white font-bold py-3 justify-center hover:bg-brand-dark">
              <Phone size={18}/> โทรเลย
            </a>
          </div>

          {/* Map */}
          <div className="mt-6 rounded-xl overflow-hidden shadow-lg border border-slate-200">
            <iframe
              src="https://maps.google.com/maps?q=18.804924,99.030168&hl=th&z=15&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="p-3 bg-white text-center">
              <a href="https://maps.app.goo.gl/3ZUdPvoKoqjKNXsk7" target="_blank" className="text-sm font-bold text-brand-blue hover:underline flex items-center justify-center gap-1">
                <MapPin size={16}/> เปิดใน Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div>
          <h2 className="text-2xl font-black text-brand-dark mb-6">ฝากข้อความ</h2>
          <div className="card p-6">
            <ContactForm />
            <p className="text-xs text-slate-400 mt-3">
              * ส่งข้อความแล้ว เราจะติดต่อกลับภายใน 30 นาที ในเวลาทำการ
            </p>
          </div>

          {/* Alternative */}
          <div className="mt-4 card p-5 text-center bg-brand-yellow/10 border border-brand-yellow/30">
            <p className="font-bold text-brand-dark">ต้องการคำตอบด่วน?</p>
            <p className="text-sm text-slate-600 mt-1">ทัก LINE ได้เลย ตอบเร็วกว่า!</p>
            <a href="https://line.me/R/ti/p/@931prrnt" target="_blank"
              className="btn bg-green-500 text-white font-bold px-6 py-2 mt-3 hover:bg-green-600 mx-auto">
              <MessageCircle size={18}/> เปิด LINE
            </a>
          </div>
        </div>
      </div>

      {/* Browse cars CTA */}
      <section className="container-responsive mt-10 sm:mt-12 mb-8 sm:mb-12 bg-brand-dark rounded-2xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black">ยังไม่รู้จะเลือกรถคันไหน?</h2>
          <p className="text-white/70 mt-1 text-sm">ดูรถทั้งหมดของเรา หรือให้เราช่วยแนะนำ</p>
        </div>
        <div className="flex gap-3">
          <Link href="/cars" className="btn bg-brand-yellow text-brand-dark font-bold px-5 py-2.5">
            ดูรถทั้งหมด →
          </Link>
          <Link href="/payment-calculator" className="btn bg-white/10 text-white border border-white/20 px-5 py-2.5 hover:bg-white/20">
            คำนวณค่างวด
          </Link>
        </div>
      </section>
    </div>
  );
}
