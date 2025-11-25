import './globals.css';
import { AppProvider } from '@/lib/contexts/app-context';
import { Animated } from '@/UI/Animated';
import { LanguageProvider } from '@/lib/contexts/language-context';
import Navbar from "@/components/HEADER/Navbar"
import FooterSection from "@/components/FOOTER/footer"
export const Metadata = {
  title: 'Portfolio',
  description: 'Modern portfolio website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{Metadata.title}</title>
        <meta name="description" content={Metadata.description} />
      </head>
      <body className="antialiased dark:text-gray-100">
        <AppProvider>
          <LanguageProvider>
            <Navbar />
            {children}
            {/* <Animated /> */}
            {/* <FooterSection /> */}
          </LanguageProvider>
        </AppProvider>
      </body>
    </html>
  );
}
