"use client";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { Home, Code, Briefcase, User } from "lucide-react";

export const useLogic = () => {
  const router = useRouter();

  const navItems = useMemo(
    () => [
      { id: "home", href: "/home", label: "Home", icon: Home },
      { id: "education", href: "/education", label: "Education", icon: User },
      { id: "skills", href: "/skills", label: "Skills", icon: Code },
      { id: "projects", href: "/projects", label: "Projects", icon: Briefcase },
    ],
    []
  );

  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onItemClick = (target: string) => {
    router.push(target); // ✅ actual navigation
    setIsMenuOpen(false);
  };

  return { navItems, scrolled, isMenuOpen, setIsMenuOpen, onItemClick };
};
