import { useState, useEffect, useMemo } from "react";

export const useProjectsLogic = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const url = "https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/main/Data/projectsData.json";

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch projects: ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        setProjects(data.projects ?? []);
      } catch (err) {
        if (!mounted) return;
        setError(err);
        console.error("Error fetching projects:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...cats];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return activeCategory === "All" ? projects : projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  return {
    projects,
    categories,
    activeCategory,
    setActiveCategory,
    visibleProjects,
    setVisibleCount,
    loading,
    error,
  };
};
