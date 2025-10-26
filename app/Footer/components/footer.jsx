"use client";
import GitHubCalendarSimple from "./githubCard";
import { HeadIng } from "@/UI/Head";
import { Badge } from "@/UI/Badge";
import { BsGithub } from "react-icons/bs";
import { useState } from "react";
import { EmailMe } from "./EmailMe";
import { SectionSTyle } from "@/UI/motionConfige";

export default function FooterSection() {
  const [calendarData, setCalendarData] = useState(null);

  return (
    <footer className={SectionSTyle}>
      <HeadIng
        Tittle="Contributions"
        Pragaphic="Where ideas turn into code designed with React, polished with Tailwind CSS."
      />

      {calendarData && (
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
