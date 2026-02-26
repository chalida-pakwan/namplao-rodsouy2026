
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000 // 5 minutes
const RATE_LIMIT_MAX = 3

type RateLimitState = { count: number; resetAt: number }

declare global {
  // eslint-disable-next-line no-var
  var __namplaoRateLimit: Map<string, RateLimitState> | undefined
}

function getRateLimitStore() {
  if (!globalThis.__namplaoRateLimit) globalThis.__namplaoRateLimit = new Map()
  return globalThis.__namplaoRateLimit
}

type CreditCheckPayload = {
  formType?: 'credit-check'
  fullName?: string
  phone?: string
  gender?: 'male' | 'female' | 'other'
  age?: number
  province?: string
  occupation?: string
  workplaceName?: string
  jobPosition?: string
  workYears?: number
  monthlyIncome?: number | ''
  agricultureType?: string
  farmAreaRai?: number | ''
  yearlyIncome?: number | ''
  hasFarmerBook?: 'yes' | 'no' | ''
  hasBusinessRegistration?: 'yes' | 'no' | ''
  carPrice?: number | ''
  downPayment?: number | ''
  assessment?: { title?: string; score?: number; level?: string }
}

type SellCarPayload = {
  formType: 'sell-car'
  fullName?: string
  phone?: string
  lineId?: string
  province?: string
  brand?: string
  model?: string
  year?: number
  mileageKm?: number | ''
  expectedPrice?: number | ''
  notes?: string
  photoLink?: string
}

type ContactPayload = {
  formType: 'contact'
  fullName?: string
  phone?: string
  interest?: string
  detail?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreditCheckPayload | SellCarPayload | ContactPayload

    // Lightweight anti-spam: limit per IP and per phone within a small window.
    const ip = getClientIp(request)
    const phone = normalizePhone((body as any)?.phone)

    const store = getRateLimitStore()
    const now = Date.now()

    const ipResult = ip ? consumeRateLimit(store, `ip:${ip}`, now) : null
    const phoneResult = phone ? consumeRateLimit(store, `phone:${phone}`, now) : null

    const blocked = (ipResult && !ipResult.allowed) || (phoneResult && !phoneResult.allowed)
    if (blocked) {
      const retryAfterMs = Math.min(
        ipResult && !ipResult.allowed ? ipResult.retryAfterMs : Infinity,
        phoneResult && !phoneResult.allowed ? phoneResult.retryAfterMs : Infinity
      )
      const retryAfterSeconds = Number.isFinite(retryAfterMs) ? Math.max(1, Math.ceil(retryAfterMs / 1000)) : 60

      return NextResponse.json(
        {
          error: 'Rate limit exceeded',
          detail: 'ส่งข้อความบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่อีกครั้ง',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfterSeconds),
          },
        }
      )
    }

    // Environment variables
    const serviceId = process.env.EMAILJS_SERVICE_ID
    const templateId = process.env.EMAILJS_TEMPLATE_ID
    const publicKey = process.env.EMAILJS_PUBLIC_KEY
    const privateKey = process.env.EMAILJS_PRIVATE_KEY // Only use on server!

    if (!serviceId || !templateId || !publicKey || !privateKey) {
      console.error('EmailJS Config Missing')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const formType = (body as any)?.formType
    const fromName = (body as any)?.fullName || '-'
    const message =
      formType === 'sell-car'
        ? buildSellCarMessage(body as SellCarPayload)
        : formType === 'contact'
          ? buildContactMessage(body as ContactPayload)
          : buildCreditCheckMessage(body as CreditCheckPayload)

    const subject = buildSubject(formType, fromName)

    const templateParams = {
      to_name: 'Admin',
      from_name: fromName,
      subject,
      message,
    }

    await sendEmailWithRetry({
      serviceId,
      templateId,
      publicKey,
      privateKey,
      templateParams,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: 'Failed to send email', detail: message },
      { status: 500 }
    )
  }
}

function getClientIp(request: Request) {
  // Prefer standard proxy headers (works behind Vercel/Reverse proxies)
  const xff = request.headers.get('x-forwarded-for')
  if (xff) {
    const first = xff.split(',')[0]?.trim()
    if (first) return first
  }

  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp

  return null
}

function normalizePhone(input: unknown) {
  if (typeof input !== 'string') return null
  const digits = input.replace(/\D/g, '')
  if (digits.length < 9) return null
  return digits
}

function consumeRateLimit(store: Map<string, RateLimitState>, key: string, now: number) {
  const current = store.get(key)

  // Cleanup expired entry
  if (!current || current.resetAt <= now) {
    const next: RateLimitState = { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS }
    store.set(key, next)
    return { allowed: true as const, retryAfterMs: 0 }
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return { allowed: false as const, retryAfterMs: current.resetAt - now }
  }

  current.count += 1
  store.set(key, current)
  return { allowed: true as const, retryAfterMs: 0 }
}

async function sendEmailWithRetry(input: {
  serviceId: string
  templateId: string
  publicKey: string
  privateKey: string
  templateParams: Record<string, unknown>
}) {
  try {
    await sendEmailViaEmailJsRest(input)
  } catch (err: any) {
    const status = typeof err?.status === 'number' ? err.status : undefined

    // Retry once on transient failures
    if (status === 522 || (status != null && status >= 500) || status == null) {
      await sleep(600)
      await sendEmailViaEmailJsRest(input)
      return
    }

    throw err
  }
}

