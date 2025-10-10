import "./globals.css";
import React from "react";
import HeadSection from "./header/Navbar";

export const metadata = {
  title: "My Portfolio",
  description: "A minimal multi-page Next.js portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <HeadSection />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}