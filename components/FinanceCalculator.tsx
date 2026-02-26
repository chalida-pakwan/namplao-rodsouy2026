'use client';
import { useMemo, useState } from 'react';
import { formatPriceTHB } from '@/lib/format';

type Props = { price: number };

export default function FinanceCalculator({price}:Props) {
  const [downPct, setDownPct] = useState(0); // 0% default for "เครดิตดี"
  const [downAmount, setDownAmount] = useState(0);
  const [months, setMonths] = useState(84); // 7 years
  const [rate, setRate] = useState(3.49); // example APR
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

  return (
    <div className="card p-4 bg-slate-50 border border-slate-200">
      <h2 className="font-bold text-brand-dark text-lg mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-brand-yellow rounded-full"></span>
        คำนวณค่างวดเบื้องต้น
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div>
          <div className="flex justify-between items-baseline mb-1">
             <label className="text-xs font-bold text-slate-500 uppercase">เงินดาวน์</label>
             <button 
               onClick={() => setIsAmountMode(!isAmountMode)}
               className="text-[10px] text-brand-blue underline"
             >
               {isAmountMode ? 'กรอก %' : 'กรอกบาท'}
             </button>
          </div>
          <div className="relative">
            {isAmountMode ? (
               <>
                <input 
                  type="number" 
                  className="input pr-8 text-sm" 
                  value={downAmount > 0 ? downAmount : ''} 
                  onChange={e => handleDownAmountChange(Number(e.target.value))} 
                  placeholder="0"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400">฿</span>
               </>
            ) : (
               <>
                <input 
                  type="number" 
                  className="input pr-8 text-sm" 
                  value={downPct > 0 ? parseFloat(downPct.toFixed(1)) : ''} 
                  onChange={e => handleDownPctChange(Number(e.target.value))} 
                  min={0} max={100}
                  placeholder="0"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400">%</span>
               </>
            )}
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">ระยะผ่อน</label>
          <select 
            className="input mt-1 text-sm appearance-none" 
            value={months} 
            onChange={e => setMonths(Number(e.target.value))}
          >
            {[48, 60, 72, 84].map(m => (
              <option key={m} value={m}>{m} งวด ({m/12} ปี)</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">อายุกู้(ปี)</label>
          <div className="relative mt-1">
            <input 
              type="number" 
              className="input pr-4 text-sm" 
              value={age} 
              onChange={e => setAge(Number(e.target.value))} 
              min={18} max={80}
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-500 uppercase">ดบ.(%)</label>
          <div className="relative mt-1">
            <input 
              type="number" 
              step="0.1" 
              className="input text-sm" 
              value={rate} 
              onChange={e => setRate(Number(e.target.value))} 
            />
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <div className="bg-brand-blue text-white rounded-lg p-3 text-center shadow-md">
            <div className="text-xs opacity-80 mb-1">ค่างวดต่อเดือน (รวม VAT)</div>
            <div className="text-xl font-black tracking-tight">{formatPriceTHB(monthly)}</div>
          </div>
        </div>
      </div>
      <p className="text-[10px] text-slate-400 mt-3 flex items-center gap-1">
        * คำนวณแบบ Flat Rate รวมภาษีมูลค่าเพิ่ม 7% อัตราดอกเบี้ยและยอดจัดจริงขึ้นอยู่กับเครดิตของลูกค้า
      </p>
    </div>
  )
}
