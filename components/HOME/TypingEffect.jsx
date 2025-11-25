"use client";
import { useState, useEffect } from "react";
import { ReactTyped } from "react-typed";

const TypingEffect = ({ HomeData }) => {
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Delay second line based on first line length
  const firstLineDelay = ((HomeData?.part1?.length || 0) * 80) + 200;

  useEffect(() => {
    const timer = setTimeout(() => setShowSecondLine(true), firstLineDelay);
    return () => clearTimeout(timer);
  }, [firstLineDelay]);

  return (
    <div
      className="
        w-full max-w-7xl 2xl:max-w-[1800px] mx-auto 
        px-4 sm:px-6 md:px-8 lg:px-12
        py-4 sm:py-6 md:py-8 
        space-y-4 sm:space-y-6 md:space-y-8 
        animate-fadeInScale
      "
      style={{ animationDelay: "0.2s" }}
    >
      <h1
        className="
          font-bold leading-tight
          text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl
        "
      >
        {/* FIRST LINE */}
        <div className="mb-2 xs:mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-gray-800 dark:text-gray-100">
          <ReactTyped
            strings={[HomeData?.part1 || "Welcome to"]}
            typeSpeed={80}
            showCursor={true}
            cursorChar="|"
            fadeOut={true}
            fadeOutDelay={500}
          />
        </div>

        {/* SECOND LINE */}
        <div
          className="relative inline-block group w-full sm:w-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            opacity: showSecondLine ? 1 : 0,
            transform: showSecondLine ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          {/* MAIN GRADIENT GLOW */}
          <div
            className="
              absolute 
              -inset-2 xs:-inset-3 sm:-inset-4 md:-inset-5 lg:-inset-7 
              rounded-[1.2rem] sm:rounded-2xl 
              bg-gradient-to-r from-fuchsia-400 via-pink-400 to-violet-400
              blur-lg xs:blur-xl sm:blur-2xl md:blur-3xl
              opacity-30 xs:opacity-40 sm:opacity-50 
              transition-all duration-500 
              group-hover:opacity-60
              animate-pulse
            "
            style={{ transform: isHovered ? "scale(1.06)" : "scale(1)" }}
          ></div>

          {/* SOFT SECONDARY GLOW */}
          <div
            className="
              absolute 
              -inset-1 xs:-inset-2 sm:-inset-3 
              bg-gradient-to-r from-pink-300 via-violet-300 to-fuchsia-300
              rounded-xl 
              blur-md xs:blur-lg sm:blur-xl md:blur-2xl 
              opacity-10 xs:opacity-20 sm:opacity-25 
              transition-opacity duration-500 
              group-hover:opacity-40
            "
          ></div>

          {/* GRADIENT TEXT */}
          <span className="relative inline-block break-words">
            <span
              className="
                bg-gradient-to-r from-fuchsia-500 via-pink-500 to-violet-500 
                bg-clip-text text-transparent 
                font-extrabold tracking-tight 
                transition-all duration-300 
                drop-shadow-sm group-hover:drop-shadow-md
              "
            >
              <ReactTyped
                strings={[HomeData?.part2 || "Amazing Experience"]}
                typeSpeed={100}
                showCursor={true}
                cursorChar="|"
              />
            </span>

            {/* UNDERLINE */}
            <div
              className="
                absolute 
                -bottom-1 xs:-bottom-1.5 sm:-bottom-2 
                left-0 
                h-0.5 xs:h-1 
                bg-gradient-to-r from-fuchsia-500 via-pink-500 to-violet-500
                rounded-full 
                transition-all duration-500
              "
              style={{
                width: isHovered ? "100%" : "0%",
                opacity: isHovered ? 0.6 : 0,
              }}
            ></div>
          </span>
        </div>
      </h1>

      {/* FLOATING PARTICLES */}
      <div className="relative h-0 overflow-visible pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="
              absolute 
              w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 
              rounded-full 
              bg-gradient-to-r from-fuchsia-400 to-pink-400 
              opacity-0 animate-float
            "
            style={{
              left: `${20 + i * 30}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: "4s",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TypingEffect;
