'use client';

// Note: In Next.js App Router, 'generateStaticParams' normally runs on the server.
// However, since we are using 'use client' for animations, we might need to separate the client logic
// or just export static params if your config allows mixed environments.
// For simplicity in this snippet, we keep it here, but typically you'd put the page content in a separate Client Component.

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { properties } from '@/lib/data';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Outfit, Playfair_Display } from "next/font/google";

// Load fonts locally for this page if not handled in root layout
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

// 1. Static Params (Keep this)
// export async function generateStaticParams() { ... } 
// (If you get an error about "generateStaticParams with use client", 
// you may need to move the component logic to a child component, usually called PropertyDetailClient)

export default function PropertyPage({ params }: { params: { slug: string } }) {
  const property = properties.find((p) => p.slug === params.slug);
  const ref = useRef(null);
  
  // Parallax Scroll Effect
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (!property) return notFound();

  return (
    <main className={`min-h-screen bg-[#1a1818] text-[#e5e5e5] ${outfit.variable} ${playfair.variable} font-sans selection:bg-[#Cfbba3] selection:text-black`}>
      
      {/* --- HERO SECTION --- */}
      <div ref={ref} className="relative h-[80vh] w-full overflow-hidden">
        {/* Parallax Image */}
        <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
           <Image
             src={property.image}
             alt={property.name}
             fill
             priority
             className="object-cover brightness-[0.85]"
           />
        </motion.div>

        {/* Back Button */}
        <Link href="/" className="absolute top-8 left-8 z-20 group">
          <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-full hover:bg-white hover:text-black transition-all duration-300">
             <span className="text-lg leading-none pb-1">←</span>
             <span className="text-[10px] uppercase tracking-widest font-bold">Back to Map</span>
          </div>
        </Link>

        {/* Hero Text Overlay */}
        <motion.div 
            style={{ opacity }}
            className="absolute inset-0 bg-gradient-to-t from-[#1a1818] via-transparent to-transparent flex items-end p-6 md:p-16"
        >
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="flex items-center gap-4 mb-4"
            >
                <span className="px-3 py-1 border border-[#Cfbba3] text-[#Cfbba3] text-[9px] uppercase tracking-[0.2em] rounded-full">
                    {property.type}
                </span>
                <div className="h-px w-12 bg-white/30"></div>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-none"
            >
              {property.name}
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="text-stone-400 text-sm md:text-base max-w-xl font-serif leading-loose"
            >
                {property.description}
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 p-6 md:p-16 relative z-10 bg-[#1a1818]">
        
        {/* LEFT: Description & Details */}
        <div className="lg:col-span-7 space-y-16">
          
          {/* Highlights Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="border-y border-white/10 py-8"
          >
             <h3 className="text-[10px] uppercase tracking-[0.25em] text-[#Cfbba3] mb-6 font-bold">Property Highlights</h3>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               {property.highlights.map((highlight, i) => (
                 <div key={i} className="flex items-center gap-3 text-stone-300">
                    <div className="w-1.5 h-1.5 bg-[#Cfbba3] rounded-full" />
                    <span className="text-xs uppercase tracking-wider">{highlight}</span>
                 </div>
               ))}
             </div>
          </motion.div>
          
          {/* Long Description */}
          <motion.div
             initial={{ opacity: 0, y: 20 }} 
             whileInView={{ opacity: 1, y: 0 }} 
             viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl mb-6 text-white">About the Experience</h2>
            <div className="space-y-6 text-stone-400 font-serif leading-loose text-lg">
                <p>
                    Experience the pinnacle of Swiss hospitality. {property.description} 
                </p>
                <p>
                    Nestled in the heart of Ticino, this property offers a unique blend of 
                    Mediterranean charm and Alpine precision. The architecture respects the 
                    original footprint while introducing modern luxuries—underfloor heating, 
                    rainfall showers, and curated design pieces from local artisans.
                </p>
                <p>
                    Mornings begin with the sound of the valley awakening, and evenings end 
                    by the fire. It is not just a place to stay, but a place to return to yourself.
                </p>
            </div>
          </motion.div>

          {/* Simple Gallery Grid (Optional Placeholder) */}
          <div className="grid grid-cols-2 gap-4 h-64 md:h-96 w-full opacity-60 hover:opacity-100 transition-opacity duration-500">
             <div className="bg-stone-800 w-full h-full relative rounded-lg overflow-hidden">
                <Image src={property.image} alt="detail" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
             </div>
             <div className="bg-stone-800 w-full h-full relative rounded-lg overflow-hidden">
                 <Image src={property.image} alt="detail" fill className="object-cover scale-125 grayscale hover:grayscale-0 transition-all duration-700" />
             </div>
          </div>
        </div>

        {/* RIGHT: Sticky Booking Card */}
        <div className="lg:col-span-5 relative">
           <div className="sticky top-12">
             <div className="bg-[#151414] p-8 md:p-10 border border-white/5 rounded-2xl shadow-2xl relative overflow-hidden group">
               
               {/* Decorative Gradient */}
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#Cfbba3] blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>

               <h3 className="font-serif text-2xl text-white mb-2">{property.name}</h3>
               <p className="text-xs text-stone-500 tracking-widest uppercase mb-8">{property.address}</p>
               
               <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-[10px] text-[#Cfbba3] uppercase tracking-widest">Starting at</span>
                  <span className="font-serif text-3xl md:text-4xl text-white">{property.priceStart}</span>
               </div>
               
               {/* Date Picker Placeholder */}
               <div className="space-y-4 mb-8">
                  <div className="grid grid-cols-2 gap-4">
                      <div className="border border-white/10 bg-white/5 p-3 rounded text-left">
                          <span className="block text-[9px] uppercase text-stone-500 tracking-widest mb-1">Check-in</span>
                          <span className="text-sm text-white">Select Date</span>
                      </div>
                      <div className="border border-white/10 bg-white/5 p-3 rounded text-left">
                          <span className="block text-[9px] uppercase text-stone-500 tracking-widest mb-1">Check-out</span>
                          <span className="text-sm text-white">Select Date</span>
                      </div>
                  </div>
                  <div className="border border-white/10 bg-white/5 p-3 rounded flex justify-between items-center">
                      <span className="text-[9px] uppercase text-stone-500 tracking-widest">Guests</span>
                      <span className="text-sm text-white">2 Adults</span>
                  </div>
               </div>
               
               <button className="w-full bg-[#Cfbba3] text-black py-4 text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-white transition-colors duration-300">
                 Request to Book
               </button>
               
               <p className="text-center text-[9px] text-stone-600 mt-4 uppercase tracking-wider">
                  Free cancellation up to 7 days before
               </p>
             </div>
           </div>
        </div>

      </div>
    </main>
  );
}