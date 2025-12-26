"use client";

const LoadProject = ({ showMore, hasMore }) => {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center mt-10">
      <button
        onClick={() => showMore()}
        className="
          relative px-8 py-4 rounded-full font-bold text-white
          overflow-hidden shadow-xl hover:shadow-2xl
          transition-all duration-300 group
        "
      >
        <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-violet-500" />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 via-pink-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <span className="relative flex items-center gap-2">
          Load More Projects
          <span className="animate-bounce">-&gt;</span>
        </span>
      </button>
    </div>
  );
};

export default LoadProject;

