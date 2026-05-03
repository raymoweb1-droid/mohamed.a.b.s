import type { Metadata } from "next";
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
  title: "Mohamed | Front-end Engineer & UI/UX Designer",
  description: "Senior Front-end Engineer specializing in high-performance web applications and premium UI/UX experiences. 3+ years of experience in React, Next.js, and Tailwind CSS.",
  keywords: ["Front-end Developer", "React Engineer", "Next.js Portfolio", "UI/UX Designer", "Morocco Developer"],
  authors: [{ name: "Mohamed" }],
  openGraph: {
    title: "Mohamed | Front-end Engineer",
    description: "Creating modern, interactive, and high-performance web applications.",
    url: "https://mohamed.me", // Placeholder, user should update
    siteName: "Mohamed's Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohamed | Front-end Engineer",
    description: "Creating modern, interactive, and high-performance web applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}

