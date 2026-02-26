'use client';
import { useMemo, useState } from 'react';
import { cars as allCars } from '@/data/cars';
import { Car } from '@/data/cars';

type Props = {
  cars: Car[],
  onFiltered: (cars: Car[]) => void
}

export default function Filters({cars, onFiltered}:Props) {
  const [q, setQ] = useState('');
  const [brand, setBrand] = useState('');
  const [fuel, setFuel] = useState('');
  const [priceMax, setPriceMax] = useState<number|''>('');

  const brands = useMemo(() => Array.from(new Set(cars.map(c => c.brand))), [cars]);
  const fuels = ['Diesel','Benzine','Hybrid','EV'];

  function apply() {
    let list = cars;
    if (q) list = list.filter(c => (c.title + c.model).toLowerCase().includes(q.toLowerCase()));
    if (brand) list = list.filter(c => c.brand === brand);
    if (fuel) list = list.filter(c => c.fuel === fuel as any);
    if (priceMax !== '') list = list.filter(c => c.price <= Number(priceMax));
    onFiltered(list);
  }

  return (
    <div className="card p-4 grid grid-cols-1 md:grid-cols-5 gap-3">
      <input className="input md:col-span-2" placeholder="ค้นหารุ่น/ยี่ห้อ... เช่น Fortuner, MU-X"
        value={q} onChange={e=>setQ(e.target.value)} />
      <select className="select" value={brand} onChange={e=>setBrand(e.target.value)}>
        <option value="">ทุกยี่ห้อ</option>
        {brands.map(b => <option key={b} value={b}>{b}</option>)}
      </select>
      <select className="select" value={fuel} onChange={e=>setFuel(e.target.value)}>
        <option value="">เชื้อเพลิงทั้งหมด</option>
        {fuels.map(f => <option key={f} value={f}>{f}</option>)}
      </select>
      <input className="input" type="number" placeholder="งบไม่เกิน (บาท)" value={priceMax}
        onChange={e=>setPriceMax(e.target.value === '' ? '' : Number(e.target.value))}
        onKeyDown={(e)=>{ if(e.key==='Enter') apply(); }} />
      <div className="md:col-span-5 flex justify-end">
        <button className="btn-primary" onClick={apply}>ค้นหา</button>
      </div>
    </div>
  )
}
