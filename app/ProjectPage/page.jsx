"use client";
import { HeadIng, CategoryFilter, ProjectView, LoardProject } from "@/lib/contexts/DaynamicImport";
import { useAppContext } from "@/lib/contexts/app-context";
import { useLanguage } from "@/lib/contexts/language-context";

export default function Page() {
    const { ProjectData } = useLanguage();
    const { categories, activeCategory, changeCategory, visibleProjects, filteredProjects, showMore } = useAppContext();
    const hasMore = visibleProjects.length < filteredProjects.length;

    return (
        <section id="projects" className="relative flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-36 max-w-7xl mx-auto space-y-12 z-10">
            <HeadIng title={ProjectData.title} subtitle={ProjectData.paragraph} />
            <CategoryFilter categories={categories} activeCategory={activeCategory} changeCategory={changeCategory} />
            <ProjectView ProjectData={visibleProjects} />
            <LoardProject showMore={showMore} hasMore={hasMore} />
        </section>
    )
};