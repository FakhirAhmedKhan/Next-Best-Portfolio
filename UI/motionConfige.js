// Smooth easing curves for natural motion
const smoothEase = [0.6, 0.05, 0.01, 0.99];
const bounceEase = [0.68, -0.55, 0.265, 1.55];

// Enhanced container with smoother stagger


export const navItemVariants = {
  initial: { opacity: 0, y: -20 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  }),
  hover: { y: -2, transition: { duration: 0.2 } },
};

export const mobileMenuVariants = {
  closed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
  open: { opacity: 1, height: "auto", transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.05 } },
};

export const mobileItemVariants = {
  closed: { opacity: 0, x: -20 },
  open: { opacity: 1, x: 0 },
};
export const SkillcontainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}



// Refined pulse with organic feel
export const pulseAnimation = {
  scale: [1, 1.08, 1],
  opacity: [1, 0.9, 1],
  transition: {
    duration: 2.5,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

// Enhanced container with better orchestration
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
      when: 'beforeChildren',
    },
  },
};

// More sophisticated skill entrance
export const skillVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.85,
    rotateX: -15,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: 'spring',
      damping: 18,
      stiffness: 120,
      mass: 0.9,
    },
  },
};

// Premium card hover with depth
export const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    filter: 'brightness(1)',
  },
  hover: {
    scale: 1.08,
    y: -15,
    rotateX: 5,
    rotateY: 0,
    filter: 'brightness(1.1)',
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 18,
    },
  },
};

// Sophisticated image zoom
export const imageVariants = {
  rest: {
    scale: 1,
    filter: 'brightness(1) saturate(1)',
  },
  hover: {
    scale: 1.2,
    filter: 'brightness(1.15) saturate(1.1)',
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

// Smooth overlay reveal
export const overlayVariants = {
  rest: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  hover: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: smoothEase,
    },
  },
};

// Premium button with glow effect
export const buttonVariants = {
  rest: {
    scale: 1,
    boxShadow: '0 4px 15px rgba(168, 85, 247, 0.15)',
    filter: 'brightness(1)',
  },
  hover: {
    scale: 1.08,
    boxShadow: '0 15px 40px rgba(168, 85, 247, 0.6)',
    filter: 'brightness(1.1)',
    y: -3,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 15,
    },
  },
  tap: {
    scale: 0.97,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

// Playful badge animation
export const badgeVariants = {
  rest: {
    scale: 1,
    rotate: 0,
  },
  hover: {
    scale: 1.15,
    rotate: [0, -8, 8, -8, 8, 0],
    y: [-2, -4, -2],
    transition: {
      rotate: {
        duration: 0.6,
        repeat: Infinity,
        repeatDelay: 2.5,
        ease: 'easeInOut',
      },
      scale: {
        duration: 0.3,
        ease: bounceEase,
      },
      y: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  },
};

// Dynamic timeline entrance
export const itemVariants = {
  hidden: (index) => ({
    opacity: 0,
    x: index % 2 === 0 ? 120 : -120,
    y: 60,
    scale: 0.9,
    rotateY: index % 2 === 0 ? 15 : -15,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      type: 'spring',
      damping: 18,
      stiffness: 120,
      duration: 0.9,
      mass: 0.8,
    },
  },
};

// Premium card with magnetic hover
export const cardVariants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.15)',
    filter: 'brightness(1)',
  },
  hover: {
    scale: 1.06,
    y: -12,
    boxShadow: '0 30px 60px -15px rgba(168, 85, 247, 0.6)',
    filter: 'brightness(1.05)',
    transition: {
      type: 'spring',
      stiffness: 450,
      damping: 20,
    },
  },
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.92,
    rotateX: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 16,
      duration: 0.7,
      mass: 0.9,
    },
  },
};

// Organic dot pulse
export const dotVariants = {
  rest: {
    scale: 1,
    boxShadow: '0 0 0 0 rgba(168, 85, 247, 0.3)',
  },
  hover: {
    scale: [1, 1.6, 1.4],
    boxShadow: [
      '0 0 0 0 rgba(168, 85, 247, 0.3)',
      '0 0 25px 8px rgba(168, 85, 247, 0.7)',
      '0 0 20px 6px rgba(168, 85, 247, 0.5)',
    ],
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

// Fluid line expansion
export const lineVariants = {
  rest: {
    width: '5rem',
    opacity: 0.6,
  },
  hover: {
    width: '100%',
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};

// Dynamic icon rotation
export const iconVariants = {
  rest: {
    rotate: 0,
    scale: 1,
  },
  hover: {
    rotate: [0, -12, 12, -10, 10, 0],
    scale: [1, 1.1, 1.05],
    transition: {
      duration: 0.7,
      ease: 'easeInOut',
    },
  },
};

// Bonus: Floating animation for continuous motion
export const floatVariants = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Bonus: Shimmer effect for loading states
export const shimmerVariants = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Bonus: Reveal animation with blur
export const revealVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: smoothEase,
    },
  },
};
export const SectionSTyle = "relative flex flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16 py-20 sm:py-28 lg:py-36 max-w-7xl mx-auto space-y-12 z-10 "


export const headerStyle = "fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-colors duration-300"

export const BotToggleButton =
  "fixed bottom-5 right-5 z-30 h-16 w-16 rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 text-white shadow-2xl flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 hover:shadow-pink-500/50 transition-all duration-300 hover:scale-110 backdrop-blur-sm";