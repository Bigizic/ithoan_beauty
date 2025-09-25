'use client';

import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '../store';
import { NavbarSection } from '../components/NavbarSection/NavbarSection';
import { FooterSection } from '../components/FooterSection/FooterSection';
import ScrollToTop from '../components/ScrollToTop';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Tohanniees Beauty - Experience the glow</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_io/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_io/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon_io/favicon.ico" />
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <ScrollToTop />
          <NavbarSection />
          <main>{children}</main>
          <FooterSection />
        </Provider>
      </body>
    </html>
  );
}