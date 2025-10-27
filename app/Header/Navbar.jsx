'use client';
import { motion } from "framer-motion";
import { LogoHeader } from "../../components/HEADER/components/Logo";
import { DesktopNavigation } from "../../components/HEADER/components/DesktopNavigation";
import { MobileMenu } from "../../components/HEADER/components/MobileManu";
import { CtaBtnDek } from "../../components/HEADER/components/ctaBtnDek";
import { MobileMenuButton } from "../../components/HEADER/components/MobileMenuButton";
import { ProgressBar } from "../../components/HEADER/components/ProgressBar";
import { useAppContext } from "@/lib/contexts/app-context";

export default function Navbar() {
  const { scrolled } = useAppContext();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{
        y: 0,
        boxShadow: scrolled
          ? "0 8px 40px -12px rgba(168, 85, 247, 0.3)"
          : "0 0 0 0 rgba(168, 85, 247, 0)",
      }}
      transition={{ duration: 0.6, type: "spring", damping: 25 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 dark:border-white/5"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <LogoHeader />
          <DesktopNavigation />
          <CtaBtnDek />
          <MobileMenuButton />
        </div>
        <MobileMenu />
      </nav>
      <ProgressBar/>
    </motion.header>
  );
}