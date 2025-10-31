"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GitHubCalendar({ onDataLoaded }) {
  const [calendarData, setCalendarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GITHUB_USERNAME = "FakhirAhmedKhan";

  // 🧠 Color scale for contribution levels
  const getLevelColor = (level) => {
    const colors = [
      "bg-gray-200 dark:bg-gray-800",
      "bg-green-300 dark:bg-green-900",
      "bg-green-500 dark:bg-green-700",
      "bg-green-600 dark:bg-green-500",
      "bg-green-800 dark:bg-green-300",
    ];
    return colors[level] || colors[0];
  };

  // 🗓️ Group daily data into weeks
  const groupIntoWeeks = (days) => {
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
    return weeks;
  };

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
        if (!token) throw new Error("Missing GitHub token in environment variables");

        const query = `
          query {
            user(login: "${GITHUB_USERNAME}") {
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      color
                    }
                  }
                }
              }
            }
          }`;

        const res = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query }),
        });

        const { data, errors } = await res.json();
        if (errors) throw new Error(errors[0].message);

        const calendar =
          data?.user?.contributionsCollection?.contributionCalendar;
        if (!calendar) throw new Error("Invalid GitHub response");

        const flattened = calendar.weeks.flatMap((w) => w.contributionDays);
        const groupedWeeks = groupIntoWeeks(flattened);

        const transformed = {
          totalContributions: calendar.totalContributions,
          weeks: groupedWeeks,
        };

        setCalendarData(transformed);
        onDataLoaded?.(transformed);
      } catch (err) {
        console.error("GitHub GraphQL error:", err);
        setError(err.message || "Failed to load contributions");
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [onDataLoaded]);

  // ──────────────────────────────── UI ────────────────────────────────
  return (
    <section className="relative mt-10 text-center ">
      {loading && (
        <motion.div
          className="py-32 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <div className="w-16 h-16 border-4 border-fuchsia-400/30 border-t-fuchsia-500 rounded-full"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-purple-400/20 border-b-purple-500 rounded-full animate-ping"></div>
          </motion.div>
          <p className="text-gray-400 mt-8 text-lg font-medium">
            Fetching GitHub contributions...
          </p>
        </motion.div>
      )}

      {error && !loading && (
        <div className="py-16">
          <div className="mx-auto max-w-md backdrop-blur-xl bg-red-950/20 border border-red-500/30 rounded-2xl p-8">
            <div className="text-red-400 text-lg mb-4">⚠️ {error}</div>
          </div>
        </div>
      )}

      {!loading && !error && calendarData && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto max-w-6xl"
        >
          <div className="p-10 rounded-3xl bg-blur backdrop-blur-xl border border-gray-200/10">
            <div className="flex gap-1 justify-center pb-6 px-4">
              {calendarData.weeks.map((week, i) => (
                <div key={i} className="flex flex-col gap-1">
                  {week.map((day, j) => (
                    <motion.div
                      key={day.date}
                      className={`w-2.5 h-2.5 rounded-sm ${getLevelColor(
                        (day.contributionCount)
                      )} relative group cursor-pointer transition-all duration-200`}
                      whileHover={{ scale: 1.4 }}
                    >
                      <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-opacity duration-200">
                        <div className="bg-gray-800 text-white px-2 py-1.5 rounded text-xs shadow-lg whitespace-nowrap">
                          <div className="font-medium">
                            {day.contributionCount}{" "}
                            {day.contributionCount === 1
                              ? "contribution"
                              : "contributions"}
                          </div>
                          <div className="text-gray-400 text-[10px] mt-0.5">
                            {new Date(day.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 rounded-sm bg-gray-200 dark:bg-gray-800"></div>
                <div className="w-2.5 h-2.5 rounded-sm bg-green-300 dark:bg-green-900"></div>
                <div className="w-2.5 h-2.5 rounded-sm bg-green-500 dark:bg-green-700"></div>
                <div className="w-2.5 h-2.5 rounded-sm bg-green-600 dark:bg-green-500"></div>
                <div className="w-2.5 h-2.5 rounded-sm bg-green-800 dark:bg-green-300"></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}