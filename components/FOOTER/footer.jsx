"use client";
import GitHubCalendarSimple from "./githubCard";
import { BsGithub } from "react-icons/bs";
import { EmailMe } from "./EmailMe";
import { SectionSTyle } from "@/UI/motionConfige";
import { useState } from "react";
import { Badge } from "@/hooks/DaynamicImport";
import { useAppData } from "@/hooks/useAppData";

export default function FooterSection() {
  const [calendarData, setCalendarData] = useState(null);
  const { gitBadgeText } = useAppData();
  const badgeText = gitBadgeText || "Total Contributions";

  return (
    <footer id="contact" className={SectionSTyle}>

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
