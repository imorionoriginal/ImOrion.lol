"use client";

import { useEffect, useState } from "react";
import MobileBar from "@/components/docs/MobileBar";
import Search from "@/components/docs/Search";
import Sidebar from "@/components/docs/Sidebar";

export default function Chrome() {
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearching((value) => !value);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <Sidebar onSearch={() => setSearching(true)} />
      <MobileBar onSearch={() => setSearching(true)} />
      <Search open={searching} onClose={() => setSearching(false)} />
    </>
  );
}
