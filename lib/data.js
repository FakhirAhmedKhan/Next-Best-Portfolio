import fs from 'fs/promises';
import path from 'path';

const FILES = {
  en: {
    pageName: "BageName.json",
    certifications: "certificationsData.json",
    education: "educationData.json",
    navLabels: "navLabels.json",
    projects: "projectsData.json",
    sectionTitles: "sectionTitles.json",
    skills: "SkillData.json",
    socialLinks: "socialLinks.json",
    training: "trainingData.json",
  },
  ar: {
    pageName: "BageName.json",
    certifications: "certificationsData.json",
    education: "EduData.json",
    navLabels: "navLabels.json",
    projects: "ProData.json",
    sectionTitles: "SectionTitles.json",
    skills: "SkillsData.json",
    socialLinks: "SocialLinks.json",
    training: "TrainingData.json",
  },
};

const safeArray = (value) => (Array.isArray(value) ? value : []);

export async function getPageData(lang, key) {
  const validLang = lang === 'ar' ? 'ar' : 'en';
  const fileName = FILES[validLang][key];
  if (!fileName) return null;
  
  const filePath = path.join(process.cwd(), 'public/Data', validLang, fileName);
  
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const json = JSON.parse(fileContents);
    
    // Normalize data based on key to match previous useAppData structure
    if (key === 'pageName') return json.BageName ?? {};
    if (key === 'projects') return safeArray(json.projects);
    if (key === 'skills') return safeArray(json.skills);
    if (key === 'socialLinks') return safeArray(json.socialLinks);
    if (key === 'sectionTitles') return json.sectionTitles ?? {};
    if (key === 'education') return safeArray(json.educationData);
    if (key === 'certifications') return safeArray(json.certificationsData);
    if (key === 'training') return safeArray(json.trainingData);
    if (key === 'navLabels') return json.navLabels ?? {};
    
    return json;
  } catch (error) {
    console.error(`Error loading data for ${key}:`, error);
    return null;
  }
}
