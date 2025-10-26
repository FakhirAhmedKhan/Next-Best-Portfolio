"use client";
import React from "react";
import { motion } from "framer-motion";
import { useAppContext } from "@/Hook/useAppLogic";

export const SocialLinks = () => {
  const { socialLinks, loading } = useAppContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8 text-gray-500">
        Loading social links...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="flex justify-center items-center gap-4 pt-8"
    >
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-400 dark:to-gray-600" />
      <div className="flex gap-4">
        {socialLinks.map(({ url, icon, label }, index) => (
          <motion.a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-fuchsia-600 dark:hover:border-fuchsia-400 transition-all duration-300 shadow-lg"
            aria-label={label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 + index * 0.1, type: 'spring' }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity" />
            <img
              src={icon}
              alt={label}
              className="w-5 h-5 group-hover:scale-110 transition-transform"
            />
          </motion.a>
        ))}
      </div>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-400 dark:to-gray-600" />
    </motion.div>
  );
};
