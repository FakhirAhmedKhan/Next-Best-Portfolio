"use client";
import { useState, useEffect } from "react";

export const useSkillsLogic = () => {
  const [skills, setSkills] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/main/Data/skillsIcons.json")
      .then((res) => res.json())
      .then((data) => {
        setSkills(data.skills || []);
      })
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  return { skills, hoveredIndex, setHoveredIndex };
};