"use client";

import { useLogic } from "./components/logic";
import { Animated } from "./components/Animated";
import { Header } from "./components/Header";
import { SkillsGrid } from "./components/SkillsGrid";
import { Bottomdecoration } from "./components/Bottomdecoration";

export default function SkillsSection() {
  const { skills, hoveredIndex, setHoveredIndex } = useLogic();

  return (
    <section
      id="skills"
      className="relative min-h-screen py-20 px-4 overflow-hidden"
    >
      <Animated />

      <div className="relative max-w-7xl mx-auto">
        <Header />
        <SkillsGrid
          skills={skills}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
        />
        <Bottomdecoration />
      </div>
    </section>
  );
}
