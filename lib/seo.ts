import type { Metadata } from 'next'

const DEFAULT_SITE_NAME = 'น้ำเปล่ารถสวย'
const DEFAULT_SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://namplao-usedcars.com'

const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1542367597-8849ebc76b38?q=80&w=1974&auto=format&fit=crop'

export type SeoInput = {
  title: string
  description: string
  /** Absolute path starting with '/'. Example: '/cars' */
  path?: string
  /** Absolute URL or site-relative path (starting with '/'). */
  image?: string
  /** Default: 'website' */
  openGraphType?: 'website' | 'article'
  /** Set true for pages you don't want indexed */
  noIndex?: boolean
}

function getBaseUrl() {
  return new URL(DEFAULT_SITE_URL)
}

function toAbsoluteUrl(urlOrPath: string, baseUrl: URL) {
  if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) return urlOrPath
  if (urlOrPath.startsWith('/')) return new URL(urlOrPath, baseUrl).toString()
  return new URL(`/${urlOrPath}`, baseUrl).toString()
}

export function buildMetadata(input: SeoInput): Metadata {
  const baseUrl = getBaseUrl()
  const url = input.path ? new URL(input.path, baseUrl).toString() : baseUrl.toString()

  // Ensure image is absolute URL
  const image = input.image ? toAbsoluteUrl(input.image, baseUrl) : DEFAULT_OG_IMAGE

  return {
    metadataBase: baseUrl,
    title: input.title,
    description: input.description,
    alternates: input.path ? { canonical: input.path } : undefined,
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: DEFAULT_SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: input.title,
        }
      ],
      locale: 'th_TH',
      type: input.openGraphType || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description: input.description,
      images: [image],
    },
    icons: { icon: '/images/logo.ico', apple: '/images/logo.ico' },
    manifest: '/site.webmanifest',
    robots: input.noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : undefined,
  }
}

export function getSiteUrl() {
  return DEFAULT_SITE_URL
}

/**
 * Generates Structured Data (JSON-LD) for the Promotions/Offers page.
 * Promotes visibility of active car dealership deals on Google.
 */
export function generatePromotionsSchema() {
  const url = `${getSiteUrl()}/promotion`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": url,
    "name": "โปรโมชั่น | น้ำเปล่ารถสวย รถมือสองเชียงใหม่",
    "description": "รวมโปรโมชั่นพิเศษน้ำเปล่ารถสวย ฟรีดาวน์ ดอกเบี้ยถูก รับประกันเครื่องเกียร์ 1 ปีเต็ม",
    "mainEntity": {
      "@type": "OfferCatalog",
      "name": "ข้อเสนอพิเศษรถยนต์มือสอง",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "ออกรถฟรีดาวน์ 0%"
          },
          "description": "ออกรถได้เลย ไม่ต้องวางเงินดาวน์ สำหรับลูกค้าที่มีเครดิตดี อนุมัติง่าย รวดเร็ว",
          "priceCurrency": "THB",
          "price": "0",
          "url": url
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "WarrantyPromise",
            "name": "รับประกันเครื่องเกียร์ 1 ปีเต็ม"
          },
          "description": "ซื้อรถทุกคันรับประกันเครื่องยนต์และเกียร์ 1 ปีเต็ม ไม่จำกัดกิโลเมตร ไม่มีค่าใช้จ่ายเพิ่มเติม",
          "priceCurrency": "THB",
          "price": "0",
          "url": url
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "DeliveryEvent",
            "name": "จัดส่งฟรีทั่วประเทศ"
          },
          "description": "บริการส่งรถถึงบ้านฟรีทุกจังหวัดทั่วไทย ลูกค้าไม่ต้องเดินทางมารับเอง",
          "url": url
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "FinancialProduct",
            "name": "จัดไฟแนนซ์ ดอกเบี้ยพิเศษ"
          },
          "description": "อัตราดอกเบี้ยพิเศษจากสถาบันการเงินชั้นนำ ผ่อนสบาย ค่างวดต่ำ",
          "url": url
        }
      ]
    }
  }
}
