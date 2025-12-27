"use client";

import { useState } from 'react';
import { GraduationCap, BookOpen, Code, Sparkles } from 'lucide-react';

const iconMap = { GraduationCap, BookOpen, Code, Sparkles };

export function useSkills(skills = []) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return { skills, iconMap, hoveredIndex, setHoveredIndex };
}
