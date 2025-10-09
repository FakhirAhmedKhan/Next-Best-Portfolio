import React from 'react'
import { motion } from "framer-motion";

export const Description = () => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="mx-auto max-w-3xl text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-light"
    >
      A passionate{" "}
      <span className="font-semibold text-fuchsia-600 dark:text-fuchsia-400">
        web developer intern
      </span>{" "}
      on a mission to build beautiful, functional, and futuristic web
      experiences. Welcome to my playground.
    </motion.p>
  )
}
