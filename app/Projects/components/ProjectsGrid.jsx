import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";

export const ProjectsGrid = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.3 } },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="animate"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
    >
      <AnimatePresence mode="popLayout">
        {visibleProjects.map((project, idx) => (
          <motion.article
            key={`${project.title}-${idx}`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            layout
            className="group relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700"
          >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-fuchsia-100 to-pink-100 dark:from-gray-700 dark:to-gray-600">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-gray-900/90 text-fuchsia-600 dark:text-fuchsia-400 backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              {/* Quick View Button */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              >
                <div className="px-6 py-3 rounded-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-semibold shadow-xl flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  View Project
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
                {project.description}
              </p>

              {/* Links */}
              {project.links && project.links.length > 0 && (
                <div className="flex gap-3 pt-4 border-t bg-gray-900 border-gray-200 dark:border-gray-700">
                  {project.links.map(({ url, icon, label }) => (
                    <motion.a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 hover:from-fuchsia-500 hover:to-pink-500 dark:hover:from-fuchsia-600 dark:hover:to-pink-600 transition-all duration-300 group/link"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={label}
                    >
                      {icon ? (
                        <img
                          src={icon}
                          alt={label}
                          className="w-5 h-5 group-hover/link:brightness-0 group-hover/link:invert transition-all"
                        />
                      ) : (
                        <ExternalLink className="w-5 h-5 text-fuchsia-600 group-hover/link:text-white transition-colors" />
                      )}
                    </motion.a>
                  ))}
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
