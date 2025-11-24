'use client';
import { HeadIng } from "@/UI/Head";
import { SectionSTyle } from "@/UI/motionConfige";
import { EducationTimeline } from "./EducationTimeline";
import { useLanguage } from "@/lib/contexts/language-context";

export default function EducationSection() { // ✅ prevent crash

  const { data } = useLanguage();
  const eduData = data.sectionTitles.education;
  return (
    <section id="education" className={SectionSTyle}>
      <HeadIng
        Tittle={eduData.title || "My Journey"}
        Pragaphic={eduData.paragraph || "A timeline of my educational milestones and achievements"}
      />
      <EducationTimeline />
    </section>
  );
}
