'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Property, PropertyType } from '@/lib/data';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

// Color coding
const typeColors: Record<PropertyType, string> = {
  'Guesthouse': 'bg-emerald-800 border-emerald-200',
  'Mountain Retreat': 'bg-red-400 border-slate-200',
  'Lake Experience': 'bg-blue-800 border-blue-200',
};

interface MapMarkerProps {
  property: Property;
  onClick: (property: Property) => void;
  isMobile: boolean;
}

export const MapMarker = ({ property, onClick, isMobile }: MapMarkerProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // 1. Determine if the marker is in the top half of the map
  // If Y < 50%, we should show the tooltip BELOW the marker to avoid clipping.
  const isTopHalf = property.mapCoordinates.y < 50;

  return (
    <div
      className="absolute z-40 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      onClick={() => onClick(property)}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      {/* Pulse Animation */}
      <span className={cn(
        "absolute inline-flex h-full w-full rounded-full opacity-100 animate-ping",
        typeColors[property.type].split(' ')[0]
      )}></span>

      {/* The Pin Dot */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className={cn(
          "relative inline-flex items-center justify-center w-5 h-5 rounded-full border-2 shadow-xl transition-colors duration-300",
          typeColors[property.type],
          "group-hover:bg-white"
        )}
      >
        <div className={cn(
          "w-1.5 h-1.5 rounded-full bg-white transition-colors duration-300", 
          "group-hover:bg-gray-900"
        )} />
      </motion.div>

      {/* RICH HOVER CARD */}
      <AnimatePresence>
        {isHovered && !isMobile && (
          <motion.div
            // 2. Dynamic initial animation direction
            // If showing below (isTopHalf), slide slightly down. If above, slide slightly up.
            initial={{ opacity: 0, y: isTopHalf ? -10 : 10, scale: 0.95, x: "-50%" }} 
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: isTopHalf ? -5 : 5, scale: 0.95, x: "-50%" }}
            transition={{ duration: 0.2 }}
            
            className="absolute z-50 w-64 bg-white rounded-lg shadow-2xl overflow-hidden pointer-events-none"
            
            // 3. Dynamic Positioning
            style={{ 
               // Centers horizontally relative to the dot
               left: '50%', 
               
               // If marker is in top half -> place tooltip BELOW (top: 100% + gap)
               // If marker is in bottom half -> place tooltip ABOVE (bottom: 100% + gap)
               [isTopHalf ? 'top' : 'bottom']: '150%', 
            }}
          >
            <div className="relative h-28 w-full">
              <Image 
                src={property.image} 
                alt={property.name} 
                fill 
                className="object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/80 backdrop-blur px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-sm text-white font-medium">
                {property.type}
              </div>
            </div>
            <div className="p-3 text-left">
              <h3 className="font-serif text-base text-gray-900">{property.name}</h3>
              <p className="text-[10px] text-gray-400 mt-0.5 mb-2 line-clamp-1">{property.address}</p>
              <div className="flex gap-1 flex-wrap">
                {property.highlights.slice(0, 2).map((h, i) => (
                  <span key={i} className="text-[9px] bg-slate-50 text-slate-600 px-1.5 py-0.5 rounded border border-slate-100">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};