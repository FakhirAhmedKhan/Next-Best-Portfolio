import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from 'lucide-react';

const MobileMenuButton = ({ isMenuOpen, setIsMenuOpen }) => {
  return (
    <motion.button
      onClick={() => setIsMenuOpen((prev) => !prev)}
      className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle Menu"
    >
      <AnimatePresence mode="wait">
        {isMenuOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export default MobileMenuButton