'use client';

import { useState } from 'react';
import { GraduationCap, BookOpen, Code, Sparkles } from 'lucide-react';
import { useAppData } from './useAppData';

const iconMap = { GraduationCap, BookOpen, Code, Sparkles };

export function useSkills() {
  const { skills, loading } = useAppData();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return { skills, loading, iconMap, hoveredIndex, setHoveredIndex };
}
