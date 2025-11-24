"use client";
import { useState, useEffect } from "react";

const ProgressBar = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setWidth((scrollY / docHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-fuchsia-600 via-pink-600 to-violet-600 transition-[width] duration-100 ease-linear"
      style={{ width: `${width}%` }} />
  );
};
export default ProgressBar