"use client";
import { useNav } from "@/hooks/useNav";
import HeaderLogo from "@/components/HEADER/Logo";
import DesktopNavigation from "@/components/HEADER/DesktopNavigation";
import LanguageSwitcher from "@/UI/LanguageSwitcher";
import MobileMenuButton from "@/components/HEADER/MobileMenuButton";
import MobileMenu from "@/components/HEADER/MobileManu";
import ProgressBar from "@/components/HEADER/ProgressBar";
export default function Navbar() {
  const { scrolled } = useNav();

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 dark:border-white/5 transform transition-all duration-500 ease-out
      ${scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-[0_8px_40px_-12px_rgba(168,85,247,0.3)] translate-y-0"
          : "bg-transparent translate-y-0"
        }`}
    >
      <nav className="max-w-7xl 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20">
          {/* Logo Section */}
          <div className="shrink-0 min-w-0">
            <HeaderLogo />
          </div>

          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <div className="hidden lg:flex flex-1 justify-center px-4">
            <DesktopNavigation />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-shrink-0">
            {/* Language Switcher */}
            <div>
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button - Hidden on desktop */}
            <div className="lg:hidden">
              <MobileMenuButton />
            </div>
          </div>
        </div>

        {/* Mobile Menu - Hidden on desktop */}
        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </nav>

      {/* Progress Bar */}
      <ProgressBar />
    </header>
  );
}