'use client';
import React from "react";
import { Card } from "./SkillsGrid";
import { Bottomdecoration } from "./Bottomdecoration";
import { HeadIng } from "@/UI/Head";
import { Badge } from "@/UI/Badge";
import { Zap } from "lucide-react";
import { SectionSTyle } from "@/UI/motionConfige";

export default function SkillsSection() {

  return (
    <section id="skills" className={SectionSTyle}>

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