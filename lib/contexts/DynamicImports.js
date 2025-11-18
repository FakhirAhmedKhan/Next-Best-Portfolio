import dynamic from "next/dynamic";

export const Badge = dynamic(
  () => import("../..//UI/Badge").then((m) => m.Badge),
  { ssr: true }
);

export const TypingEffect = dynamic(
  () =>
    import("../../components/HOME/components/TypingEffect").then(
      (m) => m.TypingEffect
    ),
  { ssr: true }
);
export const Description = dynamic(
  () =>
    import("../../components/HOME/components/Description").then(
      (m) => m.Description
    ),
  { ssr: true }
);
export const SocialLinks = dynamic(
  () =>
    import("../../components/HOME/components/socialLinks").then(
      (m) => m.SocialLinks
    ),
  { ssr: true }
);
