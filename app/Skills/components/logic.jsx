"use client";
import { useState, useEffect } from "react";

export const useSkillsLogic = () => {
  const [skills, setSkills] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const url = "https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/main/Data/skillsIcons.json";

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch skills: ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        setSkills(data.skills ?? []);
      } catch (err) {
        if (!mounted) return;
        setError(err);
        console.error("Error fetching skills:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { skills, hoveredIndex, setHoveredIndex, loading, error };
};