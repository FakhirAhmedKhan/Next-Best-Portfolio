"use client";

import { motion } from "framer-motion";
import { Logo } from "./components/Logo";
import { CtaBtnDek } from "./components/ctaBtnDek";
import { ProgressBar } from "./components/ProgressBar";
import { DesktopNavigation } from "./components/DesktopNavigation";
import { useLogic } from "./components/Logic";
import MobileMenuButton from "./components/MobileMenuButton";
import { MobileMenu } from "./components/MobileManu";


export default function HeadSection() {
  const { navItems, scrolled, isMenuOpen, setIsMenuOpen, onItemClick } = useLogic();

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
         ${scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <Logo onItemClick={() => onItemClick("/home")} />

          <DesktopNavigation navItems={navItems} onItemClick={onItemClick} />

          <CtaBtnDek onItemClick={() => onItemClick("/footer")} />

          <MobileMenuButton navItems={navItems} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onItemClick={onItemClick} />
        </div>
      </div>
      <MobileMenu navItems={navItems} isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} onItemClick={onItemClick} />

      <ProgressBar />

    </motion.header>
  );
}
