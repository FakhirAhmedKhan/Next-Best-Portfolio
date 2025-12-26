"use client";
import { useEffect, useMemo, useState } from "react";
import { createParticle } from "@/UI/createParticle";

export const useAnimation = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateSize = () =>
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

  // 🎨 Particle creation (static)
  const particles = useMemo(() => {
    const list = [];
    for (let i = 0; i < 20; i++)
      list.push(createParticle(`small-${i}`, "small"));
    for (let i = 0; i < 15; i++)
      list.push(createParticle(`medium-${i}`, "medium"));
    for (let i = 0; i < 10; i++)
      list.push(createParticle(`large-${i}`, "large"));
    return list;
  }, []);

  // 📏 Radii (computed only when client width > 0)
  const radius1 = Math.min(windowSize.width, windowSize.height) * 0.35;
  const radius2 = Math.min(windowSize.width, windowSize.height) * 0.42;
  return { windowSize, particles, radius1, radius2 };
};
