"use client";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useLanguage() {
  const pathname = usePathname();
  const router = useRouter();
  const lang = useMemo(
    () => (pathname?.startsWith("/ar") ? "ar" : "en"),
    [pathname]
  );

  const changeLanguage = useCallback(
    (targetLang) => {
      if (!targetLang || targetLang === lang) return;

      if (targetLang === "ar") {
        const nextPath = pathname?.startsWith("/ar")
          ? pathname
          : `/ar${pathname === "/" ? "" : pathname}`;
        router.push(nextPath || "/ar");
      } else {
        const stripped = pathname?.replace(/^\/ar(?=\/|$)/, "") || "/";
        router.push(stripped || "/");
      }
    },
    [lang, pathname, router]
  );
  
  return { language: lang, changeLanguage };
}
