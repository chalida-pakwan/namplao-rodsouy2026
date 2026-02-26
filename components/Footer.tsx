import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, MessageCircle, Clock, Facebook, Music, Youtube, Check } from 'lucide-react';

const mainLinks = [
  { href: '/', label: 'หน้าแรก' },
  { href: '/cars', label: 'รถสวยพร้อมขาย' },
  { href: '/sell-car', label: 'ขายรถ / ฝากขาย' },
  { href: '/about', label: 'เกี่ยวกับเรา' },
  { href: '/promotion', label: 'โปรโมชั่น' },
  { href: '/credit-check', label: 'เช็คเครดิต' },
  { href: '/contact', label: 'ติดต่อเรา' },
  { href: '/payment-calculator', label: 'คำนวนค่างวด' },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-brand-dark text-white pb-20 lg:pb-0">
      <div className="container-responsive py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <Image 
                src="/images/logo.ico" 
                alt="น้ำเปล่ารถสวย" 
                width={48} 
                height={48} 
                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-md object-contain shrink-0" 
              />
              <div>
                <div className="font-black text-xl text-brand-yellow leading-tight">น้ำเปล่ารถสวย</div>
                <div className="text-[11px] sm:text-xs text-white/60 leading-tight">รถมือสองเชียงใหม่</div>
              </div>
            </div>
            <p className="mt-2 text-sm text-white/70">รถมือสองเชียงใหม่ คุณภาพระดับพรีเมียม</p>
            <p className="mt-2 text-sm text-white/70">ศูนย์รวมรถบ้านคุณภาพดีในเชียงใหม่ คัดสรรทุกคัน ใส่ใจทุกรายละเอียด</p>
            <div className="mt-4 space-y-2 text-sm text-white/80">
              <p className="flex items-center gap-2"><MapPin size={14} className="text-brand-yellow shrink-0"/> เชียงใหม่</p>
              <p className="flex items-center gap-2"><Phone size={14} className="text-brand-yellow shrink-0"/> <a href="tel:0947251267" className="hover:text-brand-yellow">094-725-1267</a></p>
              <p className="flex items-center gap-2"><MessageCircle size={14} className="text-brand-yellow shrink-0"/> LINE: <a href="https://line.me/R/ti/p/@931prrnt" target="_blank" className="hover:text-brand-yellow">@931prrnt</a></p>
              <p className="flex items-center gap-2"><Clock size={14} className="text-brand-yellow shrink-0"/> เปิดทุกวัน 09:00–18:00 น.</p>
            </div>
          </div>

          {/* Main links */}
          <div>
            <h2 className="font-bold text-brand-yellow mb-3 text-base">เมนูหลัก</h2>
            <ul className="space-y-2">
              {mainLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/80 hover:text-brand-yellow transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h2 className="font-bold text-brand-yellow mb-3 text-base">ติดตามเรา</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.facebook.com/chalidaonline.2020" target="_blank" className="flex items-center gap-2 text-white/80 hover:text-brand-yellow transition-colors">
                  <Facebook size={15}/> Facebook น้ำเปล่ารถสวย
                </a>
              </li>
              <li>
                <a href="https://line.me/R/ti/p/@931prrnt" target="_blank" className="flex items-center gap-2 text-white/80 hover:text-brand-yellow transition-colors">
                  <MessageCircle size={15}/> LINE Official Account
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@namplaorodsouy?_r=1&_t=ZS-94D0Nae7J56" target="_blank" className="flex items-center gap-2 text-white/80 hover:text-brand-yellow transition-colors">
                  <Music size={15}/> TikTok น้ำเปล่ารถสวย
                </a>
              </li>
              <li>
                <a href="https://youtube.com/channel/UCaVkBQKeT-9cwsyaytf2QIA?si=RZb3oELmspROiYts" target="_blank" className="flex items-center gap-2 text-white/80 hover:text-brand-yellow transition-colors">
                  <Youtube size={15}/> YouTube Channel
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h2 className="font-bold text-brand-yellow mb-3 text-base">บริการของเรา</h2>
            <ul className="space-y-2 text-sm text-white/80">
              {['รับประกันหลังการขาย 1 ปี','ฟรีดาวน์ 0% (ตามเงื่อนไข)','จัดส่งฟรีทั่วประเทศ','รับซื้อ-แลกเทิร์นรถยนต์','บริการจัดสินเชื่อครบวงจร','ปรึกษาไฟแนนซ์ฟรี'].map(item => (
                <li key={item} className="flex items-center gap-2"><Check size={13} className="text-brand-yellow shrink-0"/>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/50">
          <p>© {new Date().getFullYear()} น้ำเปล่ารถสวย. สงวนลิขสิทธิ์ทุกประการ</p>
          <p>รถมือสองเชียงใหม่ คัดคุณภาพ บริการครบ ไว้ใจได้</p>
        </div>
      </div>
    </footer>
  );
}
