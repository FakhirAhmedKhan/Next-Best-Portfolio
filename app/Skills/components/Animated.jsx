import React from 'react'

export const Animated = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-fuchsia-300/20 dark:bg-fuchsia-600/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-violet-300/20 dark:bg-violet-600/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -50, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Floating code symbols */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-fuchsia-400/20 dark:text-fuchsia-600/20 font-mono text-2xl font-bold"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        >
          {["<>", "{}", "[]", "/>", "()"][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}
    </div>
  )
}
