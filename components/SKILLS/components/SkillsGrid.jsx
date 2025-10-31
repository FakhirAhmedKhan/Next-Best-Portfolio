'use client';

import { useAppContext } from "@/lib/contexts/app-context";
import { useLanguage } from "@/lib/contexts/language-context";
import { containerVariants, SkillcontainerVariants, skillVariants } from "@/UI/motionConfige";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react"

export const Card = () => {
  const { hoveredIndex, setHoveredIndex } = useAppContext();
  const [isMounted, setIsMounted] = useState(false);

  const { skills } = useLanguage();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {skills.map((skill, index) => (
          <div
            key={skill.name || index}
            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <div className="mb-3">
              <Image
                src={skill.icon || '/placeholder.png'}
                alt={`${skill.name} logo`}
                width={64}
                height={64}
                className="object-contain"
                loading="eager"
                unoptimized
              />
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      variants={SkillcontainerVariants}
      initial="hidden"
      animate="show" // Changed from whileInView to animate
      viewport={{ once: true, amount: 0.1 }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
    >
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name || index}
          variants={skillVariants}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          className="group relative"
        >
          {/* Card */}
          <motion.div
            className="relative flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"
            whileHover={{
              y: -8,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-pink-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Animated gradient border */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(45deg, #d946ef, #ec4899, #8b5cf6)",
                padding: "2px",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />

            {/* Icon container */}
            <motion.div
              className="relative z-10 mb-3"
              animate={
                hoveredIndex === index
                  ? {
                    rotate: [0, -10, 10, -10, 0],
                    scale: [1, 1.1, 1.1, 1.1, 1],
                  }
                  : { rotate: 0, scale: 1 }
              }
              transition={{ duration: 0.5 }}
            >
              <div className="relative w-16 h-16">
                <Image
                  src={skill.icon || '/placeholder.png'}
                  alt={`${skill.name} logo`}
                  width={64}
                  height={64}
                  className="object-contain"
                  loading="lazy"
                  unoptimized // Use this if icons are from external sources
                />

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle, #d946ef 0%, transparent 70%)",
                  }}
                />
              </div>
            </motion.div>

            {/* Skill name */}
            <span className="relative z-10 text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">
              {skill.name}
            </span>

            {/* Decorative corner dots */}
            <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-fuchsia-400/50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-violet-400/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          {/* Floating particles on hover */}
          {hoveredIndex === index && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-fuchsia-400 rounded-full pointer-events-none"
                  style={{
                    left: "50%",
                    top: "50%",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: Math.cos((i * 60 * Math.PI) / 180) * 50,
                    y: Math.sin((i * 60 * Math.PI) / 180) * 50,
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};