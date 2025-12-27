"use client";
import AnimatedText from "@/UI/AnimatedText";
export const SectionHeading = ({ title, subtitle, tag }) => {
  return (
    <div className="relative w-full flex flex-col items-center justify-center text-center overflow-hidden px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-2xl lg:max-w-4xl animate-fadeUp">
        {/* Optional Tag/Badge */}
        {tag && (
          <span
            className="inline-block px-3 py-1 mb-3 sm:mb-4 rounded-full
              bg-fuchsia-100 dark:bg-fuchsia-900/30
              text-fuchsia-600 dark:text-fuchsia-300
              text-xs sm:text-sm font-bold tracking-widest uppercase
              animate-popIn [animation-delay:0.1s]"
          >
            {tag}
          </span>
        )}

        {/* Main Title */}
        <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-3 sm:mb-4 leading-tight animate-fadeUp [animation-delay:0.2s]">
          <span className="bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600 bg-clip-text text-transparent drop-shadow-sm">
            {title}
          </span>
        </h2>

        {/* Subtitle */}
        <div
          className="text-base xs:text-lg sm:text-xl md:text-2xl 2xl:text-3xl
            text-gray-700 dark:text-gray-300
            leading-relaxed sm:leading-loose
            font-light animate-fadeUp [animation-delay:0.3s]"
        >
          <AnimatedText text={subtitle} />
        </div>
      </div>
    </div>
  );
};

export default SectionHeading;
