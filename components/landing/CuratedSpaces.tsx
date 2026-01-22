'use client';

import { motion, useAnimationControls } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { properties } from '@/lib/data'; // Your data source

export default function CuratedSpaces() {
  // 1. Duplicate items to create a seamless infinite loop
  const duplicatedProperties = [...properties, ...properties];

  // 2. Controls to pause/resume animation
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({
      x: "-50%",
      transition: {
        duration: 40, // Slower = More elegant (increase to 60 or 80 for very slow)
        ease: "linear",
        repeat: Infinity,
      }
    });
  }, [controls]);

  return (
    <section className="relative w-full bg-[#1a1818] py-32 overflow-hidden border-t border-white/5">
      
      {/* Header Section */}
      <div className="px-6 md:px-12 mb-16 flex flex-col md:flex-row justify-between items-end gap-6 max-w-7xl mx-auto">
        <div>
          <h2 className="font-serif text-3xl md:text-5xl text-white">Curated Spaces</h2>
          <div className="h-px w-24 bg-[#Cfbba3] mt-4"></div>
        </div>
        <p className="text-stone-500 text-xs tracking-[0.2em] uppercase font-medium">
          Drag or hover to pause
        </p>
      </div>

      {/* --- INFINITE SCROLL TRACK --- */}
      <div 
        className="w-full relative"
        onMouseEnter={() => controls.stop()}
        onMouseLeave={() => controls.start({ 
          x: "-50%", 
          transition: { duration: 40, ease: "linear", repeat: Infinity } 
        })}
      >
        {/* Gradient Masks for Smooth Edges */}
        <div className="absolute top-0 left-0 h-full w-24 md:w-48 z-10 bg-gradient-to-r from-[#1a1818] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 h-full w-24 md:w-48 z-10 bg-gradient-to-l from-[#1a1818] to-transparent pointer-events-none" />

        <motion.div 
          animate={controls}
          initial={{ x: "0%" }}
          className="flex gap-8 w-max px-6 md:px-12 cursor-grab active:cursor-grabbing"
          drag="x" // Allow manual dragging
          dragConstraints={{ left: -1000, right: 0 }} // Simple constraint (refine based on width if needed)
        >
          {duplicatedProperties.map((prop, index) => (
            <div 
              key={`${prop.id}-${index}`} 
              className="relative w-[85vw] md:w-[35vw] lg:w-[28vw] aspect-[3/4] group overflow-hidden bg-stone-900 rounded-sm"
            >
              {/* Image with Slow Scale Effect */}
              <div className="w-full h-full relative overflow-hidden">
                <Image 
                  src={prop.image} 
                  alt={prop.name} 
                  fill 
                  className="object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                />
                
                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500" />
              </div>

              {/* Content - Floating at bottom */}
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                
                {/* Decorative Line */}
                <div className="w-0 group-hover:w-12 h-px bg-[#Cfbba3] mb-4 transition-all duration-500 delay-100" />
                
                <span className="text-[#Cfbba3] text-[9px] uppercase tracking-[0.25em] block mb-2 opacity-80">
                  {prop.type}
                </span>
                
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-2 leading-none">
                  {prop.name}
                </h3>

                <p className="text-stone-400 text-xs font-serif italic opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0 delay-100">
                  {prop.address} — Discover Suite
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}