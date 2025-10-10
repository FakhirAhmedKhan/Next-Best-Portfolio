"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";

export const MobileMenu = ({
  isOpen,
  setIsOpen,
  navItems,
  onItemClick,
  activeSection,
}: {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  navItems: { name: string; id: string }[];
  onItemClick: (id: string) => void;
  activeSection: string;
}) => {
  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg flex flex-col gap-4 p-6"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onItemClick(item.id);
                  setIsOpen(false);
                }}
                className={`text-lg ${activeSection === item.id
                    ? "text-fuchsia-600 dark:text-fuchsia-400"
                    : "text-gray-700 dark:text-gray-300"
                  }`}
              >
                {item.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};