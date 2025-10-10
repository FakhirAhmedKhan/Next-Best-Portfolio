"use client";

import { useLogic } from "./components/logic";
import { CategoryFilters } from "./components/CategoryFilters";
import { Animated } from "./components/Animated";
import { Header } from "./components/Header";
import { ProjectsGrid } from "./components/ProjectsGrid";
import { LoadMoreButton } from "./components/LoadMoreButton";

export default function ProjectSection() {
  const {
    projects,
    categories,
    activeCategory,
    setActiveCategory,
    visibleProjects,
    setVisibleCount,
  } = useLogic();

  return (
    <section
      id="projects"
      className="relative min-h-screen py-20 px-4 overflow-hidden"
    >
      <Animated />
      <div className="relative max-w-7xl mx-auto">
        <Header />
        <CategoryFilters
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          setVisibleCount={setVisibleCount}
        />

        <ProjectsGrid projects={visibleProjects} />
        <LoadMoreButton
          hasMore={visibleProjects.length < projects.length}
          onLoadMore={() => setVisibleCount((v) => v + 3)}
        />

      </div>
    </section>
  );
}
