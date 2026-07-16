"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StaticImageData } from "next/image";
import batusamaImg from "@/assets/batusama.gif";
import bigtrImg from "@/assets/bigtr.jpg";
import clipthatdudeImg from "@/assets/clipthatdude.png";
import fynndoImg from "@/assets/fynndo.png";

type Review = {
  id: string;
  author: string;
  text: string;
  textTr: string;
  rating: number;
  avatar: string | StaticImageData;
};

const REVIEWS: Review[] = [
  {
    id: "fynndo",
    author: "– Fynndo3d, Creator of Parkour Redone & Momentum",
    text: `"He's very good and talented at coding, I also like his VFX but he's a bit slow, still really good though."`,
    textTr: `"Kodlamada çok yetenekli ve başarılı, VFX becerilerini de beğeniyorum ancak biraz yavaş. Yine de gerçekten çok iyi."`,
    rating: 4.5,
    avatar: fynndoImg,
  },
  {
    id: "batusama",
    author: "– Batusama, Owner Of Risus Network Server",
    text: `"I think you have improved yourself, and your success will likely continue. You continue to achieve success in your work in a short time."`,
    textTr: `"Kendini geliştirdiğini ve başarının devam edeceğini düşünüyorum. İşlerinde kısa sürede başarı elde etmeye devam ediyorsun."`,
    rating: 4.5,
    avatar: batusamaImg,
  },
  {
    id: "itsbigtr",
    author: "– itsBigTR",
    text: `"The system you set up is very organized and understandable, it made working on the project much easier. You did a short but effective job, Orion."`,
    textTr: `"Kurduğun sistem çok düzenli ve anlaşılır, projede çalışmayı çok daha kolaylaştırdı. Kısa ama etkili bir iş çıkardın, Orion."`,
    rating: 4.5,
    avatar: bigtrImg,
  },
  {
    id: "clipthatdude",
    author: "– ClipThatDude",
    text: `"Great working with Orion! Very talented and professional. Loved the results!"`,
    textTr: `"Orion ile çalışmak harikaydı! Çok yetenekli ve profesyonel. Sonuçlara bayıldım!"`,
    rating: 5,
    avatar: clipthatdudeImg,
  }
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with middle active
  const [isTurkish, setIsTurkish] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const getIndices = () => {
    const prev = (currentIndex - 1 + REVIEWS.length) % REVIEWS.length;
    const next = (currentIndex + 1) % REVIEWS.length;
    return { prev, current: currentIndex, next };
  };

  const { prev, current, next } = getIndices();
  const currentReview = REVIEWS[current];

  return (
    <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-8 py-24 md:px-16 lg:px-24">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        <div className="mb-6 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
          <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
          <span className="font-['Space_Grotesk'] text-xs font-medium tracking-widest text-gray-400">
            Reviews
          </span>
        </div>
        <h2 className="mb-6 font-['Syne'] text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-7xl">
          What Clients <br /> Are Saying
        </h2>
        <p className="max-w-xl font-['Space_Grotesk'] text-sm leading-relaxed text-gray-400 md:text-base">
          Real stories, real results. See how working with me has turned concepts into polished, production-ready experiences
        </p>
      </motion.div>

      {/* Carousel */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-20 flex w-full max-w-4xl flex-col items-center justify-center gap-12"
      >
        
        {/* Avatars Row */}
        <div className="relative flex h-[240px] w-full items-center justify-center gap-4 md:gap-8">
          
          {/* Previous Image */}
          <motion.div
            key={`prev-${prev}`}
            initial={{ opacity: 0, x: -50, scale: 0.8 }}
            animate={{ opacity: 0.4, x: 0, scale: 0.85 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute left-[10%] z-0 h-[180px] w-[180px] overflow-hidden rounded-3xl md:left-[20%]"
          >
            <img 
              src={typeof REVIEWS[prev].avatar === 'string' ? REVIEWS[prev].avatar : REVIEWS[prev].avatar.src} 
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23111'/%3E%3C/svg%3E`;
              }}
            />
          </motion.div>

          {/* Current Image */}
          <motion.div
            key={`curr-${current}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1.1, zIndex: 10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 h-[220px] w-[220px] overflow-hidden rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.1)]"
          >
            <img 
              src={typeof REVIEWS[current].avatar === 'string' ? REVIEWS[current].avatar : REVIEWS[current].avatar.src} 
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23333'/%3E%3C/svg%3E`;
              }}
            />
          </motion.div>

          {/* Next Image */}
          <motion.div
            key={`next-${next}`}
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 0.4, x: 0, scale: 0.85 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute right-[10%] z-0 h-[180px] w-[180px] overflow-hidden rounded-3xl md:right-[20%]"
          >
            <img 
              src={typeof REVIEWS[next].avatar === 'string' ? REVIEWS[next].avatar : REVIEWS[next].avatar.src} 
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25'%3E%3Crect width='100%25' height='100%25' fill='%23111'/%3E%3C/svg%3E`;
              }}
            />
          </motion.div>
        </div>

        {/* Review Content */}
        <div className="flex h-[180px] w-full flex-col items-center justify-start text-center">
          {/* Stars */}
          <div className="mb-6 flex gap-1 text-[#FFB800]">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star} 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill={star <= Math.floor(currentReview.rating) ? "currentColor" : "none"} 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                {/* Half star logic for 4.5 */}
                {star === 5 && currentReview.rating % 1 !== 0 && (
                  <clipPath id={`half-star-${star}`}>
                    <rect x="0" y="0" width="12" height="24" />
                  </clipPath>
                )}
                {star === 5 && currentReview.rating % 1 !== 0 && (
                   <polygon clipPath={`url(#half-star-${star})`} fill="currentColor" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                )}
              </svg>
            ))}
          </div>

          {/* Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentReview.id}-${isTurkish ? 'tr' : 'en'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-6"
            >
              <p className="max-w-2xl font-['Space_Grotesk'] text-lg italic text-gray-300 md:text-xl">
                {isTurkish ? currentReview.textTr : currentReview.text}
              </p>
              <p className="font-['Space_Grotesk'] text-sm font-bold text-gray-500">
                {currentReview.author}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <motion.button
            onClick={handlePrev}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.9 }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-colors hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </motion.button>
          
          <motion.button
            onClick={() => setIsTurkish(!isTurkish)}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.9 }}
            className={`flex h-12 w-12 items-center justify-center rounded-full border transition-colors ${isTurkish ? "border-white/40 text-white bg-white/10" : "border-white/10 text-gray-400 hover:text-white"}`}
            title="Translate to Turkish/English"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"></path>
            </svg>
          </motion.button>

          <motion.button
            onClick={handleNext}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.9 }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-colors hover:text-white"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </motion.button>
        </div>

      </motion.div>
    </section>
  );
}
