import { Inter } from 'next/font/google';
import './globals.css';
import { GeistSans } from 'geist/font/sans';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Candidabio',
  description: 'Candida BioSciences',
};

import { ContextProvider } from './context';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
