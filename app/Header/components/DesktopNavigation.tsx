"use client";
import React from "react";

export const DesktopNavigation = ({
  navItems,
  activeSection,
  onItemClick,
}: {
  navItems: { name: string; id: string }[];
  activeSection: string;
  onItemClick: (id: string) => void;
}) => {
  return (
    <nav className="hidden md:flex gap-8">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick(item.id)}
          className={`text-sm font-medium transition-colors ${
            activeSection === item.id
              ? "text-fuchsia-600 dark:text-fuchsia-400"
              : "text-gray-700 dark:text-gray-300 hover:text-fuchsia-500"
          }`}
        >
          {item.name}
        </button>
      ))}
    </nav>
  );
};