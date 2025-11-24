"use client";
import { AnimatedText } from "@/UI/AnimatedText";
import { ReactTyped } from "react-typed";

const Praghrap = ({ HomeData }) => {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <span
        className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-light animate-fadeUp"
        style={{ animationDelay: "0.6s" }}
      >
        {HomeData.part3 && <AnimatedText text={HomeData.part3} />}

        <span
          className="font-semibold text-fuchsia-600 dark:text-fuchsia-400 inline-block"
          style={{ minWidth: "18ch" }}
        >
          <ReactTyped
            strings={Array.isArray(HomeData.part4) ? HomeData.part4 : [HomeData.part4]}
            typeSpeed={80}
            backSpeed={40}
            loop
            backDelay={1500}
            showCursor
            cursorChar="|"
          />
        </span>

        {HomeData.part5 && <AnimatedText text={HomeData.part5} />}
        {HomeData.part6 && <AnimatedText text={HomeData.part6} />}
      </span>
    </div>
  );
};

export default Praghrap;
