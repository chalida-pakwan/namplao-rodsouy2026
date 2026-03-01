'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { AlertCircle, CheckCircle, Loader2, MessageCircle, Phone, UploadCloud, Image as ImageIcon } from 'lucide-react'

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
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [mileageKm, setMileageKm] = useState<number | ''>('')
  const [expectedPrice, setExpectedPrice] = useState<number | ''>('')
  const [notes, setNotes] = useState('')
  const [photoLink, setPhotoLink] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [acceptConsent, setAcceptConsent] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [sendResult, setSendResult] = useState<SendResult>(null)

  const successRef = useRef<HTMLDivElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      mileageKm !== '' &&
      acceptConsent
    )
  }, [acceptConsent, brand, fullName, model, phone, province, year, mileageKm])

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
    <div className="card max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-slate-100 p-0 sm:p-0">
      <div className="bg-brand-dark p-6 sm:p-8 text-white rounded-t-2xl">
        <h2 className="text-2xl sm:text-3xl font-black flex items-center gap-3">
          <UploadCloud className="w-8 h-8 text-brand-yellow" />
          ส่งข้อมูลรถเพื่อประเมินราคา
        </h2>
        <p className="mt-2 text-slate-200 text-sm sm:text-base">
          กรอกข้อมูลรถของคุณให้ครบถ้วน ทีมงานน้ำเปล่ารถสวยจะประเมินราคาและติดต่อกลับอย่างรวดเร็ว
        </p>
      </div>

      <div className="p-6 sm:p-8 bg-white">
        <form className="space-y-8" onSubmit={handleSubmit}>
          
          {/* Section 1: Vehicle Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
              <span className="w-7 h-7 rounded-full bg-brand-blue text-white inline-flex items-center justify-center text-sm shadow-inner">1</span>
              ข้อมูลรถยนต์
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-1">ยี่ห้อรถ *</label>
                <select className="input bg-white w-full shadow-sm" value={brand} onChange={(e) => setBrand(e.target.value)}>
                  <option value="">เลือกยี่ห้อ...</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                  <option value="อื่นๆ">อื่นๆ</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-1">รุ่นรถ *</label>
                <input className="input bg-white w-full shadow-sm" value={model} onChange={(e) => setModel(e.target.value)} placeholder="เช่น Vios, D-Max, Civic" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-1">ปีรถ (ค.ศ.) *</label>
                <input
                  type="number"
                  className="input bg-white w-full shadow-sm"
                  value={year}
                  min={1980}
                  max={new Date().getFullYear() + 1}
                  onChange={(e) => setYear(clampNumber(Number(e.target.value), 1980, new Date().getFullYear() + 1))}
                />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-1">เลขไมล์ (กม.) *</label>
                <input
                  type="number"
                  className="input bg-white w-full shadow-sm"
                  value={mileageKm}
                  min={0}
                  onChange={(e) => setMileageKm(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                  placeholder="เช่น 85000"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Photos and Details */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
              <span className="w-7 h-7 rounded-full bg-brand-blue text-white inline-flex items-center justify-center text-sm shadow-inner">2</span>
              ราคาและรายละเอียดเพิ่มเติม
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-1">ราคาที่ต้องการขาย (บาท) <span className="text-slate-400 font-normal">(ไม่บังคับ)</span></label>
                <input
                  type="number"
                  className="input bg-white w-full shadow-sm"
                  value={expectedPrice}
                  min={0}
                  onChange={(e) => setExpectedPrice(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                  placeholder="เช่น 350000"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 block mb-1">ลิงก์รูปตัวรถ <span className="text-slate-400 font-normal">(ไม่บังคับ)</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ImageIcon className="h-5 w-5 text-brand-blue/60" />
                  </div>
                  <input
                    className="input bg-white w-full pl-10 shadow-sm"
                    value={photoLink}
                    onChange={(e) => setPhotoLink(e.target.value)}
                    placeholder="วางลิงก์ Google Drive, LINE หรือ Facebook"
                  />
                </div>
                <p className="text-xs text-brand-blue/80 font-medium mt-1">แนะนำให้แนบลิงก์รูปถ่ายรอบคันและภายใน (ตั้งเป็นสาธารณะ)</p>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-bold text-slate-700 block mb-1">รายละเอียดเพิ่มเติม <span className="text-slate-400 font-normal">(ไม่บังคับ)</span></label>
                <textarea
                  className="input bg-white w-full shadow-sm"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="เกียร์, สีรถ, ตำหนิ, รุ่นย่อย, สภาพยาง, ประวัติการเข้าศูนย์ ฯลฯ"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Contact Info */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 shadow-sm">
            <h3 className="text-lg font-bold text-brand-dark mb-4 flex items-center gap-2 border-b border-slate-200 pb-3">
              <span className="w-7 h-7 rounded-full bg-brand-blue text-white inline-flex items-center justify-center text-sm shadow-inner">3</span>
              ข้อมูลสำหรับติดต่อกลับ
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-1">ชื่อ-นามสกุล *</label>
                <input className="input bg-white w-full shadow-sm" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="เช่น สมชาย ใจดี" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-1">เบอร์โทรศัพท์ *</label>
                <input className="input bg-white w-full shadow-sm" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="09xxxxxxxx (ใส่ 10 หลัก)" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-1">LINE ID <span className="text-slate-400 font-normal">(ไม่บังคับ)</span></label>
                <input className="input bg-white w-full shadow-sm" value={lineId} onChange={(e) => setLineId(e.target.value)} placeholder="ไอดีไลน์ของคุณ" />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-1">จังหวัดที่อยู่ *</label>
                <input className="input bg-white w-full shadow-sm" value={province} onChange={(e) => setProvince(e.target.value)} placeholder="เช่น เชียงใหม่, กรุงเทพ" />
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="bg-brand-blue/5 border border-brand-blue/20 rounded-xl p-4 flex items-start gap-3">
            <input
              type="checkbox"
              id="consent-checkbox"
              className="mt-1 w-5 h-5 accent-brand-blue cursor-pointer rounded"
              checked={acceptConsent}
              onChange={(e) => setAcceptConsent(e.target.checked)}
            />
            <label htmlFor="consent-checkbox" className="text-sm text-slate-700 cursor-pointer select-none">
              ฉันยืนยันว่าข้อมูลข้างต้นเป็นความจริง และ<span className="font-semibold text-brand-blue">ยินยอมให้ทีมงานน้ำเปล่ารถสวยติดต่อกลับ</span> เพื่อประเมินราคาและให้ข้อมูลเกี่ยวกับการรับซื้อรถยนต์
            </label>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200">
            <button
              className="btn-primary flex-1 text-lg py-3 flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/30 rounded-xl hover:shadow-brand-blue/40 hover:-translate-y-0.5 transition-all"
              type="submit"
              disabled={!canSubmit || isSending}
            >
              {isSending ? <Loader2 className="animate-spin" size={22} /> : <UploadCloud size={22} />}
              {isSending ? 'กำลังส่งข้อมูลให้ทีมงาน...' : 'ส่งข้อมูลให้ทีมงานประเมินราคา'}
            </button>
            <button
              className="px-6 py-3 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl font-medium transition-colors"
              type="button"
              disabled={isSending}
              onClick={() => {
                setFullName('')
                setPhone('')
                setLineId('')
                setProvince('')
                setBrand('')
                setModel('')
                setYear(new Date().getFullYear())
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

          {/* Results Block */}
          <div className="mt-0">
            {sendResult === 'success' && (
              <div ref={successRef} className="p-5 rounded-2xl bg-green-50 border border-green-200 text-green-900 flex flex-col sm:flex-row items-start gap-4 shadow-md mt-6">
                <div className="bg-green-100 p-2 rounded-full mt-1">
                  <CheckCircle className="text-green-600 w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-xl text-green-800">ส่งข้อมูลสำเร็จ!</div>
                  <div className="mt-1.5 text-green-700 leading-relaxed">
                    ทีมงานน้ำเปล่ารถสวยได้รับข้อมูลรถของคุณเรียบร้อยแล้ว<br className="hidden sm:block"/>
                    เราจะรีบทำการประเมินและติดต่อกลับโดยเร็วที่สุด <span className="font-semibold text-green-800">(ปกติภายใน 30 นาทีในเวลาทำการ)</span>
                  </div>
                  
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a className="bg-white border border-green-300 text-green-700 hover:bg-green-100 px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm" href="tel:0947251267">
                      <Phone size={18} /> โทรสอบถามทันที
                    </a>
                    <a className="bg-[#00B900] text-white hover:bg-[#009900] px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm" href="https://line.me/R/ti/p/@931prrnt" target="_blank" rel="noopener noreferrer">
                      <MessageCircle size={18} /> สอบถามผ่าน LINE
                    </a>
                  </div>
                </div>
              </div>
            )}

            {sendResult === 'error' && (
              <div className="p-5 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-4 shadow-sm mt-6">
                <div className="bg-red-100 p-2 rounded-full shrink-0">
                  <AlertCircle className="text-red-600 w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-lg text-red-800">เกิดข้อผิดพลาด</div>
                  <div className="mt-1 text-red-700">ระบบไม่สามารถส่งข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง หรือติดต่อเราโดยตรงผ่านเบอร์โทรศัพท์หรือ LINE</div>
                </div>
              </div>
            )}

            {!canSubmit && !sendResult && (
              <p className="text-center text-sm text-red-500/80 font-medium mt-4">
                * กรุณากรอกข้อมูลที่มีเครื่องหมาย * ให้ครบถ้วน และกดยอมรับเงื่อนไขก่อนส่งข้อมูล
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
