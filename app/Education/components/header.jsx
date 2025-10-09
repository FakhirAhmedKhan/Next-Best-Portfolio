import React from 'react'
import { motion } from "framer-motion";

export const Header = () => {
  return (
    <motion.div className="text-center mb-20" initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <h2 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-fuchsia-400 to-pink-500 bg-clip-text text-transparent mb-4">
        My Journey
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        A timeline of my educational milestones and achievements
      </p>
    </motion.div>
  )
}