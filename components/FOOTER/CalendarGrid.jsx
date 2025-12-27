"use client";
import { AnimatePresence, motion } from "framer-motion";

export const CalendarGrid = ({
    calendarData,
    getLevelColor,
    hoveredDay,
    setHoveredDay,
}) => {
    if (!calendarData) return null;

    return (
        <div className="relative overflow-hidden">
            {/* glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 dark:from-emerald-500/10 dark:via-teal-500/10 dark:to-cyan-500/10 rounded-xl blur-2xl" />

            {/* scroll container */}
            <div className="relative no-scrollbar backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-gray-200/40 dark:border-gray-700/40 rounded-xl p-3 sm:p-4 shadow-xl overflow-x-hidden overflow-y-hidden">

                {/* Month labels */}
                <div className="flex text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3 ml-22 min-w-max">
                    {calendarData.monthLabels.map((label, i) => {
                        const prev = calendarData.monthLabels[i - 1]?.weekIndex ?? 0;
                        const diff = label.weekIndex - prev;

                        // responsive size per week step:
                        // mobile ~6px, desktop max ~14px
                        const step = "clamp(6px, 1vw, 14px)";

                        return (
                            <div
                                key={i}
                                style={{
                                    marginLeft: i === 0 ? 0 : `calc(${diff} * ${step})`,
                                }}
                                className="shrink-0"
                            >
                                {label.month}
                            </div>
                        );
                    })}
                </div>


                <div className="flex gap-1">
                    {/* Day labels */}
                    <div className="flex flex-col text-[10px] text-gray-400 pr-1 w-5">
                        <div className="h-3" />
                        <div>Mon</div>
                        <div className="h-3" />
                        <div>Wed</div>
                        <div className="h-3" />
                        <div>Fri</div>
                    </div>

                    {/* Calendar grid */}
                    <div className="flex gap-[8px] w-fit min-w-max">
                        {calendarData.weeks.map((week, wi) => (
                            <div key={wi} className="flex flex-col gap-[3px]">
                                {week.map((day, di) => (
                                    <motion.div
                                        key={`${day.date}-${di}`}
                                        className={`w-[8px] h-[6px] sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3
                      rounded-sm ${getLevelColor(day.contributionCount)}
                      cursor-pointer hover:ring-1 hover:ring-emerald-500 dark:hover:ring-emerald-400`}
                                        whileHover={{ scale: 1.25 }}
                                        onHoverStart={() => setHoveredDay(day)}
                                        onHoverEnd={() => setHoveredDay(null)}
                                    >
                                        {/* Tooltip */}
                                        <AnimatePresence>
                                            {hoveredDay?.date === day.date && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 6, scale: 0.9 }}
                                                    transition={{ duration: 0.12 }}
                                                    className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                                                >
                                                    <div className="bg-gray-900 dark:bg-gray-800 text-white px-2.5 py-1.5 rounded-md text-[11px] shadow-xl whitespace-nowrap">
                                                        <div className="font-semibold text-emerald-400">
                                                            {day.contributionCount} contribution
                                                            {day.contributionCount !== 1 && "s"}
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
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};
