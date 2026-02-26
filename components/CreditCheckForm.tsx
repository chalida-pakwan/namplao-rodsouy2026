'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { CheckCircle, AlertCircle, Loader2, MessageCircle, Phone } from 'lucide-react'
import ContactBar from '@/components/ContactBar'

type Gender = 'male' | 'female' | 'other'

type Occupation =
  | 'employee'
  | 'government'
  | 'business'
  | 'freelance'
  | 'farmer'
  | 'student'
  | 'other'

type CreditStatus = 'good' | 'normal' | 'unknown' | 'no_history' | 'bad'

type AssessmentLevel = 'high' | 'medium' | 'low'

type Assessment = {
  score: number
  level: AssessmentLevel
  title: string
  detail: string
}

function clampNumber(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min
  return Math.min(max, Math.max(min, value))
}

function assessEligibility(input: {
  age: number
  occupation: Occupation
  creditStatus: CreditStatus
  workplaceName?: string
  jobPosition?: string
  workYears?: number
  monthlyIncome?: number
  hasBusinessRegistration?: boolean
  farmAreaRai?: number
  hasFarmerBook?: boolean
  carPrice?: number
  downPayment?: number
}): Assessment {
  let score = 0

  // Age (typical finance range)
  if (input.age >= 23 && input.age <= 55) score += 20
  else if (input.age >= 20 && input.age <= 60) score += 14
  else if (input.age >= 18) score += 8

  // Occupation stability
  switch (input.occupation) {
    case 'government':
      score += 22
      break
    case 'employee':
      score += 18
      break
    case 'business':
      score += 14
      break
    case 'freelance':
      score += 10
      break
    case 'farmer':
      score += 10
      break
    case 'student':
      score += 6
      break
    default:
      score += 8
      break
  }

  // Credit status
  switch (input.creditStatus) {
    case 'good':
      score += 28
      break
    case 'normal':
      score += 18
      break
    case 'no_history':
      score += 14
      break
    case 'unknown':
      score += 12
      break
    case 'bad':
      score += 0
      break
  }

  // Work duration
  const workYears = Math.max(input.workYears ?? 0, 0)
  if (workYears >= 5) score += 18
  else if (workYears >= 2) score += 12
  else if (workYears >= 1) score += 8
  else score += 4

  // Business registration (only meaningful for business owners)
  if (input.occupation === 'business' && input.hasBusinessRegistration) score += 6

  // Farmer info (light-weight heuristics)
  if (input.occupation === 'farmer' && input.hasFarmerBook) score += 6
  if (input.occupation === 'farmer') {
    const farmAreaRai = Math.max(input.farmAreaRai ?? 0, 0)
    if (farmAreaRai >= 20) score += 6
    else if (farmAreaRai >= 10) score += 4
    else if (farmAreaRai > 0) score += 2
  }

  // Income
  const monthlyIncome = Math.max(input.monthlyIncome ?? 0, 0)
  if (monthlyIncome >= 50000) score += 18
  else if (monthlyIncome >= 30000) score += 14
  else if (monthlyIncome >= 20000) score += 10
  else if (monthlyIncome > 0) score += 6

  // Down payment (prefer percent if car price given)
  const down = Math.max(input.downPayment ?? 0, 0)
  const price = Math.max(input.carPrice ?? 0, 0)
  const downPct = price > 0 ? (down / price) * 100 : undefined

  if (downPct != null) {
    if (downPct >= 25) score += 22
    else if (downPct >= 15) score += 16
    else if (downPct >= 5) score += 10
    else score += 4
  } else {
    if (down >= 100000) score += 20
    else if (down >= 50000) score += 14
    else if (down > 0) score += 8
    else score += 4
  }

  score = clampNumber(score, 0, 100)

  let level: AssessmentLevel
  let title: string
  let detail: string

  if (score >= 70) {
    level = 'high'
    title = 'โอกาสอนุมัติค่อนข้างสูง'
    detail = 'ผลนี้เป็นการประเมินเบื้องต้นจากข้อมูลที่กรอกจริง ๆ เงื่อนไขอนุมัติขึ้นอยู่กับไฟแนนซ์และเอกสารประกอบ'
  } else if (score >= 50) {
    level = 'medium'
    title = 'มีโอกาสอนุมัติ (แนะนำให้ปรึกษา)'
    detail = 'ถ้าเพิ่มเงินดาวน์หรือมีเอกสารรายได้/รายการเดินบัญชี จะช่วยเพิ่มโอกาสอนุมัติได้'
  } else {
    level = 'low'
    title = 'ควรให้ทีมงานช่วยประเมินเพิ่มเติม'
    detail = 'แนะนำให้ทัก LINE หรือโทรปรึกษา เพื่อดูทางเลือกที่เหมาะกับสถานะเครดิตและเงื่อนไขของคุณ'
  }

  return { score, level, title, detail }
}

