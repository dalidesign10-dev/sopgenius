import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SOPGenius — AI SOP Generator | Create Standard Operating Procedures in 60 Seconds",
  description:
    "Generate professional standard operating procedures with AI. SOPGenius creates detailed, compliant SOPs for any industry. Free to start, no credit card required.",
  keywords:
    "sop software, ai sop generator, sop creator, standard operating procedure software, sop automation, create sop, sop writing software, sop tools",
  openGraph: {
    title: "SOPGenius — AI SOP Generator",
    description:
      "Generate professional SOPs in 60 seconds with AI. Free to start.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
