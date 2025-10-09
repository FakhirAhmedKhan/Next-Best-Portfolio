import React from 'react'
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";

export const TypingEffect = () => {
  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="space-y-4"
    >
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
        <div className="mb-2">
          <ReactTyped
            strings={["Hello, I'm"]}
            typeSpeed={80}
            showCursor={false}
          />
        </div>
        <div className="relative inline-block">
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600 rounded-2xl blur-2xl opacity-30"
            animate={pulseAnimation}
          />
          <span className="relative bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600 bg-clip-text text-transparent">
            <ReactTyped
              strings={["Fakhir Ahmed Khan"]}
              typeSpeed={100}
              showCursor={true}
              cursorChar="|"
              loop={false}
            />
          </span>
        </div>
      </h1>
    </motion.div>
  )
}
