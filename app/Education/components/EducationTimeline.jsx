import { useAppContext } from '@/Hook/useAppLogic';
import { cardVariants, containerVariants, dotVariants, iconVariants, itemVariants, lineVariants } from '@/UI/motionConfige';
import { motion } from 'framer-motion';

export const EducationTimeline = () => {
  const { education, loading ,setHoveredIndex, hoveredIndex, iconMap } = useAppContext();
  if (loading) return null; // or return a skeleton loader
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading education timeline...
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Timeline */}
        <div className="relative">
          {/* Central Line with draw animation */}
          <motion.div
            initial={{ height: 0 }}
            key={education.length} // re-triggers animation when data changes
            whileInView={{ height: "100%" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-transparent"
          />

          {/* Timeline Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-12"
          >
            {education?.length > 0 ? (
              education.map((item, index) => (
                <motion.div
                  key={item.id || index}
                  custom={index}
                  variants={itemVariants}
                  className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}>
                    <motion.div
                      variants={cardVariants}
                      initial="rest"
                      animate={hoveredIndex === index ? "hover" : "rest"}
                      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        {/* Logo */}
                        <motion.div
                          variants={iconVariants}
                          initial="rest"
                          animate={hoveredIndex === index ? "hover" : "rest"}
                          className={`p-3 rounded-xl bg-gradient-to-br ${item.color} flex-shrink-0`}
                        >
                          <div className="text-white">
                            {iconMap[item.icon] && (() => {
                              const IconComponent = iconMap[item.icon];
                              return <IconComponent className="w-6 h-6 text-white" />;
                            })()}
                          </div>
                        </motion.div>

                        <div className="flex-1">
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="flex items-center gap-2 mb-2"
                          >
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${item.color}`}>
                              {item.year}
                            </span>
                          </motion.div>

                          <motion.h3
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl font-bold text-black mb-2"
                          >
                            {item.title}
                          </motion.h3>
                        </div>
                      </div>

                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-900 text-sm leading-relaxed"
                      >
                        {item.description}
                      </motion.p>

                      {/* Decorative Element */}
                      <motion.div
                        variants={lineVariants}
                        initial="rest"
                        animate={hoveredIndex === index ? "hover" : "rest"}
                        className={`mt-4 h-1 rounded-full bg-gradient-to-r ${item.color}`}
                      />
                    </motion.div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 items-center justify-center z-10">
                    <motion.div
                      variants={dotVariants}
                      initial="rest"
                      animate={hoveredIndex === index ? "hover" : "rest"}
                      className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color} border-4 border-slate-900`}
                    />
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden md:block w-5/12" />
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center text-gray-500"
              >
                Loading education data...
              </motion.div>)
            }
          </motion.div>
        </div>
      </div>
    </div>
  );
};