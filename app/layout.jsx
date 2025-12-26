import './globals.css';
import { AppProvider } from '@/lib/contexts/app-context';
import { Animated } from '@/UI/Animated';
import { LanguageProvider } from '@/lib/contexts/language-context';
import Navbar from "@/components/HEADER/Navbar"
import FooterSection from "@/components/FOOTER/footer"

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 px-4">
        <AppProvider>
          <LanguageProvider>
            <Navbar />
            {children}
            <Animated />
            <FooterSection />
          </LanguageProvider>
        </AppProvider>
      </body>
    </html>
  );
}
