"use client";
const CategoryFilter = ({ categories, activeCategory, changeCategory }) => {

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-16">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => changeCategory(cat)}
            className={`group relative px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 overflow-hidden ${isActive
              ? "text-white scale-105 shadow-2xl"
              : "text-gray-700 dark:text-gray-300 hover:scale-105 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-400/50 dark:hover:border-purple-500/50 shadow-lg hover:shadow-xl"
              }`}
          >
            {/* Active gradient background */}
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 animate-gradient-x" />
            )}

            {/* Hover gradient effect for inactive buttons */}
            {!isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-pink-600/0 to-purple-600/0 group-hover:from-purple-600/10 group-hover:via-pink-600/10 group-hover:to-purple-600/10 transition-all duration-300" />
            )}

            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </div>

            {/* Text content */}
            <span className="relative z-10 flex items-center gap-2">
              {isActive && (
                <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              )}
              {cat}
            </span>

            {/* Active button glow */}
            {isActive && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 blur-xl opacity-60 -z-10" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;