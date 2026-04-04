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
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dental SOP Software That Actually Gets Used | DentiSOP",
  description:
    "Dental SOP software built for real practices. Generate OSHA, HIPAA, and CDC compliant SOPs in minutes. Stop losing time to Word docs your team ignores.",
};

export default function DentalSopSoftwarePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-blue-50 to-white px-6 py-20 text-center">
          <Badge variant="secondary" className="mb-4">
            Built for dental practices
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Dental SOP Software That Actually Gets Used by Your Team
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Your team won&apos;t read a 40-page Word doc buried in a shared
            drive. DentiSOP gives you dental SOP software that creates clear,
            structured procedures your staff actually follows.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/signup">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/templates">Browse Dental Templates</Link>
            </Button>
          </div>
        </section>

        {/* Problem */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            Why Manual SOPs Fail in Dental Practices
          </h2>
          <p className="mt-4 text-muted-foreground">
            You already know you need SOPs. The problem is creating them,
            keeping them current, and getting your team to actually use them.
            Here is what we hear from office managers every week:
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              "SOPs live in a binder nobody opens",
              "Updating one procedure takes an entire afternoon",
              "New hires get verbal training and hope for the best",
              "OSHA inspector asks for documentation you can't find",
            ].map((problem) => (
              <div key={problem} className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <p>{problem}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="border-y bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold">
              How DentiSOP Dental SOP Software Works
            </h2>
            <p className="mt-4 text-muted-foreground">
              Describe your workflow in plain language. Get a structured,
              compliance-ready SOP back in under a minute.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Describe Your Procedure",
                  desc: "Type what your team does — sterilization, patient intake, emergency response — in your own words.",
                },
                {
                  step: "2",
                  title: "Generate the SOP",
                  desc: "DentiSOP structures it with proper headers, safety notes, compliance references, and role assignments.",
                },
                {
                  step: "3",
                  title: "Share with Your Team",
                  desc: "Export to PDF for your compliance binder or share digitally. Your team gets clear, step-by-step instructions.",
                },
              ].map((item) => (
                <Card key={item.step}>
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {item.step}
                    </div>
                    <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            Key Features for Dental Practices
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {[
              {
                icon: FileText,
                title: "Dental-Specific Templates",
                desc: "Start from templates designed for infection control, sterilization, radiographs, front desk workflows, and more.",
              },
              {
                icon: ShieldCheck,
                title: "OSHA, HIPAA, and CDC Alignment",
                desc: "Every SOP includes structured compliance references so you are never guessing about regulatory requirements.",
              },
              {
                icon: Clock,
                title: "Version History and Audit Trail",
                desc: "Every change is tracked. Compare versions, see who edited what, and restore previous versions instantly.",
              },
              {
                icon: Users,
                title: "Team Access by Role",
                desc: "Share SOPs with dentists, hygienists, assistants, and front desk staff. Everyone sees what they need.",
              },
              {
                icon: Zap,
                title: "Generate SOPs in Minutes",
                desc: "Stop spending afternoons formatting Word documents. Describe the procedure and get a finished SOP.",
              },
              {
                icon: CheckCircle,
                title: "PDF and Word Export",
                desc: "Download polished documents for compliance binders, onboarding packets, or state board audits.",
              },
            ].map((feature) => (
              <div key={feature.title} className="flex gap-4">
                <feature.icon className="mt-1 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Compliance */}
        <section className="border-y bg-blue-50 px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">
              Stay Audit-Ready Without the Busywork
            </h2>
            <p className="mt-4 text-muted-foreground">
              OSHA inspections happen. State board audits happen. When they do,
              you need documented procedures with revision dates, approval
              signatures, and consistent formatting. DentiSOP dental SOP
              software handles the structure so you can focus on patient care.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/signup">
                  Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing mention */}
        <section className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold">
            Simple Pricing for Practices of Any Size
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start with a free plan that includes 3 SOPs. Upgrade when your
            practice needs more. No contracts, no setup fees, cancel anytime.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild variant="outline" size="lg">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </section>

        {/* Related links */}
        <section className="border-t bg-gray-50 px-6 py-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xl font-semibold">Related Resources</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Link
                href="/dental-sop-template"
                className="text-primary underline-offset-4 hover:underline"
              >
                Free Dental SOP Templates
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
                href="/templates"
                className="text-primary underline-offset-4 hover:underline"
              >
                Browse All Templates
              </Link>
              <Link
                href="/guides"
                className="text-primary underline-offset-4 hover:underline"
              >
                SOP Guides for Dental Practices
              </Link>
              <Link
                href="/features"
                className="text-primary underline-offset-4 hover:underline"
              >
                All DentiSOP Features
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
