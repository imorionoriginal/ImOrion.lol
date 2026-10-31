import type { StaticImageData } from "next/image";

import batusamaImg from "@/assets/batusama.gif";
import bigtrImg from "@/assets/bigtr.jpg";
import clipthatdudeImg from "@/assets/clipthatdude.png";
import fynndoImg from "@/assets/fynndo.png";

export type Review = {
  id: string;
  name: string;
  role?: string;
  text: string;
  textTr: string;
  rating: number;
  avatar: StaticImageData;
};

export const REVIEWS: Review[] = [
  {
    id: "fynndo",
    name: "Fynndo3d",
    role: "Creator of Parkour Redone & Momentum",
    text: "He's very good and talented at coding, I also like his VFX but he's a bit slow, still really good though.",
    textTr: "Kodlamada çok yetenekli ve başarılı, VFX becerilerini de beğeniyorum ancak biraz yavaş. Yine de gerçekten çok iyi.",
    rating: 4.5,
    avatar: fynndoImg,
  },
  {
    id: "batusama",
    name: "Batusama",
    role: "Owner of Risus Network Server",
    text: "I think you have improved yourself, and your success will likely continue. You continue to achieve success in your work in a short time.",
    textTr: "Kendini geliştirdiğini ve başarının devam edeceğini düşünüyorum. İşlerinde kısa sürede başarı elde etmeye devam ediyorsun.",
    rating: 4.5,
    avatar: batusamaImg,
  },
  {
    id: "itsbigtr",
    name: "itsBigTR",
    text: "The system you set up is very organized and understandable, it made working on the project much easier. You did a short but effective job, Orion.",
    textTr: "Kurduğun sistem çok düzenli ve anlaşılır, projede çalışmayı çok daha kolaylaştırdı. Kısa ama etkili bir iş çıkardın, Orion.",
    rating: 4.5,
    avatar: bigtrImg,
  },
  {
    id: "clipthatdude",
    name: "ClipThatDude",
    text: "Great working with Orion! Very talented and professional. Loved the results!",
    textTr: "Orion ile çalışmak harikaydı! Çok yetenekli ve profesyonel. Sonuçlara bayıldım!",
    rating: 5,
    avatar: clipthatdudeImg,
  },
];
