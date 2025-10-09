"use client"
import { motion } from "framer-motion";
import { Animated } from "./components/Animated";
import { Badge } from "./components/Badge";
import { TypingEffect } from "./components/TypingEffect";
import { Description } from "./components/Description";
import { CTAButtons } from "./components/CTAButtons";
import { SocialLinks } from "./components/socialLinks";

export default function HomeSection() {



  return (
    <section
      id="home" className="relative z-10 max-w-5xl mx-auto text-center space-y-8 flex flex-col min-h-screen items-center justify-center px-4 overflow-hidden"
    >
      <Animated />

      <Badge />

      <TypingEffect />

      <Description />

      <CTAButtons />

      <SocialLinks />
    </section>
  );
}