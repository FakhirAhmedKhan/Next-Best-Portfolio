import { useState, useEffect } from "react";

export const useLogic = () => {
  const [skills, setSkills] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/main/Data/skillsIcons.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const skillsData = data.skills || [];
        setSkills(skillsData);
      })
      .catch((err) => {
        console.error("Error fetching skills:", err);
      });
  }, []);

  // ✅ Must return data so your UI can use it
  return {
    skills,
    hoveredIndex,
    setHoveredIndex,
  };
};
