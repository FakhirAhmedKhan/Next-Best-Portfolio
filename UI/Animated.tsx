"use client";

import { motion } from "framer-motion";
import { OrbitParticle } from "@/UI/OrbitParticle";
import { useAnimation } from "@/hooks/useAnimation";

// 💫 Main Animated Background Component
export const Animated = () => {
  const { windowSize, particles, radius1, radius2 } = useAnimation();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
