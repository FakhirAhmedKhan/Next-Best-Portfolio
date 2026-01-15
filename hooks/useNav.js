'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Home, User, Code, Briefcase, GraduationCap } from 'lucide-react';
export function useNav(navLabels = {}) {
  const navItems = useMemo(
    () => [
      { id: 'home', label: navLabels.home || 'Home', href: '/', icon: Home },
      { id: 'education', label: navLabels.education || 'Education', href: '/education', icon: User },
      { id: 'skills', label: navLabels.skills || 'Skills', href: '/skills', icon: Code },
      { id: 'projects', label: navLabels.projects || 'Projects', href: '/projects', icon: Briefcase },
      { id: 'certifications', label: navLabels.certifications || 'Certifications', href: '/certifications', icon: GraduationCap },
    ],
    [navLabels]
  );
  // console.log("REDIRECT FROM", pathname)
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 50);

        const position = y + 200;

        for (let i = navItems.length - 1; i >= 0; i--) {
          const el = document.getElementById(navItems[i].id);
          if (el && el.offsetTop <= position) {
            setActiveSection(navItems[i].id);
            break;
          }
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const scrollToSection = useCallback((id) => {
    setIsMenuOpen(false);

    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }, 250);
  }, []);

  return { navItems, activeSection, scrollToSection, isMenuOpen, setIsMenuOpen, scrolled };
}
