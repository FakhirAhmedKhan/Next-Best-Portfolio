"use client";
import { AnimatedText } from "@/UI/AnimatedText";

export const HeadIng = ({ Tittle, Pragaphic }) => {
  return (
    <div
      className="text-center mb-16 opacity-0 translate-y-10 animate-fadeUp"
    >
      <div
        className="inline-block mb-4 scale-0 animate-scaleIn"
      ></div>

      <h2 className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-fuchsia-600 via-pink-600 to-violet-600 bg-clip-text text-transparent mb-6">
        {Tittle}
      </h2>

      <span className="text-2xl text-gray-600 dark:text-gray-400 mx-auto">
        <AnimatedText text={Pragaphic} />
      </span>
    </div>
  );
};