function levelStyles(level: AssessmentLevel) {
  switch (level) {
    case 'high':
      return {
        badge: 'bg-green-50 text-green-700 border-green-200',
        bar: 'bg-green-500',
      }
    case 'medium':
      return {
        badge: 'bg-yellow-50 text-yellow-800 border-yellow-200',
        bar: 'bg-brand-yellow',
      }
    case 'low':
      return {
        badge: 'bg-red-50 text-red-700 border-red-200',
        bar: 'bg-red-500',
      }
  }
}

export default function CreditCheckForm() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState<Gender>('male')
  const [age, setAge] = useState<number>(30)

  const [occupation, setOccupation] = useState<Occupation>('employee')
  const [province, setProvince] = useState('')
  const [creditStatus, setCreditStatus] = useState<CreditStatus>('unknown')

  const [workplaceName, setWorkplaceName] = useState('')
  const [jobPosition, setJobPosition] = useState('')
  const [workYears, setWorkYears] = useState<number>(1)
  const [monthlyIncome, setMonthlyIncome] = useState<number | ''>('')
  const [hasBusinessRegistration, setHasBusinessRegistration] = useState<'yes' | 'no' | ''>('')

  const [agricultureType, setAgricultureType] = useState('')
  const [farmAreaRai, setFarmAreaRai] = useState<number | ''>('')
  const [yearlyIncome, setYearlyIncome] = useState<number | ''>('')
  const [hasFarmerBook, setHasFarmerBook] = useState<'yes' | 'no' | ''>('')

  const [carPrice, setCarPrice] = useState<number | ''>('')
  const [downPayment, setDownPayment] = useState<number | ''>('')

  const [acceptConsent, setAcceptConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const [isSending, setIsSending] = useState(false)
  const [sendResult, setSendResult] = useState<'success' | 'error' | null>(null)

  const successRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (sendResult === 'success') {
      successRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [sendResult])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return

    setSubmitted(true)
    setIsSending(true)
    setSendResult(null)

    try {
      const derivedMonthlyIncome =
        occupation === 'farmer' && typeof yearlyIncome === 'number' ? Math.max(0, yearlyIncome) / 12 : monthlyIncome

      const currentAssessment = assessEligibility({
        age,
        occupation,
        creditStatus,
        workplaceName,
        jobPosition,
        workYears,
        monthlyIncome: typeof derivedMonthlyIncome === 'number' ? derivedMonthlyIncome : undefined,
        hasBusinessRegistration: occupation === 'business' ? hasBusinessRegistration === 'yes' : undefined,
        farmAreaRai: occupation === 'farmer' && typeof farmAreaRai === 'number' ? farmAreaRai : undefined,
        hasFarmerBook: occupation === 'farmer' ? hasFarmerBook === 'yes' : undefined,
        carPrice: typeof carPrice === 'number' ? carPrice : undefined,
        downPayment: typeof downPayment === 'number' ? downPayment : undefined,
      })

      const payload = {
        formType: 'credit-check',
        fullName,
        phone,
        gender,
        age,
        occupation,
        province,
        creditStatus,
        workplaceName,
        jobPosition,
        workYears,
        monthlyIncome,
        hasBusinessRegistration,
        agricultureType,
        farmAreaRai,
        yearlyIncome,
        hasFarmerBook,
        carPrice,
        downPayment,
        assessment: currentAssessment,
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
      console.error('Submit error:', error)
      setSendResult('error')
    } finally {
      setIsSending(false)
    }
  }

  const assessment = useMemo(() => {
    if (!submitted) return null

    const derivedMonthlyIncome =
      occupation === 'farmer' && typeof yearlyIncome === 'number' ? Math.max(0, yearlyIncome) / 12 : monthlyIncome

    return assessEligibility({
      age,
      occupation,
      creditStatus,
      workplaceName,
      jobPosition,
      workYears,
      monthlyIncome: typeof derivedMonthlyIncome === 'number' ? derivedMonthlyIncome : undefined,
      hasBusinessRegistration: occupation === 'business' ? hasBusinessRegistration === 'yes' : undefined,
      farmAreaRai: occupation === 'farmer' && typeof farmAreaRai === 'number' ? farmAreaRai : undefined,
      hasFarmerBook: occupation === 'farmer' ? hasFarmerBook === 'yes' : undefined,
      carPrice: typeof carPrice === 'number' ? carPrice : undefined,
      downPayment: typeof downPayment === 'number' ? downPayment : undefined,
    })
  }, [
    submitted,
    age,
    occupation,
    creditStatus,
    workplaceName,
    jobPosition,
    workYears,
    monthlyIncome,
    hasBusinessRegistration,
    farmAreaRai,
    yearlyIncome,
    hasFarmerBook,
    carPrice,
    downPayment,
  ])

  const styles = assessment ? levelStyles(assessment.level) : null

  const isOccupationInfoComplete =
    occupation === 'business'
      ? workplaceName.trim().length > 0 &&
        workYears >= 0 &&
        typeof monthlyIncome === 'number' &&
        monthlyIncome > 0 &&
        (hasBusinessRegistration === 'yes' || hasBusinessRegistration === 'no')
      : occupation === 'farmer'
        ? agricultureType.trim().length > 0 &&
          typeof farmAreaRai === 'number' &&
          farmAreaRai > 0 &&
          typeof yearlyIncome === 'number' &&
          yearlyIncome > 0 &&
          (hasFarmerBook === 'yes' || hasFarmerBook === 'no')
      : workplaceName.trim().length > 0 &&
        jobPosition.trim().length > 0 &&
        workYears >= 0 &&
        typeof monthlyIncome === 'number' &&
        monthlyIncome > 0

  const canSubmit =
    fullName.trim().length > 0 &&
    phone.trim().length >= 9 &&
    age >= 18 &&
    province.trim().length > 0 &&
    isOccupationInfoComplete &&
    acceptConsent

  const workplaceLabel =
    occupation === 'government'
      ? 'หน่วยงาน/สถานที่ทำงาน *'
      : occupation === 'business'
        ? 'ชื่อกิจการ/บริษัท *'
      : occupation === 'student'
        ? 'สถานศึกษา *'
        : 'สถานที่ทำงาน/บริษัท *'

  const positionLabel = occupation === 'student' ? 'สถานะ/ชั้นปี *' : 'ตำแหน่งงาน *'
  const workYearsLabel = occupation === 'business' ? 'อายุกิจการ (ปี) *' : 'อายุงาน (ปี) *'

  return (
    <section className="container-responsive mt-10 sm:mt-12">
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <div className="card p-6 sm:p-8">
            <h2 className="text-2xl font-black text-brand-dark">แบบฟอร์มประเมินสินเชื่อเบื้องต้น</h2>
            <p className="mt-2 text-slate-600 text-sm">
              กรอกข้อมูลเพื่อประเมินเบื้องต้น (ไม่ใช่การตรวจเครดิตบูโร และไม่กระทบเครดิตของคุณ)
            </p>

            <form
              className="mt-6 space-y-6"
              onSubmit={handleSubmit}
            >
              {/* 1: Personal */}
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-brand-blue text-white text-sm font-black flex items-center justify-center">
                    1
                  </div>
                  <h3 className="font-bold text-brand-dark">ข้อมูลส่วนตัว</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="text-sm font-bold text-slate-700">ชื่อ-นามสกุล *</label>
                    <input
                      className="input mt-1"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="เช่น สมชาย ใจดี"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700">เบอร์โทรศัพท์ *</label>
                    <input
                      className="input mt-1"
                      inputMode="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="เช่น 09xxxxxxxx"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700">เพศ *</label>
                    <select className="input mt-1" value={gender} onChange={(e) => setGender(e.target.value as Gender)}>
                      <option value="male">ชาย</option>
                      <option value="female">หญิง</option>
                      <option value="other">อื่น ๆ</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700">อายุ (ปี) *</label>
                    <input
                      type="number"
                      className="input mt-1"
                      value={age}
                      min={18}
                      max={75}
                      onChange={(e) => setAge(clampNumber(Number(e.target.value), 18, 75))}
                    />
                  </div>
                </div>
              </div>

              {/* 2: Occupation */}
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-brand-blue text-white text-sm font-black flex items-center justify-center">
                    2
                  </div>
                  <h3 className="font-bold text-brand-dark">อาชีพ</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="text-sm font-bold text-slate-700">เลือกอาชีพของคุณ *</label>
                    <select
                      className="input mt-1"
                      value={occupation}
                      onChange={(e) => setOccupation(e.target.value as Occupation)}
                    >
                      <option value="employee">พนักงานเอกชน</option>
                      <option value="government">ข้าราชการ/รัฐวิสาหกิจ</option>
                      <option value="business">เจ้าของกิจการ</option>
                      <option value="freelance">อาชีพอิสระ</option>
                      <option value="farmer">เกษตรกร</option>
                      <option value="student">นักเรียน/นักศึกษา</option>
                      <option value="other">อื่น ๆ</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700">จังหวัดที่อาศัย *</label>
                    <input
                      className="input mt-1"
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      placeholder="เช่น เชียงใหม่"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="font-bold text-brand-dark">ข้อมูลการทำงาน</div>
                      {occupation === 'farmer' ? (
                        <div className="grid sm:grid-cols-2 gap-3 mt-3">
                          <div>
                            <label className="text-sm font-bold text-slate-700">ประเภทการเกษตร *</label>
                            <input
                              className="input mt-1"
                              value={agricultureType}
                              onChange={(e) => setAgricultureType(e.target.value)}
                              placeholder="เช่น ทำนา, ทำสวนลำไย"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-bold text-slate-700">สมุดเกษตรกร *</label>
                            <select
                              className="input mt-1"
                              value={hasFarmerBook}
                              onChange={(e) => setHasFarmerBook(e.target.value as 'yes' | 'no' | '')}
                            >
                              <option value="">เลือก...</option>
                              <option value="yes">มี</option>
                              <option value="no">ไม่มี</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-sm font-bold text-slate-700">จำนวนไร่ *</label>
                            <input
                              type="number"
                              className="input mt-1"
                              value={farmAreaRai}
                              min={0}
                              onChange={(e) => setFarmAreaRai(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                              placeholder="เช่น 5"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-bold text-slate-700">รายได้ต่อปี (บาท) *</label>
                            <input
                              type="number"
                              className="input mt-1"
                              value={yearlyIncome}
                              min={0}
                              onChange={(e) => setYearlyIncome(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                              placeholder="เช่น 300000"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid sm:grid-cols-2 gap-3 mt-3">
                          <div>
                            <label className="text-sm font-bold text-slate-700">{workplaceLabel}</label>
                            <input
                              className="input mt-1"
                              value={workplaceName}
                              onChange={(e) => setWorkplaceName(e.target.value)}
                              placeholder={occupation === 'student' ? 'เช่น มหาวิทยาลัย...' : 'เช่น บริษัท...'}
                            />
                          </div>

                          {occupation !== 'business' ? (
                            <div>
                              <label className="text-sm font-bold text-slate-700">{positionLabel}</label>
                              <input
                                className="input mt-1"
                                value={jobPosition}
                                onChange={(e) => setJobPosition(e.target.value)}
                                placeholder={occupation === 'student' ? 'เช่น ปี 2' : 'เช่น พนักงานขาย'}
                              />
                            </div>
                          ) : (
                            <div>
                              <label className="text-sm font-bold text-slate-700">ทะเบียนพาณิชย์ *</label>
                              <select
                                className="input mt-1"
                                value={hasBusinessRegistration}
                                onChange={(e) => setHasBusinessRegistration(e.target.value as 'yes' | 'no' | '')}
                              >
                                <option value="">เลือก...</option>
                                <option value="yes">มี</option>
                                <option value="no">ไม่มี</option>
                              </select>
                            </div>
                          )}

                          <div>
                            <label className="text-sm font-bold text-slate-700">{workYearsLabel}</label>
                            <input
                              type="number"
                              className="input mt-1"
                              value={workYears}
                              min={0}
                              max={60}
                              onChange={(e) => setWorkYears(clampNumber(Number(e.target.value), 0, 60))}
                            />
                          </div>

                          <div>
                            <label className="text-sm font-bold text-slate-700">รายได้ต่อเดือน (บาท) *</label>
                            <input
                              type="number"
                              className="input mt-1"
                              value={monthlyIncome}
                              min={0}
                              onChange={(e) => setMonthlyIncome(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                              placeholder="เช่น 25000"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* 3: Additional */}
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-brand-blue text-white text-sm font-black flex items-center justify-center">
                    3
                  </div>
                  <h3 className="font-bold text-brand-dark">ข้อมูลเพิ่มเติม</h3>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="text-sm font-bold text-slate-700">สถานะเครดิต *</label>
                    <select
                      className="input mt-1"
                      value={creditStatus}
                      onChange={(e) => setCreditStatus(e.target.value as CreditStatus)}
                    >
                      <option value="good">ดีมาก / ไม่เคยค้าง</option>
                      <option value="normal">ปกติ / เคยมีบ้างแต่เคลียร์แล้ว</option>
                      <option value="no_history">ไม่เคยมีเครดิต</option>
                      <option value="unknown">ไม่แน่ใจ</option>
                      <option value="bad">เคยค้าง / ติดตามทวงถาม</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700">เงินดาวน์ (บาท) *</label>
                    <input
                      type="number"
                      className="input mt-1"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                      placeholder="เช่น 0"
                      min={0}
                    />
                    <p className="text-[11px] text-slate-400 mt-1">* ใส่ 0 ได้ (กรณีฟรีดาวน์)</p>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-sm font-bold text-slate-700">ราคารถที่สนใจ (บาท) (ไม่บังคับ)</label>
                    <input
                      type="number"
                      className="input mt-1"
                      value={carPrice}
                      onChange={(e) => setCarPrice(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                      placeholder="เช่น 450000"
                      min={0}
                    />
                    <p className="text-[11px] text-slate-400 mt-1">ถ้ากรอกราคารถ ระบบจะคิด % เงินดาวน์ให้แม่นขึ้น</p>
                  </div>
                </div>

                <label className="mt-4 flex items-start gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 accent-brand-blue"
                    checked={acceptConsent}
                    onChange={(e) => setAcceptConsent(e.target.checked)}
                  />
                  <span>
                    ฉันยินยอมให้ทีมงานติดต่อกลับเพื่อประเมินสินเชื่อ และรับทราบว่าการประเมินนี้เป็นเพียงข้อมูลเบื้องต้น
                  </span>
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="btn-primary flex items-center justify-center gap-2"
                  type="submit"
                  disabled={!canSubmit || isSending}
                >
                  {isSending && <Loader2 className="animate-spin" size={18} />}
                  {isSending ? 'กำลังส่งข้อมูล...' : 'ประเมินเบื้องต้น'}
                </button>
                <button
                  className="btn-ghost"
                  type="button"
                  disabled={isSending}
                  onClick={() => {
                    setFullName('')
                    setPhone('')
                    setGender('male')
                    setAge(30)
                    setOccupation('employee')
                    setProvince('')
                    setCreditStatus('unknown')
                    setWorkplaceName('')
                    setJobPosition('')
                    setWorkYears(1)
                    setMonthlyIncome('')
                    setHasBusinessRegistration('')
                    setAgricultureType('')
                    setFarmAreaRai('')
                    setYearlyIncome('')
                    setHasFarmerBook('')
                    setCarPrice('')
                    setDownPayment('')
                    setAcceptConsent(false)
                    setSubmitted(false)
                    setSendResult(null)
                  }}
                >
                  ล้างข้อมูล
                </button>
              </div>

              {sendResult === 'success' && (
                <div
                  ref={successRef}
                  className="p-3 rounded-lg bg-green-50 text-green-700 text-sm flex items-start gap-2 animate-pulse"
                >
                  <CheckCircle className="shrink-0 mt-0.5" size={16} />
                  <div className="flex-1">
                    <div className="font-semibold">ส่งข้อมูลเรียบร้อยแล้ว</div>
                    <div className="mt-0.5">
                      ทีมงานจะติดต่อกลับโดยเร็ว (โดยปกติภายใน 30 นาที ในเวลาทำการ)
                    </div>
                    <div className="mt-0.5 text-green-700/90">
                      ท่านสามารถดูผลประเมินคร่าว ๆ ได้ทางขวา
                    </div>
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
                  <span>
                    เกิดปัญหาในการส่งข้อมูลหาแอดมิน แต่ท่านยังสามารถดูผลประเมินทางขวาได้ครับ
                  </span>
                </div>
              )}

              {!canSubmit && !sendResult && (
                <p className="text-xs text-slate-500">
                  กรุณากรอกข้อมูลที่มี * ให้ครบ และติ๊กยินยอมก่อนประเมิน
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="card p-6 sm:p-8">
            <h3 className="text-lg font-black text-brand-dark">ผลประเมิน</h3>
            <p className="text-sm text-slate-600 mt-1">จะแสดงหลังจากกด “ประเมินเบื้องต้น”</p>

            {assessment ? (
              <div className="mt-5">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-bold ${styles?.badge}`}>
                  คะแนน: {assessment.score}/100
                </div>
                <div className="mt-3">
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-2 ${styles?.bar}`} style={{ width: `${assessment.score}%` }} />
                  </div>
                </div>
                <div className="mt-4 font-bold text-brand-dark">{assessment.title}</div>
                <p className="mt-2 text-sm text-slate-600">{assessment.detail}</p>
                <p className="mt-4 text-[11px] text-slate-400">
                  หมายเหตุ: การพิจารณาจริงขึ้นอยู่กับไฟแนนซ์/เอกสาร/รุ่นรถ/ปีรถ และเงื่อนไข ณ วันยื่น
                </p>
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
                กรอกแบบฟอร์มด้านซ้าย แล้วกดประเมินเพื่อดูผล
              </div>
            )}
          </div>

          <ContactBar />
        </div>
      </div>
    </section>
  )
}
