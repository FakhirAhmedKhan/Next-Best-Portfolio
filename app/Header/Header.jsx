"use client";
import { motion } from "framer-motion";
import { Logo } from "./components/Logo";
import { DesktopNavigation } from "./components/DesktopNavigation";
import { CtaBtnDek } from "./components/ctaBtnDek";
import { MobileMenu } from "./components/MobileManu";
import { ProgressBar } from "./components/ProgressBar";
import { useLogic } from "./components/Logic";

export default function HeaderSection() {
  const { navItems, isMenuOpen, setIsMenuOpen, activeSection, scrolled, scrollToSection } = useLogic();

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
        <Logo scrollToSection={scrollToSection} />

        <DesktopNavigation
          navItems={navItems}
          activeSection={activeSection}
          onItemClick={scrollToSection}
        />

        <CtaBtnDek onItemClick={scrollToSection} />


      </div>
      <MobileMenu
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
        navItems={navItems}
        activeSection={activeSection}
        onItemClick={scrollToSection}
      />

      <ProgressBar />
    </motion.header>
  );
}
