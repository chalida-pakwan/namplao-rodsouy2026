import { Share2, Facebook, MessageCircle } from 'lucide-react';

export default function ShareButtons({ title, url }: { title: string, url: string }) {
  const encodedUrl = encodeURIComponent(url);

  return (
    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
      <span className="text-sm text-slate-500 flex items-center gap-1">
        <Share2 size={16} /> แชร์รถคันนี้:
      </span>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white text-brand-blue hover:bg-slate-50 transition-colors"
        title={`แชร์ ${title} บน Facebook`}
        aria-label={`แชร์ ${title} บน Facebook`}
      >
        <Facebook size={18} />
      </a>
      <a
        href={`https://social-plugins.line.me/lineit/share?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white text-brand-dark hover:bg-slate-50 transition-colors"
        title={`แชร์ ${title} ทาง LINE`}
        aria-label={`แชร์ ${title} ทาง LINE`}
      >
        <MessageCircle size={18} />
      </a>
    </div>
  );
}
