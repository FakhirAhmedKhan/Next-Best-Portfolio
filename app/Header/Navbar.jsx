"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Logo } from "./components/Logo";
import { CtaBtnDek } from "./components/ctaBtnDek";
import { ProgressBar } from "./components/ProgressBar";
import { DesktopNavigation } from "./components/DesktopNavigation";
import { MobileMenu } from "./components/MobileManu";
import { useLogic } from "./components/Logic";

// navItems are provided by useLogic hook

export default function HeadSection() {
  const { navItems, scrolled, isMenuOpen, setIsMenuOpen, onItemClick } = useLogic();

  // Note: useLogic already manages scroll listener for header background

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Logo onItemClick={() => onItemClick("/home")} />

        {/* Desktop Menu */}
        <DesktopNavigation navItems={navItems} onItemClick={onItemClick} />

        {/* CTA button if needed */}
        <CtaBtnDek onItemClick={() => onItemClick("/contact")} />

        {/* Mobile Hamburger Menu */}
        <button className="md:hidden px-3 py-2 rounded-md text-gray-700 dark:text-gray-300" onClick={() => setIsMenuOpen((prev) => !prev)}>
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu navItems={navItems} isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} onItemClick={onItemClick} />

      {/* Optional scroll progress bar */}
      <ProgressBar />
    </motion.header>
  );
}
