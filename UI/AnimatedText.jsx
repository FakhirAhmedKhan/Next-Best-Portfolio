"use client";
import { useState, useEffect, useMemo } from "react";

 const AnimatedText = ({ text = "" }) => {
  const [isScrolling, setIsScrolling] = useState(false);

  // Detect if text contains Arabic
  const isArabic = /[\u0600-\u06FF]/.test(text);

  const characters = useMemo(() => {
    try {
      if (typeof Intl !== "undefined" && Intl.Segmenter) {

        // ⭐ If Arabic → segment into words (keeps letters connected)
        if (isArabic) {
          const segmenter = new Intl.Segmenter("ar", { granularity: "word" });
          return [...segmenter.segment(text)].map((s) => s.segment);
        }

        // ⭐ If NOT Arabic → segment into graphemes (letter-by-letter)
        const segmenter = new Intl.Segmenter([], { granularity: "grapheme" });
        return [...segmenter.segment(text)].map((s) => s.segment);
      }
    } catch (err) {
      console.warn("Segmenter failed, using fallback:", err);
    }

    // Fallback (not perfect for Arabic, but safe for English)
    return Array.from(text);
  }, [text, isArabic]);

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
    <div dir="auto" className="inline-block whitespace-pre mt-2 mb-1.5">
      {characters.map((char, index) => (
        <span
          key={index}
          className={`
            inline-block cursor-pointer transition-all duration-300 ease-in-out
            ${
              !isScrolling && char.trim() !== ""
                ? "hover:-translate-y-2 hover:scale-110 hover:text-sky-400 hover:brightness-125"
                : ""
            }
          `}
          style={{
            textShadow:
              !isScrolling && char.trim() !== ""
                ? "0 2px 10px rgba(96,165,250,0.4)"
                : "none",
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};
export default AnimatedText;