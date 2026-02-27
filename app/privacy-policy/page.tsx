import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'นโยบายความเป็นส่วนตัว | น้ำเปล่ารถสวย',
  description:
    'นโยบายความเป็นส่วนตัวของน้ำเปล่ารถสวย อธิบายการเก็บ ใช้ และคุ้มครองข้อมูลส่วนบุคคลของลูกค้า',
  path: '/privacy-policy',
  openGraphType: 'article',
});

export default function PrivacyPolicyPage() {
  const updatedAt = '28 กุมภาพันธ์ 2569';

  return (
    <div className="container-responsive mt-10 sm:mt-12">
      <h1 className="text-3xl sm:text-4xl font-black text-brand-dark">นโยบายความเป็นส่วนตัว</h1>
      <p className="mt-2 text-sm text-slate-500">อัปเดตล่าสุด: {updatedAt}</p>

      <div className="mt-6 card p-6 sm:p-7 space-y-6 text-slate-700">
        <section>
          <h2 className="text-xl font-black text-brand-dark">1) เราเก็บข้อมูลอะไรบ้าง</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm sm:text-base">
            <li>ข้อมูลติดต่อ เช่น ชื่อ-นามสกุล เบอร์โทร LINE (ถ้ามี) และข้อความที่คุณส่งถึงเรา</li>
            <li>ข้อมูลที่คุณกรอกเพื่อประเมินสินเชื่อเบื้องต้น เช่น อายุ อาชีพ รายได้โดยประมาณ เงินดาวน์ และสถานะเครดิตที่คุณเลือก</li>
            <li>ข้อมูลการใช้งานเว็บไซต์ เช่น หน้าที่เข้าชม อุปกรณ์/เบราว์เซอร์ และคุกกี้ (ถ้ามี)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-black text-brand-dark">2) เราใช้ข้อมูลเพื่ออะไร</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm sm:text-base">
            <li>เพื่อติดต่อกลับ ให้ข้อมูลรถ นัดดูรถ หรือให้คำปรึกษาเกี่ยวกับการซื้อ/ขายรถ</li>
            <li>เพื่อประเมินความเป็นไปได้ของสินเชื่อแบบคร่าว ๆ และช่วยแนะนำการเตรียมเอกสาร</li>
            <li>เพื่อปรับปรุงคุณภาพเว็บไซต์และประสบการณ์การใช้งาน</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-black text-brand-dark">3) การเปิดเผยข้อมูลให้บุคคลภายนอก</h2>
          <p className="mt-2 text-sm sm:text-base">
            เราจะไม่ขายหรือเผยแพร่ข้อมูลส่วนบุคคลของคุณให้บุคคลภายนอกโดยไม่มีเหตุจำเป็น
            อย่างไรก็ตาม หากคุณต้องการให้เราช่วยประสานงานสินเชื่อ/ไฟแนนซ์ เราอาจส่งต่อข้อมูลที่จำเป็นให้กับสถาบันการเงินหรือพาร์ทเนอร์
            <span className="font-semibold">โดยยึดตามความยินยอมของคุณ</span> และเพื่อวัตถุประสงค์ในการดำเนินการตามที่คุณร้องขอ
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-brand-dark">4) ระยะเวลาการเก็บรักษาข้อมูล</h2>
          <p className="mt-2 text-sm sm:text-base">
            เราจะเก็บรักษาข้อมูลเท่าที่จำเป็นตามวัตถุประสงค์ที่แจ้งไว้ หรือเท่าที่กฎหมายกำหนด และจะลบ/ทำให้ไม่สามารถระบุตัวตนได้เมื่อพ้นความจำเป็น
          </p>
        </section>

        <section>
          <h2 className="text-xl font-black text-brand-dark">5) สิทธิของเจ้าของข้อมูล</h2>
          <ul className="mt-2 list-disc pl-5 space-y-1 text-sm sm:text-base">
            <li>ขอเข้าถึง/ขอสำเนาข้อมูลส่วนบุคคลของคุณ</li>
            <li>ขอแก้ไขข้อมูลให้ถูกต้อง</li>
            <li>ขอลบหรือระงับการใช้ข้อมูล (ในกรณีที่กฎหมายอนุญาต)</li>
            <li>ถอนความยินยอม (หากการประมวลผลอาศัยความยินยอม)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-black text-brand-dark">6) การติดต่อเรา</h2>
          <p className="mt-2 text-sm sm:text-base">
            หากคุณมีคำถามเกี่ยวกับนโยบายนี้ หรือต้องการใช้สิทธิของเจ้าของข้อมูล โปรดติดต่อเราได้ที่:
          </p>
          <div className="mt-3 text-sm sm:text-base">
            <p className="font-semibold text-brand-dark">น้ำเปล่ารถสวย</p>
            <p>โทร: 094-725-1267</p>
            <p>LINE: @931prrnt</p>
          </div>
        </section>

        <section>
          <p className="text-xs text-slate-500">
            หมายเหตุ: หน้านี้จัดทำเพื่ออธิบายแนวทางการคุ้มครองข้อมูลส่วนบุคคลโดยสรุป หากมีการเปลี่ยนแปลง เราจะแจ้งการอัปเดตในหน้านี้
          </p>
        </section>
      </div>
    </div>
  );
}
