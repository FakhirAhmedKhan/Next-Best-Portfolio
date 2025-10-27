'use client';
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { GraduationCap, BookOpen, Code, Sparkles, Home, User, Briefcase, Mail } from 'lucide-react';

// ============================================
// 🔷 NAVIGATION ITEMS
// ============================================
export const navItems = [
  { id: "home", label: "Home", href: "/", icon: Home },
  { id: "education", label: "Education", href: "/education", icon: User },
  { id: "skills", label: "Skills", href: "/skills", icon: Code },
  { id: "projects", label: "Projects", href: "/projects", icon: Briefcase },
  { id: "contact", label: "Contact", href: "#contact", icon: Mail },
];

const iconMap = {
  GraduationCap,
  BookOpen,
  Code,
  Sparkles,
};

// ============================================
// 🔷 CONTEXT SETUP
// ============================================
const AppContext = createContext(null);

// ============================================
// 🔷 API & CACHING CONFIG
// ============================================
const CACHE_KEYS = {
  skills: 'skillsIcons',
  socialLinks: 'socialLinks',
  education: 'educationData',
  projects: 'projectsData',
};

const API_ENDPOINTS = {
  skills: 'https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/main/Data/skillsIcons.json',
  socialLinks: 'https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/refs/heads/main/Data/socialLinks.json',
  education: 'https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/main/Data/educationData.json',
  projects: 'https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/refs/heads/main/Data/projectsData.json',
};

const isBrowser = typeof window !== 'undefined';

const getCache = (key) => {
  if (!isBrowser) return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

const setCache = (key, data) => {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Failed to cache ${key}:`, err);
  }
};

const fetchWithTimeout = async (url, timeout = 5000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 3600 },
    });
    clearTimeout(id);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};

// ============================================
// 🔷 PROVIDER
// ============================================
export function AppProvider({ children }) {
  const [data, setData] = useState({
    skills: [],
    socialLinks: [],
    education: [],
    projects: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(3);
  const [activeSection, setActiveSection] = useState(navItems[0]?.id || '');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // ============================================
  // 🔹 DATA FETCHING
  // ============================================
  useEffect(() => {
    let isMounted = true;

    const fetchAllData = async () => {
      try {
        const cached = {
          skills: getCache(CACHE_KEYS.skills),
          socialLinks: getCache(CACHE_KEYS.socialLinks),
          education: getCache(CACHE_KEYS.education),
          projects: getCache(CACHE_KEYS.projects),
        };

        if (Object.values(cached).every(Boolean)) {
          if (isMounted) {
            setData(cached);
            setLoading(false);
          }
          return;
        }

        const [skillsData, socialData, eduData, projData] = await Promise.allSettled([
          fetchWithTimeout(API_ENDPOINTS.skills),
          fetchWithTimeout(API_ENDPOINTS.socialLinks),
          fetchWithTimeout(API_ENDPOINTS.education),
          fetchWithTimeout(API_ENDPOINTS.projects),
        ]);

        const fresh = {
          skills: skillsData.status === 'fulfilled' ? skillsData.value.skills ?? [] : cached.skills ?? [],
          socialLinks: socialData.status === 'fulfilled' ? socialData.value.socialLinks ?? [] : cached.socialLinks ?? [],
          education: eduData.status === 'fulfilled' ? eduData.value.educationData ?? [] : cached.education ?? [],
          projects: projData.status === 'fulfilled' ? projData.value.projects ?? [] : cached.projects ?? [],
        };

        if (skillsData.status === 'fulfilled') setCache(CACHE_KEYS.skills, fresh.skills);
        if (socialData.status === 'fulfilled') setCache(CACHE_KEYS.socialLinks, fresh.socialLinks);
        if (eduData.status === 'fulfilled') setCache(CACHE_KEYS.education, fresh.education);
        if (projData.status === 'fulfilled') setCache(CACHE_KEYS.projects, fresh.projects);

        if (isMounted) setData(fresh);
      } catch (err) {
        console.error('❌ Failed to fetch data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchAllData();
    return () => { isMounted = false; };
  }, []);

  // ============================================
  // 🔹 SCROLL HANDLING
  // ============================================
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
            const section = document.getElementById(navItems[i].id || '');
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(navItems[i].id || '');
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

  // ============================================
  // 🔹 NAVIGATION
  // ============================================
  const scrollToSection = useCallback((id) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(id);
      }
    }, 250);
  }, []);

  // ============================================
  // 🔹 PROJECT FILTERING
  // ============================================
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
    if (activeCategory === 'All') return data.projects;
    return data.projects.filter((p) => p.category === activeCategory);
  }, [data.projects, activeCategory]);

  const visibleProjects = useMemo(() => filteredProjects.slice(0, visibleCount), [filteredProjects, visibleCount]);

  const showMore = useCallback((count = 3) => {
    setVisibleCount((prev) => prev + count);
  }, []);

  const changeCategory = useCallback((category) => {
    setActiveCategory(category);
    setVisibleCount(3);
  }, []);

  // ============================================
  // 🔹 CONTEXT VALUE
  // ============================================
  const value = useMemo(() => ({
    ...data,
    loading,
    hoveredIndex,
    setHoveredIndex,
    iconMap,

    // Projects
    activeCategory,
    categories,
    visibleProjects,
    filteredProjects,
    showMore,
    changeCategory,

    // Navigation
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