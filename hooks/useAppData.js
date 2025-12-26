"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

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

async function loadJson(url) {
  const res = await fetch(url, { cache: "force-cache" });
  if (!res.ok) throw new Error(`Failed: ${url}`);
  return res.json();
}

const safeArray = (value) => (Array.isArray(value) ? value : []);

export function useAppData() {
  const pathname = usePathname();
  const router = useRouter();
  const lang = useMemo(
    () => (pathname?.startsWith("/ar") ? "ar" : "en"),
    [pathname]
  );
  const changeLanguage = useCallback(
    (targetLang) => {
      if (!targetLang || targetLang === lang) return;

      if (targetLang === "ar") {
        const nextPath = pathname?.startsWith("/ar")
          ? pathname
          : `/ar${pathname === "/" ? "" : pathname}`;
        router.push(nextPath || "/ar");
      } else {
        const stripped = pathname?.replace(/^\/ar(?=\/|$)/, "") || "/";
        router.push(stripped || "/");
      }
    },
    [lang, pathname, router]
  );

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    pageName: {},
    certificationsData: [],
    educationData: [],
    navLabels: {},
    projects: [],
    sectionTitles: {},
    skills: [],
    socialLinks: [],
    training: [],
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const base = `/Data/${lang}`;
    const f = FILES[lang];

    Promise.all([
      loadJson(`${base}/${f.pageName}`),
      loadJson(`${base}/${f.certifications}`),
      loadJson(`${base}/${f.education}`),
      loadJson(`${base}/${f.navLabels}`),
      loadJson(`${base}/${f.projects}`),
      loadJson(`${base}/${f.sectionTitles}`),
      loadJson(`${base}/${f.skills}`),
      loadJson(`${base}/${f.socialLinks}`),
      loadJson(`${base}/${f.training}`),
    ])
      .then(
        ([
          pageNameRes,
          certificationsRes,
          educationRes,
          navLabelsRes,
          projectsRes,
          sectionTitlesRes,
          skillsRes,
          socialLinksRes,
          trainingRes,
        ]) => {
          if (cancelled) return;

          const sectionTitles = sectionTitlesRes?.sectionTitles ?? {};

          setData({
            pageName: pageNameRes?.BageName ?? {},
            certificationsData: safeArray(certificationsRes?.certificationsData),
            educationData: safeArray(educationRes?.educationData),
            navLabels: navLabelsRes?.navLabels ?? {},
            projects: safeArray(projectsRes?.projects),
            sectionTitles,
            skills: safeArray(skillsRes?.skills),
            socialLinks: safeArray(socialLinksRes?.socialLinks),
            training: safeArray(trainingRes?.trainingData),
          });
          setLoading(false);
        }
      )
      .catch(() => {
        if (cancelled) return;
        setData({
          pageName: {},
          certificationsData: [],
          educationData: [],
          navLabels: {},
          projects: [],
          sectionTitles: {},
          skills: [],
          socialLinks: [],
          training: [],
        });
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [lang]);

  const HomeData = data.sectionTitles?.home ?? {};
  const SkillData = data.sectionTitles?.skillsSection ?? {};
  const ProjectData = data.sectionTitles?.project ?? {};
  const eduTitles = data.sectionTitles?.education ?? {};
  const certificationsSection = data.sectionTitles?.certificationsSection ?? {};

  return {
    ...data,
    lang,
    language: lang,
    loading,
    HomeData,
    SkillData,
    ProjectData,
    eduTitles,
    certificationsSection,
    badgeText: data.pageName?.HomeBage ?? "",
    SkillbadgeText: data.pageName?.SkillBade ?? "",
    ProjectbadgeText: data.pageName?.ProjectBade ?? "",
    EdubadgeText: data.pageName?.EduBade ?? "",
    certificateBadge: data.pageName?.certificateBade ?? "",
    gitBadgeText: data.pageName?.GitBade ?? "",
    eduData: data.educationData,
    changeLanguage,
  };
}
