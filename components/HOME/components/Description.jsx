"use client";
import { AnimatedText } from "@/UI/AnimatedText";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed"; // fixed import
import { useLanguage } from "@/lib/contexts/language-context";

export const Praghrap = () => {
  const { data } = useLanguage();
  const HomeData = data.sectionTitles?.home || {}; // just home object

  return (
    <div className="mx-auto max-w-4xl text-center">
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-light"
      >
        {HomeData.part3 && <AnimatedText text={HomeData.part3} />}

        <span
          className="font-semibold text-fuchsia-600 dark:text-fuchsia-400 inline-block"
          style={{ minWidth: "18ch" }}
        >
          <ReactTyped
            strings={Array.isArray(HomeData.part4) ? HomeData.part4 : [HomeData.part4 || "Developer"]}
            typeSpeed={80}
            backSpeed={40}
            loop
            backDelay={1500}
            showCursor
            cursorChar="|"
          />
        </span>

        {HomeData.part5 && <AnimatedText text={HomeData.part5} />}
        {HomeData.part6 && <AnimatedText text={HomeData.part6} />}
      </motion.span>
    </div>
  );
};
