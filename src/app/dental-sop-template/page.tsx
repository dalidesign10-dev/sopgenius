import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  ShieldCheck,
  Clipboard,
  Users,
  ArrowRight,
  Stethoscope,
  Phone,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Free Dental SOP Templates | Download & Customize | SOPGenius",
  description:
    "Free dental SOP templates for infection control, sterilization, patient intake, OSHA compliance, and front office workflows. Customize and export in minutes.",
};

const templateCategories = [
  {
    icon: Stethoscope,
    title: "Clinical Procedures",
    templates: [
      "Instrument sterilization protocol",
      "Infection control and PPE procedures",
      "Radiograph exposure and processing",
      "Emergency medical response",
      "Dental unit waterline maintenance",
      "Amalgam waste disposal",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Compliance and Safety",
    templates: [
      "OSHA Bloodborne Pathogen Exposure Control",
      "HIPAA patient privacy procedures",
      "Hazard communication program",
      "CDC infection prevention checklist",
      "Employee injury and incident reporting",
      "Annual OSHA training documentation",
    ],
  },
  {
    icon: Phone,
    title: "Front Office Workflows",
    templates: [
      "New patient intake and registration",
      "Insurance verification process",
      "Appointment scheduling and confirmation",
      "Patient recall and follow-up",
      "Accounts receivable and collections",
      "End-of-day closing procedures",
    ],
  },
  {
    icon: Users,
    title: "HR and Onboarding",
    templates: [
      "New hire orientation checklist",
      "Role-specific training plan",
      "Employee handbook acknowledgment",
      "Performance review procedures",
      "Dress code and professional standards",
      "Termination and offboarding process",
    ],
  },
];

export default function DentalSopTemplatePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-green-50 to-white px-6 py-20 text-center">
          <Badge variant="secondary" className="mb-4">
            Free templates included
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Free Dental SOP Templates for Every Practice Workflow
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Stop starting from scratch. Pick a dental SOP template, customize it
            to your practice, and have a polished procedure document ready in
            minutes instead of hours.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/signup">
                Try Templates Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/templates">Browse All Templates</Link>
            </Button>
          </div>
        </section>

        {/* What makes a good template */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            What Makes a Good Dental SOP Template
          </h2>
          <p className="mt-4 text-muted-foreground">
            A dental SOP template is only useful if your team can follow it
            without asking questions. That means clear steps, assigned roles,
            safety callouts, and compliance references baked in from the start.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: Clipboard,
                title: "Step-by-Step Structure",
                desc: "Numbered steps with clear action items. No ambiguity about what happens next.",
              },
              {
                icon: Users,
                title: "Role Assignments",
                desc: "Every step specifies who is responsible — dentist, hygienist, assistant, or front desk.",
              },
              {
                icon: ShieldCheck,
                title: "Compliance References",
                desc: "Built-in references to OSHA, HIPAA, and CDC guidelines so you know the why behind each step.",
              },
              {
                icon: BookOpen,
                title: "Revision Tracking",
                desc: "Date created, last revised, and approved by fields are included. Auditors look for these.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <item.icon className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Template categories */}
        <section className="border-y bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold">
              Dental SOP Template Categories
            </h2>
            <p className="mt-4 text-muted-foreground">
              We organize templates into four categories that cover everything a
              dental practice needs. Pick a starting point, then customize the
              details for your office.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {templateCategories.map((cat) => (
                <Card key={cat.title}>
                  <CardHeader>
                    <cat.icon className="h-8 w-8 text-primary" />
                    <h3 className="mt-2 text-lg font-semibold">{cat.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {cat.templates.map((t) => (
                        <li
                          key={t}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <FileText className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How to customize */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            How to Customize a Dental SOP Template
          </h2>
          <p className="mt-4 text-muted-foreground">
            A template is a starting point, not a finished product. Here is how
            to make it yours:
          </p>
          <ol className="mt-8 space-y-6">
            {[
              {
                title: "Pick the closest template",
                desc: "Choose the template that matches your workflow. It does not need to be exact — close enough works.",
              },
              {
                title: "Add your practice details",
                desc: "Insert your practice name, specific equipment brands, product names, and team member titles.",
              },
              {
                title: "Adjust the steps",
                desc: "Add, remove, or reorder steps to match how your team actually does the work. Do not document how it should work in theory.",
              },
              {
                title: "Review with your team",
                desc: "Have the people who do the work read through it. They will catch what you missed.",
              },
              {
                title: "Export and distribute",
                desc: "Download as PDF for your compliance binder or share digitally through SOPGenius so everyone has the latest version.",
              },
            ].map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section className="border-y bg-green-50 px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">
              Stop Formatting. Start Documenting.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every minute you spend wrestling with Word formatting is a minute
              you could spend running your practice. Pick a dental SOP template,
              customize it, and move on with your day.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/signup">
                  Get Free Templates <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Related links */}
        <section className="border-t bg-gray-50 px-6 py-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl font-semibold">Related Resources</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Link
                href="/dental-sop-software"
                className="text-primary underline-offset-4 hover:underline"
              >
                Dental SOP Software
              </Link>
              <Link
                href="/dental-office-sops"
                className="text-primary underline-offset-4 hover:underline"
              >
                Complete Guide to Dental Office SOPs
              </Link>
              <Link
                href="/dental-compliance-software"
                className="text-primary underline-offset-4 hover:underline"
              >
                Dental Compliance Software
              </Link>
              <Link
                href="/guides"
                className="text-primary underline-offset-4 hover:underline"
              >
                SOP Guides for Dental Practices
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
