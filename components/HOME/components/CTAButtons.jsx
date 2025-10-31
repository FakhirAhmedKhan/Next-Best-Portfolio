import React from 'react'
import { motion } from "framer-motion";
import Link from 'next/link';

export const CTAButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.9 }}
      className="flex flex-wrap justify-center gap-4 pt-4"
    >
      <Link
        href="/projects"
        className="group relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden shadow-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600" />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-pink-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="relative flex items-center gap-2">
          View My Work
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </span>
      </Link>

      <Link
        href="/footer"
        className="px-8 py-4 rounded-full font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-fuchsia-600 dark:hover:border-fuchsia-400 transition-colors shadow-lg backdrop-blur-sm"
      >
        Get In Touch
      </Link>
    </motion.div>
  )
}
