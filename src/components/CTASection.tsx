"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import orionLogo from "@/assets/Orion Logo_c.png";

interface CTASectionProps {
  onContactClick: () => void;
}

export default function CTASection({ onContactClick }: CTASectionProps) {
  return (
    <section id="contact" className="relative z-10 flex w-full flex-col items-center justify-center px-8 py-24 md:px-16 lg:px-24">
      {/* Background radial gradient just for this section */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[400px] rounded-full bg-white/5 blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center"
      >
        <div className="mb-8 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
          <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
          <span className="font-['Space_Grotesk'] text-xs font-medium tracking-widest text-gray-400">
            Call To Action
          </span>
        </div>

        <h2 className="mb-6 font-['Syne'] text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-7xl">
          Your Next Big Step <br className="hidden md:block" /> Is Just A Click Away
        </h2>
        
        <p className="mb-16 font-['Space_Grotesk'] text-sm leading-relaxed text-gray-400 md:text-base">
          Let's collaborate and bring your project's full potential to life. <br />
          It's time to turn your ideas into something extraordinary
        </p>

        {/* Dual Box Layout */}
        <div className="flex w-full flex-col items-center justify-center gap-6 md:flex-row md:gap-12">
          {/* Logo Box */}
          <motion.div 
            whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
            className="flex h-[240px] w-full max-w-[280px] items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors"
          >
            <Image src={orionLogo} alt="Orion Logo" width={120} height={120} className="drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" />
          </motion.div>

          {/* Plus Icon */}
          <div className="text-3xl font-light text-gray-500">
            +
          </div>

          {/* Button Box */}
          <motion.div 
            whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.2)" }}
            onClick={onContactClick}
            className="group flex h-[240px] w-full max-w-[280px] cursor-pointer items-center justify-center rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <div className="flex items-center gap-2 font-['Space_Grotesk'] text-lg font-semibold text-white">
              Let's Build Together 
              <span className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">↗</span>
            </div>
          </motion.div>
        </div>

        {/* Footer Prompt */}
        <p className="mt-16 font-['Space_Grotesk'] text-xs text-gray-500 md:text-sm">
          Ready to bring your vision to life? Let's start building the experience your audience deserves
        </p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContactClick}
          className="group mt-6 flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3 font-['Space_Grotesk'] text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          Let's Build Together
          <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
        </motion.button>

      </motion.div>
    </section>
  );
}
