import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://sopgenius.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "SOPGenius — AI-Powered SOP Generator for Dental Practices",
    template: "%s | SOPGenius",
  },
  description:
    "Generate OSHA, HIPAA, and CDC-compliant standard operating procedures for your dental practice. Export to PDF or Word. Free to start.",
  keywords: [
    "dental sop generator",
    "dental office sop template",
    "dental practice standard operating procedures",
    "osha dental compliance",
    "hipaa dental sop",
    "dental sterilization protocol",
    "dental office procedures",
  ],
  openGraph: {
    title: "SOPGenius — AI-Powered SOP Generator for Dental Practices",
    description:
      "Generate OSHA, HIPAA, and CDC-compliant SOPs for your dental practice in seconds.",
    type: "website",
    siteName: "SOPGenius",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "SOPGenius — AI-Powered SOP Generator for Dental Practices",
    description:
      "Generate OSHA, HIPAA, and CDC-compliant SOPs for your dental practice in seconds.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: baseUrl,
  },
};

// Organization structured data — only factual claims
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SOPGenius",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-powered SOP generator for dental practices. Generate OSHA, HIPAA, and CDC-compliant standard operating procedures.",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Free Plan",
    },
    {
      "@type": "Offer",
      price: "49",
      priceCurrency: "USD",
      name: "Solo Plan",
    },
    {
      "@type": "Offer",
      price: "99",
      priceCurrency: "USD",
      name: "Practice Plan",
    },
    {
      "@type": "Offer",
      price: "249",
      priceCurrency: "USD",
      name: "DSO Plan",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
