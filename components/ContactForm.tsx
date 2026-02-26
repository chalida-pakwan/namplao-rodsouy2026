'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AlertCircle, CheckCircle, Loader2, MessageCircle, Phone } from 'lucide-react'

type SendResult = 'success' | 'error' | null

export default function ContactForm() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [interest, setInterest] = useState('')
  const [detail, setDetail] = useState('')
  const [acceptConsent, setAcceptConsent] = useState(false)

  const [isSending, setIsSending] = useState(false)
  const [sendResult, setSendResult] = useState<SendResult>(null)

  const successRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (sendResult === 'success') {
      successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [sendResult])

  const canSubmit = useMemo(() => {
    return (
      fullName.trim().length > 0 &&
      phone.trim().length >= 9 &&
      detail.trim().length > 0 &&
      acceptConsent
    )
  }, [acceptConsent, detail, fullName, phone])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    setIsSending(true)
    setSendResult(null)

    try {
      const payload = {
        formType: 'contact',
        fullName,
        phone,
        interest,
        detail,
      }

      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        setSendResult('success')
      } else {
        setSendResult('error')
      }
    } catch (error) {
      console.error('Contact submit error:', error)
      setSendResult('error')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <form className="grid md:grid-cols-2 gap-3 mt-3" onSubmit={handleSubmit}>
      <div>
        <label className="text-sm font-bold text-slate-700">ชื่อ *</label>
        <input className="input mt-1" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="ชื่อ-นามสกุล" />
      </div>
      <div>
        <label className="text-sm font-bold text-slate-700">เบอร์โทร *</label>
        <input className="input mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="09xxxxxxxx" inputMode="tel" />
      </div>

      <div className="md:col-span-2">
        <label className="text-sm font-bold text-slate-700">สนใจรถรุ่น... (ไม่บังคับ)</label>
        <input className="input mt-1" value={interest} onChange={(e) => setInterest(e.target.value)} placeholder="เช่น Toyota Vios 2018" />
      </div>

      <div className="md:col-span-2">
        <label className="text-sm font-bold text-slate-700">รายละเอียดเพิ่มเติม *</label>
        <textarea className="input mt-1" value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="พิมพ์คำถาม/รายละเอียดที่ต้องการให้เราช่วย" rows={4} />
      </div>

      <label className="md:col-span-2 flex items-start gap-2 text-sm text-slate-600">
        <input
          type="checkbox"
          className="mt-0.5 w-4 h-4 accent-brand-blue"
          checked={acceptConsent}
          onChange={(e) => setAcceptConsent(e.target.checked)}
        />
        <span>ฉันยินยอมให้ทีมงานติดต่อกลับตามข้อมูลที่ให้ไว้</span>
      </label>

      <button className="btn-primary md:col-span-2 flex items-center justify-center gap-2" disabled={!canSubmit || isSending}>
        {isSending && <Loader2 className="animate-spin" size={18} />}
        {isSending ? 'กำลังส่ง...' : 'ส่งข้อความ'}
      </button>

      {sendResult === 'success' && (
        <div
          ref={successRef}
          className="md:col-span-2 p-3 rounded-lg bg-green-50 text-green-700 text-sm flex items-start gap-2"
        >
          <CheckCircle className="shrink-0 mt-0.5" size={16} />
          <div className="flex-1">
            <div className="font-semibold">ส่งข้อความเรียบร้อยแล้ว</div>
            <div className="mt-0.5">ทีมงานจะติดต่อกลับโดยเร็ว (โดยปกติภายใน 30 นาที ในเวลาทำการ)</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <a className="btn-ghost" href="tel:0947251267">
                <Phone size={18} /> โทรหาเรา
              </a>
              <a className="btn-primary" href="https://line.me/R/ti/p/@931prrnt" target="_blank">
                <MessageCircle size={18} /> ทัก LINE
              </a>
            </div>
          </div>
        </div>
      )}

      {sendResult === 'error' && (
        <div className="md:col-span-2 p-3 rounded-lg bg-orange-50 text-orange-700 text-sm flex items-start gap-2">
          <AlertCircle className="shrink-0 mt-0.5" size={16} />
          <span>เกิดปัญหาในการส่งข้อความ กรุณาลองใหม่ หรือทัก LINE/โทรหาเราได้เลยครับ</span>
        </div>
      )}

      {!canSubmit && !sendResult && (
        <p className="md:col-span-2 text-xs text-slate-500">กรุณากรอกข้อมูลที่มี * ให้ครบ และติ๊กยินยอมก่อนส่ง</p>
      )}
    </form>
  )
}