'use client';

import { motion } from 'framer-motion';
import { Property, PropertyType } from '@/lib/data';
import { cn } from '@/lib/utils';

// Color coding mapping
const typeColors: Record<PropertyType, string> = {
  'Guesthouse': 'bg-emerald-800 border-emerald-200',
  'Mountain Retreat': 'bg-slate-700 border-slate-200',
  'Lake Experience': 'bg-blue-800 border-blue-200',
};

interface MapMarkerProps {
  property: Property;
  onClick: (property: Property) => void;
  isMobile: boolean;
}

export const MapMarker = ({ property, onClick, isMobile }: MapMarkerProps) => {
  return (
    <div
      className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
      style={{ left: `${property.mapX}%`, top: `${property.mapY}%` }}
      onClick={() => onClick(property)}
    >
      {/* Pulse Effect (Soft Luxury) */}
      <span className={cn(
        "absolute inline-flex h-full w-full rounded-full opacity-20 animate-ping",
        typeColors[property.type].split(' ')[0]
      )}></span>

      {/* Actual Pin */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative inline-flex items-center justify-center w-6 h-6 rounded-full border-2 shadow-lg transition-colors duration-300",
          typeColors[property.type],
          "group-hover:bg-white" // Invert on hover
        )}
      >
        <div className={cn(
          "w-1.5 h-1.5 rounded-full bg-white transition-colors duration-300", 
          "group-hover:bg-gray-900"
        )} />
      </motion.div>

      {/* Desktop Hover Label (Hidden on Mobile) */}
      <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs uppercase tracking-widest text-gray-600 shadow-sm">
          {property.name}
        </span>
      </div>
    </div>
  );
};