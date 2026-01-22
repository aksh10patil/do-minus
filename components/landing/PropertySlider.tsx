"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { properties } from "@/lib/data";

export default function PropertySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1 === properties.length ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 < 0 ? properties.length - 1 : prev - 1));
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0, 
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0, 
    }),
  };

  const currentProperty = properties[currentIndex];

  return (
    // CHANGE: Removed 'rounded-[2rem]' to make it sharp and edge-to-edge.
    // Added 'h-full w-full' to ensure it fills the parent completely.
    <div className="relative h-full w-full overflow-hidden bg-stone-900">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={currentProperty.image}
            alt={currentProperty.name}
            fill
            className="object-cover"
            priority
          />
          
          {/* Dark Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>

     
      

      {/* Bottom Area Layout */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex items-end justify-between">
        
        {/* Bottom Left: Text Info */}
        <motion.div
            key={currentProperty.name} 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-1 text-white"
        >
            <span className="text-white/60 text-sm font-mono mb-1">
                0{currentIndex + 1} / 0{properties.length}
            </span>
            <h3 className="font-sans text-2xl md:text-4xl uppercase tracking-wider font-light">
              {currentProperty.name}
            </h3>
             <p className="text-white/80 text-xs tracking-widest uppercase">
              {currentProperty.type}
            </p>
        </motion.div>

        {/* Bottom Right: Navigation Arrows */}
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            className="group flex h-12 w-12 items-center justify-center border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={handleNext}
            className="group flex h-12 w-12 items-center justify-center border border-white/30 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
          >
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}