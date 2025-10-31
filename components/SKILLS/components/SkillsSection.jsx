'use client';
import React from "react";
import { Card } from "./SkillsGrid";
import { Bottomdecoration } from "./Bottomdecoration";
import { HeadIng } from "@/UI/Head";
import { Badge } from "@/UI/Badge";
import { Zap } from "lucide-react";
import { SectionSTyle } from "@/UI/motionConfige";
import { useLanguage } from "@/lib/contexts/language-context";

export default function SkillsSection() {
  const { data } = useLanguage();
  const badgeText = data.BageName?.SkillBade || "Default Badge";
  const Data = data.sectionTitles?.skillsSection || {};

  return (
    <section id="skills" className={SectionSTyle}>

      <div className="relative max-w-7xl mx-auto">

        <HeadIng Tittle={Data.title} Pragaphic={Data.paragraph} />

        <div className="flex justify-center items-center mb-6">
          <Badge Icon={Zap} BageName={badgeText} className="px-4 py-2 text-sm" />
        </div>
        <Card />
        <Bottomdecoration />
      </div>
    </section >
  );
}