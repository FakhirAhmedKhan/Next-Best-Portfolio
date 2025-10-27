'use client';

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export const CtaBtnDek = () => {
  return (
    <motion.div
      className="hidden md:block"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link
        href="#contact"
        className="relative px-6 py-3 rounded-full text-white font-medium overflow-hidden group"
      >
        <motion.div
          className="absolute inset-0"
          initial={{ x: "100%" }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
        <span className="relative z-10 flex items-center gap-2">Get In Touch</span>
      </Link>
    </motion.div>
  );
};