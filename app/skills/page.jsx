import { Zap } from "lucide-react";
import HeadIng from "@/UI/SectionHeading";
import Badge from "@/UI/Badge";
import Card from "@/components/SKILLS/SkillsGrid";
import Bottomdecoration from "@/components/SKILLS/Bottomdecoration";
import { getPageData } from "@/lib/data";

export default async function Page() {
    const [sectionTitles, pageNameData, skills] = await Promise.all([
        getPageData('en', 'sectionTitles'),
        getPageData('en', 'pageName'),
        getPageData('en', 'skills')
    ]);

    const SkillData = sectionTitles?.skillsSection ?? {};
    const SkillbadgeText = pageNameData?.SkillBade ?? "";

    return (
        <section id="skills" className="relative flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-36 max-w-7xl mx-auto space-y-10 z-10 ">
            <HeadIng title={SkillData.title} subtitle={SkillData.paragraph} />
            <div className="flex justify-center items-center mb-2">
                <Badge Icon={<Zap />} BageName={SkillbadgeText} className="px-4 py-2 text-sm" />
            </div>
            <Card skills={skills} />
            <Bottomdecoration />
        </section >
    );
}