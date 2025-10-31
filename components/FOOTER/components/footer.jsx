"use client";
import GitHubCalendarSimple from "./githubCard";
import { HeadIng } from "@/UI/Head";
import { BsGithub } from "react-icons/bs";
import { EmailMe } from "./EmailMe";
import { SectionSTyle } from "@/UI/motionConfige";
import { useState } from "react";
import { Badge } from "@/UI/Badge";
import { useLanguage } from "@/lib/contexts/language-context";

export default function FooterSection() {
  const [calendarData, setCalendarData] = useState(null);

  const { FooterbadgeText ,footerData} = useLanguage();

  return (
    <footer id="contact" className={SectionSTyle}>
      <HeadIng Tittle={footerData.title} Pragaphic={footerData.paragraph} />

      {calendarData?.totalContributions && (
        <Badge
          Icon={BsGithub}
          BageName={FooterbadgeText}
          value={calendarData.totalContributions.toLocaleString()}
          className="px-4 py-2 text-sm"
        />
      )}

      <GitHubCalendarSimple onDataLoaded={setCalendarData} />

      <EmailMe />
    </footer>
  );
}