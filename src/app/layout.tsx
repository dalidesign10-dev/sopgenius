import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/shared/cookie-banner";

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
    "Dental compliance and SOP software for practice owners and office managers. Find documentation gaps, generate OSHA- and HIPAA-referenced procedures, assign them to staff, and track read acknowledgments. Free to start.",
  keywords: [
    "dental compliance software",
    "dental SOP software",
    "dental office policies and procedures",
    "HIPAA compliance dental practice",
    "OSHA compliance dental office",
    "dental staff training software",
    "dental procedure documentation software",
    "infection control dental checklist",
    "dental office policy and procedure manual",
    "dental SOP template",
  ],
  openGraph: {
    title: "DentiSOP — Dental Compliance and SOP Software",
    description:
      "Find documentation gaps, generate OSHA- and HIPAA-referenced procedures, assign them to staff, and track acknowledgments. Built for dental practices.",
    type: "website",
    siteName: "DentiSOP",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "DentiSOP — Dental Compliance and SOP Software",
    description:
      "Find documentation gaps, generate OSHA- and HIPAA-referenced procedures, assign them to staff, and track acknowledgments. Built for dental practices.",
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
    "Dental compliance and SOP software. Find documentation gaps, generate procedures, assign to staff, and track acknowledgments.",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Starter",
    },
    {
      "@type": "Offer",
      price: "79",
      priceCurrency: "USD",
      name: "Clinic",
    },
    {
      "@type": "Offer",
      price: "149",
      priceCurrency: "USD",
      name: "Multi-Clinic",
    },
    {
      "@type": "Offer",
      price: "597",
      priceCurrency: "USD",
      name: "Enterprise",
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
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
