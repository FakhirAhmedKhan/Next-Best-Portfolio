import './globals.css';
import { Animated } from '@/UI/Animated';
import Navbar from "@/components/HEADER/Navbar"
import FooterSection from '@/components/BottomPart/footerSection';
export const metadata = {
  title: 'Portfolio | Modern Web Developer',
  description: 'Modern portfolio website showcasing web development projects and skills',
  keywords: 'portfolio, web developer, Next.js, React, JavaScript',
  authors: [{ name: 'Fakhir Ahmed Khan' }],
  openGraph: {
    title: 'Portfolio | Modern Web Developer',
    description: 'Modern portfolio website showcasing web development projects and skills',
    type: 'website',
  },
};

import { getPageData } from "@/lib/data";

export default async function RootLayout({ children }) {
  const [navLabels, sectionTitles, pageNameData] = await Promise.all([
    getPageData('en', 'navLabels'),
    getPageData('en', 'sectionTitles'),
    getPageData('en', 'pageName')
  ]);

  const footerData = sectionTitles?.footer ?? {};
  const gitBadgeText = pageNameData?.GitBade ?? "";

  return (
    <html lang="en">
      <body className=" no-scrollbar overflow-y-auto min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4">
        <Navbar navLabels={navLabels} />
        {children}
        <Animated />
        <FooterSection gitBadgeText={gitBadgeText} FooterData={footerData} />
      </body>
    </html>
  );
}
