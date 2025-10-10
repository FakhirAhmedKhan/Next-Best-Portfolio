import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from 'lucide-react';

export const Logo = () => {
  return (
    <motion.div
      className="flex items-center gap-2"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <a
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("home");
        }}
        className="flex items-center gap-2 group"
      >
        <motion.div
          className="w-10 h-10 rounded-xl bg-gradient-to-br from-fuchsia-600 to-violet-600 flex items-center justify-center shadow-lg"
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="w-5 h-5 text-white" />
        </motion.div>
        <span className="text-2xl font-bold bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600 bg-clip-text text-transparent">
          Simple.Dev
        </span>
      </a>
    </motion.div>
  )
}
