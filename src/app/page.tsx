"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import orionLogo from "@/assets/Orion Logo.png";
import robloxLogo from "@/assets/Roblox.jpg";
import discordLogo from "@/assets/discord.png";
import codingImage from "@/assets/Coding.png";
import MusicPlayer from "@/components/MusicPlayer";
import PortfolioSection from "@/components/PortfolioSection";
import ReviewsSection from "@/components/ReviewsSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  const [isDiscordPopupOpen, setIsDiscordPopupOpen] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  // Stop background scrolling when popup is open
  useEffect(() => {
    if (isDiscordPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isDiscordPopupOpen]);

  return (
    <>
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black backdrop-blur-2xl"
            onClick={() => setHasEntered(true)}
          >
            <motion.button
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="font-['Space_Grotesk'] text-xl uppercase tracking-[0.3em] text-white"
            >
              Click to Open
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <main className={`relative bg-black text-white selection:bg-white/30 ${!hasEntered ? "h-screen overflow-hidden" : ""}`}>
        {/* 1. Animated Background Effects */}
        
        {/* Moving Grid Pattern (Scrolls with page) */}
        <motion.div
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: `40px 40px`,
            maskImage: `radial-gradient(ellipse at center, black 0%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(ellipse at center, black 0%, transparent 100%)`
          }}
        />

        {/* Blinking / Pulsating Light Hits (Fixed to Viewport) */}
        <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0.03, scale: 1 }}
            animate={{
              scale: [1, 0.8, 1],
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-[800px] w-[800px] -translate-x-1/4 -translate-y-1/4 rounded-full bg-white blur-[150px]"
          />
          <motion.div
            initial={{ opacity: 0.02, scale: 1, x: 0, y: 0 }}
            animate={{
              scale: [1, 0.8, 1],
              opacity: [0.02, 0.06, 0.02],
              x: [0, -80, 0],
              y: [0, 80, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-[1000px] w-[1000px] translate-x-1/4 translate-y-1/4 rounded-full bg-white blur-[180px]"
          />
          <motion.div
            initial={{ opacity: 0.015 }}
            animate={{
              opacity: [0.015, 0.04, 0.015],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-[500px] w-[500px] rounded-full bg-white blur-[120px]"
          />
        </div>

        {/* 2. Top Left Music Player Component */}
        <MusicPlayer />

        {/* --- HERO SECTION --- */}
        <section className="relative z-10 flex min-h-screen flex-col items-center justify-center">
          {/* 3. Center Content (No Glass) */}
          <div className="flex flex-col items-center">
            {/* Logo */}
            <Image src={orionLogo} alt="Orion Logo" width={200} height={200} className="mb-4" />

            {/* a. Title */}
            <h1 className="font-['Syne'] text-4xl sm:text-5xl font-bold tracking-tight text-center px-4">ImOrion</h1>
            
            {/* Skills */}
            <p className="font-['Space_Grotesk'] mt-3 text-xs sm:text-sm font-medium tracking-wider text-gray-400 text-center px-4">
              Game Developer · VFX Artist · Video Editor · Bot Developer
            </p>
            
            {/* b. Bio */}
            <p className="font-['Space_Grotesk'] mt-6 max-w-2xl px-4 text-center text-base sm:text-lg font-light leading-relaxed text-gray-300">
              hey! its me. ImOrion, <br className="hidden sm:block" /> im a Game/Fullstack developer with <span className="text-white font-medium">4+ years of experience.</span> <br className="hidden sm:block" /> Currently im studying and making games on ROBLOX (luau language) <br className="hidden sm:block" /> if you need any help or you want hire me just contact with me.
            </p>

            {/* Contact Info */}
            <div className="mt-6 flex flex-col items-center gap-2 font-['Space_Grotesk'] text-gray-400">
              <a href="mailto:DrowBlackAcc@gmail.com" className="transition-colors hover:text-white">
                gmail: DrowBlackAcc@gmail.com
              </a>
              <a href="https://discord.gg/FNPZk7WDqC" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                Portfolio Server: https://discord.gg/FNPZk7WDqC
              </a>
            </div>
            
            {/* c. Socials Label */}
            <span className="mb-4 mt-8 text-sm font-medium uppercase tracking-widest text-gray-400">
              socials
            </span>
            
            {/* d. Social Buttons */}
            <div className="flex gap-4">
              {/* Roblox Button */}
              <a href="https://www.roblox.com/users/1656348904/profile" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255,255,255,0.2)" }}
                  className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border border-white/20 bg-white/5 transition-colors hover:bg-white/10"
                >
                  <Image src={robloxLogo} alt="Roblox" className="h-full w-full object-cover" />
                </motion.button>
              </a>
              
              {/* Discord Button */}
              <motion.button
                onClick={() => setIsDiscordPopupOpen(true)}
                whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(255,255,255,0.2)" }}
                className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-md border border-white/20 bg-white/5 transition-colors hover:bg-white/10"
              >
                <Image src={discordLogo} alt="Discord" className="h-8 w-8 object-contain" />
              </motion.button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 right-8 flex flex-col items-center gap-2 font-['Space_Grotesk'] text-sm text-gray-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <span className="uppercase tracking-widest">slide</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
          </motion.div>
        </section>

        {/* --- ABOUT ME SECTION --- */}
        <section className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 md:px-16 lg:px-24 py-24">
          <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left Column */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col"
            >
              <div className="mb-6 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
                <span className="font-['Space_Grotesk'] text-xs font-medium uppercase tracking-widest text-gray-400">
                  About Us
                </span>
              </div>
              
              <p className="font-['Syne'] text-4xl font-bold md:text-5xl lg:text-6xl">
                Crafting Immersive Game Experiences<br />With Passion
              </p>
              
              <div className="mt-12 flex flex-col gap-2 font-['Space_Grotesk']">
                <a href="mailto:DrowBlackAcc@gmail.com" className="text-gray-400 transition-colors hover:text-white">
                  DrowBlackAcc@gmail.com
                </a>
                <p className="font-bold text-white">4 Years of Development Experience</p>
                <p className="text-sm text-gray-500">
                  Game Developer · VFX Artist · Video Editor · Bot Developer
                </p>
                
                <a href="#contact" className="mt-8 flex w-fit items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-sm font-medium transition-colors hover:bg-white/10">
                  Let's Talk 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 19L19 5M19 5v14M19 5H5"/></svg>
                </a>
              </div>
            </motion.div>
            
            {/* Right Column */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex flex-col"
            >
              <p className="font-['Space_Grotesk'] text-lg font-light leading-relaxed text-gray-300">
                I'm <span className="font-medium text-white">Orion</span> — a dedicated game developer with over 4 years of hands-on experience building immersive digital worlds. I specialize in Roblox Studio development, crafting complex game mechanics with Luau, designing jaw-dropping VFX, producing polished video edits, and engineering custom bots for community engagement. Every project I take on is an opportunity to deliver something players will remember.
              </p>
              <p className="mt-6 font-['Space_Grotesk'] text-sm italic text-gray-500">
                Where creativity meets code — delivering experiences that leave an impact.
              </p>
              
              {/* 3D Graphic Placeholder */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                className="mt-12 relative flex h-[350px] w-full items-center justify-center rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm overflow-hidden"
              >
                <Image 
                  src={codingImage} 
                  alt="Coding" 
                  fill 
                  className="object-cover opacity-80 mix-blend-lighten"
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- PORTFOLIO SECTION --- */}
        <PortfolioSection />

        {/* --- REVIEWS SECTION --- */}
        <ReviewsSection />

        {/* --- CTA SECTION --- */}
        <CTASection onContactClick={() => setIsDiscordPopupOpen(true)} />

        {/* FOOTER WATERMARK */}
        <footer className="relative z-10 w-full pb-8 pt-8 text-center opacity-60">
          <p className="font-['Space_Grotesk'] text-sm tracking-widest text-gray-400">
            © 2026 DrowBlackTw. All rights reserved.
          </p>
        </footer>

        {/* --- DISCORD POPUP MODAL --- */}
        <AnimatePresence>
          {isDiscordPopupOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
              onClick={() => setIsDiscordPopupOpen(false)}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative flex w-full max-w-sm flex-col gap-6 rounded-2xl border border-white/10 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-xl"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setIsDiscordPopupOpen(false)}
                  className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-white"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                
                {/* Content */}
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 p-3">
                    <Image src={discordLogo} alt="Discord" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <p className="font-['Syne'] text-xl font-bold text-white">Discord</p>
                    <p className="font-['Space_Grotesk'] text-gray-300">nickname: <span className="font-medium text-white">@imorionoriginal</span></p>
                  </div>
                </div>
                
                {/* Server Link */}
                <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-center font-['Space_Grotesk'] text-sm">
                  <span className="text-gray-400">join server for contact:</span>
                  <a 
                    href="https://discord.gg/FNPZk7WDqC" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="rounded-lg bg-indigo-500/20 px-4 py-3 font-medium tracking-wide text-indigo-300 transition-colors hover:bg-indigo-500/30 hover:text-white"
                  >
                    discord.gg/FNPZk7WDqC
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
