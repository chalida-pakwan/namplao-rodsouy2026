'use client';

import { Share2, Facebook, MessageCircle, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function ShareButtons({ title, url }: { title: string, url: string }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-slate-100">
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-slate-900 flex items-center gap-2">
          <Share2 size={18} className="text-brand-primary" /> 
          แชร์รถคันนี้ให้เพื่อน
        </span>
        
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#1877F2] text-white hover:bg-[#166fe5] transition-all flex-1 shadow-sm font-medium text-xs sm:text-sm"
            title={`แชร์ ${title} บน Facebook`}
          >
            <Facebook size={16} />
            <span>Facebook</span>
          </a>

          {/* LINE */}
          <a
            href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#06C755] text-white hover:bg-[#05b34c] transition-all flex-1 shadow-sm font-medium text-xs sm:text-sm"
            title={`แชร์ ${title} ทาง LINE`}
          >
            <MessageCircle size={16} />
            <span>LINE</span>
          </a>

          {/* Copy Link */}
          <button
            onClick={handleCopy}
            className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border transition-all flex-1 shadow-sm font-medium text-xs sm:text-sm ${
              copied 
                ? 'bg-green-50 border-green-200 text-green-700' 
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
            title="คัดลอกลิงก์"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            <span>{copied ? 'คัดลอกแล้ว' : 'คัดลอกลิงก์'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
