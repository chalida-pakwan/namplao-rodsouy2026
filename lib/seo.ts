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

  const image = toAbsoluteUrl(input.image || DEFAULT_OG_IMAGE, baseUrl)

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
      images: [{ url: image }],
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
