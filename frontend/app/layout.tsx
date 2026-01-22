import type { Metadata } from "next";
import { Toaster } from 'react-hot-toast';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StockFlow",
  description: "StockFlow",
};

import { AuthProvider } from "@/context/AuthContext";
import { WhitelabelProvider } from "@/context/WhitelabelContext";
import WhitelabelWrapper from "@/components/layout/WhitelabelWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WhitelabelProvider>
            <WhitelabelWrapper>
                <AuthProvider>
                    <Toaster position="top-right" />
                    {children}
                </AuthProvider>
            </WhitelabelWrapper>
        </WhitelabelProvider>
      </body>
    </html>
  );
}
