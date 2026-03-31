import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InfinityGZ | Premium Gamezone",
  description: "Book your setup, join tournaments, and power up your gaming experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-gaming-bg text-white font-sans overflow-x-hidden selection:bg-neon-cyan selection:text-black">
        <CustomCursor />
        <Navbar />
        <AuthProvider>
          {children}
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
