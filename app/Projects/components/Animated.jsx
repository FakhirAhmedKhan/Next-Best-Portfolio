import React from 'react'

export const Animated = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-fuchsia-300/20 dark:bg-fuchsia-600/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-violet-300/20 dark:bg-violet-600/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />
    </div>
  )
}
