// lib/contexts/app-context.tsx
'use client';

import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { GraduationCap, BookOpen, Code, Sparkles } from 'lucide-react';

// ============================================
// 🔷 TYPES
// ============================================
interface Skill {
  name: string;
  icon?: string;
  level?: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon?: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
  description?: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  tags?: string[];
  link?: string;
}

interface AppData {
  skills: Skill[];
  socialLinks: SocialLink[];
  education: Education[];
  projects: Project[];
}

interface NavItem {
  name: string;
  path: string;
  id?: string;
}

interface AppContextType extends AppData {
  loading: boolean;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
  iconMap: Record<string, any>;
  
  // Project filtering
  activeCategory: string;
  categories: string[];
  visibleProjects: Project[];
  filteredProjects: Project[];
  showMore: (count?: number) => void;
  changeCategory: (category: string) => void;
  
  // Navigation
  navItems: NavItem[];
  activeSection: string;
  isMenuOpen: boolean;
  scrolled: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollToSection: (id: string) => void;
}

// ============================================
// 🔷 NAVIGATION ITEMS
// ============================================
export const navItems: NavItem[] = [
  { name: 'Home', path: '/', id: 'home' },
  { name: 'Skills', path: '/skills', id: 'skills' },
  { name: 'Projects', path: '/projects', id: 'projects' },
  { name: 'Education', path: '/education', id: 'about' }, // matches your section id
];

const iconMap = {
  GraduationCap,
  BookOpen,
  Code,
  Sparkles,
};

// ============================================
// 🔷 CONTEXT
// ============================================
const AppContext = createContext<AppContextType | null>(null);

// ============================================
// 🔷 DATA FETCHING UTILITIES
// ============================================
const CACHE_KEYS = {
  skills: 'skillsIcons',
  socialLinks: 'socialLinks',
  education: 'educationData',
  projects: 'projectsData',
} as const;

const API_ENDPOINTS = {
  skills: 'https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/main/Data/skillsIcons.json',
  socialLinks: 'https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/refs/heads/main/Data/socialLinks.json',
  education: 'https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/main/Data/educationData.json',
  projects: 'https://raw.githubusercontent.com/FakhirAhmedKhan/DataApi-main/refs/heads/main/Data/projectsData.json',
} as const;

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

// Cache utilities with error handling
const getCache = (key: string): any | null => {
  if (!isBrowser) return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

const setCache = (key: string, data: any): void => {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`Failed to cache ${key}:`, err);
  }
};

// Fetch with timeout and retry
const fetchWithTimeout = async (url: string, timeout = 5000): Promise<any> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, { 
      signal: controller.signal,
      next: { revalidate: 3600 } // Cache for 1 hour in Next.js
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
// 🔷 PROVIDER COMPONENT
// ============================================
export function AppProvider({ children }: { children: ReactNode }) {
  // State management
  const [data, setData] = useState<AppData>({
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // ============================================
  // 🔹 DATA FETCHING
  // ============================================
  useEffect(() => {
    let isMounted = true;

    const fetchAllData = async () => {
      try {
        // Try cache first
        const cached = {
          skills: getCache(CACHE_KEYS.skills),
          socialLinks: getCache(CACHE_KEYS.socialLinks),
          education: getCache(CACHE_KEYS.education),
          projects: getCache(CACHE_KEYS.projects),
        };

        // If all cached, use cache
        if (Object.values(cached).every(Boolean)) {
          if (isMounted) {
            setData(cached as AppData);
            setLoading(false);
          }
          return;
        }

        // Fetch fresh data in parallel
        const [skillsData, socialData, eduData, projData] = await Promise.allSettled([
          fetchWithTimeout(API_ENDPOINTS.skills),
          fetchWithTimeout(API_ENDPOINTS.socialLinks),
          fetchWithTimeout(API_ENDPOINTS.education),
          fetchWithTimeout(API_ENDPOINTS.projects),
        ]);

        const fresh: AppData = {
          skills: skillsData.status === 'fulfilled' ? skillsData.value.skills ?? [] : cached.skills ?? [],
          socialLinks: socialData.status === 'fulfilled' ? socialData.value.socialLinks ?? [] : cached.socialLinks ?? [],
          education: eduData.status === 'fulfilled' ? eduData.value.educationData ?? [] : cached.education ?? [],
          projects: projData.status === 'fulfilled' ? projData.value.projects ?? [] : cached.projects ?? [],
        };

        // Cache successful fetches
        if (skillsData.status === 'fulfilled') setCache(CACHE_KEYS.skills, fresh.skills);
        if (socialData.status === 'fulfilled') setCache(CACHE_KEYS.socialLinks, fresh.socialLinks);
        if (eduData.status === 'fulfilled') setCache(CACHE_KEYS.education, fresh.education);
        if (projData.status === 'fulfilled') setCache(CACHE_KEYS.projects, fresh.projects);

        if (isMounted) {
          setData(fresh);
        }
      } catch (err) {
        console.error('❌ Failed to fetch data:', err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAllData();

    return () => {
      isMounted = false;
    };
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
  const scrollToSection = useCallback((id: string) => {
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
    if (!data.projects.length) return ['All'];
    const cats = Array.from(new Set(data.projects.map((p) => p.category)));
    return ['All', ...cats.sort()];
  }, [data.projects]);

  const filteredProjects = useMemo(() => {
    return activeCategory === 'All'
      ? data.projects
      : data.projects.filter((p) => p.category === activeCategory);
  }, [data.projects, activeCategory]);

  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const showMore = useCallback((count = 3) => {
    setVisibleCount((prev) => prev + count);
  }, []);

  const changeCategory = useCallback((category: string) => {
    setActiveCategory(category);
    setVisibleCount(3);
  }, []);

  // ============================================
  // 🔹 CONTEXT VALUE
  // ============================================
  const value = useMemo<AppContextType>(
    () => ({
      // Data
      ...data,
      loading,
      hoveredIndex,
      setHoveredIndex,
      iconMap,

      // Project filtering
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
    }),
    [
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
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// ============================================
// 🔷 CUSTOM HOOK
// ============================================
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}