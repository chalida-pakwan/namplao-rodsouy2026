'use client';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { formatPriceTHB } from '@/lib/format';
import Link from 'next/link';
import { Phone, MessageCircle, AlertTriangle, RotateCcw, Calculator } from 'lucide-react';


export default function PaymentCalculatorClient() {
  const [price, setPrice] = useState(0);
  const [downAmount, setDownAmount] = useState(0);
  const [downPercent, setDownPercent] = useState(0);
  const [months, setMonths] = useState(72);
  const [rate, setRate] = useState(7.50); // Default used car interest rate
  const [vat, setVat] = useState(true); // Used cars usually have VAT
  const [age, setAge] = useState(30);

  // Reset function
  const handleReset = () => {
    setPrice(0);
    setDownAmount(0);
    setDownPercent(0);
    setMonths(72);
    setRate(7.50);
  };

  const handleDownPercentChange = (val: number) => {
    setDownPercent(val);
    setDownAmount(Math.round(price * (val / 100)));
  };

  const handleDownAmountChange = (val: number) => {
    setDownAmount(val);
    setDownPercent(val > 0 ? (val / price) * 100 : 0);
  };

  const handlePriceChange = (val: number) => {
    setPrice(val);
    setDownAmount(Math.round(val * (downPercent / 100)));
  };

  const insuranceRate = useMemo(() => {
    if (age >= 20 && age <= 30) return 0.27;
    if (age >= 31 && age <= 40) return 0.4;
    if (age >= 41 && age <= 50) return 0.62;
    if (age >= 51 && age <= 60) return 1.0;
    if (age >= 61 && age <= 70) return 2.0;
    if (age < 20) return 0.27;
    return 2.0;
  }, [age]);

  const effectiveRate = rate + insuranceRate;

  const loan = Math.max(price - downAmount, 0);
  const totalInterest = loan * (effectiveRate / 100) * (months / 12);
  const totalAmount = loan + totalInterest;
  const monthlyBase = totalAmount / months;
  const monthlyVat = monthlyBase * 0.07;
  const monthlyTotal = vat ? monthlyBase + monthlyVat : monthlyBase;

  // Generate interest rates
  const interestRates = [4.50, 5.00, 5.50, 6.00, 6.50, 7.00, 7.50, 8.00, 8.50, 9.00];

  // Helper to format number with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Helper to parse string with commas to number
  const parseNumber = (val: string) => {
    const cleanVal = val.replace(/,/g, '');
    if (cleanVal === '' || isNaN(Number(cleanVal))) return 0;
    return Number(cleanVal);
  };

  return (
    <div className="mt-0">
      {/* Hero */}
      <section className="relative w-full">
        <Image
          src="/images/payment.webp"
          alt="คำนวณค่างวด"
          width={1920}
          height={650}
          priority
          sizes="100vw"
          className="w-full h-auto block"
        />

        <div className="absolute inset-0">
          <div className="container-responsive h-full flex items-center justify-center py-6 sm:py-10">
            <div className="max-w-xl md:max-w-2xl lg:max-w-3xl px-4 sm:px-6 py-3 sm:py-4 text-center mx-auto">
              <p className="text-brand-blue font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 drop-shadow-md bg-white/40 px-3 py-1 rounded-full inline-block backdrop-blur-sm shadow-sm ring-1 ring-white/50">วางแผนการเงิน</p>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-brand-blue drop-shadow-md mt-2 filter">คำนวณค่างวด</h1>
              <p className="mt-3 sm:mt-4 text-brand-dark font-bold max-w-2xl mx-auto text-sm sm:text-lg md:text-xl lg:text-2xl drop-shadow-md p-2">
                วางแผนผ่อนชำระค่างวดรถยนต์มือสอง<br className="block sm:hidden" /> ดอกเบี้ยพิเศษ เริ่มต้น 4.5%
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="container-responsive mt-10 sm:mt-12">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left */}
          <div className="lg:col-span-7 space-y-4">
            <div className="card p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 className="text-xl font-black text-brand-dark">ตั้งค่าการคำนวณ</h2>
                <button
                  type="button"
                  className="btn bg-slate-100 text-slate-700 hover:bg-slate-200"
                  onClick={handleReset}
                >
                  <RotateCcw size={16} /> รีเซ็ต
                </button>
              </div>

              <div className="mt-5 grid sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">ราคารถ (บาท)</span>
                  <input
                    className="input mt-1"
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={price === 0 ? '' : formatNumber(price)}
                    onChange={(e) => handlePriceChange(parseNumber(e.target.value))}
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">ดาวน์ (บาท)</span>
                  <input
                    className="input mt-1"
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={downAmount === 0 ? '' : formatNumber(downAmount)}
                    onChange={(e) => handleDownAmountChange(parseNumber(e.target.value))}
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">ระยะเวลาผ่อน</span>
                  <select
                    className="input mt-1"
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                  >
                    {[12, 24, 36, 48, 60, 72, 84].map((m) => (
                      <option key={m} value={m}>
                        {m} เดือน ({m / 12} ปี)
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">ดอกเบี้ยต่อปี (%)</span>
                  <select
                    className="input mt-1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                  >
                    {interestRates.map((r) => (
                      <option key={r} value={r}>
                        {r}%
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="text-sm font-semibold text-slate-700">อายุผู้กู้</span>
                  <input
                    className="input mt-1"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value) || 0)}
                  />
                </label>
              </div>

              <label className="mt-5 flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={vat}
                  onChange={(e) => setVat(e.target.checked)}
                />
                รวม VAT (7%)
              </label>

              <div className="mt-5 flex items-start gap-3 text-xs text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <AlertTriangle size={16} className="text-slate-400 shrink-0 mt-0.5" />
                <p>
                  * ผลการคำนวณเป็นการประเมินเบื้องต้น อัตราจริงขึ้นอยู่กับไฟแนนซ์และเงื่อนไขของผู้กู้
                </p>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-5 space-y-4">
            <div className="card p-5 sm:p-6">
              <h2 className="text-xl font-black text-brand-dark">ผลการคำนวณ</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">ยอดจัด</span>
                  <span className="font-bold text-slate-900">{formatPriceTHB(loan)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">ดอกเบี้ยรวม</span>
                  <span className="font-bold text-slate-900">{formatPriceTHB(totalInterest)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">ยอดรวม</span>
                  <span className="font-bold text-slate-900">{formatPriceTHB(totalAmount)}</span>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex justify-between items-end">
                  <span className="text-slate-600">ค่างวด/เดือน</span>
                  <span className="text-2xl font-black text-brand-blue">{formatPriceTHB(Math.round(monthlyTotal))}</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  อัตราดอกเบี้ยรวมโดยประมาณ: {effectiveRate.toFixed(2)}%
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                <a
                  href="https://line.me/R/ti/p/@931prrnt"
                  target="_blank"
                  className="btn bg-green-500 text-white font-bold justify-center hover:bg-green-600"
                >
                  <MessageCircle size={16} /> ทัก LINE
                </a>
                <a
                  href="tel:0947251267"
                  className="btn bg-brand-yellow text-brand-dark font-bold justify-center hover:bg-yellow-300"
                >
                  <Phone size={16} /> โทรเลย
                </a>
              </div>

              <div className="mt-4 text-center">
                <Link href="/cars" className="text-brand-blue font-semibold hover:underline">
                  ดูรถทั้งหมด →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
