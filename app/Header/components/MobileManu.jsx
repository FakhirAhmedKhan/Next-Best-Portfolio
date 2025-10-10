import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { Mail } from 'lucide-react';

export const MobileMenu = ({ isOpen, setIsOpen, navItems, onItemClick, activeSection }) => {
  const menuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg"
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => onItemClick(item.id)} // ✅ fixed
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${isActive
                      ? "bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  variants={itemVariants}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      className="ml-auto w-2 h-2 rounded-full bg-white"
                      layoutId="activeMobile"
                    />
                  )}
                </motion.button>
              );
            })}

            {/* Mobile CTA */}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onItemClick("contact"); // ✅ fixed
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold shadow-lg mt-4"
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-5 h-5" />
              <span>Get In Touch</span>
            </motion.a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
