import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { Noto_Sans_Thai } from 'next/font/google'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import FloatingContact from '@/components/FloatingContact'
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
        {/* Google Analytics: Replace G-XXXXXXXXXX with your Measurement ID */}
        {/* <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script> */}
        <NavBar/>
        <main className="pt-16 pb-20 lg:pb-0">{children}</main>
        <Footer/>
        <FloatingContact />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AutoDealer',
              name: 'น้ำเปล่ารถสวย',
              image: 'https://namplao-usedcars.com/images/logo.ico',
              '@id': 'https://namplao-usedcars.com',
              url: 'https://namplao-usedcars.com',
              telephone: '094-725-1267',
              priceRange: '฿฿',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'เชียงใหม่',
                addressLocality: 'เมืองเชียงใหม่',
                addressRegion: 'เชียงใหม่',
                postalCode: '50000',
                addressCountry: 'TH',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 18.7883,
                longitude: 98.9853,
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ],
                opens: '09:00',
                closes: '18:00',
              },
              sameAs: [
                'https://www.facebook.com/chalidaonline.2020',
                'https://www.tiktok.com/@namplaorodsouy',
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
