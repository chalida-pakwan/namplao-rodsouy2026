'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const RETURN_STATE_KEY = 'namplao:return:cars';

type ReturnState = {
  href: string;
  scrollY: number;
  page: number;
  ids: string[];
  ts: number;
};

export default function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window === 'undefined') return;

    let href: string | null = null;
    try {
      const raw = sessionStorage.getItem(RETURN_STATE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<ReturnState>;
        if (typeof parsed?.href === 'string' && parsed.href.length > 0) {
          href = parsed.href;
        }
      }
    } catch {
      // ignore
    }

    if (href) {
      router.push(href);
      return;
    }

    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push('/cars');
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
      aria-label="ย้อนกลับ"
    >
      <ArrowLeft size={18} className="text-brand-primary" />
      ย้อนกลับ
    </button>
  );
}
