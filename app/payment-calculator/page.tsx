import { buildMetadata } from '@/lib/seo';
import PaymentCalculatorClient from './PaymentCalculatorClient';

export const metadata = buildMetadata({
  title: 'คำนวณค่างวด | น้ำเปล่รถสวย รถมือสองเชียงใหม่',
  description: 'โปรแกรมคำนวณค่างวดรถมือสองแบบ Flat Rate ช่วยวางแผนงบประมาณก่อนออกรถ พร้อมปรึกษาไฟแนนซ์ฟรี',
  path: '/payment-calculator',
});

export default function PaymentCalculatorPage() {
  return <PaymentCalculatorClient />;
}
