"use client";

import { useMemo, useState } from "react";
import {
  BookOpen,
  Code,
  Database,
  Layout,
  Monitor,
  Palette,
  Smartphone,
  Terminal,
} from "lucide-react";
export default function useCertifications({ certificationsData = [], certificationsSection = {}, certificateBadge = "", language = "en" } = {}) {

  const iconMap = useMemo(
    () => ({
      Database,
      Palette,
      Code,
      Terminal,
      BookOpen,
      Layout,
      Monitor,
      Smartphone,
    }),
    []
  );

  const [selectedFilter, setSelectedFilter] = useState("all");

  const issuers = useMemo(() => {
    const list = certificationsData
      .map((c) => (c?.issuer ?? "").trim())
      .filter(Boolean);

    return ["all", ...Array.from(new Set(list))];
  }, [certificationsData]);

  const filteredCerts = useMemo(() => {
    if (selectedFilter === "all") return certificationsData;
    return certificationsData.filter(
      (c) => (c?.issuer ?? "").trim() === selectedFilter
    );
  }, [selectedFilter, certificationsData]);

  return {
    language,
    iconMap,
    certificationsData,
    certificationsSection,
    certificateBadge,
    issuers,
    selectedFilter,
    setSelectedFilter,
    filteredCerts,
  };
}
