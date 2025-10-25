import { CategoryFilter } from "./components/CategoryFilters";
import { LoardProject } from "./components/LoadMoreButton";
import { ProjectView } from "./components/ProjectsGrid";
import { HeadIng } from "@/UI/Head";

export default function ProjectSection() {

  return (
    <section
      id="projects"
      className="relative min-h-screen py-20 px-4 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto">
        <HeadIng Tittle="Did you See" Pragaphic=" Explore my latest projects showcasing creativity, innovation, and technical expertis" />

        <CategoryFilter />

        <ProjectView />

        <LoardProject />

      </div>
    </section>
  );
}
