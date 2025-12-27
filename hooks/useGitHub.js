import { useState, useEffect } from "react";
import { useAppData } from "./useAppData";
export const useGitHub = (onDataLoaded) => {
  const [calendarData, setCalendarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Enhanced color scale with modern gradient approach
  const getLevelColor = (count) => {
    if (count === 0)
      return "bg-gray-100 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50";
    if (count <= 3)
      return "bg-emerald-200 dark:bg-emerald-900/70 border border-emerald-300/50 dark:border-emerald-800/50";
    if (count <= 6)
      return "bg-emerald-400 dark:bg-emerald-700/80 border border-emerald-500/50 dark:border-emerald-600/50";
    if (count <= 9)
      return "bg-emerald-600 dark:bg-emerald-500/90 border border-emerald-700/50 dark:border-emerald-400/50";
    return "bg-emerald-800 dark:bg-emerald-300 border border-emerald-900/50 dark:border-emerald-200/50";
  };

  // Get contribution level for intensity
  const getLevel = (count) => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
  };

  // Group daily data into weeks
  const groupIntoWeeks = (days) => {
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
    return weeks;
  };

  // Get month labels for calendar
  const getMonthLabels = (weeks) => {
    const labels = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const firstDay = week[0];
      if (firstDay) {
        const month = new Date(firstDay.date).getMonth();
        if (month !== lastMonth) {
          labels.push({
            month: new Date(firstDay.date).toLocaleDateString("en-US", {
              month: "short",
            }),
            weekIndex,
          });
          lastMonth = month;
        }
      }
    });

    return labels;
  };

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await fetch("/api/github-contributions");
        const payload = await res.json();

        if (!res.ok)
          throw new Error(payload?.error || "Failed to load contributions");
        if (payload?.error) throw new Error(payload.error);

        const calendar =
          payload?.data?.user?.contributionsCollection?.contributionCalendar;
        if (!calendar) throw new Error("Invalid GitHub response");

        const flattened = calendar.weeks.flatMap((w) => w.contributionDays);
        const groupedWeeks = groupIntoWeeks(flattened);

        const transformed = {
          totalContributions: calendar.totalContributions,
          weeks: groupedWeeks,
          monthLabels: getMonthLabels(groupedWeeks),
        };

        setCalendarData(transformed);
        onDataLoaded?.(transformed);
      } catch (err) {
        console.error("GitHub data error:", err);
        setError(err.message || "Failed to load contributions");
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [onDataLoaded]);

  // Calculate statistics
  const getStats = () => {
    if (!calendarData) return null;

    const allDays = calendarData.weeks.flat();
    const contributions = allDays.map((d) => d.contributionCount);
    const maxStreak = calculateStreak(allDays);
    const avgContributions = (
      contributions.reduce((a, b) => a + b, 0) / contributions.length
    ).toFixed(1);
    const maxDay = Math.max(...contributions);

    return {
      total: calendarData.totalContributions,
      maxStreak,
      avgContributions,
      maxDay,
    };
  };

  const calculateStreak = (days) => {
    let maxStreak = 0;
    let currentStreak = 0;

    days.forEach((day) => {
      if (day.contributionCount > 0) {
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
    });

    return maxStreak;
  };

  const stats = getStats();
  const { sectionTitles } = useAppData();
  const FooterData = sectionTitles?.footer || {};
  return {
    calendarData,
    loading,
    error,
    hoveredDay,
    setHoveredDay,
    selectedYear,
    setSelectedYear,
    getLevelColor,
    getLevel,
    stats,
    FooterData,
  };
};
