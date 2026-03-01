'use client';
import { useMemo, useState } from 'react';
import { formatPriceTHB } from '@/lib/format';

type Props = { price: number };

export default function FinanceCalculator({price}:Props) {
  const [downPct, setDownPct] = useState(0); // 0% default for "เครดิตดี"
  const [downAmount, setDownAmount] = useState(0);
  const [months, setMonths] = useState(84); // 7 years
  const [rate, setRate] = useState(4.50); // example APR
  const [age, setAge] = useState(30);
  const [isAmountMode, setIsAmountMode] = useState(false);

  // Sync down payment
  const handleDownPctChange = (pct: number) => {
     setDownPct(pct);
     setDownAmount(Math.round(price * (pct / 100)));
     setIsAmountMode(false);
  }

  const handleDownAmountChange = (amt: number) => {
     setDownAmount(amt);
     setDownPct(amt > 0 ? (amt / price) * 100 : 0);
     setIsAmountMode(true);
  }

  const loan = Math.max(price - downAmount, 0);

  // Insurance Rate (Same as main calc)
  const insuranceRate = useMemo(() => {
    if (age >= 20 && age <= 30) return 0.27;
    if (age >= 31 && age <= 40) return 0.40;
    if (age >= 41 && age <= 50) return 0.62;
    if (age >= 51 && age <= 60) return 1.00;
    if (age >= 61 && age <= 70) return 2.00;
    if (age < 20) return 0.27;
    return 2.00;
  }, [age]);

  
  // Flat Rate Calculation
  const monthly = useMemo(() => {
    // Total Interest = Loan * ((Base+Ins)/100) * (Years)
    const effectiveRate = rate + insuranceRate;
    const totalInterest = loan * (effectiveRate / 100) * (months / 12);
    const totalAmount = loan + totalInterest;
    const monthlyBase = totalAmount / months;
    const monthlyVat = monthlyBase * 0.07;
    // Default to include VAT for display (approximate)
    return Math.ceil(monthlyBase + monthlyVat); 
  }, [loan, months, rate, insuranceRate]);


  // Array of interest rates based on main calculator
  const interestRates = [4.50, 5.00, 5.50, 6.00, 6.50, 7.00, 7.50, 8.00, 8.50, 9.00];

  return (
    <div className="bg-transparent">
      <div className="grid grid-cols-1 gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-baseline mb-1.5 px-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">เงินดาวน์</label>
              <button 
                onClick={() => setIsAmountMode(!isAmountMode)}
                className="text-[10px] text-brand-blue font-bold px-2 py-0.5 rounded-full bg-brand-blue/10 hover:bg-brand-blue/20 transition-colors"
              >
                {isAmountMode ? 'สลับเป็น %' : 'สลับเป็น (บาท)'}
              </button>
            </div>
            <div className="relative group">
              {isAmountMode ? (
                <>
                  <input 
                    type="number" 
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all" 
                    value={downAmount > 0 ? downAmount : ''} 
                    onChange={e => handleDownAmountChange(Number(e.target.value))} 
                    placeholder="0"
                  />
                  <span className="absolute right-4 top-[10px] text-xs font-bold text-slate-400 select-none">฿</span>
                </>
              ) : (
                <>
                  <input 
                    type="number" 
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all" 
                    value={downPct > 0 ? parseFloat(downPct.toFixed(1)) : ''} 
                    onChange={e => handleDownPctChange(Number(e.target.value))} 
                    min={0} max={100}
                    placeholder="0"
                  />
                  <span className="absolute right-4 top-[10px] text-xs font-bold text-slate-400 select-none">%</span>
                </>
              )}
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5 px-1">ระยะผ่อน</label>
            <div className="relative">
              <select 
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all appearance-none cursor-pointer" 
                value={months} 
                onChange={e => setMonths(Number(e.target.value))}
              >
                {[48, 60, 72, 84].map(m => (
                  <option key={m} value={m}>{m} งวด ({m/12} ปี)</option>
                ))}
              </select>
              <div className="absolute right-3 top-3 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5 px-1">อายุกู้ (ปี)</label>
            <div className="relative">
              <input 
                type="number" 
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all" 
                value={age} 
                onChange={e => setAge(Number(e.target.value))} 
                min={18} max={80}
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wide block mb-1.5 px-1">ดบ. (%)</label>
            <div className="relative">
              <select 
                className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all appearance-none cursor-pointer" 
                value={rate} 
                onChange={e => setRate(Number(e.target.value))}
              >
                {interestRates.map(r => (
                  <option key={r} value={r}>{r.toFixed(2)}%</option>
                ))}
              </select>
              <div className="absolute right-3 top-3 pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <div className="relative overflow-hidden bg-brand-blue/5 border border-brand-blue/20 rounded-2xl p-5 text-center shadow-inner group transition-all duration-300 hover:bg-brand-blue/10">
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-blue/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <div className="text-[13px] text-brand-dark/70 font-semibold mb-1 relative z-10">ค่างวดต่อเดือนโดยประมาณ (รวม VAT 7%)</div>
            <div className="text-3xl sm:text-4xl font-black text-brand-blue tracking-tight drop-shadow-sm relative z-10 flex items-center justify-center gap-2">
              <span className="text-lg font-bold text-brand-blue/50">~</span>{formatPriceTHB(monthly)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
