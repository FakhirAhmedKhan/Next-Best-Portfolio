"use client"
import { AnimatedText } from "../../../UI/AnimatedText";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";

export const Praghrap = () => {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-light"
      >
        <AnimatedText text="A passionate" />

        <span
          className="font-semibold text-fuchsia-600 dark:text-fuchsia-400 inline-block"
          style={{ minWidth: "18ch" }}
        >
          <ReactTyped
            strings={[
              "Web Developer",
              "Frontend Developer",
              "Backend Developer",
              "Theme Designer",
            ]}
            typeSpeed={80}
            backSpeed={40}
            loop
            backDelay={1500}
            showCursor
            cursorChar="|"
          />
        </span>
        <span>
          <AnimatedText text="about building" />
          <AnimatedText text="best experiences that are visually stunning, highly functional, and futuristic." />
        </span>

      </motion.span>
    </div>
  )
}
