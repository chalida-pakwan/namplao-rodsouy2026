import type { Metadata } from 'next'
import './globals.css'
import { Noto_Sans_Thai } from 'next/font/google'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { buildMetadata } from '@/lib/seo'

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-noto',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = buildMetadata({
  title: 'น้ำเปล่รถสวย | รถมือสองเชียงใหม่ คัดคุณภาพ ราคาดี',
  description:
    'น้ำเปล่รถสวย รถบ้านมือสองเชียงใหม่ คุณภาพระดับพรีเมียม คัดสรรทุกคัน ฟรีดาวน์ รับประกัน 1 ปี บริการไฟแนนซ์ครบวงจร จัดส่งฟรีทั่วประเทศ',
  path: '/',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={notoSansThai.variable}>
      <body>
        <NavBar/>
        <main className="pt-16 pb-20 lg:pb-0">{children}</main>
        <Footer/>
      </body>
    </html>
  )
}
