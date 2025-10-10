import React from "react";
import Link from "next/link";

export const DesktopNavigation = ({ navItems, activeSection, onItemClick }) => {
  return (
    <nav className="hidden md:flex items-center gap-4">
      {navItems.map((item) => (
        <Link key={item.id} href={item.href} className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${activeSection === item.id ? "text-white bg-gradient-to-r from-fuchsia-500 via-pink-500 to-violet-500" : "text-gray-700 dark:text-gray-300 hover:text-fuchsia-600 dark:hover:text-fuchsia-400"}`} onClick={(e) => { if (typeof onItemClick === 'function') onItemClick(item.href); }}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
};
