'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Car, Home, Phone, Tag, Calculator, Info, CreditCard, Menu, X } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'หน้าแรก', icon: Home },
  { href: '/cars', label: 'รถสวยพร้อมขาย', icon: Car },
  { href: '/sell-car', label: 'ขายรถ', icon: Tag },
  { href: '/promotion', label: 'โปรโมชั่น', icon: Tag },
  { href: '/credit-check', label: 'ประเมินสินเชื่อ', icon: CreditCard },
  { href: '/payment-calculator', label: 'คำนวนค่างวด', icon: Calculator },
  { href: '/about', label: 'เกี่ยวกับเรา', icon: Info },
  { href: '/contact', label: 'ติดต่อเรา', icon: Phone },
];

const mobileBottom = [
  { href: '/', label: 'หน้าแรก', icon: Home },
  { href: '/cars', label: 'รถพร้อมขาย', icon: Car },
  { href: '/payment-calculator', label: 'ค่างวด', icon: Calculator },
  { href: '/contact', label: 'ติดต่อ', icon: Phone },
];

export default function NavBar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark shadow-md">
        <div className="container-responsive flex items-center justify-between h-[64px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 min-w-0 max-w-[calc(100%-56px)] lg:-ml-3 xl:-ml-4" aria-label="น้ำเปล่ารถสวย รถมือสองเชียงใหม่">
            <Image
              src="/images/logo.ico"
              alt="น้ำเปล่ารถสวย"
              width={48}
              height={48}
              className="w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-md object-contain shrink-0"
              priority
            />
            <span className="min-w-0 leading-tight">
              <span className="block font-black text-base sm:text-lg lg:text-xl tracking-tight text-brand-yellow truncate">น้ำเปล่ารถสวย</span>
              <span className="hidden sm:block text-[11px] sm:text-xs lg:text-sm text-white/65 font-medium truncate">รถมือสองเชียงใหม่</span>
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => {
              const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
              return (
                <Link key={l.href} href={l.href}
                  className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors relative flex items-center gap-1 ${
                    active
                      ? 'bg-brand-yellow text-brand-dark'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}>
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 relative z-50"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="เมนู">
            {mobileOpen ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {mobileOpen && (
          <div className="lg:hidden fixed top-[64px] left-0 right-0 bottom-0 z-40 bg-brand-dark/95 backdrop-blur-sm animate-in slide-in-from-top-10">
            <div className="container-responsive flex flex-col gap-2 p-4 h-full overflow-y-auto">
              {navLinks.map((l) => {
                const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
                const Icon = l.icon;
                return (
                  <Link key={l.href} href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-base transition-colors ${
                      active
                        ? 'bg-brand-yellow text-brand-dark'
                        : 'text-white/90 hover:bg-white/10'
                    }`}>
                    <Icon size={20} className={active ? 'text-brand-dark' : 'text-brand-yellow'}/>
                    <span className="flex-1">{l.label}</span>
                  </Link>
                );
              })}
              <div className="mt-4 pt-4 border-t border-white/10 text-center">
                 <p className="text-white/50 text-xs">ติดต่อเรา</p>
                 <div className="flex justify-center gap-4 mt-2">
                    <a href="tel:0947251267" className="w-10 h-10 rounded-full bg-brand-blue/20 flex items-center justify-center text-brand-blue"><Phone size={20}/></a>
                 </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom nav for mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-dark border-t border-white/10 shadow-xl">
        <div className="flex items-center justify-around py-2 px-2">
          {mobileBottom.map((l) => {
            const active = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href));
            const Icon = l.icon;
            return (
              <Link key={l.href} href={l.href}
                className={`relative flex flex-col items-center gap-1 px-2 py-1 rounded-xl transition-all ${
                  active
                    ? 'text-brand-yellow'
                    : 'text-white/70 hover:text-white'
                }`}>
                <Icon size={20} strokeWidth={active ? 2.5 : 2}/>
                <span className="text-[10px] font-semibold">{l.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
