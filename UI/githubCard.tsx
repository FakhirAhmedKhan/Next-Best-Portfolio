'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ContributionDay {
  contributionCount: number;
  date: string;
  contributionLevel: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface CalendarData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export default function GitHubCalendar() {
  const [calendarData, setCalendarData] = useState<CalendarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch('/api/github-contributions?username=FakhirAhmedKhan');
        
        if (!response.ok) {
          throw new Error('Failed to fetch contributions');
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        setCalendarData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching contributions:', err);
        setError(err instanceof Error ? err.message : 'Failed to load contributions');
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      'NONE': 'bg-gray-700 hover:bg-gray-600',
      'FIRST_QUARTILE': 'bg-green-900 hover:bg-green-800',
      'SECOND_QUARTILE': 'bg-green-700 hover:bg-green-600',
      'THIRD_QUARTILE': 'bg-green-500 hover:bg-green-400',
      'FOURTH_QUARTILE': 'bg-green-300 hover:bg-green-200',
    };
    return colors[level] || colors['NONE'];
  };

  const getMonthLabels = () => {
    if (!calendarData) return [];
    
    const months: { name: string; index: number }[] = [];
    let currentMonth = '';
    
    calendarData.weeks.forEach((week, index) => {
      const firstDay = week.contributionDays[0];
      if (firstDay) {
        const date = new Date(firstDay.date);
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        
        if (monthName !== currentMonth) {
          currentMonth = monthName;
          months.push({ name: monthName, index });
        }
      }
    });
    
    return months;
  };

  return (
    <section
      id="github-calendar"
      className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-14 px-6 text-center rounded-2xl shadow-2xl relative overflow-hidden"
    >
      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
          💻 My GitHub Contributions
        </h2>
        <p className="text-gray-400 mb-8">
          A look at my coding activity throughout the year.
        </p>
      </motion.div>

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 border-4 border-gray-600 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-400 animate-pulse">Loading GitHub activity...</p>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20"
        >
          <div className="text-red-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-400 mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Retry
          </button>
        </motion.div>
      )}

      {/* Calendar Grid */}
      {!loading && !error && calendarData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl"
        >
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 flex justify-center items-center gap-6 text-sm"
          >
            <div className="bg-gray-800/50 px-6 py-3 rounded-lg border border-gray-700 backdrop-blur-sm">
              <span className="text-gray-400">Total contributions:</span>
              <span className="ml-2 font-bold text-green-400 text-lg">
                {calendarData.totalContributions.toLocaleString()}
              </span>
            </div>
          </motion.div>

          {/* Calendar */}
          <div className="inline-block bg-gray-800/30 p-6 rounded-xl border border-gray-700 backdrop-blur-sm">
            {/* Month Labels */}
            <div className="flex gap-1 mb-2 pl-6">
              {getMonthLabels().map((month, i) => (
                <div
                  key={i}
                  className="text-xs text-gray-400"
                  style={{ marginLeft: `${month.index * 12}px` }}
                >
                  {month.name}
                </div>
              ))}
            </div>

            <div className="flex gap-1 overflow-x-auto pb-2">
              {/* Day labels */}
              <div className="flex flex-col gap-1 text-xs text-gray-400 pr-2">
                <div className="h-3"></div>
                <div className="h-3">Mon</div>
                <div className="h-3"></div>
                <div className="h-3">Wed</div>
                <div className="h-3"></div>
                <div className="h-3">Fri</div>
                <div className="h-3"></div>
              </div>

              {/* Contribution grid */}
              {calendarData.weeks.map((week, weekIndex) => (
                <motion.div
                  key={weekIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: weekIndex * 0.005 }}
                  className="flex flex-col gap-1"
                >
                  {week.contributionDays.map((day, dayIndex) => (
                    <motion.div
                      key={day.date}
                      whileHover={{ scale: 1.5, zIndex: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={`w-3 h-3 rounded-sm ${getLevelColor(day.contributionLevel)} cursor-pointer relative group transition-colors`}
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none transition-opacity z-20 shadow-xl border border-gray-700">
                        <div className="font-semibold">
                          {day.contributionCount} {day.contributionCount === 1 ? 'contribution' : 'contributions'}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {new Date(day.date).toLocaleDateString('en-US', { 
                            weekday: 'short', 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-end gap-2 mt-4 text-xs text-gray-400"
            >
              <span>Less</span>
              {['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getLevelColor(level).split(' ')[0]}`}
                />
              ))}
              <span>More</span>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 bg-purple-500 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-4 left-4 w-2 h-2 bg-pink-500 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </section>
  );
}