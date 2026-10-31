"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Istanbul",
  hour: "2-digit",
  minute: "2-digit",
});

export default function AnkaraClock() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    const first = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 10_000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(timer);
    };
  }, []);

  return <span className="tabular-nums">{time}</span>;
}
