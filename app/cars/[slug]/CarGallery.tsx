'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

interface CarGalleryProps {
  images: string[];
  title: string;
}

export default function CarGallery({ images, title }: CarGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // If no images, use a placeholder
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] bg-slate-200 flex items-center justify-center rounded-xl text-slate-400">
        No Images Available
      </div>
    );
  }

  const prevImage = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  
  const nextImage = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openLightbox = (index: number) => {
    // Prevent scrolling when lightbox is open
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    if (typeof window !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
    setLightboxOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 z-[60]"
          >
            <X size={32} />
          </button>

          <div 
            className="relative w-full h-full max-w-7xl flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="relative w-full h-[80vh] aspect-[16/10]">
              <Image
                src={images[selectedIndex]}
                alt={`${title} - View ${selectedIndex + 1}`}
                fill
                className="object-contain"
                priority
                quality={90}
              />
            </div>
            
             <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-all"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          <div className="absolute bottom-4 left-0 right-0 overflow-x-auto px-4 py-2 flex justify-center">
             <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setSelectedIndex(idx); }}
                    className={`relative w-16 h-12 flex-shrink-0 rounded overflow-hidden border-2 transition-all ${
                      idx === selectedIndex ? 'border-brand-primary opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                     <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </button>
                ))}
             </div>
          </div>
          <div className="absolute top-4 left-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
            {selectedIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* Main Image Stage */}
      <div 
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-slate-900 rounded-xl overflow-hidden group cursor-pointer"
        onClick={() => openLightbox(selectedIndex)}
      >
        <Image
          src={images[selectedIndex]}
          alt={`${title} - View ${selectedIndex + 1}`}
          fill
          className="object-contain sm:object-cover transition-transform duration-500 group-hover:scale-105"
          priority
          sizes="(max-width: 768px) 100vw, 800px"
        />
        
        {/* Zoom HInt */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 pointer-events-none">
           <div className="bg-black/60 text-white px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-all">
             <ZoomIn size={18} /> กดเพื่อขยายรูป
           </div>
        </div>

        {/* Navigation Arrows (Desktop/Hover) */}
        {images.length > 1 && (
          <>
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30 backdrop-blur-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-30 backdrop-blur-sm"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm font-medium">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              idx === selectedIndex ? 'border-brand-primary ring-2 ring-brand-primary/30 opacity-100 scale-95' : 'border-transparent hover:border-slate-300 opacity-70 hover:opacity-100'
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 25vw, 100px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
