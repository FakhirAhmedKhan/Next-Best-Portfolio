"use client";
import { HeadIng } from "@/UI/Head";
import { EducationTimeline } from "./EducationTimeline";
import { SectionSTyle } from "@/UI/motionConfige";

export default function EducationSection() {
  return (
    <section id="about" className={SectionSTyle}>

      <HeadIng Tittle="My Journey" Pragaphic="A timeline of my educational milestones and achievements" />

      <EducationTimeline />
    </section>
  );
}