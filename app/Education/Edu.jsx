"use client";
import { motion } from "framer-motion";
import { HeadIng } from "@/UI/Head";
import { EducationTimeline } from "./components/EducationTimeline";

export default function EducationSection() {
  return (
    <section 
      id="about" 
      className="max-w-4xl mx-auto min-h-screen py-20 px-4"
    >
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <HeadIng 
          Tittle="My Journey" 
          Pragaphic="A timeline of my educational milestones and achievements" 
        />
      </motion.div>

      {/* Timeline Component */}
      <EducationTimeline />
    </section>
  );
}