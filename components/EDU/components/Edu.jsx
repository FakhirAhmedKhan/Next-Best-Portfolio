"use client";
import { HeadIng } from "@/UI/Head";
import { EducationTimeline } from "./EducationTimeline";
import { SectionSTyle } from "@/UI/motionConfige";
import { useAppContext } from "@/lib/contexts/app-context";

export default function EducationSection() {
  const { sectionTitles } = useAppContext();

  return (
    <section id="education" className={SectionSTyle}>
      <HeadIng Tittle={sectionTitles.education?.title} Pragaphic={sectionTitles.education?.paragraph} />
      <EducationTimeline />
    </section>
  );
}