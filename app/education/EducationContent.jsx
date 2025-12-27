"use client";
import { useEducation } from "@/hooks/useEducation";
import EducationTimeline from "@/components/EDU/EducationTimeline";

export default function EducationContent({ eduData }) {
    const { hoveredIndex, setHoveredIndex, iconMap } = useEducation();
    return <EducationTimeline eduData={eduData} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} iconMap={iconMap} />;
}
