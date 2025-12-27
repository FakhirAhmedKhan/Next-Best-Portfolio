export const theme = {
  extend: {
    keyframes: {
      pulseGlow: {
        "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
        "50%": { opacity: "0.6", transform: "scale(1.05)" },
      },
      fadeInScale: {
        "0%": { opacity: "0", transform: "scale(0.9)" },
        "100%": { opacity: "1", transform: "scale(1)" },
      },
    },
    animation: {
      pulseGlow: "pulseGlow 2.5s ease-in-out infinite",
      fadeInScale: "fadeInScale 0.8s ease-out forwards",
    },
    theme: {
      extend: {
        keyframes: {
          fadeUp: {
            "0%": { opacity: "0", transform: "translateY(20px)" },
            "100%": { opacity: "1", transform: "translateY(0)" },
          },
          arrowWiggle: {
            "0%, 100%": { transform: "translateX(0)" },
            "50%": { transform: "translateX(5px)" },
          },
          orbit: {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        },
        animation: {
          fadeUp: "fadeUp 0.8s ease-out forwards",
          arrowWiggle: "arrowWiggle 1.5s ease-in-out infinite",
          orbit: "orbit var(--duration) linear infinite",
        },
      },
    },
  },
};

// export default {
//   theme: {
//     extend: {
//       keyframes: {
//         fadeUp: {
//           "0%": { opacity: "0", transform: "translateY(20px)" },
//           "100%": { opacity: "1", transform: "translateY(0)" },
//         },
//         popIn: {
//           "0%": { opacity: "0", transform: "scale(0.9)" },
//           "100%": { opacity: "1", transform: "scale(1)" },
//         },
//       },
//       animation: {
//         fadeUp: "fadeUp 0.5s ease-out both",
//         popIn: "popIn 0.4s ease-out both",
//       },
//     },
//   },
// };

// tailwind.config.js
// export default {
//   theme: {
//     extend: {
//       keyframes: {
//         fadeIn: {
//           "0%": { opacity: "0" },
//           "100%": { opacity: "1" },
//         },
//       },
//       animation: {
//         fadeInSlow: "fadeIn 1s ease-out both",
//       },
//     },
//   },
// };
