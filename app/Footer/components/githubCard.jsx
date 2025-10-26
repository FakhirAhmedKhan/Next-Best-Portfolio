'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function GitHubCalendar({ onDataLoaded, data }) {
  const [calendarData, setCalendarData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch('/api/github-contributions?username=FakhirAhmedKhan');
        if (!response.ok) throw new Error('Failed to fetch contributions');
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setCalendarData(data);
        if (onDataLoaded) onDataLoaded(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load contributions');
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [onDataLoaded]);

  const getLevelColor = (level) => {
    switch (level) {
      case "NONE":
        return "bg-gray-100 dark:bg-gray-800";
      case "FIRST_QUARTILE":
        return "bg-green-200 dark:bg-green-900";
      case "SECOND_QUARTILE":
        return "bg-green-400 dark:bg-green-700";
      case "THIRD_QUARTILE":
        return "bg-green-600 dark:bg-green-500";
      case "FOURTH_QUARTILE":
        return "bg-green-800 dark:bg-green-300";
      default:
        return "bg-gray-100 dark:bg-gray-800";
    }
  };

  return (
    <section className="relative mt-5 text-center overflow-hidden">

      {loading && (
        <motion.div
          className="relative py-32 flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-20 h-20 border-4 border-fuchsia-500/30 border-t-fuchsia-500 rounded-full"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-purple-500/20 border-b-purple-500 rounded-full animate-ping"></div>
          </motion.div>
          <motion.p
            className="text-gray-300 mt-8 text-lg font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Fetching contribution data...
          </motion.p>
        </motion.div>
      )}

      {error && (
        <motion.div
          className="relative py-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mx-auto max-w-md backdrop-blur-xl bg-red-950/20 border border-red-500/30 rounded-2xl p-8">
            <div className="text-red-400 text-lg mb-4">⚠️ {error}</div>
            <button
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:from-red-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-red-500/50 font-medium"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </motion.div>
      )}

      {!loading && !error && calendarData && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto max-w-6xl"
        >
          {/* Glass Card Container */}
          <div className="backdrop-blur-2xl p-10 rounded-3xl border border-white/10 relative">
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="flex gap-1 justify-center relative pb-6 px-4">
                {calendarData.weeks.map((week, i) => (
                  <motion.div
                    key={i}
                    className="flex flex-col gap-1 "
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.01, duration: 0.3 }}
                  >
                    {week.contributionDays.map((day, j) => (
                      <motion.div
                        key={day.date}
                        className={`w-2.5 h-2.5 rounded-sm ${getLevelColor(day.contributionLevel)} relative group cursor-pointer transition-all duration-200`}
                        whileHover={{ scale: 1.4 }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.01 + j * 0.005, type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-opacity duration-200"
                          initial={false}
                        >
                          <div
                            className="bottom-full left-1/2 transform -translate-x-1/2 mb-2 
             bg-gray-800 text-white px-2 py-1.5 rounded text-xs shadow-lg 
             whitespace-nowrap z-50 pointer-events-none"
                          >
                            <div className="font-medium">
                              {day.contributionCount}{" "}
                              {day.contributionCount === 1 ? "contribution" : "contributions"}
                            </div>
                            <div className="text-gray-400 text-[10px] mt-0.5">
                              {new Date(day.date).toLocaleDateString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                          </div>

                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                ))}
              </div>

              {/* Legend */}
              <motion.div
                className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-2.5 h-2.5 rounded-sm bg-gray-100 dark:bg-gray-800"></div>
                  <div className="w-2.5 h-2.5 rounded-sm bg-green-200 dark:bg-green-900"></div>
                  <div className="w-2.5 h-2.5 rounded-sm bg-green-400 dark:bg-green-700"></div>
                  <div className="w-2.5 h-2.5 rounded-sm bg-green-600 dark:bg-green-500"></div>
                  <div className="w-2.5 h-2.5 rounded-sm bg-green-800 dark:bg-green-300"></div>
                </div>
                <span>More</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
}