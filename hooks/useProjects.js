"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useAppData } from "./useAppData";

export function useProjects() {
  const { projects, loading } = useAppData();

  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(3);

  const categories = useMemo(() => {
    if (!projects?.length) return ["All"];
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...unique.sort()];
  }, [projects]);

  useEffect(() => {
    if (projects.length) {
      const hasSAAS = projects.some((p) => p.category === "SAAS");
      setActiveCategory(hasSAAS ? "SAAS" : "All");
    }
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const visibleProjects = useMemo(
    () => filteredProjects.slice(0, visibleCount),
    [filteredProjects, visibleCount]
  );

  const showMore = useCallback(() => setVisibleCount((p) => p + 3), []);
  const changeCategory = useCallback((cat) => {
    setActiveCategory(cat);
    setVisibleCount(3);
  }, []);

  const hasMore = visibleProjects.length < filteredProjects.length;

  return {
    loading,
    projects,
    activeCategory,
    categories,
    filteredProjects,
    visibleProjects,
    showMore,
    changeCategory,
    hasMore,
  };
}
