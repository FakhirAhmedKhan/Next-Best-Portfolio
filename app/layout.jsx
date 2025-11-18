import './globals.css';
import { AppProvider } from '@/lib/contexts/app-context';
// import { LanguageProvider } from '@/lib/contexts/language-context';
import FooterPage from '@/components/FOOTER/components/footer';
import { Animated } from '@/UI/Animated';
import Navbar from './Header/Navbar.jsx';
import { LanguageProvider } from '@/lib/contexts/language-context';

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
            <footer>
              <FooterPage />
            </footer>
          </LanguageProvider>
        </AppProvider>
      </body>
    </html>
  );
}
