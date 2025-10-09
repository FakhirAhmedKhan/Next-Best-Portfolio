import React from 'react'
import { motion } from "framer-motion";
import useEducationData from './Fatching';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
};
export const MainCard = () => {
  const education = useEducationData();

  return (
    <div className="relative">
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 transform -translate-x-1/2 rounded-full shadow-lg" />

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-12 md:space-y-24">
        {education.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative flex ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center justify-center md:justify-between gap-8`}
            >
              {/* Timeline dot */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div className="relative" whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400 }}>
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 shadow-lg" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 animate-ping opacity-75" />
                </motion.div>
              </div>

              {/* Spacer */}
              <div className="hidden md:block w-[calc(50%-3rem)]" />

              {/* Content card */}
              <motion.div className="w-full md:w-[calc(50%-3rem)] group" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <div className="relative dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-bl-full transform translate-x-16 -translate-y-16" />
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-sm shadow-lg mb-4">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {item.year}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h3>
                    {item.description && <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>}
                    <div className="mt-6 h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full group-hover:w-32 transition-all duration-300" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  )
}
