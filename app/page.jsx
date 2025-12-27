'use client';
import { WandSparkles } from "lucide-react";
import { useAppData } from "@/hooks/useAppData";
import { useSocialLinks } from "@/hooks/useSocialLinks";
import Badge from "@/UI/Badge";
import TypingEffect from "@/components/HOME/TypingEffect";
import Praghrap from "@/components/HOME/Description";
import CTAButtons from "@/components/HOME/CTAButtons";
import SocialLinks from "@/components/HOME/socialLinks";

const Page = () => {

    const { HomeData, badgeText } = useAppData();

    const { socialLinks, hoveredIndex, setHoveredIndex } = useSocialLinks();

    return (
        <section id="home" className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 lg:py-20 2xl:py-24 max-w-6xl 2xl:max-w-[1500px] mx-auto space-y-6 2xl:space-y-10 z-10">
            <Badge Icon={WandSparkles} BageName={badgeText} className="mb-4" />
            <TypingEffect HomeData={HomeData} />
            <Praghrap HomeData={HomeData} />
            <CTAButtons HomeData={HomeData} />
            <SocialLinks socialLinks={socialLinks} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
        </section >
    );
}
export default Page;
