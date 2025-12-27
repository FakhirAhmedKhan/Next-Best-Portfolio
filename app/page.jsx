import { WandSparkles } from "lucide-react";
import Badge from "@/UI/Badge";
import TypingEffect from "@/components/HOME/TypingEffect";
import Paragraph from "@/components/HOME/Description";
import CTAButtons from "@/components/HOME/CTAButtons";
import SocialLinks from "@/components/HOME/socialLinks";
import { getPageData } from "@/lib/data";

export default async function Page() {
    const [sectionTitles, pageNameData, socialLinks] = await Promise.all([
        getPageData('en', 'sectionTitles'),
        getPageData('en', 'pageName'),
        getPageData('en', 'socialLinks')
    ]);

    const HomeData = sectionTitles?.home ?? {};
    const badgeText = pageNameData?.HomeBage ?? "";

    return (
        <section id="home" className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 lg:py-20 2xl:py-24 max-w-6xl 2xl:max-w-[1500px] mx-auto space-y-6 2xl:space-y-10 z-10">
            <Badge Icon={<WandSparkles />} BageName={badgeText} className="mb-4" />
            <TypingEffect HomeData={HomeData} />
            <Paragraph HomeData={HomeData} />
            <CTAButtons HomeData={HomeData} />
            <SocialLinks socialLinks={socialLinks} />
        </section >
    );
}
