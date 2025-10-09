"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Code2, Zap } from "lucide-react";

export default function SkillsSection() {
  const [skills, setSkills] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/main/Data/skillsIcons.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const skillsData = data.skills || [];
        setSkills(skillsData);
      })
      .catch((err) => {
        console.error("Error fetching skills:", err);
      });
  }, []);

  return (
    <section
      id="skills"
      className="relative min-h-screen py-20 px-4 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-fuchsia-300/20 dark:bg-fuchsia-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-violet-300/20 dark:bg-violet-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Floating code symbols */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-fuchsia-400/20 dark:text-fuchsia-600/20 font-mono text-2xl font-bold"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {["<>", "{}", "[]", "/>", "()"][Math.floor(Math.random() * 5)]}
          </motion.div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-fuchsia-200 dark:border-fuchsia-800 shadow-lg mb-6"
          >
            <Code2 className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
            <span className="text-sm font-semibold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              Tech Stack
            </span>
          </motion.div>

          {/* Title */}
          <h2 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600 bg-clip-text text-transparent mb-6">
            Skills & Toolkit
          </h2>

          {/* Subtitle */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <Sparkles className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                {skills.length}+ Skills
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
              <Zap className="w-4 h-4 text-violet-600 dark:text-violet-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Always Learning
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name || index}
              variants={skillVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative"
            >
              {/* Card */}
              <motion.div
                className="relative flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-pink-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Animated gradient border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(45deg, #d946ef, #ec4899, #8b5cf6)",
                    padding: "2px",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* Icon container */}
                <motion.div
                  className="relative z-10 mb-3"
                  animate={
                    hoveredIndex === index
                      ? {
                        rotate: [0, -10, 10, -10, 0],
                        scale: [1, 1.1, 1.1, 1.1, 1],
                      }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative">
                    <img
                      src={skill.icon}
                      alt={`${skill.name} logo`}
                      className="h-16 w-16 object-contain"
                    />

                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                      style={{
                        background:
                          "radial-gradient(circle, #d946ef 0%, transparent 70%)",
                      }}
                    />
                  </div>
                </motion.div>

                {/* Skill name */}
                <span className="relative z-10 text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400 transition-colors">
                  {skill.name}
                </span>

                {/* Decorative corner dots */}
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-fuchsia-400/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-violet-400/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>

              {/* Floating particles on hover */}
              {hoveredIndex === index && (
                <>
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-fuchsia-400 rounded-full"
                      style={{
                        left: "50%",
                        top: "50%",
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: Math.cos((i * 60 * Math.PI) / 180) * 50,
                        y: Math.sin((i * 60 * Math.PI) / 180) * 50,
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          className="mt-20 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="h-1 w-32 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-violet-500 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}