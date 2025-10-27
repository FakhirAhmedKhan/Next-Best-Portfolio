'use client';
import { TypingEffect } from "./TypingEffect";
import { Praghrap } from "./Description";
import { CTAButtons } from "./CTAButtons";
import { SocialLinks } from "./socialLinks";
import { Badge } from "@/UI/Badge";
import { WandSparkles } from "lucide-react";
import { SectionSTyle } from "@/UI/motionConfige";

export default function HomeSection() {

  return (
    <section id="home" className={SectionSTyle}>

      <Badge Icon={WandSparkles} BageName="Welcome to my digital space"  className="mb-4"/>

      <TypingEffect />

      <Praghrap />

      <CTAButtons />

      <SocialLinks />
    </section>
  );
}