"use client"

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { ExternalLink, Github, Eye } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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

export default function ProjectSection() {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/main/Data/projectsData.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const projectData = data.projects || [];
        setProjects(projectData);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
      });
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...cats];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  return (
    <section
      id="projects"
      className="relative min-h-screen py-20 px-4 overflow-hidden"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-fuchsia-300/20 dark:bg-fuchsia-600/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-violet-300/20 dark:bg-violet-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
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
            Explore my latest projects showcasing creativity, innovation, and
            technical expertise
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          {...fadeInUp}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(6);
                }}
                className={`relative px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  isActive
                    ? "text-white shadow-xl scale-105"
                    : "text-gray-700 dark:text-gray-300 hover:scale-105 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-violet-500 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
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

        {/* Load More Button */}
        {visibleCount < filteredProjects.length && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              onClick={() => setVisibleCount((prev) => prev + 6)}
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
        )}
      </div>
    </section>
  );
}