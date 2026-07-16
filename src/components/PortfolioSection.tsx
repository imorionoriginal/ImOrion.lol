"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";

import backup1 from "@/assets/backup1.png";
import backup2 from "@/assets/backup2.png";
import backup3 from "@/assets/backup3.png";
import Momentum1 from "@/assets/Momentum1.png";
import Momentum2 from "@/assets/Momentum2.png";
import Momentum3 from "@/assets/Momentum3.png";
import Redone1 from "@/assets/Redone1.png";
import Redone2 from "@/assets/Redone2.png";
import Redone3 from "@/assets/Redone3.png";
import TheBeginningThumbnail from "@/assets/TheBeginningThumbnail.png";
import VFX1 from "@/assets/VFX1.png";
import VFX2 from "@/assets/VFX2.png";
import VFX3 from "@/assets/VFX3.png";

type Project = {
  id: string;
  category: string;
  title: string;
  role: string;
  description: string;
  year: string;
  images: StaticImageData[];
  link?: string;
  video?: string;
};

const CATEGORIES = ["Roblox Games", "Edits", "VFX Work", "Bot Projects"];

const PROJECTS: Project[] = [
  {
    id: "momentum",
    category: "Roblox Games",
    title: "Momentum",
    role: "Scripter",
    description: "A parkour game with some cool movement mechanics and stuff, we are making our own maps, scripts, mechanics, lightnings and way more thing this is gonna be peak game is private for now.",
    year: "2026",
    images: [Momentum1, Momentum2, Momentum3],
    link: "https://discord.gg/tpuxU4b8pV",
  },
  {
    id: "parkour-redone",
    category: "Roblox Games",
    title: "Parkour Redone",
    role: "Main Scripter",
    description: "A Parkour Reborn modded game made by Fynndo, New self made districts, self made announcement system, self made movement fix and way more thing. This game is private bc of being game copy but we are just making it for fun.",
    year: "2025",
    images: [Redone1, Redone2, Redone3],
    link: "https://discord.gg/YzkKtBaDQ4",
  },
  {
    id: "vfx-showcase",
    category: "VFX Work",
    title: "VFX Showcase",
    role: "VFX Artist",
    description: "Some VFX I made for fun. ill make more soon.",
    year: "2025",
    images: [VFX1, VFX2, VFX3],
    link: "https://discord.gg/b9VK6UTD69",
  },
  {
    id: "discord-bot",
    category: "Bot Projects",
    title: "Discord Backup Bot",
    role: "Developer",
    description: "A discord bot for get server backups and restore servers its storing data inside of you pc so its 100% safe and its allows you to copy one server and paste into any server its copies roles, perms, channels.\n[Paid contact with me for buy it.]",
    year: "2025",
    images: [backup1, backup2, backup3],
    link: "https://discord.gg/b9VK6UTD69",
  },
  {
    id: "mc-pvp",
    category: "Edits",
    title: "Redliner Edit | SONG: CRYST4L",
    role: "Editor",
    description: "just a edit i really enjoyed making.",
    year: "2026",
    images: [],
    video: "/videos/Redliner Edit_02.mp4",
    link: "https://www.tiktok.com/@imorionoriginal/video/7653832665166105872",
  }
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0]);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<StaticImageData | null>(null);

  const filteredProjects = PROJECTS.filter(p => p.category === activeCategory);
  const currentProject = filteredProjects[activeProjectIndex] || filteredProjects[0];

  const handleNext = () => {
    if (activeProjectIndex === filteredProjects.length - 1) {
      const currentCatIndex = CATEGORIES.indexOf(activeCategory);
      const nextCatIndex = (currentCatIndex + 1) % CATEGORIES.length;
      setActiveCategory(CATEGORIES[nextCatIndex]);
      setActiveProjectIndex(0);
    } else {
      setActiveProjectIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeProjectIndex === 0) {
      const currentCatIndex = CATEGORIES.indexOf(activeCategory);
      const prevCatIndex = (currentCatIndex - 1 + CATEGORIES.length) % CATEGORIES.length;
      const prevCategory = CATEGORIES[prevCatIndex];
      const prevCategoryProjects = PROJECTS.filter(p => p.category === prevCategory);
      setActiveCategory(prevCategory);
      setActiveProjectIndex(prevCategoryProjects.length - 1);
    } else {
      setActiveProjectIndex((prev) => prev - 1);
    }
  };

  const changeCategory = (cat: string) => {
    setActiveCategory(cat);
    setActiveProjectIndex(0);
  };

  return (
    <section className="relative z-10 flex min-h-screen w-full flex-col justify-center px-8 py-24 md:px-16 lg:px-24">
      <div className="mx-auto w-full max-w-7xl">
        
        {/* Top Header Row */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="mb-4 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              <span className="font-['Space_Grotesk'] text-xs font-medium uppercase tracking-widest text-gray-400">
                Portfolio
              </span>
            </div>
            <h2 className="font-['Syne'] text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              A Glimpse Into <br className="hidden md:block" /> My Creative World
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-md pt-4"
          >
            <p className="font-['Space_Grotesk'] text-gray-400 leading-relaxed text-sm md:text-base">
              A curated selection of projects that showcase my approach to game development and creative problem-solving. Each piece represents a commitment to quality, performance, and unforgettable player experiences.
            </p>
          </motion.div>
        </div>

        {/* Categories & Main Content Area */}
        <div className="mt-16 flex flex-col gap-12 lg:flex-row lg:items-start">
          
          {/* Main Card (Left side taking most space) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <AnimatePresence mode="wait">
              {currentProject && (
                <motion.div
                  key={currentProject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md"
                >
                  <div className="flex flex-col lg:h-[500px] lg:flex-row">
                    
                    {/* Project Info */}
                    <div className="flex w-full flex-col justify-between p-8 lg:w-5/12 lg:p-12">
                      <div>
                        <p className="mb-2 font-['Space_Grotesk'] text-xs font-bold uppercase tracking-widest text-gray-500">
                          Project Name
                        </p>
                        <h3 className="mb-6 font-['Syne'] text-3xl font-bold text-white">
                          {currentProject.title}
                        </h3>
                        
                        <p className="mb-4 font-['Space_Grotesk'] text-sm font-semibold text-gray-300">
                          {currentProject.role}
                        </p>
                        <p className="font-['Space_Grotesk'] text-sm leading-relaxed text-gray-400 whitespace-pre-line">
                          {currentProject.description}
                        </p>
                      </div>

                      <div className="mt-8 flex items-end justify-between lg:mt-0">
                        <span className="font-['Space_Grotesk'] text-sm font-bold text-gray-500">
                          {currentProject.year}
                        </span>
                        {currentProject.link && (
                          <a href={currentProject.link} target="_blank" rel="noopener noreferrer">
                            <motion.button
                              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-2 font-['Space_Grotesk'] text-sm font-medium transition-colors hover:border-white/40"
                            >
                              View Detail
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                            </motion.button>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Project Images or Video */}
                    <div className="w-full bg-black/20 p-6 lg:w-7/12 lg:p-8">
                      {currentProject.video ? (
                        <div className="flex h-full w-full items-center justify-center rounded-xl bg-black/50 overflow-hidden">
                          <video 
                            src={currentProject.video} 
                            controls 
                            autoPlay 
                            loop 
                            muted 
                            className="h-full w-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className={`grid h-full w-full gap-4 ${
                          currentProject.images.length === 1 ? 'grid-cols-1' : 
                          currentProject.images.length === 2 ? 'grid-cols-2' : 
                          'grid-cols-2 grid-rows-2'
                        }`}>
                          {currentProject.images.map((img, idx) => {
                            const isLarge = currentProject.images.length === 3 && idx === 0;
                            return (
                              <motion.div
                                key={idx}
                                onClick={() => setSelectedImage(img)}
                                whileHover={{ scale: 1.02 }}
                                className={`group relative overflow-hidden rounded-xl bg-white/5 cursor-pointer ${
                                  isLarge ? 'col-span-2 row-span-1 min-h-[200px] lg:min-h-0' : 'col-span-1 row-span-1 min-h-[200px] lg:min-h-0'
                                }`}
                              >
                                <Image 
                                  src={img} 
                                  alt={`${currentProject.title} screenshot ${idx + 1}`}
                                  fill
                                  placeholder="blur"
                                  className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                />
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="mt-8 flex justify-end gap-4">
              <motion.button
                onClick={handlePrev}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.9 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-gray-400 transition-colors hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </motion.button>
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                whileTap={{ scale: 0.9 }}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-gray-400 transition-colors hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </motion.button>
            </div>
          </motion.div>

          {/* Categories Sidebar (Right Side) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex w-full shrink-0 flex-row flex-wrap justify-center gap-6 lg:w-48 lg:flex-col lg:justify-start lg:text-right"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => changeCategory(cat)}
                className={`group flex items-center justify-center gap-2 font-['Space_Grotesk'] text-sm tracking-wide transition-colors lg:justify-end ${
                  activeCategory === cat ? 'font-bold text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {cat}
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className={`transition-all ${activeCategory === cat ? 'opacity-100' : 'opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-50'}`}
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            ))}
          </motion.div>
          
        </div>
      </div>

      {/* Fullscreen Image Popup */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[80vh] w-full max-w-5xl overflow-hidden rounded-xl shadow-2xl"
            >
              <Image 
                src={selectedImage} 
                alt="Popup Fullscreen" 
                fill
                className="object-contain"
                placeholder="blur"
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-white/20 backdrop-blur-md"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
