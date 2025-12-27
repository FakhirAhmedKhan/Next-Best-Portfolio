"use client";

import { useState } from "react";
export function useSocialLinks() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return { hoveredIndex, setHoveredIndex };
}
