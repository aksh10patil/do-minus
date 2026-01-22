'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Property, properties } from '@/lib/data';
import { TicinoSVG } from './TicinoSVG';
import { MapMarker } from './MapMarker';
import { 
  Drawer, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle, 
  DrawerDescription,
  DrawerFooter,
  DrawerClose
} from "@/components/ui/drawer"; 
import { Button } from '@/components/ui/button';

export default function MapExplorer() {
  const [selectedProp, setSelectedProp] = useState<Property | null>(null);
  const [hoveredProp, setHoveredProp] = useState<Property | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Simple Mobile Detection (for interaction logic)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMarkerClick = (property: Property) => {
    if (isMobile) {
 
      setSelectedProp(property);
    } else {
     
      window.location.href = `/properties/${property.slug}`;
    }
  };

  return (
    <div className="relative w-full h-full bg-[#FAF9F6] overflow-hidden flex flex-col items-center justify-center">
      
      {/* Map Container: Scrollable on mobile, Fixed on Desktop */}
      <div className="relative w-full h-[60vh] md:h-[80vh] md:w-[80vw] max-w-6xl overflow-auto md:overflow-visible no-scrollbar touch-pan-x touch-pan-y">
        
        {/* Aspect Ratio Container for Map */}
        <div className="relative min-w-[150%] md:min-w-full aspect-[4/3] md:aspect-[16/9] shadow-2xl rounded-3xl overflow-hidden border border-[#E6DFD5] bg-[#F5F3EF]">
          
          <TicinoSVG />

          {/* Markers Layer */}
          {properties.map((prop) => (
            <div 
              key={prop.id}
              onMouseEnter={() => !isMobile && setHoveredProp(prop)}
              onMouseLeave={() => !isMobile && setHoveredProp(null)}
            >
              <MapMarker 
                property={prop} 
                isMobile={isMobile}
                onClick={handleMarkerClick}
              />
            </div>
          ))}

          {/* Desktop Hover Card (Floating) */}
          <AnimatePresence>
            {hoveredProp && !isMobile && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute z-50 w-72 bg-white rounded-xl shadow-xl overflow-hidden pointer-events-none"
                style={{ 
                  left: `calc(${hoveredProp.mapX}% + 20px)`, 
                  top: `calc(${hoveredProp.mapY}% - 100px)` 
                  // Logic to flip if too close to right edge omitted for brevity
                }}
              >
                <div className="relative h-32 w-full">
                  <Image 
                    src={hoveredProp.image} 
                    alt={hoveredProp.name} 
                    fill 
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-sm">
                    {hoveredProp.type}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg text-gray-900">{hoveredProp.name}</h3>
                  <div className="flex gap-2 mt-2">
                    {hoveredProp.highlights.slice(0, 2).map((h, i) => (
                      <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {h}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 text-xs text-gray-400 font-medium">Click to explore</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <p className="md:hidden text-center text-xs text-gray-400 mt-4 uppercase tracking-widest">
          Pinch to Zoom • Tap to Explore
        </p>
      </div>

      {/* Mobile Drawer (Bottom Sheet) */}
      <Drawer open={!!selectedProp} onOpenChange={(open) => !open && setSelectedProp(null)}>
        <DrawerContent className="bg-[#FAF9F6]">
          {selectedProp && (
            <div className="mx-auto w-full max-w-sm">
              <div className="relative h-48 w-full rounded-t-lg overflow-hidden mt-4">
                <Image 
                  src={selectedProp.image} 
                  alt={selectedProp.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <DrawerHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-gray-500">{selectedProp.type}</span>
                    <DrawerTitle className="font-serif text-2xl mt-1">{selectedProp.name}</DrawerTitle>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs text-gray-400">From</span>
                    <span className="font-medium">{selectedProp.priceStart}</span>
                  </div>
                </div>
                <DrawerDescription className="mt-2 line-clamp-2">
                  {selectedProp.description}
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Link href={`/properties/${selectedProp.slug}`} className="w-full">
                  <Button className="w-full bg-slate-900 text-white hover:bg-slate-800">
                    View Property Details
                  </Button>
                </Link>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}