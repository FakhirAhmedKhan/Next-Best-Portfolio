"use client";
import { AnimatedText } from "@/lib/contexts/DaynamicImport";
import { motion } from "framer-motion";

export const SectionHeading = ({ title, subtitle, tag }) => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Content Wrapper */}
      <motion.div
        initial={{ opacity: 1, y: 20 }}
        whileInView={{ opacity: 2, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl"
      >
        {/* Optional Tag/Badge */}
        {tag && (
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-block px-3 py-1 rounded-full bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-600 dark:text-fuchsia-300 text-xs font-bold tracking-widest uppercase"
          >
            {tag}
          </motion.span>
        )}

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
        >
          <span className="bg-linear-to-r from-fuchsia-600 via-pink-600 to-violet-600 bg-clip-text text-transparent drop-shadow-sm ">
            {title}
          </span>
        </motion.h2>
        < AnimatedText text={subtitle} />
      </motion.div>
    </div >
  );
};

export default SectionHeading;