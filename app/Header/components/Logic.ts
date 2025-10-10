"use client";
import { useMemo, useState, useEffect } from "react";
import { Home, Code, Briefcase, User, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

export const useLogic = () => {
  const router = useRouter();

  const navItems = useMemo(
    () => [
      { id: "home", href: "/home", label: "Home", icon: Home },
      { id: "education", href: "/education", label: "Education", icon: User },
      { id: "skills", href: "/skills", label: "Skills", icon: Code },
      { id: "projects", href: "/projects", label: "Projects", icon: Briefcase },
      { id: "contact", href: "/footer", label: "Contact", icon: Mail },
    ],
    []
  );

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onItemClick = (target: string) => {
    // allow passing href or id
    const item = navItems.find((n) => n.href === target || n.id === target);
    const href = item ? item.href : target;
    router.push(href);
    setIsMenuOpen(false);
  };

  return {
    navItems,
    scrolled,
    activeSection,
    setActiveSection,
    isMenuOpen,
    setIsMenuOpen,
    onItemClick,
  };
};