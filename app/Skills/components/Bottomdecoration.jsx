import React from 'react'

export const Bottomdecoration = () => {
  return (
    <motion.div
      className="mt-20 flex justify-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.8, duration: 1 }}
    >
      <div className="h-1 w-32 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-violet-500 rounded-full" />
    </motion.div>
  )
}
