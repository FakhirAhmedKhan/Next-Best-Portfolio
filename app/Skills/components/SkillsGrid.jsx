"use client";
import React from "react";
import { motion } from "framer-motion";

export const SkillsGrid = ({ skills, hoveredIndex, setHoveredIndex }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
  };

  if (!skills || skills.length === 0) {
    return <p className="text-center text-gray-500">Loading skills...</p>;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
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
          <motion.div
            className="relative flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-pink-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10 mb-3">
              <img src={skill.icon} alt={`${skill.name} logo`} className="h-16 w-16 object-contain" />
            </div>
            <span className="relative z-10 text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">
              {skill.name}
            </span>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};
