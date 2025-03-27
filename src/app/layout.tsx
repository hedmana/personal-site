import { ReactNode } from 'react';
import Navbar from "@/components/Navbar";

import './globals.css';

export const metadata = {
  title: 'Axel Hedman',
  description: 'Personal website of Axel Hedman',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className="bg-blue-100 text-gray-900">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
