'use client';
import Link from 'next/link';
import { SectionSTyle } from "@/UI/motionConfige";
import { LucideWandSparkles } from "lucide-react";
import { useAppContext } from "@/lib/contexts/app-context";
import { useLanguage } from "@/lib/contexts/language-context";
import { Badge, TypingEffect, Description, SocialLinks } from "@/lib/contexts/DynamicImports";

export default function Page() {

  const { data } = useLanguage();
  const badgeText = data.BageName?.HomeBage || "Default Badge";
  const HomeData = data.sectionTitles?.home || {};

  const { socialLinks, loading } = useAppContext();

  return (
    <section id="home" className={SectionSTyle}>

      <Badge Icon={LucideWandSparkles} BageName={badgeText} className="mb-4" />

      <TypingEffect HomeData={HomeData} />

      <Description HomeData={HomeData} />

      <Link
        href="/ProjectPage" className="flex flex-wrap justify-center gap-4 pt-4 px-8 py-4 rounded-full font-semibold bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 hover:border-fuchsia-600 dark:hover:border-fuchsia-400 transition-colors shadow-lg backdrop-blur-sm"
      >{HomeData.part7}
      </Link>

      <SocialLinks socialLinks={socialLinks} />
    </section>
  );
}