async function sendEmailViaEmailJsRest(input: {
  serviceId: string
  templateId: string
  publicKey: string
  privateKey: string
  templateParams: Record<string, unknown>
}) {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 12_000)

  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: input.serviceId,
        template_id: input.templateId,
        user_id: input.publicKey,
        accessToken: input.privateKey,
        template_params: input.templateParams,
      }),
      signal: controller.signal,
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      const error: any = new Error(text || `EmailJS request failed (${res.status})`)
      error.status = res.status
      error.text = text
      throw error
    }
  } finally {
    clearTimeout(timeoutId)
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function buildCreditCheckMessage(body: CreditCheckPayload) {
  return `
[ประเมินสินเชื่อ]
--------------------------------
ชื่อ: ${body.fullName || '-'}
เบอร์โทร: ${body.phone || '-'}
อายุ: ${body.age ?? '-'} ปี
เพศ: ${body.gender === 'male' ? 'ชาย' : body.gender === 'female' ? 'หญิง' : body.gender === 'other' ? 'อื่นๆ' : '-'}
จังหวัด: ${body.province || '-'}

[ข้อมูลอาชีพ]
อาชีพ: ${getOccupationLabel(body.occupation)}
${body.workplaceName ? `ที่ทำงาน: ${body.workplaceName}` : ''}
${body.jobPosition ? `ตำแหน่ง: ${body.jobPosition}` : ''}
อายุงาน: ${body.workYears ?? '-'} ปี
รายได้: ${typeof body.monthlyIncome === 'number' ? body.monthlyIncome.toLocaleString() : '-'} บาท/เดือน

${body.occupation === 'farmer' ? `
(เกษตรกร)
ประเภทการเกษตร: ${body.agricultureType || '-'}
พื้นที่ทำเกษตร: ${typeof body.farmAreaRai === 'number' ? body.farmAreaRai : '-'} ไร่
รายได้ต่อปี: ${typeof body.yearlyIncome === 'number' ? body.yearlyIncome.toLocaleString() : '-'} บาท
สมุดเกษตรกร: ${body.hasFarmerBook === 'yes' ? 'มี' : body.hasFarmerBook === 'no' ? 'ไม่มี' : '-'}
` : ''}

${body.occupation === 'business' ? `
(เจ้าของกิจการ)
ทะเบียนพาณิชย์: ${body.hasBusinessRegistration === 'yes' ? 'มี' : body.hasBusinessRegistration === 'no' ? 'ไม่มี' : '-'}
` : ''}

[ความสนใจ]
ราคารถ: ${typeof body.carPrice === 'number' ? body.carPrice.toLocaleString() + ' บาท' : '-'}
เงินดาวน์: ${typeof body.downPayment === 'number' ? body.downPayment.toLocaleString() + ' บาท' : '-'}

[ผลประเมิน]
${body.assessment?.title || 'ยังไม่ได้ประเมิน'}
(คะแนนความน่าเชื่อถือ: ${body.assessment?.score ?? 0}/100)
--------------------------------
`.trim()
}

function buildSellCarMessage(body: SellCarPayload) {
  return `
[ขายรถ / ขอประเมินราคา]
--------------------------------
ชื่อ: ${body.fullName || '-'}
เบอร์โทร: ${body.phone || '-'}
LINE ID: ${body.lineId?.trim() ? body.lineId.trim() : '-'}
จังหวัด: ${body.province || '-'}

[ข้อมูลรถ]
ยี่ห้อ: ${body.brand || '-'}
รุ่น: ${body.model || '-'}
ปีรถ: ${body.year ?? '-'}
เลขไมล์: ${typeof body.mileageKm === 'number' ? body.mileageKm.toLocaleString() + ' กม.' : '-'}
ราคาที่อยากได้: ${typeof body.expectedPrice === 'number' ? body.expectedPrice.toLocaleString() + ' บาท' : '-'}
ลิงก์รูป/วิดีโอ: ${body.photoLink?.trim() ? body.photoLink.trim() : '-'}

[รายละเอียดเพิ่มเติม]
${body.notes?.trim() ? body.notes.trim() : '-'}
--------------------------------
`.trim()
}

function buildContactMessage(body: ContactPayload) {
  return `
[สอบถามทั่วไป]
--------------------------------
ชื่อ: ${body.fullName || '-'}
เบอร์โทร: ${body.phone || '-'}
สนใจรถรุ่น: ${body.interest?.trim() ? body.interest.trim() : '-'}

[ข้อความ]
${body.detail?.trim() ? body.detail.trim() : '-'}
--------------------------------
`.trim()
}

function buildSubject(formType: unknown, fromName: string) {
  const name = fromName?.trim() ? fromName.trim() : '-'
  switch (formType) {
    case 'sell-car':
      return `[ขายรถ] คุณ${name}`
    case 'contact':
      return `[สอบถามทั่วไป] คุณ${name}`
    case 'credit-check':
    default:
      return `[ประเมินสินเชื่อ] คุณ${name}`
  }
}

function getOccupationLabel(key?: string): string {
  const map: Record<string, string> = {
    employee: 'พนักงานเอกชน',
    government: 'ข้าราชการ/รัฐวิสาหกิจ',
    business: 'เจ้าของกิจการ',
    freelance: 'อาชีพอิสระ',
    farmer: 'เกษตรกร',
    student: 'นักเรียน/นักศึกษา',
    other: 'อื่นๆ',
  }
  if (!key) return '-'
  return map[key] || key
}
