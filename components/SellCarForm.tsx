'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AlertCircle, CheckCircle, Loader2, MessageCircle, Phone } from 'lucide-react'

type SendResult = 'success' | 'error' | null

type Props = {
  brands: string[]
}

function clampNumber(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min
  return Math.min(max, Math.max(min, value))
}

export default function SellCarForm({ brands }: Props) {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [lineId, setLineId] = useState('')
  const [province, setProvince] = useState('')

  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [year, setYear] = useState<number>(2018)
  const [mileageKm, setMileageKm] = useState<number | ''>('')
  const [expectedPrice, setExpectedPrice] = useState<number | ''>('')
  const [notes, setNotes] = useState('')
  const [photoLink, setPhotoLink] = useState('')

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
      province.trim().length > 0 &&
      brand.trim().length > 0 &&
      model.trim().length > 0 &&
      year >= 1980 &&
      acceptConsent
    )
  }, [acceptConsent, brand, fullName, model, phone, province, year])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    setIsSending(true)
    setSendResult(null)

    try {
      const payload = {
        formType: 'sell-car',
        fullName,
        phone,
        lineId,
        province,
        brand,
        model,
        year,
        mileageKm,
        expectedPrice,
        notes,
        photoLink,
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
      console.error('Sell-car submit error:', error)
      setSendResult('error')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="card p-6 sm:p-8">
      <h2 className="text-2xl font-black text-brand-dark">ส่งข้อมูลรถเพื่อประเมินราคา</h2>
      <p className="mt-2 text-slate-600 text-sm">กรอกข้อมูลคร่าว ๆ ทีมงานจะติดต่อกลับเพื่อประเมินราคายุติธรรม</p>

      <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
        <div>
          <div className="font-bold text-brand-dark">ข้อมูลติดต่อ</div>
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div>
              <label className="text-sm font-bold text-slate-700">ชื่อ-นามสกุล *</label>
              <input className="input mt-1" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="เช่น สมชาย ใจดี" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">เบอร์โทรศัพท์ *</label>
              <input className="input mt-1" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="เช่น 09xxxxxxxx" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">ไลน์ไอดี (ไม่บังคับ)</label>
              <input className="input mt-1" value={lineId} onChange={(e) => setLineId(e.target.value)} placeholder="เช่น namplao123" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">จังหวัดที่อาศัย *</label>
              <input className="input mt-1" value={province} onChange={(e) => setProvince(e.target.value)} placeholder="เช่น เชียงใหม่" />
            </div>
          </div>
        </div>

        <div>
          <div className="font-bold text-brand-dark">ข้อมูลรถ</div>
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div>
              <label className="text-sm font-bold text-slate-700">ยี่ห้อ *</label>
              <select className="input mt-1" value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="">เลือกยี่ห้อ...</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
                <option value="อื่นๆ">อื่นๆ</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">รุ่น *</label>
              <input className="input mt-1" value={model} onChange={(e) => setModel(e.target.value)} placeholder="เช่น Vios, D-Max" />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">ปีรถ *</label>
              <input
                type="number"
                className="input mt-1"
                value={year}
                min={1980}
                max={new Date().getFullYear() + 1}
                onChange={(e) => setYear(clampNumber(Number(e.target.value), 1980, new Date().getFullYear() + 1))}
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">เลขไมล์ (กม.) (ไม่บังคับ)</label>
              <input
                type="number"
                className="input mt-1"
                value={mileageKm}
                min={0}
                onChange={(e) => setMileageKm(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                placeholder="เช่น 85000"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">ราคาที่อยากได้ (บาท) (ไม่บังคับ)</label>
              <input
                type="number"
                className="input mt-1"
                value={expectedPrice}
                min={0}
                onChange={(e) => setExpectedPrice(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                placeholder="เช่น 350000"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-700">ลิงก์รูป/วิดีโอ (ไม่บังคับ)</label>
              <input
                className="input mt-1"
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                placeholder="เช่น ลิงก์ Google Drive หรือ Facebook"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-bold text-slate-700">รายละเอียดเพิ่มเติม (ไม่บังคับ)</label>
              <textarea
                className="input mt-1"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="เช่น สีรถ, เกียร์, เครื่องยนต์, เคยชน/น้ำท่วมไหม, สภาพยาง"
              />
            </div>
          </div>
        </div>

        <label className="flex items-start gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-brand-blue"
            checked={acceptConsent}
            onChange={(e) => setAcceptConsent(e.target.checked)}
          />
          <span>ฉันยินยอมให้ทีมงานติดต่อกลับเพื่อประเมินราคารถ และยืนยันว่าข้อมูลที่ให้เป็นข้อมูลจริง</span>
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="btn-primary flex items-center justify-center gap-2"
            type="submit"
            disabled={!canSubmit || isSending}
          >
            {isSending && <Loader2 className="animate-spin" size={18} />}
            {isSending ? 'กำลังส่งข้อมูล...' : 'ส่งข้อมูลประเมินราคา'}
          </button>
          <button
            className="btn-ghost"
            type="button"
            disabled={isSending}
            onClick={() => {
              setFullName('')
              setPhone('')
              setLineId('')
              setProvince('')
              setBrand('')
              setModel('')
              setYear(2018)
              setMileageKm('')
              setExpectedPrice('')
              setNotes('')
              setPhotoLink('')
              setAcceptConsent(false)
              setSendResult(null)
            }}
          >
            ล้างข้อมูล
          </button>
        </div>

        {sendResult === 'success' && (
          <div
            ref={successRef}
            className="p-3 rounded-lg bg-green-50 text-green-700 text-sm flex items-start gap-2"
          >
            <CheckCircle className="shrink-0 mt-0.5" size={16} />
            <div className="flex-1">
              <div className="font-semibold">ส่งข้อมูลเรียบร้อยแล้ว</div>
              <div className="mt-0.5">ทีมงานจะติดต่อกลับเพื่อประเมินราคา (โดยปกติภายใน 30 นาที ในเวลาทำการ)</div>
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
          <div className="p-3 rounded-lg bg-orange-50 text-orange-700 text-sm flex items-start gap-2">
            <AlertCircle className="shrink-0 mt-0.5" size={16} />
            <span>เกิดปัญหาในการส่งข้อมูล กรุณาลองใหม่อีกครั้ง หรือทัก LINE/โทรหาเราได้เลยครับ</span>
          </div>
        )}

        {!canSubmit && !sendResult && (
          <p className="text-xs text-slate-500">กรุณากรอกข้อมูลที่มี * ให้ครบ และติ๊กยินยอมก่อนส่ง</p>
        )}
      </form>
    </div>
  )
}
