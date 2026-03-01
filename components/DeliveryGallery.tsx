'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

export default function DeliveryGallery() {
  const images = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    // Calculate which item is currently in view
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // Using a simpler calculation for snap-scrolling
    // scrollWidth / number of items gives the width per item including gaps
    const itemWidth = scrollWidth / images.length;
    
    // Round to nearest index
    const index = Math.round(scrollLeft / itemWidth);
    
    // Update state only if changed to prevent too many renders
    if (index !== activeIndex && index >= 0 && index < images.length) {
      setActiveIndex(index);
    }
  };

  const handleDotClick = (index: number) => {
    if (!scrollContainerRef.current) return;
    
    const { scrollWidth } = scrollContainerRef.current;
    const itemWidth = scrollWidth / images.length;
    
    scrollContainerRef.current.scrollTo({
      left: index * itemWidth,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full relative">
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-6 pt-2 hide-scrollbar w-full"
      >
        {images.map((item, idx) => (
          <div 
            key={item} 
            className="flex-none w-[280px] sm:w-[320px] snap-center"
          >
            <div className={`card overflow-hidden group shadow-md transition-all duration-300 rounded-2xl ${
              activeIndex === idx ? 'ring-2 ring-brand-blue ring-offset-2 scale-[1.02]' : 'hover:shadow-xl opacity-90'
            }`}>
              <div className="relative aspect-[3/4] bg-slate-200 w-full overflow-hidden">
                <Image
                  src={`/images/deliveries/delivery-${item}.webp`} 
                  alt={`ภาพส่งมอบรถลูกค้าน้ำเปล่ารถสวยคนที่ ${item}`}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 280px, 320px"
                /> 
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === index 
                ? 'w-6 h-2 bg-brand-blue' 
                : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Helper text for Mobile */}
      <div className="text-center mt-3 text-xs text-slate-400 sm:hidden">
        เลื่อนซ้าย-ขวา เพื่อดูภาพเพิ่มเติม
      </div>
    </div>
  );
}
