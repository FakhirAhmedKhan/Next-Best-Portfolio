"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const ProgressBar = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setWidth((scrollY / docHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-fuchsia-600 via-pink-600 to-violet-600"
      style={{ width: `${width}%` }}
      transition={{ duration: 0.1 }}
    />
  );
};