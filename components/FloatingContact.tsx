'use client';

import { Phone, MessageCircle, X, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show after scrolling a bit or delay
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded Actions */}
      <div className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-75 opacity-0 translate-y-8 pointer-events-none absolute bottom-16 right-0'}`}>
        
        {/* LINE Button */}
        <a
          href="https://line.me/R/ti/p/@931prrnt"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-end gap-3 pr-1 transition-transform hover:-translate-x-1"
          aria-label="ติดต่อทาง LINE"
        >
          <span className="bg-white text-gray-700 text-sm font-bold py-1.5 px-3 rounded-lg shadow-md border border-gray-100 hidden sm:block whitespace-nowrap">
            แชท LINE นัดดูรถ
          </span>
          <div className="w-12 h-12 bg-[#06C755] rounded-full text-white shadow-lg shadow-green-600/30 flex items-center justify-center hover:scale-110 transition-transform ring-2 ring-white">
            <MessageCircle size={24} fill="currentColor" className="text-white" />
          </div>
        </a>

        {/* Phone Button */}
        <a
          href="tel:0947251267"
          className="group flex items-center justify-end gap-3 pr-1 transition-transform hover:-translate-x-1"
          aria-label="โทรสอบถาม"
        >
          <span className="bg-white text-gray-700 text-sm font-bold py-1.5 px-3 rounded-lg shadow-md border border-gray-100 hidden sm:block whitespace-nowrap">
            โทรด่วน 094-725-1267
          </span>
          <div className="w-12 h-12 bg-brand-yellow rounded-full text-brand-dark shadow-lg shadow-yellow-500/30 flex items-center justify-center hover:scale-110 transition-transform ring-2 ring-white">
            <Phone size={24} fill="currentColor" />
          </div>
        </a>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl shadow-brand-blue/30 transition-all hover:scale-105 active:scale-95 z-50 relative ${isOpen ? 'bg-slate-700 rotate-90' : 'bg-brand-blue animate-bounce-slow'}`}
        aria-label="ติดต่อเรา"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={26} fill="currentColor" />}
        
        {/* Notification Badge */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full animate-ping"></span>
        )}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></span>
        )}
      </button>
    </div>
  );
}
