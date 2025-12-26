"use client";
import { HeadIng, CategoryFilter, ProjectView, LoardProject, Badge } from "@/hooks/DaynamicImport";

import { useAppData } from "@/hooks/useAppData";
import { useProjects } from "@/hooks/useProjects";
import { DatabaseZapIcon } from "lucide-react";

export default function Page() {
    const { ProjectData, ProjectbadgeText } = useAppData();
    const { categories, activeCategory, changeCategory, visibleProjects, filteredProjects, showMore } = useProjects();
    const hasMore = visibleProjects.length < filteredProjects.length;

    return (
        <section id="projects" className="relative flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-36 max-w-7xl mx-auto space-y-12 z-10">
            <div className="flex justify-center items-center mb-2">
                <Badge Icon={DatabaseZapIcon} BageName={ProjectbadgeText} className="px-4 py-2 text-sm" />
            </div>
            <HeadIng title={ProjectData.title} subtitle={ProjectData.paragraph} />
            <CategoryFilter categories={categories} activeCategory={activeCategory} changeCategory={changeCategory} />
            <ProjectView ProjectData={visibleProjects} />
            <LoardProject showMore={showMore} hasMore={hasMore} />
        </section>
    )
};