import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://sopgenius.vercel.app";

  const templates = [
    "instrument-sterilization-sop-template",
    "osha-exposure-control-plan-sop-template",
    "hipaa-patient-records-sop-template",
    "operatory-turnover-sop-template",
    "dental-emergency-response-sop-template",
    "infection-control-ppe-sop-template",
    "new-patient-intake-sop-template",
    "dental-lab-case-communication-sop-template",
  ];

  const guides = [
    "how-to-write-a-dental-sop",
    "dental-osha-compliance-checklist",
    "hipaa-compliance-dental-office",
    "dental-sterilization-protocol-guide",
    "dental-emergency-preparedness",
    "dental-front-office-sop-guide",
  ];

  const useCases = [
    "solo-dental-practice-sop-generator",
    "multi-location-dso-sop-generator",
    "dental-compliance-sop-generator",
    "dental-office-manager-sop-generator",
  ];

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/features`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/templates`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/help`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/security`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ...templates.map((slug) => ({
      url: `${baseUrl}/templates/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...guides.map((slug) => ({
      url: `${baseUrl}/guides/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...useCases.map((slug) => ({
      url: `${baseUrl}/use-cases/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
