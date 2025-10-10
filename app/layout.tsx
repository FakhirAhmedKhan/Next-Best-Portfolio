import "./globals.css";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "My Portfolio",
  description: "A minimal multi-page Next.js portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <nav className="flex gap-6 p-4 bg-gray-100 dark:bg-gray-900 shadow">
          <Link href="/home">Home</Link>
          <Link href="/education">Education</Link>
          <Link href="/skills">Skills</Link>
          <Link href="/projects">Projects</Link>
        </nav>

        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}