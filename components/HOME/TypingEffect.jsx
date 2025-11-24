"use client"
import { useState, useEffect } from 'react';
import { ReactTyped } from "react-typed";

const TypingEffect = ({ HomeData }) => {
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate delay for second line based on first line length
  const firstLineDelay = ((HomeData?.part1?.length || 0) * 80) + 200;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondLine(true);
    }, firstLineDelay);

    return () => clearTimeout(timer);
  }, [firstLineDelay]);

  return (
    <div className="space-y-6 animate-fadeInScale px-4 sm:px-0" style={{ animationDelay: "0.2s" }}>
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
        {/* First Line */}
        <div className="mb-4 text-gray-800 dark:text-gray-100 transition-all duration-300">
          <ReactTyped
            strings={[HomeData?.part1 || "Welcome to"]}
            typeSpeed={80}
            showCursor={true}
            cursorChar="|"
            fadeOut={true}
            fadeOutDelay={500}
          />
        </div>

        {/* Second Line - Enhanced with better gradient and animation */}
        <div
          className="relative inline-block group transition-transform duration-300 ease-out"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            opacity: showSecondLine ? 1 : 0,
            transform: showSecondLine ? 'translateY(0)' : 'translateY(10px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}
        >
          {/* Animated gradient background blur */}
          <div
            className="absolute -inset-6 bg-linear-to-r from-fuchsia-400 via-pink-400 to-violet-400 rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-all duration-500 animate-pulse"
            style={{
              animationDuration: '3s',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          />

          {/* Secondary glow effect */}
          <div
            className="absolute -inset-4 bg-linear-to-r from-pink-300 via-violet-300 to-fuchsia-300 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          />

          {/* Text with gradient */}
          <span className="relative inline-block">
            <span
              className="bg-linear-to-r from-fuchsia-500 via-pink-500 to-violet-500 bg-clip-text text-transparent font-extrabold tracking-tight drop-shadow-sm transition-all duration-300 group-hover:drop-shadow-md"
              style={{
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              <ReactTyped
                strings={[HomeData?.part2 || "Amazing Experience"]}
                typeSpeed={100}
                showCursor={true}
                cursorChar="|"
                loop={false}
                startDelay={0}
              />
            </span>

            {/* Subtle underline decoration */}
            <div
              className="absolute -bottom-2 left-0 h-1 bg-linear-to-r from-fuchsia-500 via-pink-500 to-violet-500 rounded-full transition-all duration-500 group-hover:h-1.5"
              style={{
                width: isHovered ? '100%' : '0%',
                opacity: isHovered ? 0.6 : 0
              }}
            />
          </span>
        </div>
      </h1>

      {/* Optional: Floating particles effect */}
      <div className="relative h-0 overflow-visible pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-linear-to-r from-fuchsia-400 to-pink-400 rounded-full opacity-0 animate-float"
            style={{
              left: `${20 + i * 30}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TypingEffect