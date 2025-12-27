"use client";
import GitHubCalendarSimple from "./githubCard";
import { BsGithub } from "react-icons/bs";
import { EmailMe } from "./EmailMe";
import { SectionSTyle } from "@/UI/motionConfige";
import { useState } from "react";
import Badge from "@/UI/Badge";
import { useAppData } from "@/hooks/useAppData";

export default function FooterSection() {
  const [calendarData, setCalendarData] = useState(null);
  const { gitBadgeText } = useAppData();
  const badgeText = gitBadgeText || "Total Contributions";

  return (
    <footer id="contact" className={SectionSTyle}>

      <span className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-fuchsia-600 via-pink-600 to-violet-600"></span>
      <div className=" ml-4 sm:ml-6 lg:ml-8 mb-4 sm:mb-6 lg:mb-8 flex justify-center items-center gap-3">
        {calendarData?.totalContributions && (
          <Badge
            Icon={BsGithub}
            BageName={badgeText}
            value={calendarData.totalContributions.toLocaleString()}
            className="px-4 py-2 text-sm"
          />
        )}
      </div>

      <GitHubCalendarSimple onDataLoaded={setCalendarData} />

      <EmailMe />
    </footer>
  );
}
