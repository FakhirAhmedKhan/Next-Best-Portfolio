'use client';
import { useLanguage } from "@/lib/contexts/language-context";
import { useAppContext } from "@/lib/contexts/app-context";
import { EducationTimeline, HeadIng } from '@/lib/contexts/DaynamicImport'
export default function Page() {
    const { eduTitles, eduData } = useLanguage();
    const { hoveredIndex, setHoveredIndex, iconMap } = useAppContext();
    return (
        <section id="education" className="relative flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-36 max-w-7xl mx-auto space-y-12 z-10 ">
            <HeadIng title={eduTitles.title} subtitle={eduTitles.paragraph} />
            <EducationTimeline eduData={eduData} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} iconMap={iconMap} />
        </section>
    );
}