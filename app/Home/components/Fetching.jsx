"use client";
import { useEffect, useState } from "react";

export const useHomeData = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/refs/heads/main/Data/socialLinks.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const links = data.socialLinks || [];
        setSocialLinks(links);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching socialLinks:", err);
        setLoading(false);
      });
  }, []);

  // ✅ You must return something here
  return { socialLinks, loading };
};
