"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { TRACKS } from "@/content/tracks";

const PREFS_KEY = "imorion:player";
const DEFAULT_VOLUME = 0.4;

type Prefs = { volume?: number; paused?: boolean };

function readPrefs(): Prefs {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writePrefs(patch: Prefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify({ ...readPrefs(), ...patch }));
  } catch {
    // Storage can be blocked. The player just forgets the choice.
  }
}

const gain = (index: number, volume: number) =>
  Math.min(volume * (TRACKS[index].volumeMultiplier ?? 1), 1);

type Player = {
  ready: boolean;
  index: number;
  playing: boolean;
  time: number;
  duration: number;
  volume: number;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  select: (index: number) => void;
  seek: (seconds: number) => void;
  setVolume: (volume: number) => void;
  /** Pauses for something else that makes sound. Returns true if it was playing. */
  pause: () => boolean;
  resume: () => void;
};

const PlayerContext = createContext<Player | null>(null);

export function usePlayer() {
  const player = useContext(PlayerContext);
  if (!player) throw new Error("usePlayer needs a PlayerProvider");
  return player;
}

// Lives in the root layout, so the music keeps going across page changes.
export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const prefs = readPrefs();
    const startIndex = Math.floor(Math.random() * TRACKS.length);
    const startVolume = prefs.volume ?? DEFAULT_VOLUME;

    // The random pick has to wait for the client, or hydration would mismatch.
    setIndex(startIndex);
    setVolumeState(startVolume);
    setReady(true);

    audio.src = TRACKS[startIndex].src;
    audio.volume = gain(startIndex, startVolume);
    if (prefs.paused) return;

    let cancelled = false;

    // Browsers block unmuted autoplay, so fall back to the first interaction.
    // Clicks on the player itself are skipped: its own buttons handle those.
    const unlock = (event: Event) => {
      const target = event.target as Element | null;
      if (target?.closest?.("[data-player]")) return;
      audio.play().catch(() => {});
    };
    const stopListening = () => {
      document.removeEventListener("click", unlock, true);
      document.removeEventListener("keydown", unlock, true);
      audio.removeEventListener("play", stopListening);
    };

    audio.play().catch(() => {
      if (cancelled) return;
      document.addEventListener("click", unlock, true);
      document.addEventListener("keydown", unlock, true);
      audio.addEventListener("play", stopListening);
    });

    return () => {
      cancelled = true;
      stopListening();
    };
  }, []);

  const load = useCallback(
    (nextIndex: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      setIndex(nextIndex);
      setTime(0);
      setDuration(0);
      audio.src = TRACKS[nextIndex].src;
      audio.volume = gain(nextIndex, volume);
      audio.play().catch(() => {});
      writePrefs({ paused: false });
    },
    [volume],
  );

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      writePrefs({ paused: false });
    } else {
      audio.pause();
      writePrefs({ paused: true });
    }
  }, []);

  const next = useCallback(() => load((index + 1) % TRACKS.length), [index, load]);
  const prev = useCallback(
    () => load((index - 1 + TRACKS.length) % TRACKS.length),
    [index, load],
  );

  const seek = useCallback((seconds: number) => {
    if (audioRef.current) audioRef.current.currentTime = seconds;
    setTime(seconds);
  }, []);

  const setVolume = useCallback(
    (value: number) => {
      setVolumeState(value);
      if (audioRef.current) audioRef.current.volume = gain(index, value);
      writePrefs({ volume: value });
    },
    [index],
  );

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.paused) return false;
    audio.pause();
    return true;
  }, []);

  const resume = useCallback(() => {
    audioRef.current?.play().catch(() => {});
  }, []);

  // Windows media overlay and hardware media keys.
  useEffect(() => {
    if (!ready || !("mediaSession" in navigator)) return;
    const track = TRACKS[index];
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: "imorion.lol",
      artwork: [{ src: track.cover }],
    });
    navigator.mediaSession.setActionHandler("nexttrack", next);
    navigator.mediaSession.setActionHandler("previoustrack", prev);
  }, [ready, index, next, prev]);

  const value = useMemo(
    () => ({
      ready,
      index,
      playing,
      time,
      duration,
      volume,
      toggle,
      next,
      prev,
      select: load,
      seek,
      setVolume,
      pause,
      resume,
    }),
    [ready, index, playing, time, duration, volume, toggle, next, prev, load, seek, setVolume, pause, resume],
  );

  return (
    <PlayerContext.Provider value={value}>
      <audio
        ref={audioRef}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={next}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration || 0)}
      />
      {children}
    </PlayerContext.Provider>
  );
}
