import dynamic from "next/dynamic";

export const HeaderLogo = dynamic(
  () => import("@/components/HEADER/Logo").then((m) => m.default),
  { ssr: true }
);
export const DesktopNavigation = dynamic(
  () => import("@/components/HEADER/DesktopNavigation").then((m) => m.default),
  { ssr: true }
);
export const MobileMenu = dynamic(
  () => import("@/components/HEADER/MobileManu").then((m) => m.default),
  { ssr: true }
);
export const MobileMenuButton = dynamic(
  () => import("@/components/HEADER/MobileMenuButton").then((m) => m.default),
  { ssr: true }
);
export const ProgressBar = dynamic(
  () => import("@/components/HEADER/ProgressBar").then((m) => m.default),
  { ssr: true }
);
export const LanguageSwitcher = dynamic(
  () => import("@/UI/LanguageSwitcher").then((m) => m.default),
  { ssr: true }
);

// =====Header Imports====//

export const HomeSection = dynamic(
  () => import("@/components/HOME/home").then((m) => m.default),
  { ssr: true }
);

// =====Home Imports====//

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

// UI Components //

export const Badge = dynamic(
  () => import("@/UI/Badge").then((m) => m.default),
  { ssr: true }
);
