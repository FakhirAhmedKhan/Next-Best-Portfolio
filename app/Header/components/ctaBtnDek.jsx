"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

export const CtaBtnDek = ({ onItemClick }) => {

  return (
    <>
      <motion.a
        onClick={() => typeof onItemClick === "function" ? onItemClick("/contact") : null}
        className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Mail className="w-4 h-4" />
        <span>Let's Talk</span>
      </motion.a>
    </>
  );
};