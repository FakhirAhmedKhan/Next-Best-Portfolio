'use client';

import { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";

// 🌀 Animation styles
export const animationStyles = `
  @keyframes float-diagonal {
    0%, 100% {
      transform: translate(0, 0) rotate(0deg);
      opacity: 0;
    }
    10%, 90% {
      opacity: 0.8;
    }
    100% {
      transform: translate(var(--tx), var(--ty)) rotate(360deg);
      opacity: 0;
    }
  }

  @keyframes pulse-glow {
    0%, 100% {
      opacity: 0.4;
      transform: scale(1);
      filter: blur(0px);
    }
    50% {
      opacity: 1;
      transform: scale(1.3);
      filter: blur(3px);
    }
  }

  .gradient-mesh {
    background: 
      radial-gradient(circle at 25% 30%, rgba(236, 72, 153, 0.18) 0%, transparent 60%),
      radial-gradient(circle at 80% 60%, rgba(168, 85, 247, 0.18) 0%, transparent 60%),
      radial-gradient(circle at 50% 80%, rgba(244, 63, 94, 0.15) 0%, transparent 60%);
    animation: pulse-glow 10s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
`;

// 🧩 Particle generator
const createParticle = (id: string, type: "small" | "medium" | "large") => {
  const settings = {
    small: { size: 2 + Math.random() * 2, color: "bg-pink-400/50", blur: 0.8 },
    medium: { size: 4 + Math.random() * 4, color: "bg-fuchsia-400/60", blur: 1.2 },
    large: { size: 8 + Math.random() * 8, color: "bg-gradient-to-br from-pink-400 to-purple-500", blur: 1.8 },
  };
  const cfg = settings[type];
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;
  const endX = (Math.random() - 0.5) * 120;
  const endY = (Math.random() - 0.5) * 120;
  const duration = 8 + Math.random() * 10;
  const delay = Math.random() * 5;

  return {
    id,
    className: `absolute rounded-full ${cfg.color}`,
    style: {
      left: `${startX}%`,
      top: `${startY}%`,
      width: `${cfg.size}px`,
      height: `${cfg.size}px`,
      "--tx": `${endX}vw`,
      "--ty": `${endY}vh`,
      animation: `float-diagonal ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s infinite`,
      filter: `blur(${cfg.blur}px)`,
      boxShadow: "0 0 12px 3px rgba(236, 72, 153, 0.5)",
    } as React.CSSProperties,
  };
};

// 🌌 Orbit Particle Component
const OrbitParticle = ({
  radius,
  duration,
  delay,
  color,
  size = 2,
  blur = 1,
}: {
  radius: number;
  duration: number;
  delay: number;
  color: string;
  size?: number;
  blur?: number;
}) => {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ width: `${size}px`, height: `${size}px` }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    >
      <div
        className={`absolute rounded-full ${color}`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${radius}px`,
          filter: `blur(${blur}px)`,
          boxShadow: `0 0 ${size * 6}px ${size * 2}px currentColor`,
        }}
      />
    </motion.div>
  );
};

// 💫 Main Animated Background Component
export const Animated = () => {
  // 🧠 Window size tracking (SSR-safe)
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
    for (let i = 0; i < 20; i++) list.push(createParticle(`small-${i}`, "small"));
    for (let i = 0; i < 15; i++) list.push(createParticle(`medium-${i}`, "medium"));
    for (let i = 0; i < 10; i++) list.push(createParticle(`large-${i}`, "large"));
    return list;
  }, []);

  // 📏 Radii (computed only when client width > 0)
  const radius1 = Math.min(windowSize.width, windowSize.height) * 0.35;
  const radius2 = Math.min(windowSize.width, windowSize.height) * 0.42;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <style>{animationStyles}</style>

      {/* 🌈 Gradient Mesh Layer */}
      <div className="fixed inset-0 z-0 gradient-mesh" />

      {/* ✨ Floating Particles */}
      <div className="fixed inset-0 z-[1] opacity-70 dark:opacity-80">
        {particles.map((p) => (
          <div key={p.id} className={p.className} style={p.style} />
        ))}
      </div>

      {/* 🪐 Pulsing Background Orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 bg-pink-400/10 dark:bg-pink-600/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-96 h-96  rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 💫 Floating Code Symbols */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`symbol-${i}`}
          className="absolute text-fuchsia-400/20 dark:text-fuchsia-600/30 font-mono text-3xl font-bold"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.15, 0.4, 0.15],
            rotate: [0, 360],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          {["<>", "{ }", "()", "/>", "[]"][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}

      {/* 🌍 Global Orbit Particles (Client-only) */}
      {windowSize.width > 0 && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {Array.from({ length: 8 }, (_, i) => (
              <OrbitParticle
                key={`orbit1-${i}`}
                radius={radius1}
                duration={20}
                delay={i * 2.5}
                color="text-pink-400/40 dark:text-pink-500/40"
                size={3}
                blur={1.5}
              />
            ))}
            {Array.from({ length: 10 }, (_, i) => (
              <OrbitParticle
                key={`orbit2-${i}`}
                radius={radius2}
                duration={28}
                delay={i * 2.8}
                color="text-fuchsia-400/30 dark:text-fuchsia-500/30"
                size={2.5}
                blur={1.2}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};