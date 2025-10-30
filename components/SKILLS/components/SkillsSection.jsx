'use client';
import React from "react";
import { Card } from "./SkillsGrid";
import { Bottomdecoration } from "./Bottomdecoration";
import { HeadIng } from "@/UI/Head";
import { Badge } from "@/UI/Badge";
import { Zap } from "lucide-react";
import { SectionSTyle } from "@/UI/motionConfige";
import { useAppContext } from "@/lib/contexts/app-context";

export default function SkillsSection() {
  const { sectionTitles } = useAppContext();

  return (
    <section id="skills" className={SectionSTyle}>

      <div className="relative max-w-7xl mx-auto">

        <HeadIng Tittle={sectionTitles.skillsSection?.title} Pragaphic={sectionTitles.skillsSection?.paragraph} />

        <div className="flex justify-center items-center mb-6">
          <Badge Icon={Zap} BageName={sectionTitles.BageName?.SkillBage} className="px-4 py-2 text-sm" />
        </div>
        <Card />
        <Bottomdecoration />
      </div>
    </section >
  );
}