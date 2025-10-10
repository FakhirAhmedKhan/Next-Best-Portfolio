import React from 'react'
import { motion } from "framer-motion";

export const CategoryFilters = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <motion.div
      {...fadeInUp}
      className="flex flex-wrap justify-center gap-3 mb-16"
    >
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <motion.button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setVisibleCount(6);
            }}
            className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 ${isActive
              ? "text-white shadow-xl scale-105"
              : "text-gray-700 dark:text-gray-300 hover:scale-105 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
              }`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.div
                layoutId="activeCategory"
                className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-violet-500 rounded-full"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </motion.button>
        );
      })}
    </motion.div>

  )
}
