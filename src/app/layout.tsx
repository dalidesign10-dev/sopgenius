import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://dentisop.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "DentiSOP — The Operations System Built for Dental Practices",
    template: "%s | DentiSOP",
  },
  description:
    "Document, standardise, and train on every procedure in your dental practice. OSHA, HIPAA, and CDC-aligned SOPs — generated in seconds. Start your free pilot.",
  keywords: [
    "dental sop software",
    "dental sop template",
    "dental office policy and procedure manual",
    "dental compliance software",
    "dental office procedures",
    "osha dental compliance",
    "hipaa dental office",
    "dental staff training software",
  ],
  openGraph: {
    title: "DentiSOP — The Operations System Built for Dental Practices",
    description:
      "Document, standardise, and train on every procedure in your dental practice. OSHA, HIPAA, and CDC-aligned SOPs — generated in seconds.",
    type: "website",
    siteName: "DentiSOP",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "DentiSOP — The Operations System Built for Dental Practices",
    description:
      "Document, standardise, and train on every procedure in your dental practice. OSHA, HIPAA, and CDC-aligned SOPs — generated in seconds.",
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
  name: "DentiSOP",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "The operations system built for dental practices. Document, standardise, and train on every clinical, administrative, and compliance procedure.",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Starter Plan",
    },
    {
      "@type": "Offer",
      price: "97",
      priceCurrency: "USD",
      name: "Practice Plan",
    },
    {
      "@type": "Offer",
      price: "197",
      priceCurrency: "USD",
      name: "Group Plan",
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
