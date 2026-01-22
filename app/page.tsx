'use client';

import { Outfit, Playfair_Display } from "next/font/google";
import Image from "next/image";
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// --- YOUR EXISTING COMPONENTS ---
import PropertySlider from "@/components/landing/PropertySlider";
import MapExplorer from "@/components/map/MapExplorer";
import { properties } from "@/lib/data";
import CuratedSpaces from "@/components/landing/CuratedSpaces";

// --- FONTS ---
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"]
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
});

// --- ANIMATION HELPER COMPONENTS ---

// 1. FadeIn: A wrapper that fades elements up when they enter the viewport
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// 2. ParallaxImage: An image that moves slightly slower than the scroll
const ParallaxImage = ({ src, alt }: { src: string, alt: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>
    </div>
  );
};


// --- MAIN PAGE COMPONENT ---

export default function Home() {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <main className={`min-h-screen w-full bg-[#1a1818] text-[#e5e5e5] ${outfit.variable} ${playfair.variable} font-sans selection:bg-[#Cfbba3] selection:text-black`}>

      {/* =========================================
          HERO SECTION (Your Existing Code) 
         ========================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen w-full relative z-10 bg-[#1a1818]">

        {/* LEFT COLUMN */}
        <div className="order-1 flex flex-col justify-between p-6 md:p-12 relative z-10 h-full border-r border-white/5">
          <header className="flex w-full items-center justify-between">
            <div className="w-8 h-8 bg-white/10 rounded-full md:hidden"></div>
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
            <button
              onClick={() => setIsMapOpen(true)}
              className="md:hidden px-4 py-2 text-[9px] font-bold tracking-[0.2em] uppercase bg-white/10 rounded-full border border-white/5"
            >
              Map
            </button>
          </header>

          <div className="flex flex-col justify-center items-center text-center flex-grow space-y-6 md:space-y-8 py-8">
            <div className="flex gap-3 justify-center">
              {properties.slice(0, 3).map((prop, idx) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  key={idx}
                  className="group relative w-14 md:w-16 aspect-[3/4] overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                >
                  <Image src={prop.image} alt="preview" fill className="object-cover" />
                </motion.div>
              ))}
            </div>

            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                className="font-sans text-3xl md:text-5xl font-light leading-none tracking-tight text-white uppercase"
              >
                Do-Minus
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                className="font-sans text-2xl md:text-4xl font-light leading-none tracking-tight text-white/80 uppercase"
              >
                Collection
              </motion.h2>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-stone-700 to-transparent mx-auto my-3"></div>
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="text-[9px] md:text-[10px] tracking-[0.3em] text-stone-400 uppercase font-medium"
              >
                Design Retreats & Spa
              </motion.p>
            </div>

            <div className="pt-2">
              <button className="relative overflow-hidden bg-gradient-to-r from-[#Cfbba3] to-[#b09e86] px-10 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1818] transition-transform hover:scale-105 hover:shadow-[0_0_20px_rgba(190,165,135,0.2)] active:scale-95">
                Book Your Stay
              </button>
            </div>

            <p className="hidden md:block max-w-sm text-center text-stone-500 font-serif text-xs leading-loose tracking-wide">
              Exclusive spaces combining nature, wellbeing, and design.
              Historic buildings meticulously restored by Riccarda Guidotti and Andrea Frapolli.
            </p>
          </div>

          <div className="flex justify-center md:justify-between items-end text-[9px] tracking-[0.3em] text-stone-600 uppercase">
            <span className="hidden md:block">ticino, switzerland</span>
            <span>Scroll Down</span>
            <span className="hidden md:block">+41 76 364 85 45</span>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="relative order-2 h-[50vh] md:h-screen w-full">
          <PropertySlider />
        </div>
      </div>


      {/* =========================================
          SECTION 2: PHILOSOPHY (Split Text/Image)
         ========================================= */}
      <section className="relative w-full bg-[#121111] py-24 md:py-40 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center">

          {/* Text Content */}
          <div className="md:col-span-5 space-y-8">
            <FadeIn>
              <span className="text-[#Cfbba3] text-[10px] uppercase tracking-[0.3em] font-bold">The Philosophy</span>
              <h2 className="font-serif text-3xl md:text-5xl text-white leading-tight mt-4">
                Silence as the <br /> ultimate luxury.
              </h2>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="w-12 h-px bg-white/20 my-6"></div>
              <p className="text-stone-400 font-serif text-sm md:text-base leading-loose">
                In a world of constant noise, we offer a sanctuary of stillness.
                Our properties are not just hotels; they are carefully curated
                experiences designed to reconnect you with the rhythms of nature.
                Using raw materials—stone, wood, and light—we craft spaces that
                breathe.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <button className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-white mt-8 hover:text-[#Cfbba3] transition-colors">
                Read our story
                <span className="w-8 h-px bg-white/30 group-hover:bg-[#Cfbba3] transition-colors"></span>
              </button>
            </FadeIn>
          </div>

          {/* Parallax Image */}
          <div className="md:col-span-7 h-[50vh] md:h-[70vh] w-full relative grayscale hover:grayscale-0 transition-all duration-700 ease-in-out">
            <FadeIn delay={0.3} className="w-full h-full">
              {/* Replace with your own image path */}
              <ParallaxImage src="/houses/house3.jpg" alt="Interior design detail" />
            </FadeIn>
          </div>

        </div>
      </section>


      {/* =========================================
          SECTION 3: CURATED SUITES (Horizontal Scroll)
         ========================================= */}
      <CuratedSpaces />


      {/* =========================================
          SECTION 4: SERVICES (Grid Layout)
         ========================================= */}
      <section className="w-full bg-[#151414]">
        {/* Row 1: Image Left, Text Right */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-[50vh] md:h-[80vh] relative grayscale hover:grayscale-0 transition-all duration-700">
            <Image src="/properties/dining.png" alt="Dining" fill className="object-cover" />
          </div>
          <div className="flex items-center justify-center p-12 md:p-24 bg-[#151414]">
            <FadeIn className="max-w-md text-center md:text-left">
              <h3 className="font-serif text-2xl md:text-4xl text-white mb-6">Seasonal Dining</h3>
              <p className="text-stone-400 text-sm leading-loose mb-8 font-serif">
                Our kitchen follows the seasons. We source ingredients from the
                valleys of Ticino, preparing simple, honest dishes that honor
                local traditions while embracing modern flavors.
              </p>
              <button className="text-[10px] uppercase tracking-[0.2em] border border-white/20 px-8 py-3 hover:bg-white hover:text-black transition-all">
                View Menu
              </button>
            </FadeIn>
          </div>
        </div>

        {/* Row 2: Text Left, Image Right */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="flex items-center justify-center p-12 md:p-24 bg-[#1a1818] order-2 md:order-1">
            <FadeIn className="max-w-md text-center md:text-left">
              <h3 className="font-serif text-2xl md:text-4xl text-white mb-6">Alpine Wellness</h3>
              <p className="text-stone-400 text-sm leading-loose mb-8 font-serif">
                Immerse yourself in our private stone spas. Heated by wood fire,
                cooled by mountain air. A ritual of water and warmth designed
                to heal the body and calm the mind.
              </p>
              <button className="text-[10px] uppercase tracking-[0.2em] border border-white/20 px-8 py-3 hover:bg-white hover:text-black transition-all">
                Discover Spa
              </button>
            </FadeIn>
          </div>
          <div className="h-[50vh] md:h-[80vh] relative grayscale hover:grayscale-0 transition-all duration-700 order-1 md:order-2">
            <Image src="/properties/spa.png" alt="Spa" fill className="object-cover" />
          </div>
        </div>
      </section>


      {/* =========================================
          SECTION 5: FOOTER
         ========================================= */}
      <footer className="w-full bg-[#0a0a0a] pt-24 pb-12 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24">

          <div className="md:col-span-2 space-y-6">
            <h2 className="font-sans text-3xl font-light uppercase tracking-tight text-white">Do-Minus</h2>
            <p className="text-stone-500 font-serif text-sm max-w-sm">
              A collection of architectural retreats in the heart of Ticino.
              Where heritage meets contemporary design.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#Cfbba3] font-bold">Explore</h4>
            <ul className="space-y-2 text-xs uppercase tracking-widest text-stone-400">
              {['Suites', 'Dining', 'Wellness', 'Experiences', 'Journal'].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#Cfbba3] font-bold">Contact</h4>
            <ul className="space-y-2 text-stone-400 font-serif text-sm">
              <li>Via Cantonale 12</li>
              <li>6600 Locarno, Switzerland</li>
              <li className="pt-2">+41 76 364 85 45</li>
              <li>hello@do-minus.ch</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-widest text-stone-600">
          <span>© 2026 Do-Minus Collection.</span>
          <div className="flex gap-6">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
          </div>
        </div>
      </footer>


      {/* =========================================
          MAP OVERLAY (Your Existing Code)
         ========================================= */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-8">
          {/* Note: changed bg to black/90 for better focus */}
          <div className="relative w-full h-full max-w-[95vw] max-h-[95vh] bg-black rounded-2xl shadow-2xl overflow-hidden border border-white/10">

            <button
              onClick={() => setIsMapOpen(false)}
              className="absolute top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 backdrop-blur-sm border border-white/10"
              aria-label="Close map"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <MapExplorer />
          </div>
        </div>
      )}
    </main>
  );
}