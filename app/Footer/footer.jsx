"use client";
import { EndMessage } from "./components/EndMessage";
import { EmailMe } from "./components/EmailMe";
import { FooterHeading } from "./components/Heading";
import GitHubCalendarSimple from "@/UI/githubCard";

export default function FooterSection() {
  return (
    <footer
      id="contact"
      className="flex flex-col min-h-screen items-center justify-center px-4 text-center space-y-6"
    >
      <GitHubCalendarSimple />
      <FooterHeading />

      <EmailMe />
      <EndMessage />

    </footer>
  );
}