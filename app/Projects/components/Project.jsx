import { SectionSTyle } from "@/UI/motionConfige";
import { CategoryFilter } from "./CategoryFilters";
import { LoardProject } from "./LoadMoreButton";
import { ProjectView } from "./ProjectsGrid";
import { HeadIng } from "@/UI/Head";

export default function ProjectSection() {

  return (
    <section id="projects" className={SectionSTyle}>
      <div className="relative max-w-7xl mx-auto">
        <HeadIng Tittle="Did you See" Pragaphic=" Explore my latest projects showcasing creativity, innovation, and technical expertis" />

        <CategoryFilter />

        <ProjectView />

        <LoardProject />

      </div>
    </section>
  );
}
