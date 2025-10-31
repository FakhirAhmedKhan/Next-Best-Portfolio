"use client";
import { AnimatedText } from "@/UI/AnimatedText";
import { motion } from "framer-motion";
import {ReactTyped} from "react-typed"; // fixed import
import { useLanguage } from "@/lib/contexts/language-context";

export const Praghrap = () => {
  const { homeData } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl text-center">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-light"
      >
        {homeData.part3 && <AnimatedText text={homeData.part3} />}

        <span
          className="font-semibold text-fuchsia-600 dark:text-fuchsia-400 inline-block"
          style={{ minWidth: "18ch" }}
        >
          <ReactTyped
            strings={Array.isArray(homeData.part4) ? homeData.part4 : [homeData.part4 || "Developer"]}
            typeSpeed={80}
            backSpeed={40}
            loop
            backDelay={1500}
            showCursor
            cursorChar="|"
          />
        </span>

        {homeData.part5 && <AnimatedText text={homeData.part5} />}
        {homeData.part6 && <AnimatedText text={homeData.part6} />}
      </motion.span>
    </div>
  );
};
