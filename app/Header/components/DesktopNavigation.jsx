import React from 'react'
import { motion } from "framer-motion";

export const DesktopNavigation = ({navItems,activeSection,onItemClick}) => {
  return (
    <nav className="hidden md:flex items-center gap-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <motion.button
            key={item.id}
            onClick={() => onItemClick(item.id)}
            className={`relative px-4 py-2 rounded-full font-medium transition-all duration-300 ${isActive
              ? "text-white"
              : "text-gray-700 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-400"
              }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Go to ${item.label}`}
          >
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600 rounded-full shadow-lg"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              />
            )}
            <span className="relative flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span className="hidden lg:inline">{item.label}</span>
            </span>
          </motion.button>
        );
      })}
    </nav>
  )
}
