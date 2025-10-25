"use client";
import { useAppContext } from "@/Hook/useAppLogic";
import { motion } from "framer-motion";

export const LoardProject = () => {
  const { visibleProjects, filteredProjects, showMore } = useAppContext();

  const hasMore = visibleProjects.length < filteredProjects.length;

  if (!hasMore) return null;

  return (
    <motion.div
      className="flex justify-center mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.button
        onClick={() => showMore(3)}
        className="group relative px-8 py-4 rounded-full font-bold text-white overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-violet-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-pink-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className="relative flex items-center gap-2">
          Load More Projects
          <motion.span
            animate={{ y: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            ↓
          </motion.span>
        </span>
      </motion.button>
    </motion.div>
  );
};