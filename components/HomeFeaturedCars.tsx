import { getCars } from '@/lib/shopify'
import CarCard from '@/components/CarCard'

export default async function HomeFeaturedCars() {
  const cars = await getCars()
  const featured = cars.filter(c => !c.sold).slice(0, 8)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
      {featured.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
      {featured.length === 0 && (
        <div className="col-span-full text-center py-12 bg-white rounded-lg">
          <p className="text-slate-500">กำลังโหลดรายการรถ...</p>
        </div>
      )}
    </div>
  )
}
