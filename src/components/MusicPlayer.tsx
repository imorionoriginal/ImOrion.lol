"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";

// Import covers
import cover1 from "@/assets/music/From The Islands.jpg";
import cover2 from "@/assets/music/GATA ONLY.jpg";
import cover3 from "@/assets/music/anybody can find love.jpg";
import cover4 from "@/assets/music/BeethovenVirus.png";

interface Song {
  title: string;
  src: string;
  cover: StaticImageData;
  volumeMultiplier?: number;
}

const SONGS: Song[] = [
  {
    title: "From The Islands",
    src: "/music/From The Islands.mp3",
    cover: cover1,
  },
  {
    title: "GATA ONLY REMIX",
    src: "/music/GATA ONLY REMIX.mp3",
    cover: cover2,
  },
  {
    title: "anybody can find love (except you.)",
    src: "/music/anybody can find love (except you.).mp3",
    cover: cover3,
  },
  {
    title: "Beethoven Virus INSANE PIANO VERSION",
    src: "/music/Beethoven Virus INSANE PIANO VERSION - Pianoly Official (192k).mp3",
    cover: cover4,
    volumeMultiplier: 2,
  }
];

export default function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Pick a random song when component mounts (site opens)
    const randomIndex = Math.floor(Math.random() * SONGS.length);
    setCurrentSongIndex(randomIndex);
    
    const playAudio = async () => {
      if (audioRef.current) {
        audioRef.current.src = SONGS[randomIndex].src;
        audioRef.current.volume = Math.min(volume * (SONGS[randomIndex].volumeMultiplier || 1), 1);
        
        try {
          // Attempt auto-play
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (err) {
          setIsPlaying(false);
          // Modern browsers block unmuted autoplay on refresh.
          // Fallback: start playing on the very first interaction (click/keydown) anywhere on the page.
          const handleFirstInteraction = async () => {
            if (audioRef.current && audioRef.current.paused) {
              try {
                await audioRef.current.play();
                setIsPlaying(true);
              } catch (e) {
                // Ignore
              }
            }
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
          };
          document.addEventListener('click', handleFirstInteraction);
          document.addEventListener('keydown', handleFirstInteraction);
        }
      }
    };

    playAudio();
  }, []); // Run once on mount

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % SONGS.length;
    setCurrentSongIndex(nextIndex);
    if (audioRef.current) {
      audioRef.current.src = SONGS[nextIndex].src;
      audioRef.current.volume = Math.min(volume * (SONGS[nextIndex].volumeMultiplier || 1), 1);
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = Math.min(newVolume * (SONGS[currentSongIndex].volumeMultiplier || 1), 1);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress(total ? (current / total) * 100 : 0);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && audioRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newProgress = clickX / width;
      audioRef.current.currentTime = newProgress * audioRef.current.duration;
      setProgress(newProgress * 100);
    }
  };

  const currentSong = SONGS[currentSongIndex];

  return (
    <>
      <audio 
        ref={audioRef} 
        autoPlay
        onEnded={nextSong} 
        onTimeUpdate={handleTimeUpdate} 
      />
      
      <motion.div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ width: 64 }}
        animate={{ width: isHovered ? 320 : 64 }}
        transition={{ duration: 0.4, ease: "anticipate" }}
        className="fixed left-4 top-4 sm:left-8 sm:top-8 z-50 flex h-14 sm:h-16 items-center gap-3 sm:gap-4 overflow-hidden rounded-xl border border-white/5 bg-zinc-950/90 p-2 shadow-2xl backdrop-blur-md origin-left"
      >
        {/* Album Cover */}
        <div 
          className="relative h-10 w-10 sm:h-12 sm:w-12 shrink-0 animate-[spin_4s_linear_infinite] overflow-hidden rounded-full border border-white/20 bg-white/10 shadow-lg"
          style={{ animationPlayState: isPlaying ? "running" : "paused" }}
        >
          {currentSong?.cover && (
            <Image 
              src={currentSong.cover} 
              alt={currentSong.title} 
              fill 
              className="object-cover" 
            />
          )}
        </div>
        
        {/* Expanded Content */}
        <div className="flex w-[240px] shrink-0 flex-col justify-center gap-1">
          
          {/* Song Title */}
          <div className="w-full overflow-hidden whitespace-nowrap px-1">
            <p className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] font-bold tracking-wide text-gray-300 truncate">
              {currentSong?.title}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Play/Pause Button */}
            <motion.button 
              whileHover={{ scale: 1.1, boxShadow: "0 0 12px rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              {isPlaying ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                  <rect x="6" y="4" width="4" height="16" rx="1"/>
                  <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
              ) : (
                <div className="ml-1 h-3 w-3 border-y-[6px] border-l-[10px] border-r-0 border-transparent border-l-white"></div>
              )}
            </motion.button>
            
            {/* Next Song Button */}
            <motion.button 
              whileHover={{ scale: 1.1, boxShadow: "0 0 12px rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSong}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/20"
            >
               <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                 <polygon points="5 4 15 12 5 20 5 4" strokeLinejoin="round"/>
                 <line x1="19" y1="5" x2="19" y2="19" stroke="white" strokeWidth="3" strokeLinecap="round"/>
               </svg>
            </motion.button>

            {/* Volume Slider */}
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume} 
              onChange={handleVolumeChange} 
              className="w-20 shrink-0 cursor-pointer accent-white" 
            />
          </div>

          {/* Progress Bar with Audio Wave Effect */}
          <div 
            ref={progressBarRef}
            onClick={handleProgressClick}
            className="relative mt-1 h-2 w-full cursor-pointer overflow-hidden rounded-full bg-white/10"
          >
            <motion.div 
              className="absolute left-0 top-0 h-full rounded-full bg-white"
              style={{ width: `${progress}%` }}
              animate={isPlaying ? { scaleY: [1, 2.5, 1], filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"] } : { scaleY: 1 }}
              transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          
        </div>
      </motion.div>
    </>
  );
}
