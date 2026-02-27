import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-black text-brand-blue mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">ไม่พบหน้านี้</h2>
      <p className="text-gray-600 mb-8">หน้าที่คุณกำลังค้นหาอาจถูกย้ายหรือลบไปแล้ว</p>
      <Link href="/" className="btn bg-brand-dark text-white hover:bg-brand-blue transition-colors px-6 py-3 rounded-lg font-bold">
        กลับสู่หน้าแรก
      </Link>
    </div>
  );
}
