import React from 'react'
import { motion } from "framer-motion";

export const Header = () => {
  const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

  return (
    <motion.div className="text-center mb-16" {...fadeInUp}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="inline-block mb-4"
      ></motion.div>

      <h2 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600 bg-clip-text text-transparent mb-6">
        My Creations
      </h2>

      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
       e
      </p>
    </motion.div>
  )
}
