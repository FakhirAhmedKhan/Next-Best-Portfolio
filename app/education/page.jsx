import { FaBookReader } from "react-icons/fa";
import { useEducation } from "@/hooks/useEducation";
import EducationTimeline from "@/components/EDU/EducationTimeline";
import HeadIng from "@/UI/SectionHeading";
import Badge from "@/UI/Badge";
import { getPageData } from "@/lib/data";

// Since useEducation returns iconMap and state (which we want to leave to client component),
// but here Page is Server Component. 
// We need to move useEducation hook into a Client wrapper if we can't separate it.
// Wait, useEducation returns hoveredIndex. This is passed to EducationTimeline.
// EducationTimeline is a client component usually? No, it's imported.
// In original: `EducationTimeline` received `hoveredIndex`.
// I need `EducationContent` client wrapper to use `useEducation`.

import EducationContent from "./EducationContent";

export default async function Page() {
    const [sectionTitles, pageNameData, eduData] = await Promise.all([
        getPageData('en', 'sectionTitles'),
        getPageData('en', 'pageName'),
        getPageData('en', 'education')
    ]);

    const eduTitles = sectionTitles?.education ?? {};
    const EdubadgeText = pageNameData?.EduBade ?? "";

    return (
        <section id="education" className="relative flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-36 max-w-7xl mx-auto space-y-12 z-10 ">
            <div className="flex justify-center items-center mb-2">
                <Badge Icon={<FaBookReader />} BageName={EdubadgeText} className="px-4 py-2 text-sm" />
            </div>
            <HeadIng title={eduTitles.title} subtitle={eduTitles.paragraph} />
            <EducationContent eduData={eduData} />
        </section>
    );
}
