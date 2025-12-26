"use client";

import { useState } from "react";
import { useAppData } from "./useAppData";

export function useSocialLinks() {
  const { socialLinks, loading } = useAppData();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return { socialLinks, loading, hoveredIndex, setHoveredIndex };
}
