import { useEffect, useState, useMemo } from "react";
import { Home, Code, Briefcase, User, Mail } from "lucide-react";

export const useLogic = () => {
  // Provide id and icon so consumers can render correctly
  const navItems = useMemo(
    () => [
      { id: "home", href: "/home", label: "Home", icon: Home },
      { id: "education", href: "/education", label: "Education", icon: User },
      { id: "skills", href: "/skills", label: "Skills", icon: Code },
      { id: "projects", href: "/projects", label: "Projects", icon: Briefcase },
      { id: "contact", href: "/contact", label: "Contact", icon: Mail },
    ],
    []
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
    setIsMenuOpen(false);
  };

  return {
    navItems,
    isMenuOpen,
    setIsMenuOpen,
    activeSection,
    scrolled,
    scrollToSection,
  };
};
