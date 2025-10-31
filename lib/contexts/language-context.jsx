'use client';
import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import enData from '@/public/Data/en.json';
import arData from '@/public/Data/ar.json';

const LanguageContext = createContext(undefined);

const LANGUAGE_KEY = 'language';
const DEFAULT_LANGUAGE = 'en';
const LANGUAGE_DATA_MAP = {
  en: enData,
  ar: arData,
};

// Custom hook with proper error handling
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

// Helper function to update document attributes
const updateDocumentLanguage = (lang) => {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
};

// Helper function to get initial language
const getInitialLanguage = () => {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  
  try {
    return localStorage.getItem(LANGUAGE_KEY) || DEFAULT_LANGUAGE;
  } catch (error) {
    console.warn('Failed to read language from localStorage:', error);
    return DEFAULT_LANGUAGE;
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch - load from localStorage after mount
  useEffect(() => {
    const savedLanguage = getInitialLanguage();
    setLanguage(savedLanguage);
    updateDocumentLanguage(savedLanguage);
    setMounted(true);
  }, []);

  // Get current language data
  const data = useMemo(() => LANGUAGE_DATA_MAP[language] || enData, [language]);

  // Memoize all derived values to prevent unnecessary recalculations
  const derivedData = useMemo(() => ({
    badgeText: data.BageName?.ProjectBade || 'Default Badge',
    projectSectionData: data.sectionTitles?.project || {},
    skills: data.skills || [],
    skillBadgeText: data.BageName?.SkillBade || 'Default Badge',
    skillsSectionTitle: data.sectionTitles?.skillsSection || {},
    homeBadgeText: data.BageName?.HomeBage || 'Default Badge',
    homeData: data.sectionTitles?.home || {},
    eduData: data.sectionTitles?.education || {},
    eduDataText: data.educationData || [],
    socialLinks: data.socialLinks || [],
    footerBadgeText: data.BageName?.GitBade || 'Default Badge',
    footerData: data.sectionTitles?.footer || {},
  }), [data]);

  // Memoize language change function
  const changeLanguage = useCallback((lang) => {
    if (lang !== 'en' && lang !== 'ar') {
      console.warn(`Invalid language: ${lang}. Falling back to ${DEFAULT_LANGUAGE}`);
      lang = DEFAULT_LANGUAGE;
    }

    if (lang === language) return; // Prevent unnecessary updates

    setLanguage(lang);
    updateDocumentLanguage(lang);

    try {
      localStorage.setItem(LANGUAGE_KEY, lang);
    } catch (error) {
      console.warn('Failed to save language to localStorage:', error);
    }

    // Dispatch custom event for cross-component communication
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
  }, [language]);

  // Initialize language on mount and listen for changes
  useEffect(() => {
    if (!mounted) return;

    updateDocumentLanguage(language);

    const handleLanguageChange = (event) => {
      const newLang = event.detail;
      if (newLang !== language) {
        setLanguage(newLang);
        updateDocumentLanguage(newLang);
      }
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, [language, mounted]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      language,
      data,
      changeLanguage,
      mounted,
      ...derivedData,
    }),
    [language, data, changeLanguage, mounted, derivedData]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};