import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';

export default function ContactBar() {
  return (
    <div className="card bg-gradient-to-r from-brand-yellow/30 to-brand-blue/10 p-4 flex flex-col md:flex-row items-center justify-between gap-3">
      <div>
        <div className="font-bold text-brand-dark">อยากได้คันไหน ทักได้เลย</div>
        <div className="text-sm text-slate-700">โทร 094-725-1267 · LINE: @931prrnt</div>
      </div>
      <div className="flex gap-2">
        <a className="btn-ghost" href="tel:0947251267"><Phone size={18}/> โทรหาเรา</a>
        <a className="btn-primary" href="https://line.me/R/ti/p/@931prrnt" target="_blank"><MessageCircle size={18}/> ทัก LINE</a>
      </div>
    </div>
  )
}
