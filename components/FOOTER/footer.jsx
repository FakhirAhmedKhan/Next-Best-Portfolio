"use client";
import GitHubCalendarSimple from "./githubCard";
import { HeadIng } from "@/UI/Head";
import { BsGithub } from "react-icons/bs";
import { EmailMe } from "./EmailMe";
import { SectionSTyle } from "@/UI/motionConfige";
import { useState } from "react";
import  Badge  from "@/UI/Badge";
import { useLanguage } from "@/lib/contexts/language-context";

export default function FooterSection() {
  const [calendarData, setCalendarData] = useState(null);
  const { data } = useLanguage();
  const badgeText = data.BageName?.GitBade || "Default Badge";
  const FooterData = data.sectionTitles?.footer || {};

  return (
    <footer id="contact" className={SectionSTyle}>
      <HeadIng Tittle={FooterData.title} Pragaphic={FooterData.paragraph} />

      {calendarData?.totalContributions && (
        <Badge
          Icon={BsGithub}
          BageName={badgeText}
          value={calendarData.totalContributions.toLocaleString()}
          className="px-4 py-2 text-sm"
        />
      )}

      <GitHubCalendarSimple onDataLoaded={setCalendarData} />

      <EmailMe />
    </footer>
  );
}