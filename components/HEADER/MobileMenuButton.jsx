'use client';

import React from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAppContext } from "@/lib/contexts/app-context";

export const MobileMenuButton = () => {
  const {
    isMenuOpen,
    setIsMenuOpen,
  } = useAppContext();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="md:hidden p-2.5 rounded-xl bg-slate-800/50 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-all border border-white/10"
      aria-label="Toggle menu"
    >
      <motion.div
        animate={{ rotate: isMenuOpen ? 90 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.div>
    </motion.button>
  );
};