"use client";
import GitHubCalendarSimple from "./githubCard";
import { HeadIng } from "@/UI/Head";
import { BsGithub } from "react-icons/bs";
import { EmailMe } from "./EmailMe";
import { SectionSTyle } from "@/UI/motionConfige";
import { useState } from "react";
import { Badge } from "@/UI/Badge";

export default function FooterSection() {
  const [calendarData, setCalendarData] = useState(null);

  return (
    <footer id="contact" className={SectionSTyle}>
      <HeadIng
        Tittle="GitHub Contributions"
        Pragaphic="Where ideas turn into code — crafted with React, refined with Tailwind, and powered by creativity."
      />

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