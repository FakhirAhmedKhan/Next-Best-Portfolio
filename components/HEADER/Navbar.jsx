"use client";
import { useAppContext } from "@/lib/contexts/app-context";
import { LanguageSwitcher, HeaderLogo, DesktopNavigation, MobileMenu, MobileMenuButton, ProgressBar } from "@/lib/contexts/DaynamicImport"
export default function Navbar() {
  const { scrolled } = useAppContext();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 dark:border-white/5 transform transition-all duration-500 ease-out
      ${scrolled ? "shadow-[0_8px_40px_-12px_rgba(168,85,247,0.3)] translate-y-0" : "-translate-y-full"}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <HeaderLogo />
          <DesktopNavigation />
          <LanguageSwitcher />
          <MobileMenuButton />
        </div>
        <MobileMenu />
      </nav>
      <ProgressBar />
    </header>
  );
}