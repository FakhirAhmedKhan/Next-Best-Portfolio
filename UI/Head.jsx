"use client";
import { motion } from "framer-motion";
import { AnimatedText } from '@/UI/AnimatedText';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export const HeadIng = ({ Tittle, Pragaphic }) => {
  return (
    <motion.div className="text-center mb-16" {...fadeInUp}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="inline-block mb-4"
      ></motion.div>

      <h2 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600 bg-clip-text text-transparent mb-6">
        {Tittle}
      </h2>

      <span className="text-2xl text-gray-600 dark:text-gray-400  mx-auto">
        <AnimatedText text={Pragaphic} />
      </span>
    </motion.div>)
}