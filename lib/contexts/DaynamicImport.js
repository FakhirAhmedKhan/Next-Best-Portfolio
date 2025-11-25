import dynamic from "next/dynamic";

// Header Components - Keep SSR enabled for SEO
export const HeaderLogo = dynamic(
  () => import("@/components/HEADER/Logo").then((m) => m.default),
  { ssr: true }
);
export const DesktopNavigation = dynamic(
  () => import("@/components/HEADER/DesktopNavigation").then((m) => m.default),
  { ssr: true }
);

// Client-only components - Disable SSR for better performance
export const MobileMenu = dynamic(
  () => import("@/components/HEADER/MobileManu").then((m) => m.default),
  { 
    ssr: false,
    loading: () => <div className="h-0" />
  }
);
export const MobileMenuButton = dynamic(
  () => import("@/components/HEADER/MobileMenuButton").then((m) => m.default),
  { ssr: false }
);
export const ProgressBar = dynamic(
  () => import("@/components/HEADER/ProgressBar").then((m) => m.default),
  { ssr: false }
);
export const LanguageSwitcher = dynamic(
  () => import("@/UI/LanguageSwitcher").then((m) => m.default),
  { ssr: false }
);

// Home Components - SSR enabled for initial content
export const TypingEffect = dynamic(
  () => import("@/components/HOME/TypingEffect").then((m) => m.default),
  { ssr: true }
);
export const Praghrap = dynamic(
  () => import("@/components/HOME/Description").then((m) => m.default),
  { ssr: true }
);
export const CTAButtons = dynamic(
  () => import("@/components/HOME/CTAButtons").then((m) => m.default),
  { ssr: true }
);
export const SocialLinks = dynamic(
  () => import("@/components/HOME/socialLinks").then((m) => m.default),
  { ssr: true }
);

// UI Components
export const Badge = dynamic(
  () => import("@/UI/Badge").then((m) => m.default),
  { ssr: true }
);
export const HeadIng = dynamic(
  () => import("@/UI/Head").then((m) => m.default),
  { ssr: true }
);
export const EducationTimeline = dynamic(
  () => import("@/components/EDU/EducationTimeline").then((m) => m.default),
  { ssr: true }
);
export const AnimatedText = dynamic(
  () => import("@/UI/AnimatedText").then((m) => m.default),
  { ssr: false }
);

// Skill page components
export const Bottomdecoration = dynamic(
  () => import("@/components/SKILLS/Bottomdecoration").then((m) => m.default),
  { ssr: false }
);

export const Card = dynamic(
  () => import("@/components/SKILLS/SkillsGrid").then((m) => m.default),
  { ssr: true }
);

// Project page components
export const CategoryFilter = dynamic(
  () => import("@/components/PROJECT/CategoryFilters").then((m) => m.default),
  { ssr: false }
);
export const ProjectView = dynamic(
  () => import("@/components/PROJECT/ProjectsGrid").then((m) => m.default),
  { ssr: true }
);
export const LoardProject = dynamic(
  () => import("@/components/PROJECT/LoadMoreButton").then((m) => m.default),
  { ssr: false }
);
