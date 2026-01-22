'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { properties, Property } from '@/lib/data';
import { MapMarker } from './MapMarker';

export default function MapExplorer() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- MOBILE CHECK ---
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- 3D TILT INTERACTION SETUP ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isMobile) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property);
  };

  return (
    <div 
      // Ensure this is pure black
      className="w-full h-full bg-black relative overflow-hidden flex items-center justify-center perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      
      {/* Container Frame with 3D Tilt */}
      <motion.div 
        ref={containerRef}
        className="relative w-full h-full max-w-5xl max-h-[80vh] aspect-[4/3] mx-auto transition-all duration-200 ease-out"
        style={{ 
          rotateX: isMobile ? 0 : rotateX, 
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d"
        }}
      >
        
        {/* The Map Background Layer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          // REMOVED: border-black (it blends with bg-black anyway)
          // ADDED: border-white/10 to give a subtle edge definition against the black bg
          className="relative w-full h-full overflow-hidden shadow-2xl"
          style={{ transform: "translateZ(-20px)" }} 
        >
          <Image
            src="/map/Map2.png"
            alt="Map of Ticino"
            fill
            // REMOVED: "sepia" filter to keep colors true and dark
            className="object-contain" 
            priority
            draggable={false}
          />

          {/* VIGNETTE: Kept for focus, matches black bg */}
          <div className="absolute inset-0 bg-radial-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none mix-blend-overlay"></div>
          
          {/* REMOVED: The Beige Texture Overlay (bg-[#f4ecd8]) was here. 
             Removing it ensures no "milky/grey" haze. */}
        </motion.div>

        {/* --- PROPERTY MARKERS LAYER --- */}
        <div className="absolute inset-0 w-full h-full" style={{ transform: "translateZ(30px)" }}>
          {properties.map((property, i) => (
            <motion.div
              key={property.id}
              className="absolute"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + (i * 0.1) }}
              style={{
                left: `${property.mapCoordinates.x}%`,
                top: `${property.mapCoordinates.y}%`,
              }}
            >
              <MapMarker 
                property={property} 
                onClick={handleMarkerClick}
                isMobile={isMobile}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mobile Bottom Sheet */}
      {isMobile && selectedProperty && (
        // CHANGED: text-stone-800 -> text-white (was invisible on black bg)
        <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/95 backdrop-blur-md p-4 rounded-xl shadow-2xl z-50 border border-white/10 animate-in slide-in-from-bottom-10 fade-in">
           <div className="flex gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 shadow-sm border border-white/10">
                 <Image src={selectedProperty.image} alt="prop" fill className="object-cover" />
              </div>
              <div>
                 {/* Fixed Text Color */}
                 <h3 className="font-serif text-lg text-white">{selectedProperty.name}</h3>
                 <button 
                    className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mt-2 hover:text-white"
                    onClick={() => setSelectedProperty(null)}
                 >
                    Close
                 </button>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}