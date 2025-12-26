"use client";

import { useMemo, useState } from "react";
import { BookOpen, Code, GraduationCap, Sparkles } from "lucide-react";

export function useEducation() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const iconMap = useMemo(
    () => ({
      GraduationCap,
      Sparkles,
      Code,
      BookOpen,
    }),
    []
  );

  return { hoveredIndex, setHoveredIndex, iconMap };
}
