'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { useRouter } from 'next/navigation'; // 1. Import Router
import { properties, Property } from '@/lib/data';
import { MapMarker } from './MapMarker';

export default function MapExplorer() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 2. Initialize Router
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // --- NAVIGATION LOGIC ---
  const handleMarkerClick = (property: Property) => {
    if (isMobile) {
      // Mobile: Show preview
      setSelectedProperty(property);
    } else {
      // Desktop: Navigate immediately using the slug
      router.push(`/properties/${property.slug}`); 
    }
  };

  const navigateToProperty = (property: Property) => {
      // Mobile Action: Navigate using the slug
      router.push(`/properties/${property.slug}`);
  };

  // --- 3D TILT & LIGHTING SETUP ---
  const x = useMotionValue(0);
  const y = useMotionValue(0); 
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const lightGradient = useMotionTemplate`radial-gradient(
    600px circle at ${mouseX}px ${mouseY}px,
    rgba(255, 255, 255, 0.08),
    transparent 80%
  )`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isMobile) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    const xPct = clientX / width - 0.5;
    const yPct = clientY / height - 0.5;
    
    x.set(xPct); y.set(yPct);
    mouseX.set(clientX); mouseY.set(clientY);
  };

  const handleMouseLeave = () => {
    x.set(0); y.set(0); mouseX.set(0); mouseY.set(0);
  };

  return (
    <div 
      className="w-full h-full bg-black relative overflow-hidden flex items-center justify-center perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        ref={containerRef}
        className="relative w-full h-full max-w-5xl max-h-[80vh] aspect-[4/3] mx-auto transition-all duration-200 ease-out"
        style={{ 
          rotateX: isMobile ? 0 : rotateX, 
          rotateY: isMobile ? 0 : rotateY, 
          transformStyle: "preserve-3d" 
        }}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/5 ring-1 ring-white/10 bg-[#050505]"
          style={{ transform: "translateZ(-20px)" }} 
        >
          <Image
            src="/map/Map2.png"
            alt="Map of Ticino"
            fill
            className="object-contain opacity-90" 
            priority
            draggable={false}
          />
          <motion.div className="absolute inset-0 pointer-events-none mix-blend-screen z-10" style={{ background: lightGradient }} />
          <div className="absolute inset-0 bg-radial-gradient-to-t from-black/40 via-transparent to-black/40 pointer-events-none z-10"></div>
        </motion.div>

        {/* Compass */}
        <motion.div className="absolute top-8 right-8 w-16 h-16 pointer-events-none z-0 opacity-40 hidden md:block" style={{ transform: "translateZ(10px)" }}>
            <div className="absolute inset-0 border border-white/30 rounded-full flex items-center justify-center">
                <div className="w-0.5 h-full bg-white/20"></div>
                <div className="h-0.5 w-full bg-white/20 absolute"></div>
            </div>
        </motion.div>

        {/* --- MARKERS LAYER --- */}
        <div className="absolute inset-0 w-full h-full" style={{ transform: "translateZ(40px)" }}>
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
                // 3. FIXED: Use the correct handler here!
                onClick={handleMarkerClick}
                isMobile={isMobile}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mobile Bottom Sheet */}
      {isMobile && selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/95 backdrop-blur-md p-4 rounded-xl shadow-2xl z-50 border border-white/10 animate-in slide-in-from-bottom-10 fade-in">
           <div className="flex gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 shadow-sm border border-white/10">
                 <Image src={selectedProperty.image} alt="prop" fill className="object-cover" />
              </div>
              <div className="flex flex-col items-start justify-center flex-grow">
                 <h3 className="font-serif text-lg text-white leading-none mb-1">{selectedProperty.name}</h3>
                 
                 {/* 4. ADDED: Navigation Button for Mobile */}
                 <button 
                    onClick={() => navigateToProperty(selectedProperty)}
                    className="text-[10px] bg-white text-black px-3 py-1.5 uppercase font-bold tracking-widest mt-2 rounded-sm hover:bg-stone-200"
                 >
                    Explore Suite
                 </button>
              </div>
              
              <button 
                className="absolute top-2 right-2 text-zinc-500 p-2 hover:text-white"
                onClick={() => setSelectedProperty(null)}
              >
                ✕
              </button>
           </div>
        </div>
      )}
    </div>
  );
}