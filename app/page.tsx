'use client';

import { Outfit, Playfair_Display } from "next/font/google";
import Image from "next/image";
import PropertySlider from "@/components/landing/PropertySlider";
import MapExplorer from "@/components/map/MapExplorer";
import { properties } from "@/lib/data";
import { useState, useEffect } from 'react';

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"] 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair"
});



export default function Home() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <main 
      className={`min-h-screen w-full bg-[#1a1818] text-[#e5e5e5] ${outfit.variable} ${playfair.variable} font-sans`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-full">
        
        {/* --- LEFT COLUMN: Content --- */}
        <div className="order-1 flex flex-col justify-between p-6 md:p-12 relative z-10 h-full">
          
          {/* Header - Fixed height to ensure layout stability */}
          <header className="flex w-full items-center justify-between">
           
            
          
            <nav className="hidden md:flex items-center gap-1 rounded-full bg-white/5 border border-white/5 px-1 py-1 backdrop-blur-md">
              {['Home', 'Suites', 'Dining', 'Reviews', 'Map'].map((item) => (
                <button
                  key={item}
                  onClick={() => item === 'Map' && setIsMapOpen(true)}
                  className="px-4 py-2 text-[8px] font-semibold tracking-[0.2em] uppercase text-stone-400 hover:bg-white/10 hover:text-white rounded-full transition-all duration-300"
                >
                  {item}
                </button>
              ))}
            </nav>
            
            {/* Spacer for balance on mobile */}
            <div className="w-8 md:hidden"></div> 
          </header>

          {/* Centered Content Area */}
          <div className="flex flex-col justify-center items-center text-center flex-grow space-y-6 md:space-y-8 py-8">
            
            {/* Thumbnails - Slightly Smaller */}
            <div className="flex gap-3 justify-center">
                {properties.slice(0, 3).map((prop, idx) => (
                    <div 
                      key={idx} 
                      className="group relative w-14 md:w-16 aspect-[3/4] overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                    >
                         <Image 
                            src={prop.image} 
                            alt="preview" 
                            fill 
                            className="object-cover"
                         />
                    </div>
                ))}
            </div>

            {/* Typography: Scaled Down & Elegant */}
            <div className="space-y-2">
              <h1 className="font-sans text-3xl md:text-5xl font-light leading-none tracking-tight text-white uppercase">
                Do-Minus
              </h1>
              <h2 className="font-sans text-2xl md:text-4xl font-light leading-none tracking-tight text-white/80 uppercase">
                Collection
              </h2>
              
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-stone-700 to-transparent mx-auto my-3"></div>
              
              <p className="text-[9px] md:text-[10px] tracking-[0.3em] text-stone-400 uppercase font-medium">
                Design Retreats & Spa
              </p>
            </div>

            {/* CTA Button: Smaller, more refined */}
            <div className="pt-2">
              <button className="relative overflow-hidden bg-gradient-to-r from-[#Cfbba3] to-[#b09e86] px-10 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1818] transition-transform hover:scale-105 hover:shadow-[0_0_20px_rgba(190,165,135,0.2)] active:scale-95">
                Book Your Stay
              </button>
            </div>

            {/* Description - More readable width */}
            <p className="hidden md:block max-w-sm text-center text-stone-500 font-serif text-xs leading-loose tracking-wide">
                Exclusive spaces combining nature, wellbeing, and design. 
                Historic buildings meticulously restored by Riccarda Guidotti and Andrea Frapolli.
            </p>

          </div>

          {/* Footer - Pinned to bottom */}
          <div className="flex justify-center md:justify-between items-end text-[9px] tracking-[0.3em] text-stone-600 uppercase">
             <span className="hidden md:block">ticino, switzerland</span>
             <span>Scroll Down</span>
             <span className="hidden md:block">+41 76 364 85 45</span>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Slider --- */}
        <div className="relative order-2 h-[50vh] md:h-screen w-full">
          <PropertySlider />
        </div>

      </div>

      {/* Map Overlay */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm p-4 md:p-8">
          <div className="relative w-full h-full max-w-[95vw] max-h-[95vh] bg-[#000000] rounded-2xl shadow-2xl overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setIsMapOpen(false)}
              className="absolute top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 backdrop-blur-sm"
              aria-label="Close map"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* MapExplorer Component */}
            <MapExplorer />
          </div>
        </div>
      )}
    </main>
  );
}