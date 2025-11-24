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
