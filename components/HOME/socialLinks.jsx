"use client"
const SocialLinks = ({ hoveredIndex, socialLinks }) => {

  return (
    <div className="flex justify-center items-center pt-12 pb-8 animate-fadeUp" style={{ animationDelay: "1.2s" }}>
      <div className="relative">
        <div className="absolute inset-0 bg-linear-to-r from-fuchsia-500/20 via-pink-500/20 to-violet-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full scale-150" />
        <div className="relative flex items-center gap-6">
          <div className="relative h-px w-16 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-gray-300 to-gray-400 dark:from-transparent dark:via-gray-600 dark:to-gray-500" />
            <div
              className="absolute inset-0 bg-linear-to-r from-transparent via-fuchsia-400 to-pink-400 opacity-0 animate-shimmer"
              style={{ animationDelay: "1.4s" }}
            />
          </div>

          <div className="flex gap-3 relative">
            <div
              className="absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-fuchsia-400 via-pink-400 to-violet-400 -translate-y-1/2 transition-all duration-500 rounded-full"
              style={{
                opacity: hoveredIndex !== null ? 0.2 : 0,
                transform: `translateY(-50%) scaleX(${hoveredIndex !== null ? 1 : 0})`
              }}
            />

            {socialLinks.map((link, index) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                onMouseEnter={() => hoveredIndex(index)}
                onMouseLeave={() => hoveredIndex(null)}
                className="group relative animate-fadeScale"
                style={{ animationDelay: `${1.3 + index * 0.1}s` }}
              >
                <div
                  className="absolute -inset-2 rounded-full bg-linear-to-r from-fuchsia-500 via-pink-500 to-violet-500 opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500"
                  style={{
                    transform: hoveredIndex === index ? 'scale(1.2)' : 'scale(0.8)'
                  }}
                />

                <div className="relative w-14 h-14 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-fuchsia-500 via-pink-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-all duration-300 animate-spin-slow" />
                  <div className="absolute inset-0.5 rounded-2xl bg-white dark:bg-gray-900 transition-all duration-300" />
                  <div className="absolute inset-0.5 rounded-2xl bg-linear-to-br from-white/50 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10 w-6 h-6 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                    <img
                      src={link.icon}
                      alt={link.label}
                      className="w-full h-full object-contain filter brightness-0 dark:brightness-100 group-hover:brightness-100 transition-all duration-300"
                      style={{
                        filter: hoveredIndex === index
                          ? 'brightness(0) saturate(100%) invert(45%) sepia(89%) saturate(2677%) hue-rotate(299deg) brightness(98%) contrast(101%)'
                          : ''
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-transparent translate-x-[-100%] translate-y-[-100%] group-hover:translate-x-[100%] group-hover:translate-y-[100%] transition-transform duration-700" />
                  </div>
                </div>
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <div className="relative px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-medium rounded-lg whitespace-nowrap">
                    {link.label}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-white rotate-45" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="relative h-px w-16 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-l from-transparent via-gray-300 to-gray-400 dark:from-transparent dark:via-gray-600 dark:to-gray-500" />
            <div
              className="absolute inset-0 bg-linear-to-l from-transparent via-violet-400 to-pink-400 opacity-0 animate-shimmer"
              style={{ animationDelay: "1.7s" }}
            />
          </div>
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-linear-to-r from-fuchsia-400 to-pink-400 animate-bounce"
              style={{
                animationDelay: `${1.5 + i * 0.2}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeScale {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fadeUp {
          animation: fadeUp 0.8s ease-out forwards;
        }

        .animate-fadeScale {
          animation: fadeScale 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};
export default SocialLinks;