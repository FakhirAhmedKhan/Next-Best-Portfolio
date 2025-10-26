import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AppProvider } from '@/Hook/useAppLogic';
import HeadSection from '@/app/header/Navbar';
import FooterPage from '@/app/footer/components/footer';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={`${inter.className} antialiased dark:text-gray-100`}>
        <AppProvider>
          <HeadSection />
          {children}
          <footer>
            <FooterPage />
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
