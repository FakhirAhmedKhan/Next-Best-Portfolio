import React from 'react'
import { motion, AnimatePresence } from "framer-motion";

export const ProgressBar = () => {
  return (
    <motion.div
      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600"
      style={{
        width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`,
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.3 }}
    />
  )
}
