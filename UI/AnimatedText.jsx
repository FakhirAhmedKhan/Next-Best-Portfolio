import React, { useState, useEffect } from "react";

export const AnimatedText = ({ text }) => {
  const characters = (text || "").split("");
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="inline-block">
      {characters.map((char, index) => (
        <span
          key={index}
          className={`inline-block cursor-pointer transition-all duration-300 ease-in-out 
          ${!isScrolling && char !== " " ? "hover:-translate-y-2 hover:scale-110 hover:text-sky-400 hover:brightness-125" : ""}
          `}
          style={{
            display: char === " " ? "inline" : "inline-block",
            textShadow: !isScrolling && char !== " " ? "0 2px 10px rgba(96,165,250,0.4)" : "none",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};
