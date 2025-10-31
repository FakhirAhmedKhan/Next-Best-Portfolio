'use client';
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { GraduationCap, BookOpen, Code, Sparkles, Home, User, Briefcase } from 'lucide-react';
import enData from '@/public/Data/en.json';

// ============================================
// 🔷 CONSTANTS
// ============================================

const ICON_MAP = { GraduationCap, BookOpen, Code, Sparkles };
const IS_BROWSER = typeof window !== 'undefined';
const INITIAL_VISIBLE_COUNT = 3;
const SCROLL_THRESHOLD = 50;
const SCROLL_OFFSET = 200;
const MENU_CLOSE_DELAY = 250;

// ============================================
// 🔷 NAVIGATION ITEMS (Dynamic with language support)
// ============================================

const createNavItems = (labels) => [
  { id: "home", label: labels?.home || "Home", href: "/", icon: Home },
  { id: "education", label: labels?.education || "Education", href: "/EduPage", icon: User },
  { id: "skills", label: labels?.skills || "Skills", href: "/SkillPage", icon: Code },
  { id: "projects", label: labels?.projects || "Projects", href: "/ProjectPage", icon: Briefcase },
];

// ============================================
// 🔷 CONTEXT
// ============================================

const AppContext = createContext(undefined);

// ============================================
// 🔷 HELPER FUNCTIONS
// ============================================

const extractCategories = (projects) => {
  if (!projects?.length) return ['All', 'SAAS'];
  const uniqueCategories = [...new Set(projects.map(p => p.category).filter(Boolean))];
  return ['All', ...uniqueCategories.sort()];
};

const getInitialCategory = (projects) => {
  if (!projects?.length) return 'All';
  return projects.some(p => p.category === 'SAAS') ? 'SAAS' : 'All';
};

const findActiveSection = (navItems, scrollPosition) => {
  for (let i = navItems.length - 1; i >= 0; i--) {
    const section = document.getElementById(navItems[i].id);
    if (section && section.offsetTop <= scrollPosition) {
      return navItems[i].id;
    }
  }
  return navItems[0]?.id || '';
};

// ============================================
// 🔷 PROVIDER
// ============================================

export function AppProvider({ children }) {
  // Navigation Items (memoized)
  const navItems = useMemo(() => createNavItems(enData.navLabels), []);

  // Core State
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Project Filtering State
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  // UI State
  const [activeSection, setActiveSection] = useState(navItems[0]?.id || '');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // ============================================
  // 🔹 LOAD DATA
  // ============================================
  
  useEffect(() => {
    try {
      const loadedProjects = enData.projects || [];
      setProjects(loadedProjects);
      
      // Set initial category based on available projects
      const initialCategory = getInitialCategory(loadedProjects);
      setActiveCategory(initialCategory);
    } catch (error) {
      console.error('Failed to load data:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // ============================================
  // 🔹 SCROLL HANDLING
  // ============================================
  
  useEffect(() => {
    if (!IS_BROWSER) return;

    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        // Update scrolled state
        setScrolled(scrollY > SCROLL_THRESHOLD);
        
        // Update active section
        const scrollPosition = scrollY + SCROLL_OFFSET;
        const newActiveSection = findActiveSection(navItems, scrollPosition);
        setActiveSection(newActiveSection);

        ticking = false;
      });
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // ============================================
  // 🔹 NAVIGATION
  // ============================================
  
  const scrollToSection = useCallback((id) => {
    if (!IS_BROWSER) return;

    setIsMenuOpen(false);
    
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(id);
      }
    }, MENU_CLOSE_DELAY);
  }, []);

  // ============================================
  // 🔹 PROJECT FILTERING
  // ============================================
  
  const categories = useMemo(() => extractCategories(projects), [projects]);

  const filteredProjects = useMemo(() => {
    if (!projects.length) return [];
    return activeCategory === 'All' 
      ? projects 
      : projects.filter(p => p.category === activeCategory);
  }, [projects, activeCategory]);

  const visibleProjects = useMemo(
    () => filteredProjects.slice(0, visibleCount),
    [filteredProjects, visibleCount]
  );

  const hasMoreProjects = useMemo(
    () => visibleCount < filteredProjects.length,
    [visibleCount, filteredProjects.length]
  );

  const changeCategory = useCallback((category) => {
    if (category === activeCategory) return;
    
    setActiveCategory(category);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [activeCategory]);

  const showMore = useCallback((count = INITIAL_VISIBLE_COUNT) => {
    setVisibleCount(prev => Math.min(prev + count, filteredProjects.length));
  }, [filteredProjects.length]);

  const resetVisibleCount = useCallback(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, []);

  // ============================================
  // 🔹 MENU CONTROL
  // ============================================
  
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // ============================================
  // 🔹 CONTEXT VALUE
  // ============================================
  
  const contextValue = useMemo(() => ({
    // Data
    projects,
    loading,
    
    // Icon Map
    iconMap: ICON_MAP,
    
    // Project Filtering
    activeCategory,
    categories,
    filteredProjects,
    visibleProjects,
    hasMoreProjects,
    changeCategory,
    showMore,
    resetVisibleCount,
    
    // Navigation
    navItems,
    activeSection,
    scrollToSection,
    
    // UI State
    isMenuOpen,
    scrolled,
    hoveredIndex,
    setHoveredIndex,
    toggleMenu,
    closeMenu,
    setIsMenuOpen,
  }), [
    projects,
    loading,
    activeCategory,
    categories,
    filteredProjects,
    visibleProjects,
    hasMoreProjects,
    changeCategory,
    showMore,
    resetVisibleCount,
    navItems,
    activeSection,
    scrollToSection,
    isMenuOpen,
    scrolled,
    hoveredIndex,
    toggleMenu,
    closeMenu,
  ]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// ============================================
// 🔷 CUSTOM HOOK
// ============================================

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}

// ============================================
// 🔷 EXPORTS
// ============================================

export { ICON_MAP as iconMap };
export const navItems = createNavItems(enData.navLabels);