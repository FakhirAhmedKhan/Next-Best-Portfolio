"use client";
import React from "react";
import { SkillsGrid } from "./components/SkillsGrid";
import { useSkillsLogic } from "./components/logic"; // ✅ correct import path
import { Animated } from "./components/Animated";
import { Header } from "./components/Header";
import { Bottomdecoration } from "./components/Bottomdecoration";

export default function SkillsSection() {
  const { skills, hoveredIndex, setHoveredIndex } = useSkillsLogic();

  return (
    <section id="skills" className="relative min-h-screen py-20 px-4 overflow-hidden">
      <Animated />
      <div className="relative max-w-7xl mx-auto">
        <Header skills={skills} />
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