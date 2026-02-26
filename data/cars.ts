export type Car = {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  regYear?: number;
  price: number;
  mileageKm: number;
  transmission: 'AT' | 'MT';
  fuel: 'Diesel' | 'Benzine' | 'Hybrid' | 'EV';
  drivetrain?: '2WD' | '4WD';
  location: string;
  heroImage: string;
  gallery: string[];
  features: string[];
  description: string;
  sold?: boolean;
};

export const cars: Car[] = [
  {
    id: 'mux-2017-4wd',
    slug: 'isuzu-mu-x-3-0-at-4wd-2017',
    title: 'ISUZU MU-X 3.0 A/T 4WD ปี 2017/2560',
    brand: 'Isuzu',
    model: 'MU-X 3.0 4WD',
    year: 2017,
    regYear: 2017,
    price: 679000,
    mileageKm: 125000,
    transmission: 'AT',
    fuel: 'Diesel',
    drivetrain: '4WD',
    location: 'เชียงใหม่',
    heroImage: 'https://images.unsplash.com/photo-1606661921507-26758c4742f5?q=80&w=1887&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1606661921507-26758c4742f5?q=80&w=1887&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1887&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=1887&auto=format&fit=crop'
    ],
    features: ['7 ที่นั่ง', 'เบาะหนัง', 'แอร์เย็นฉ่ำ', 'Cruise Control', 'ABS', 'Airbag คู่'],
    description:
      'รถครอบครัว 7 ที่นั่ง พร้อมใช้งาน สภาพสวย เดิมทั้งคัน เช็คศูนย์ตามระยะ ขับ4 ลุยได้ทุกเส้นทาง'
  },
  {
    id: 'revo-2015-25e-prerunner-at',
    slug: 'toyota-revo-cab-2-5-e-prerunner-at-2015',
    title: 'Toyota Revo Cab 2.5 E Prerunner A/T 2015',
    brand: 'Toyota',
    model: 'Revo 2.5 E Prerunner',
    year: 2015,
    regYear: 2015,
    price: 399000,
    mileageKm: 50000,
    transmission: 'AT',
    fuel: 'Diesel',
    drivetrain: '2WD',
    location: 'เชียงใหม่',
    heroImage: 'https://images.unsplash.com/photo-1606662287493-e02a53df184d?q=80&w=1887&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1606662287493-e02a53df184d?q=80&w=1887&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1887&auto=format&fit=crop'
    ],
    features: ['เกียร์ออโต้', 'ประหยัดน้ำมัน', 'Airbag', 'ABS'],
    description: 'สภาพดี มือเดียวออกห้าง สีเดิม วิ่งน้อย ดูแลเยี่ยม'
  },
  {
    id: 'mobilio-2018-15v',
    slug: 'honda-mobilio-1-5-v-auto-2018',
    title: 'Honda Mobilio 1.5 V A/T 2018',
    brand: 'Honda',
    model: 'Mobilio 1.5 V',
    year: 2018,
    regYear: 2018,
    price: 359000,
    mileageKm: 80000,
    transmission: 'AT',
    fuel: 'Benzine',
    location: 'เชียงใหม่',
    heroImage: 'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1974&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=1974&auto=format&fit=crop'
    ],
    features: ['7 ที่นั่ง', 'จอ', 'กล้องถอยหลัง', 'Airbag', 'ABS'],
    description: 'รถครอบครัวสุดคุ้ม ประหยัดจากป้ายแดงไปเยอะ พร้อมใช้งาน'
  }
];
