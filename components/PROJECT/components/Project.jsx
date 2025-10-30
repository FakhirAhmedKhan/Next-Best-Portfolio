"use client";
import { SectionSTyle } from "@/UI/motionConfige";
import { CategoryFilter } from "./CategoryFilters";
import { LoardProject } from "./LoadMoreButton";
import { ProjectView } from "./ProjectsGrid";
import { HeadIng } from "@/UI/Head";
import { useAppContext } from "@/lib/contexts/app-context";

export default function ProjectSection() {
  const { sectionTitles } = useAppContext();

  return (
    <section id="projects" className={SectionSTyle}>
      <div className="relative max-w-7xl mx-auto">
        <HeadIng Tittle={sectionTitles.project?.title} Pragaphic={sectionTitles.project?.paragraph} />

        <CategoryFilter />

        <ProjectView />

        <LoardProject />

      </div>
    </section>
  );
}
