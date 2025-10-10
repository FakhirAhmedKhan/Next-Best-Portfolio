"use client";
import React from "react";

export const CtaBtnDek = ({ onItemClick }) => {
  return (
    <button
      onClick={() => typeof onItemClick === "function" ? onItemClick("/contact") : null}
      className="hidden md:inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-violet-600 text-white text-sm font-medium shadow hover:opacity-90 transition"
    >
      Contact Me
    </button>
  );
};