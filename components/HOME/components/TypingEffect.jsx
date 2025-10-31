import React from 'react'
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import { pulseAnimation } from '@/UI/motionConfige';
import { useLanguage } from '@/lib/contexts/language-context';

export const TypingEffect = () => {
  const { data } = useLanguage();
  const HomeData = data.sectionTitles?.home || {}; // Home object only

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
            strings={[HomeData.part1 || ""]}
            typeSpeed={80}
            showCursor={false}
          />
        </div>

        <div className="relative inline-block">
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-fuchsia-300 via-pink-300 to-violet-300 rounded-2xl blur-2xl opacity-30"
            animate={pulseAnimation}
          />
          <span className="relative text-gray-100 bg-gradient-to-r from-fuchsia-300 via-pink-300 to-violet-300 bg-clip-text">
            <ReactTyped
              strings={[HomeData.part2 || ""]}
              typeSpeed={100}
              showCursor={false}
              loop={false}
            />
          </span>
        </div>
      </h1>
    </motion.div>
  )
}
