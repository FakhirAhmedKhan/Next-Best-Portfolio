"use client";
import React from "react";
import { motion } from "framer-motion";

export const Logo = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => {
  return (
    <motion.button
      onClick={() => scrollToSection("home")}
      className="font-bold text-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 bg-clip-text text-transparent"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      MyPortfolio
    </motion.button>
  );
};