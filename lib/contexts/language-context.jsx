// 1. Create LanguageContext (lib/contexts/language-context.jsx)
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import enData from '@/public/Data/en.json';
import arData from '@/public/Data/ar.json';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [data, setData] = useState(enData);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    setData(savedLanguage === 'ar' ? arData : enData);
    document.documentElement.lang = savedLanguage;
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';

    const handleLanguageChange = (event) => {
      const newLang = event.detail;
      setLanguage(newLang);
      setData(newLang === 'ar' ? arData : enData);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setData(lang === 'ar' ? arData : enData);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    window.dispatchEvent(new CustomEvent('languageChange', { detail: lang }));
  };

  return (
    <LanguageContext.Provider value={{ language, data, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};