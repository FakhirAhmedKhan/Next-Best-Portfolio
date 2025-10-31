"use client";
import { SectionSTyle } from "@/UI/motionConfige";
import { CategoryFilter } from "./CategoryFilters";
import { LoardProject } from "./LoadMoreButton";
import { ProjectView } from "./ProjectsGrid";
import { HeadIng } from "@/UI/Head";
import { useLanguage } from "@/lib/contexts/language-context";
import { GrUserWorker } from "react-icons/gr";
import { Badge } from "@/UI/Badge";

export default function ProjectSection() {

  const {  badgeText, projectSectionData } = useLanguage();
  return (
    <section id="projects" className={SectionSTyle}>
      <div className="relative max-w-7xl mx-auto">
        <HeadIng Tittle={projectSectionData.title} Pragaphic={projectSectionData.paragraph} />
        <div className="flex justify-center items-center mb-6">
          <Badge Icon={GrUserWorker} BageName={badgeText} className="px-4 py-2 text-sm" />
        </div>
        <CategoryFilter />

        <ProjectView />

        <LoardProject />

      </div>
    </section>
  );
}
