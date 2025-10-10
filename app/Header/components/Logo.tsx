"use client";
import React from "react";
import { motion } from "framer-motion";

export const Logo = ({ onItemClick }: { onItemClick?: (target: string) => void }) => {
  return (
    <motion.button
      onClick={() => typeof onItemClick === "function" ? onItemClick("/home") : null}
      className="font-bold text-xl bg-gradient-to-r from-fuchsia-600 to-violet-600 bg-clip-text text-transparent"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      MyPortfolio
    </motion.button>
  );
};