"use client";
import { BsGithub } from "react-icons/bs";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useAppContext } from "@/Hook/useAppLogic";
import Image from "next/image";

export const ProjectView = () => {
  const { visibleProjects } = useAppContext();

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  // Individual card animation
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  // Hover animation for cards
  const cardHoverVariants = {
    rest: {
      scale: 1,
      y: 0,
      rotateX: 0,
      rotateY: 0,
    },
    hover: {
      scale: 1.05,
      y: -10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  // Image animation
  const imageVariants = {
    rest: {
      scale: 1,
      filter: "brightness(1)",
    },
    hover: {
      scale: 1.15,
      filter: "brightness(1.1)",
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  // Overlay animation
  const overlayVariants = {
    rest: {
      opacity: 0,
      y: 20,
    },
    hover: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Button animation
  const buttonVariants = {
    rest: {
      scale: 1,
      boxShadow: "0 0 0px rgba(168, 85, 247, 0)",
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(168, 85, 247, 0.5)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  // Badge animation
  const badgeVariants = {
    rest: {
      scale: 1,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, -5, 0],
      transition: {
        rotate: {
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 2,
        },
        scale: {
          duration: 0.2,
        },
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {visibleProjects.map((project, index) => (
        <motion.div
          key={project.id}
          variants={cardVariants}
          initial="rest"
          whileHover="hover"
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blur rounded-2xl shadow-2xl overflow-hidden flex flex-col relative"
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {/* Animated border glow on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{
              opacity: 1,
              boxShadow: "0 0 30px rgba(168, 85, 247, 0.6), inset 0 0 30px rgba(168, 85, 247, 0.1)",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Image Container - Fixed Height */}
          <motion.div
            className="relative overflow-hidden group h-56 flex-shrink-0"
            variants={cardHoverVariants}
          >
            <Image
              width={964}
              height={964}
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-auto rounded-lg object-cover"
              quality={100}
              unoptimized
            />

            {/* Category Badge */}
            <motion.div
              className="absolute top-4 right-4"
              variants={badgeVariants}
            >
              <motion.span
                className="px-3 py-1 bg-purple-600 text-white text-xs font-semibold rounded-full shadow-lg backdrop-blur-sm"
                whileHover={{
                  backgroundColor: "rgb(147, 51, 234)",
                  boxShadow: "0 5px 15px rgba(168, 85, 247, 0.6)",
                }}
              >
                {project.category}
              </motion.span>
            </motion.div>

            {/* Gradient Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              variants={overlayVariants}
            />

            {/* Floating particles on hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
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

          {/* Content - Flexible Height with Fixed Bottom */}
          <motion.div
            className="p-6 flex flex-col flex-grow relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            {/* Subtle background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-b-2xl"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Title - Fixed Height */}
            <motion.h2
              className="text-2xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 min-h-[64px] relative z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              {project.title}
            </motion.h2>

            {/* Description - Fixed Height */}
            <motion.p
              className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 line-clamp-3 min-h-[63px] relative z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {project.description}
            </motion.p>

            {/* Action Buttons - Pushed to Bottom */}
            <motion.div
              className="flex gap-3 mt-auto relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.6 }}
            >
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg relative overflow-hidden"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{
                    x: "100%",
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }}
                />
                <motion.div
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <ExternalLink size={18} />
                </motion.div>
                <span className="relative z-10">Live Demo</span>
              </motion.a>

              <motion.a
                href={project.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-medium py-2.5 px-4 rounded-lg relative overflow-hidden"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{
                    x: "100%",
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }}
                />
                <motion.div
                  initial={{ rotate: 0, scale: 1 }}
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1,
                    transition: { duration: 0.5 }
                  }}
                >
                  <BsGithub size={18} />
                </motion.div>
                <span className="relative z-10">Code</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Corner accent on hover */}
          <motion.div
            className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.3 }
            }}
          >
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full" />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};