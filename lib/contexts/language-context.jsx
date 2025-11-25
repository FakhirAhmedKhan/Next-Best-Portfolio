'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import enData from '@/public/Data/en.json';
import arData from '@/public/Data/ar.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [data, setData] = useState(enData);

  // Load saved language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'en';
    applyLanguage(savedLang);

    const handleLangEvent = (event) => {
      applyLanguage(event.detail);
    };

    window.addEventListener("languageChange", handleLangEvent);
    return () => window.removeEventListener("languageChange", handleLangEvent);
  }, []);

  const applyLanguage = (lang) => {
    const selectedData = lang === 'ar' ? arData : enData;
    setLanguage(lang);
    setData(selectedData);

    localStorage.setItem('language', lang);

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const changeLanguage = (lang) => {
    applyLanguage(lang);
    window.dispatchEvent(new CustomEvent("languageChange", { detail: lang }));
  };

  // Extracted sections to avoid repeating `.data...`
  const badgeText = data?.BageName?.HomeBage || "";
  const HomeData = data?.sectionTitles?.home || {};
  const eduTitles = data.sectionTitles.education;  // ✔️ for Heading
  const eduData = data.educationData;
  return (
    <LanguageContext.Provider
      value={{
        language,
        data,
        changeLanguage,
        badgeText,
        HomeData,
        eduData,
        eduTitles,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
