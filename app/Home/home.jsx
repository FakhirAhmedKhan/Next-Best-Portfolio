"use client"
import { Animated } from "./components/Animated";
import { TypingEffect } from "./components/TypingEffect";
import { Praghrap } from "./components/Description";
import { CTAButtons } from "./components/CTAButtons";
import { SocialLinks } from "./components/socialLinks";
import { Badge } from "@/UI/Badge";
import { WandSparkles } from "lucide-react";

export default function HomeSection() {

  return (
    <section
      id="home" className="relative z-10 max-w-5xl mx-auto text-center space-y-8 flex flex-col min-h-screen items-center justify-center px-4"
    >
      <Animated />

      <Badge Icon={WandSparkles} BageName="Welcome to my digital space"  className="mb-4"/>

      <TypingEffect />

      <Praghrap />

      <CTAButtons />

      <SocialLinks />
    </section>
  );
}