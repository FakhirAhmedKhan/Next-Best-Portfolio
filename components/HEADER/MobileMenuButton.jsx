"use client";
import { Menu, X } from "lucide-react";
const MobileMenuButton = ({ isMenuOpen, setIsMenuOpen }) => {

  return (
    <button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="
        lg:hidden p-2.5 rounded-xl bg-slate-800/50 text-slate-300 
        hover:text-white hover:bg-slate-700/50 
        transition-all duration-300 border border-white/10 
        hover:scale-105 active:scale-95
      "
      aria-label="Toggle menu"
    >
      <div
        className={`
          transition-transform duration-300
          ${isMenuOpen ? "rotate-90" : "rotate-0"}
        `}
      >
        {isMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </div>
    </button>
  );
};

export default MobileMenuButton;
