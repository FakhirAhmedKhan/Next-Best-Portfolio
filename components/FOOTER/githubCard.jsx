"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Flame, Target, Trophy } from "lucide-react";
import { HeadIng } from "@/hooks/DaynamicImport";
import { useAppData } from "@/hooks/useAppData";

export default function GitHubCalendar({ onDataLoaded }) {
  const [calendarData, setCalendarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Enhanced color scale with modern gradient approach
  const getLevelColor = (count) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50";
    if (count <= 3) return "bg-emerald-200 dark:bg-emerald-900/70 border border-emerald-300/50 dark:border-emerald-800/50";
    if (count <= 6) return "bg-emerald-400 dark:bg-emerald-700/80 border border-emerald-500/50 dark:border-emerald-600/50";
    if (count <= 9) return "bg-emerald-600 dark:bg-emerald-500/90 border border-emerald-700/50 dark:border-emerald-400/50";
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
            month: new Date(firstDay.date).toLocaleDateString('en-US', { month: 'short' }),
            weekIndex
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

        if (!res.ok) throw new Error(payload?.error || "Failed to load contributions");
        if (payload?.error) throw new Error(payload.error);

        const calendar = payload?.data?.user?.contributionsCollection?.contributionCalendar;
        if (!calendar) throw new Error("Invalid GitHub response");

        const flattened = calendar.weeks.flatMap((w) => w.contributionDays);
        const groupedWeeks = groupIntoWeeks(flattened);

        const transformed = {
          totalContributions: calendar.totalContributions,
          weeks: groupedWeeks,
          monthLabels: getMonthLabels(groupedWeeks)
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
    const contributions = allDays.map(d => d.contributionCount);
    const maxStreak = calculateStreak(allDays);
    const avgContributions = (contributions.reduce((a, b) => a + b, 0) / contributions.length).toFixed(1);
    const maxDay = Math.max(...contributions);

    return {
      total: calendarData.totalContributions,
      maxStreak,
      avgContributions,
      maxDay
    };
  };

  const calculateStreak = (days) => {
    let maxStreak = 0;
    let currentStreak = 0;

    days.forEach(day => {
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
  // UI Components
  return (
    <section className="relative w-full py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <HeadIng title={FooterData.title} subtitle={FooterData.paragraph} />


        {/* Loading State */}
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 sm:py-32 flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-emerald-400/30 border-t-emerald-500 rounded-full"></div>
                <motion.div
                  className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-teal-400/20 border-b-teal-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
              </motion.div>
              <p className="text-gray-500 dark:text-gray-400 mt-6 sm:mt-8 text-base sm:text-lg font-medium">
                Fetching GitHub contributions...
              </p>
            </motion.div>
          )}

          {/* Error State */}
          {error && !loading && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-12 sm:py-16"
            >
              <div className="mx-auto max-w-md backdrop-blur-xl bg-red-50/80 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-500/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
                <div className="text-5xl sm:text-6xl mb-4">⚠️</div>
                <div className="text-red-600 dark:text-red-400 text-base sm:text-lg font-medium mb-2">
                  Unable to load contributions
                </div>
                <div className="text-red-500/70 dark:text-red-400/70 text-sm">
                  {error}
                </div>
              </div>
            </motion.div>
          )}

          {/* Calendar View */}
          {!loading && !error && calendarData && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Stats Cards */}
              {stats && (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  {[
                    { label: "Total", value: stats.total, Icon: Trophy, color: "emerald" },
                    { label: "Longest Streak", value: `${stats.maxStreak} days`, Icon: Flame, color: "orange" },
                    { label: "Daily Average", value: stats.avgContributions, Icon: Activity, color: "blue" },
                    { label: "Best Day", value: stats.maxDay, Icon: Target, color: "purple" }
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 dark:from-gray-800/80 dark:to-gray-900/40 rounded-xl sm:rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative backdrop-blur-xl bg-white/60 dark:bg-gray-800/60 border border-gray-200/50 dark:border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:scale-105 transition-transform duration-300">
                        <div className="text-2xl sm:text-3xl mb-2 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                          {stat.Icon ? <stat.Icon className="w-6 h-6" aria-hidden="true" /> : null}
                        </div>
                        <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Calendar Grid */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 dark:from-emerald-500/10 dark:via-teal-500/10 dark:to-cyan-500/10 rounded-2xl sm:rounded-3xl blur-3xl"></div>
                <div className="relative backdrop-blur-2xl bg-white/70 dark:bg-gray-900/70 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 shadow-2xl overflow-x-auto">

                  {/* Month Labels */}
                  <div className="flex gap-[3px] sm:gap-1 justify-start mb-2 sm:mb-3 pl-8 sm:pl-10 min-w-max">
                    {calendarData.monthLabels.map((label, i) => {
                      const prevWeekIndex = i === 0 ? 0 : calendarData.monthLabels[i - 1]?.weekIndex || 0;
                      const weekDiff = label.weekIndex - prevWeekIndex;
                      // Responsive spacing: smaller on mobile, larger on desktop
                      const spacing = `calc(${weekDiff} * (10px + 3px))`;
                      const spacingSm = `calc(${weekDiff} * (12px + 4px))`;
                      const spacingLg = `calc(${weekDiff} * (14px + 4px))`;

                      return (
                        <div
                          key={i}
                          style={{
                            marginLeft: i === 0 ? 0 : spacing,
                          }}
                          className="text-[10px] sm:text-xs font-medium text-gray-600 dark:text-gray-400"
                        >
                          {label.month}
                        </div>
                      );
                    })}
                  </div>

                  {/* Day Labels */}
                  <div className="flex gap-1 sm:gap-2">
                    <div className="flex flex-col gap-[3px] sm:gap-1 justify-start text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 font-medium pr-1 sm:pr-2 w-6 sm:w-8">
                      <div className="h-[10px] sm:h-3 lg:h-3.5"></div>
                      <div>Mon</div>
                      <div className="h-[10px] sm:h-3 lg:h-3.5"></div>
                      <div>Wed</div>
                      <div className="h-[10px] sm:h-3 lg:h-3.5"></div>
                      <div>Fri</div>
                      <div className="h-[10px] sm:h-3 lg:h-3.5"></div>
                    </div>

                    {/* Calendar Grid */}
                    <div className="flex gap-[3px] sm:gap-1 min-w-max">
                      {calendarData.weeks.map((week, weekIdx) => (
                        <div key={weekIdx} className="flex flex-col gap-[3px] sm:gap-1">
                          {week.map((day, dayIdx) => (
                            <motion.div
                              key={`${day.date}-${dayIdx}`}
                              className={`w-[10px] h-[10px] sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 rounded-sm ${getLevelColor(
                                day.contributionCount
                              )} relative cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-emerald-500 dark:hover:ring-emerald-400 hover:z-10`}
                              whileHover={{ scale: 1.5 }}
                              onHoverStart={() => setHoveredDay(day)}
                              onHoverEnd={() => setHoveredDay(null)}
                            >
                              {/* Tooltip */}
                              <AnimatePresence>
                                {hoveredDay?.date === day.date && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 pointer-events-none z-50"
                                  >
                                    <div className="bg-gray-900 dark:bg-gray-800 text-white px-3 py-2 rounded-lg text-xs shadow-2xl whitespace-nowrap border border-gray-700">
                                      <div className="font-bold text-emerald-400">
                                        {day.contributionCount}{" "}
                                        {day.contributionCount === 1 ? "contribution" : "contributions"}
                                      </div>
                                      <div className="text-gray-400 text-[10px] mt-1">
                                        {new Date(day.date).toLocaleDateString("en-US", {
                                          weekday: "long",
                                          month: "short",
                                          day: "numeric",
                                          year: "numeric"
                                        })}
                                      </div>
                                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                                        <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-6 sm:mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                      Contribution activity
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="hidden sm:inline">Less</span>
                      <div className="flex gap-1">
                        {[0, 1, 2, 3, 4].map(level => (
                          <div
                            key={level}
                            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-sm ${getLevelColor(level * 3)}`}
                          ></div>
                        ))}
                      </div>
                      <span className="hidden sm:inline">More</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}


