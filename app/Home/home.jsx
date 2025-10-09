"use client"
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import { Github, Linkedin, Mail, ArrowDown, Sparkles } from "lucide-react";

export default function HomeSection() {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/refs/heads/main/Data/socialLinks.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const links = data.socialLinks || [];
        setSocialLinks(links);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching socialLinks:", err);
        setLoading(false);
      });
  }, []);

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      id="home"
      className="relative flex flex-col min-h-screen items-center justify-center px-4 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large gradient orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-fuchsia-400/40 dark:bg-fuchsia-600/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-fuchsia-200 dark:border-fuchsia-800 shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
          <span className="text-sm font-semibold bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
            Welcome to my digital space
          </span>
        </motion.div>

        {/* Main Heading with Typing Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
            <div className="mb-2">
              <ReactTyped
                strings={["Hello, I'm"]}
                typeSpeed={80}
                showCursor={false}
              />
            </div>
            <div className="relative inline-block">
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600 rounded-2xl blur-2xl opacity-30"
                animate={pulseAnimation}
              />
              <span className="relative bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600 bg-clip-text text-transparent">
                <ReactTyped
                  strings={["Fakhir Ahmed Khan"]}
                  typeSpeed={100}
                  showCursor={true}
                  cursorChar="|"
                  loop={false}
                />
              </span>
            </div>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto max-w-3xl text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-light"
        >
          A passionate{" "}
          <span className="font-semibold text-fuchsia-600 dark:text-fuchsia-400">
            web developer intern
          </span>{" "}
          on a mission to build beautiful, functional, and futuristic web
          experiences. Welcome to my playground.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap justify-center gap-4 pt-4"
        >
          <motion.a
            href="#projects"
            className="group relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600" />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-pink-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative flex items-center gap-2">
              View My Work
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </span>
          </motion.a>

          <motion.a
            href="#contact"
            className="px-8 py-4 rounded-full font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-fuchsia-600 dark:hover:border-fuchsia-400 transition-colors shadow-lg backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>

        {/* Social Links */}
        {!loading && socialLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex justify-center items-center gap-4 pt-8"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-400 dark:to-gray-600" />
            <div className="flex gap-4">
              {socialLinks.map(({ url, icon, label }, index) => (
                <motion.a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-fuchsia-600 dark:hover:border-fuchsia-400 transition-all duration-300 shadow-lg"
                  aria-label={label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                  <img
                    src={icon}
                    alt={label}
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                  />
                </motion.a>
              ))}
            </div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-400 dark:to-gray-600" />
          </motion.div>
        )}
      </div>
    </section>
  );
}