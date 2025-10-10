import { useState, useEffect, useMemo } from "react";

export const useLogic = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/main/Data/projectsData.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const projectData = data.projects || [];
        setProjects(projectData);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
      });
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ["All", ...cats];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  return {
    categories,
    activeCategory,
    setActiveCategory,
    visibleProjects,
    setVisibleCount,
  };
};
