import React from "react";
import Link from "next/link";

export const MobileMenu = ({ navItems, isOpen, setIsOpen, onItemClick }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden absolute top-20 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg flex flex-col">
      {navItems.map((item) => (
        <button
          key={item.id}
          className="text-left block px-4 py-3 border-b border-gray-200 dark:border-gray-700"
          onClick={() => {
            if (typeof onItemClick === "function") onItemClick(item.href);
            setIsOpen(false);
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
