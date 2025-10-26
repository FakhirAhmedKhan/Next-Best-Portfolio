"use client";
import { EndMessage } from "./components/EndMessage";
import { EmailMe } from "./components/EmailMe";
import { FooterHeading } from "./components/Heading";
import GitHubCalendarSimple from "@/UI/githubCard";
import { HeadIng } from "@/UI/Head";
import { Badge } from "@/UI/Badge";
import { Zap } from "lucide-react";
import { useState } from "react";

export default function FooterSection() {
  const [calendarData, setCalendarData] = useState(null);

  return (
    <footer className="flex flex-col min-h-screen items-center justify-center px-4 text-center space-y-6">
      <HeadIng
        Tittle="Contribution Activity"
        Pragaphic="Tracking my creative coding energy across the year"
      />

      {calendarData && (
        <Badge
          Icon={Zap}
          BageName="Total Contributions"
          value={calendarData.totalContributions.toLocaleString()}
          className="px-4 py-2 text-sm"
        />
      )}

      <GitHubCalendarSimple onDataLoaded={setCalendarData} />

      <FooterHeading />
      <EmailMe />
      <EndMessage />
    </footer>
  );
}
