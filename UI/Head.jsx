"use client";
import { motion } from "framer-motion";
import { AnimatedText } from "./AnimatedText";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};


export const HeadIng = ({ Tittle, Pragaphic }) => {
  return (
    <motion.div
      className="relative text-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      dir="rtl"
    >

      {/* Title */}
      <motion.h2
        variants={itemVariants}
        className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 relative"
      >
        <span className="bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600 bg-clip-text text-transparent">
          {Tittle}
        </span>
        <motion.span
          className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600 opacity-20 blur-2xl -z-10"
          animate={{
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.h2>

      {/* Subtitle */}
      <motion.div
        variants={itemVariants}
        className="max-w-2xl mx-auto"
      >
        <span className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed block">
          <AnimatedText text={Pragaphic} />
        </span>
      </motion.div>

      {/* Bottom accent */}
      <motion.div
        variants={itemVariants}
        className="mt-8 flex justify-center gap-2"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};
