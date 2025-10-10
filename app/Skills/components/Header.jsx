import React from 'react'
import { motion } from "framer-motion";
import { Code2, Sparkles,Zap,zap } from 'lucide-react';

export const Header = ({skills = []}) => {
  return (
    <motion.div
      className="text-center mb-20"
      initial={{ opacity: 0, y: -40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Badge */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-fuchsia-200 dark:border-fuchsia-800 shadow-lg mb-6"
      >
        <Code2 className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
        <span className="text-sm font-semibold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
          Tech Stack
        </span>
      </motion.div>

      {/* Title */}
      <h2 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600 bg-clip-text text-transparent mb-6">
        Skills & Toolkit
      </h2>

      {/* Subtitle */}
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Technologies and tools I use to bring ideas to life
      </p>

      {/* Stats */}
      <motion.div
        className="flex flex-wrap justify-center gap-6 mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
          <Sparkles className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {skills.length}+ Skills
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
          <Zap className="w-4 h-4 text-violet-600 dark:text-violet-400" />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Always Learning
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
