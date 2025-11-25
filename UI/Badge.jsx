'use client';
import { AnimatedText } from "@/lib/contexts/DaynamicImport";
import { motion } from "framer-motion";

const Badge = ({ Icon, BageName, className = "", value }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      whileHover={{
        scale: 1.05,
        y: -2
      }}
      whileTap={{ scale: 0.98 }}
      className={`justify-center flex-row items-center group relative inline-flex gap-2.5 px-5 py-2.5 rounded-full bg-blur dark:bg-gray-900/90 backdrop-blur-md border border-fuchsia-200/50 dark:border-fuchsia-800/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer ${className || ''} mt-12 mb-0 text-center`}


    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-linear-to-r from-fuchsia-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-fuchsia-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />

      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent" />

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-linear-to-r from-fuchsia-400/0 to-pink-400/0 group-hover:from-fuchsia-400/20 group-hover:to-pink-400/20 blur-xl transition-all duration-500" />

      {/* Icon Container with Glow */}
      {Icon && (
        <motion.div
          className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-linear-to-br from-fuchsia-100 to-pink-100 dark:from-fuchsia-900/30 dark:to-pink-900/30 group-hover:from-fuchsia-500 group-hover:to-pink-500 transition-all duration-300"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400 group-hover:text-white transition-colors duration-300" />

          {/* Icon Glow */}
          <div className="absolute inset-0 rounded-full bg-fuchsia-500/0 group-hover:bg-fuchsia-500/30 blur-md transition-all duration-300" />
        </motion.div>
      )}

      {value && (
        <span className="relative z-10 text-sm font-semibold text-gray-700 dark:text-gray-300">
          {value}
        </span>
      )}

      {/* Text with Enhanced Gradient */}
      <span className="relative z-10 text-sm font-bold bg-linear-to-r from-fuchsia-600 via-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:from-fuchsia-500 group-hover:via-purple-500 group-hover:to-pink-500 transition-all duration-300">
        <AnimatedText text={BageName} />
      </span>

      {/* Border Glow on Hover */}
      <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-fuchsia-400/30 transition-all duration-300" />
    </motion.div>
  );
};

export default Badge;