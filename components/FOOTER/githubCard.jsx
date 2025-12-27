"use client";
import { useGitHub } from "@/hooks/useGitHub";
import HeadIng from "@/UI/SectionHeading";
import { LoadingState } from "./LoadingState";
import { CalendarGrid } from "./CalendarGrid";

export default function GitHubCalendar({ onDataLoaded, FooterData = {} }) {
  const {
    calendarData,
    loading,
    error,
    hoveredDay,
    setHoveredDay,
    getLevelColor,
  } = useGitHub(onDataLoaded);

  return (
    <section className="relative w-full py-2 px-2 sm:py-12 sm:px-6 lg:px-8">
      {/* <div className="mx-auto max-w-7xl"> */}
      <HeadIng title={FooterData.title} subtitle={FooterData.paragraph} />

      <LoadingState loading={loading} error={error} />

      {!loading && !error && calendarData && (
        <CalendarGrid
          calendarData={calendarData}
          getLevelColor={getLevelColor}
          hoveredDay={hoveredDay}
          setHoveredDay={setHoveredDay}
        />
      )}
      {/* </div> */}
    </section>
  );
}
