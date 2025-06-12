import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

import "./globals.css";

export const metadata = {
  title: "Axel Hedman",
  description: "Personal website of Axel Hedman",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-white to-blue-200">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
