"use client";
import { useEffect, useState } from "react";
export function PageProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? window.scrollY / max : 0);
        frame = 0;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-0.5">
      <div
        className="bg-accent h-full origin-left transition-transform duration-100 motion-reduce:transition-none"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
