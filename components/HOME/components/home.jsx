'use client';
import { TypingEffect } from "./TypingEffect";
import { Praghrap } from "./Description";
import { CTAButtons } from "./CTAButtons";
import { SocialLinks } from "./socialLinks";
import { Badge } from "@/UI/Badge";
import { WandSparkles } from "lucide-react";
import { SectionSTyle } from "@/UI/motionConfige";
import { useAppContext } from "@/lib/contexts/app-context";

export default function HomeSection() {
  const { sectionTitles } = useAppContext();

  return (

    <section id="home" className={SectionSTyle}>

      <Badge Icon={WandSparkles} BageName={sectionTitles.BageName?.HomeBage} className="mb-4" />

      <TypingEffect />

      <Praghrap />

      <CTAButtons />

      <SocialLinks />
    </section>
  );
}