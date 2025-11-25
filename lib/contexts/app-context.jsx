'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import {
  GraduationCap,
  BookOpen,
  Code,
  Sparkles,
  Home,
  User,
  Briefcase,
} from 'lucide-react';

import enData from '@/public/Data/en.json';

// ============================================
// 🔷 NAV ITEMS
// ============================================
export const navItems = [
  { id: 'home', label: enData.navLabels.home, href: '/', icon: Home },
  { id: 'education', label: enData.navLabels.education, href: '/EducationTimeline', icon: User },
  { id: 'skills', label: enData.navLabels.skills, href: '/SkillPage', icon: Code },
  { id: 'projects', label: enData.navLabels.projects, href: '/ProjectPage', icon: Briefcase },
];

const iconMap = { GraduationCap, BookOpen, Code, Sparkles };
const AppContext = createContext(null);

const isBrowser = typeof window !== 'undefined';

// ============================================
// 🔷 PROVIDER
// ============================================
export function AppProvider({ children }) {
  // =========================
  // STATE
  // =========================
  const [loading, setLoading] = useState(true);
  const [skillData, setSkillData] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [projects, setProjects] = useState([]);

  const [sectionTitles, setSectionTitles] = useState({});

  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(3);

  const [activeSection, setActiveSection] = useState(navItems[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  // =========================
  // LOAD JSON DATA ONCE
  // =========================
  useEffect(() => {
    setSkillData(enData.skills || []);
    setSocialLinks(enData.socialLinks || []);
    setEducationData(enData.educationData || []);
    setProjects(enData.projects || []);

    setSectionTitles(enData.sectionTitles || {});
    setLoading(false);
  }, []);

  // =========================
  // SCROLL SPY
  // =========================
  useEffect(() => {
    if (!isBrowser) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
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
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // =========================
  // SMOOTH SCROLL
  // =========================
  const scrollToSection = useCallback((id) => {
    setIsMenuOpen(false);

    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }, 250);
  }, []);

  // =========================
  // PROJECT CATEGORIES
  // =========================
  const categories = useMemo(() => {
    if (!projects?.length) return ['All'];

    const unique = Array.from(new Set(projects.map((p) => p.category)));

    return ['All', ...unique.sort()];
  }, [projects]);

  // Default category logic
  useEffect(() => {
    if (projects.length) {
      const hasSAAS = projects.some((p) => p.category === 'SAAS');
      setActiveCategory(hasSAAS ? 'SAAS' : 'All');
    }
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const visibleProjects = useMemo(
    () => filteredProjects.slice(0, visibleCount),
    [filteredProjects, visibleCount]
  );

  const showMore = useCallback(() => {
    setVisibleCount((prev) => prev + 3);
  }, []);

  const changeCategory = useCallback((category) => {
    setActiveCategory(category);
    setVisibleCount(3);
  }, []);

  // ============================================
  // CONTEXT VALUE (memoized)
  // ============================================
  const value = useMemo(
    () => ({
      // Data
      skills: skillData,
      socialLinks,
      educationData,
      projects,

      // UI Titles
      sectionTitles,

      // Loading
      loading,

      // Nav
      navItems,
      activeSection,
      scrollToSection,
      isMenuOpen,
      setIsMenuOpen,
      scrolled,

      // Icons
      iconMap,

      // Hovered
      hoveredIndex,
      setHoveredIndex,

      // Projects
      activeCategory,
      categories,
      visibleProjects,
      filteredProjects,
      showMore,
      changeCategory,
    }),
    [
      skillData,
      socialLinks,
      educationData,
      projects,

      sectionTitles,
      loading,

      activeSection,
      isMenuOpen,
      scrolled,
      hoveredIndex,

      activeCategory,
      categories,
      visibleProjects,
      filteredProjects,
      showMore,
      changeCategory,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ============================================
// 🔷 HOOK
// ============================================
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used inside AppProvider');
  return ctx;
}
