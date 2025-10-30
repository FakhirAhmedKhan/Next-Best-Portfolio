'use client';
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { GraduationCap, BookOpen, Code, Sparkles, Home, User, Briefcase } from 'lucide-react';
import enData from '@/public/Data/en.json';

// ============================================
// 🔷 NAVIGATION ITEMS
// ============================================
export const navItems = [
  { id: "home", label: "Home", href: "/", icon: Home },
  { id: "education", label: "Education", href: "/EduPage", icon: User },
  { id: "skills", label: "Skills", href: "/SkillPage", icon: Code },
  { id: "projects", label: "Projects", href: "/ProjectPage", icon: Briefcase },
];

const iconMap = { GraduationCap, BookOpen, Code, Sparkles };
const AppContext = createContext({});
const isBrowser = typeof window !== 'undefined';

// ============================================
// 🔷 PROVIDER
// ============================================
export function AppProvider({ children }) {
  const [data, setData] = useState({
    skills: [],
    socialLinks: [],
    educationData: [],
    projects: [],
  });
  const [sectionTitles, setSectionTitles] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeSection, setActiveSection] = useState(navItems[0]?.id || '');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // 🔹 Load local JSON data
  useEffect(() => {
    setData({
      skills: enData.skills || [],
      socialLinks: enData.socialLinks || [],
      educationData: enData.educationData || [],
      projects: enData.projects || [],
    });

    setSectionTitles(enData.sectionTitles || {
      home: "Home",
      education: "Education",
      skills: "Skills",
      projects: "Projects",
    });

    setLoading(false);
  }, []);

  // 🔹 Scroll Spy
  useEffect(() => {
    if (!isBrowser) return;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setScrolled(scrollY > 50);
          const scrollPosition = scrollY + 200;

          for (let i = navItems.length - 1; i >= 0; i--) {
            const section = document.getElementById(navItems[i].id);
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(navItems[i].id);
              break;
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔹 Smooth Scroll
  const scrollToSection = useCallback((id) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }, 250);
  }, []);

  // 🔹 Project Filtering
  const categories = useMemo(() => {
    if (!data?.projects?.length) return ['SAAS'];
    const cats = Array.from(new Set(data.projects.map((p) => p.category)));
    return ['All', ...cats.sort()];
  }, [data.projects]);

  useEffect(() => {
    if (data?.projects?.length) {
      const hasSAAS = data.projects.some((p) => p.category === 'SAAS');
      setActiveCategory(hasSAAS ? 'SAAS' : 'All');
    }
  }, [data.projects]);

  const filteredProjects = useMemo(() => {
    if (!data?.projects) return [];
    return activeCategory === 'All'
      ? data.projects
      : data.projects.filter((p) => p.category === activeCategory);
  }, [data.projects, activeCategory]);

  const visibleProjects = useMemo(
    () => filteredProjects.slice(0, visibleCount),
    [filteredProjects, visibleCount]
  );

  const showMore = useCallback((count = 3) => {
    setVisibleCount(prev => prev + count);
  }, []);

  const changeCategory = useCallback((category) => {
    setActiveCategory(category);
    setVisibleCount(3);
  }, []);

  // 🔹 Context Value
  const value = useMemo(() => ({
    ...data,
    loading,
    hoveredIndex,
    setHoveredIndex,
    iconMap,
    sectionTitles, // 👈 added here
    activeCategory,
    categories,
    visibleProjects,
    filteredProjects,
    showMore,
    changeCategory,
    navItems,
    activeSection,
    isMenuOpen,
    scrolled,
    setIsMenuOpen,
    scrollToSection,
  }), [
    data,
    loading,
    hoveredIndex,
    sectionTitles,
    activeCategory,
    categories,
    visibleProjects,
    filteredProjects,
    activeSection,
    isMenuOpen,
    scrolled,
    showMore,
    changeCategory,
    scrollToSection,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ============================================
// 🔷 CUSTOM HOOK
// ============================================
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
