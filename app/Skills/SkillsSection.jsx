'use client';
import React from "react";
import { Card } from "./components/SkillsGrid";
import { Bottomdecoration } from "./components/Bottomdecoration";
import { HeadIng } from "@/UI/Head";
import { Badge } from "@/UI/Badge";
import { Zap } from "lucide-react";

export default function SkillsSection() {

  return (
    <section id="skills" className="relative min-h-screen py-20 px-4 overflow-hidden">

      <div className="relative max-w-7xl mx-auto">

        <HeadIng Tittle="Skills & Toolkit" Pragaphic="Technologies and tools I use to bring ideas to life" />
        <div className="flex justify-center items-center mb-6">
          <Badge Icon={Zap} BageName="Always Learning" className="px-4 py-2 text-sm" />
        </div>
        <Card />
        <Bottomdecoration />
      </div>
    </section >
  );
}