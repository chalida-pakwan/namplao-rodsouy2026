import Link from 'next/link';
import Image from 'next/image';
import { Car } from '@/data/cars';
import { formatNumber, formatPriceTHB } from '@/lib/format';
import { Gauge, Cog, Fuel, MapPin, Calendar } from 'lucide-react';

interface CarCardProps {
  car: Car;
  priority?: boolean;
}

export default function CarCard({ car, priority = false }: CarCardProps) {
  const transmissionMap = {
    'AT': 'เกียร์อัตโนมัติ',
    'MT': 'เกียร์ธรรมดา'
  };

  const fuelMap = {
    'Diesel': 'ดีเซล',
    'Benzine': 'เบนซิน',
    'Hybrid': 'ไฮบริด',
    'EV': 'ไฟฟ้า'
  };

  return (
    <Link href={`/cars/${car.slug}`} className="card overflow-hidden group hover:shadow-lg transition-all">
      {/* Image Container */}
      <div className="relative w-full aspect-[16/10] bg-gray-100">
        <Image 
          src={car.heroImage} 
          alt={car.title} 
          fill 
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={50}
          className="object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        {car.sold && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">จองแล้ว</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="font-bold text-sm sm:text-base md:text-lg line-clamp-1 group-hover:text-brand-primary transition-colors">
          {car.title}
        </h3>

        {/* Specifications */}
        <div className="mt-2 text-xs sm:text-sm text-slate-600 grid grid-cols-2 gap-1 sm:gap-2">
          <span className="inline-flex items-center gap-1" title="ปีรถ">
            <Calendar size={14} className="text-brand-primary shrink-0"/> {car.year}
          </span>
          <span className="inline-flex items-center gap-1" title="เลขไมล์">
            <Gauge size={14} className="text-brand-primary shrink-0"/> {formatNumber(car.mileageKm)}
          </span>
          <span className="inline-flex items-center gap-1" title="ระบบเกียร์">
            <Cog size={14} className="text-brand-primary shrink-0"/> {transmissionMap[car.transmission]}
          </span>
          <span className="inline-flex items-center gap-1" title="เชื้อเพลิง">
            <Fuel size={14} className="text-brand-primary shrink-0"/> {fuelMap[car.fuel]}
          </span>
        </div>

        {/* Location & Price */}
        <div className="mt-3 flex items-end justify-between">
          <div>
            <div className="text-lg sm:text-xl font-black text-brand-primary">
              {formatPriceTHB(car.price)}
            </div>
            <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <MapPin size={12}/> {car.location}
            </div>
          </div>
          {!car.sold && car.price <= 1000000 && (
            <div className="badge-yellow text-sm">ฟรีดาวน์*</div>
          )}
        </div>
      </div>
    </Link>
  )
}
