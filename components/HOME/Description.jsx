"use client";
import { ReactTyped } from "react-typed";
import AnimatedText from "@/UI/AnimatedText";
const Praghrap = ({ HomeData }) => {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 mx-auto max-w-4xl 2xl:max-w-5xl text-center">
      <p
        className="
          text-base xs:text-lg sm:text-xl md:text-2xl 2xl:text-3xl 
          text-gray-700 dark:text-gray-300 
          leading-relaxed sm:leading-loose 
          font-light 
          animate-fadeUp
        "
        style={{ animationDelay: "0.6s" }}
      >
        {/* Part 3 */}
        {HomeData?.part3 && (
          <AnimatedText text={HomeData.part3} />
        )}

        {/* Typed Middle Highlight */}
        <span
          className="
            font-semibold 
            text-fuchsia-600 dark:text-fuchsia-400 
            inline-block 
            mx-1
          "
          style={{ minWidth: "14ch" }}
        >
          <ReactTyped
            strings={
              Array.isArray(HomeData?.part4)
                ? HomeData.part4
                : [HomeData?.part4 || ""]
            }
            typeSpeed={70}
            backSpeed={40}
            loop
            backDelay={1200}
            showCursor
            cursorChar="|"
          />
        </span>

        {/* Remaining Parts */}
        {HomeData?.part5 && (
          <AnimatedText text={HomeData.part5} />
        )}

        {HomeData?.part6 && (
          <AnimatedText text={HomeData.part6} />
        )}
      </p>
    </div>
  );
};

export default Praghrap;
