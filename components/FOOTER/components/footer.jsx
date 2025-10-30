"use client";
import GitHubCalendarSimple from "./githubCard";
import { HeadIng } from "@/UI/Head";
import { BsGithub } from "react-icons/bs";
import { EmailMe } from "./EmailMe";
import { SectionSTyle } from "@/UI/motionConfige";
import { useState } from "react";
import { Badge } from "@/UI/Badge";
import { useAppContext } from "@/lib/contexts/app-context";

export default function FooterSection() {
  const [calendarData, setCalendarData] = useState(null);
  const { sectionTitles } = useAppContext();


  return (
    <footer id="contact" className={SectionSTyle}>
      <HeadIng Tittle={sectionTitles.footer?.title} Pragaphic={sectionTitles.footer?.paragraph} />


      {calendarData?.totalContributions && (
        <Badge
          Icon={BsGithub}
          BageName="Total Contributions"
          value={calendarData.totalContributions.toLocaleString()}
          className="px-4 py-2 text-sm"
        />
      )}

      <GitHubCalendarSimple onDataLoaded={setCalendarData} />

      <EmailMe />
    </footer>
  );
}