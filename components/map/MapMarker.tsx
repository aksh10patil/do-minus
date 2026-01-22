'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Property, PropertyType } from '@/lib/data';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

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
  const isTopHalf = property.mapCoordinates.y < 50;

  return (
    <div
      className="absolute z-40 -translate-x-1/2 -translate-y-1/2 cursor-pointer group flex flex-col items-center justify-center"
      onClick={() => onClick(property)}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
    >
      
      {/* 1. THE PIN (Moves up on hover) */}
      <motion.div
        whileHover={{ y: -5, scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-20 flex items-center justify-center"
      >
         {/* Pulse Ring */}
        <span className={cn(
          "absolute inline-flex h-full w-full rounded-full opacity-40 animate-ping delay-75",
          typeColors[property.type].split(' ')[0]
        )}></span>

        {/* Pin Head */}
        <div className={cn(
          "relative inline-flex items-center justify-center w-5 h-5 rounded-full border-2 shadow-[0_4px_10px_rgba(0,0,0,0.5)] transition-colors duration-300",
          typeColors[property.type],
          "group-hover:bg-white group-hover:border-gray-900"
        )}>
          <div className={cn(
            "w-1.5 h-1.5 rounded-full bg-white transition-colors duration-300", 
            "group-hover:bg-gray-900"
          )} />
        </div>
      </motion.div>

      {/* 2. THE GROUND SHADOW (Stays on map, shrinks on hover) */}
      {/* We place this absolutely so it sits under the pin on the 'floor' */}
      <motion.div 
        className="absolute top-[80%] w-4 h-1.5 bg-black/40 blur-[2px] rounded-[100%]"
        animate={{ 
            scale: isHovered ? 0.6 : 1, // Shrink when pin goes up
            opacity: isHovered ? 0.3 : 0.6 
        }}
      />

      {/* RICH HOVER CARD */}
      <AnimatePresence>
        {isHovered && !isMobile && (
          <motion.div
            initial={{ opacity: 0, y: isTopHalf ? -10 : 10, scale: 0.95, x: "-50%" }} 
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: isTopHalf ? -5 : 5, scale: 0.95, x: "-50%" }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-64 bg-white rounded-lg shadow-2xl overflow-hidden pointer-events-none"
            style={{ 
               left: '50%', 
               [isTopHalf ? 'top' : 'bottom']: '180%', // Increased gap slightly to clear the shadow
            }}
          >
            {/* ... (Same Card Content as before) ... */}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};