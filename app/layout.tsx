import './globals.css';
import type { Metadata } from 'next';
import { AppProvider } from '@/lib/contexts/app-context';
import FooterPage from '@/components/FOOTER/components/footer';
import { Animated } from '@/UI/Animated';
import  Navbar  from './header/Navbar';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Modern portfolio website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased dark:text-gray-100 bg-purple-400/10 dark:bg-purple-600/10">
        <AppProvider>
          <Navbar />
          {children}
          <Animated />
          <footer>
            <FooterPage />
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
