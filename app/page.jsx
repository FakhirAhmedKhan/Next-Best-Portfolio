'use client';
import { WandSparkles } from "lucide-react";
import { useAppContext } from "@/lib/contexts/app-context";
import { useLanguage } from "@/lib/contexts/language-context";
import { TypingEffect, Praghrap, CTAButtons, SocialLinks, Badge } from "@/lib/contexts/DaynamicImport"

const Page = () => {
    const { HomeData, badgeText } = useLanguage();
    const { socialLinks, hoveredIndex } = useAppContext();

    return (
        <section id="home" className="relative flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-36 max-w-7xl mx-auto space-y-12 z-10 ">
            <Badge Icon={WandSparkles} BageName={badgeText} className="mb-4" />
            <TypingEffect HomeData={HomeData} />
            <Praghrap HomeData={HomeData} />
            <CTAButtons HomeData={HomeData} />
            <SocialLinks socialLinks={socialLinks} hoveredIndex={hoveredIndex} />
        </section>
    );
}
export default Page;