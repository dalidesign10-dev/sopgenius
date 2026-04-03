import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  FileSearch,
  Clock,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  FileText,
  CalendarCheck,
  Users,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dental Compliance Software for OSHA, HIPAA & CDC | SOPGenius",
  description:
    "Dental compliance software that helps your practice stay audit-ready for OSHA, HIPAA, and CDC inspections. Generate compliant SOPs, track revisions, and document training.",
};

export default function DentalComplianceSoftwarePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-red-50 to-white px-6 py-20 text-center">
          <Badge variant="secondary" className="mb-4">
            Compliance documentation
          </Badge>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Dental Compliance Software for OSHA, HIPAA, and CDC Documentation
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            An OSHA inspector is not going to wait while you dig through a
            filing cabinet. SOPGenius keeps your compliance documentation
            organized, current, and accessible so you are ready when it matters.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/signup">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/features">See All Features</Link>
            </Button>
          </div>
        </section>

        {/* Compliance challenges */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            Compliance Is Hard Enough Without Bad Tools
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dental practices face compliance requirements from multiple agencies,
            each with different documentation standards. Most office managers are
            juggling these on top of scheduling, billing, and patient care. Here
            is what makes it so difficult:
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              "OSHA requires written, site-specific plans updated annually",
              "HIPAA demands documented policies, risk assessments, and breach procedures",
              "CDC guidelines for infection control change and your SOPs need to keep up",
              "State dental boards add their own requirements on top of federal mandates",
              "Documentation scattered across Word docs, binders, and email chains",
              "No way to prove when a procedure was last reviewed or who approved it",
            ].map((challenge) => (
              <div key={challenge} className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <p className="text-sm">{challenge}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Regulatory breakdown */}
        <section className="border-y bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold">
              What Each Agency Requires From Your Practice
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                {
                  agency: "OSHA",
                  color: "text-red-600",
                  requirements: [
                    "Written Exposure Control Plan",
                    "Hazard Communication Program",
                    "Safety Data Sheet accessibility",
                    "Annual bloodborne pathogen training",
                    "Injury and illness logs (OSHA 300)",
                    "Post-exposure evaluation procedures",
                  ],
                },
                {
                  agency: "HIPAA",
                  color: "text-blue-600",
                  requirements: [
                    "Written privacy policies",
                    "Security risk assessment",
                    "Employee training documentation",
                    "Business associate agreements",
                    "Breach notification procedures",
                    "Minimum necessary standard policies",
                  ],
                },
                {
                  agency: "CDC",
                  color: "text-green-600",
                  requirements: [
                    "Infection prevention protocols",
                    "Sterilization monitoring logs",
                    "Hand hygiene procedures",
                    "PPE selection and use",
                    "Dental unit waterline testing",
                    "Single-use device policies",
                  ],
                },
              ].map((reg) => (
                <Card key={reg.agency}>
                  <CardHeader>
                    <h3 className={`text-xl font-bold ${reg.color}`}>
                      {reg.agency}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {reg.requirements.map((req) => (
                        <li
                          key={req}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How SOPGenius helps */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            How SOPGenius Helps With Compliance Documentation
          </h2>
          <p className="mt-4 text-muted-foreground">
            SOPGenius is not a compliance consultant. It is dental compliance
            software that makes creating and maintaining your required
            documentation dramatically faster.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {[
              {
                icon: FileText,
                title: "Generate Compliant SOPs Fast",
                desc: "Describe your procedure in plain language. SOPGenius structures it with proper headers, compliance references, role assignments, and safety callouts.",
              },
              {
                icon: Clock,
                title: "Automatic Version History",
                desc: "Every edit is tracked with timestamps and user attribution. Compare versions side by side. Auditors want to see revision history — you will have it.",
              },
              {
                icon: CalendarCheck,
                title: "Review Reminders",
                desc: "Set annual review dates on your SOPs. Get notified when it is time to review and update. No more outdated procedures sitting in a binder.",
              },
              {
                icon: FileSearch,
                title: "Searchable Documentation",
                desc: "Find any procedure instantly. No more digging through filing cabinets or scrolling through shared drives during an inspection.",
              },
              {
                icon: Users,
                title: "Training Documentation",
                desc: "Track which team members have reviewed each SOP. Document training completion for OSHA and HIPAA requirements.",
              },
              {
                icon: ShieldCheck,
                title: "Export for Compliance Binders",
                desc: "Download polished PDFs with revision dates, approval signatures, and consistent formatting. Ready for inspection day.",
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

        {/* Audit readiness */}
        <section className="border-y bg-red-50 px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">
              Be Ready for the Inspection You Are Not Expecting
            </h2>
            <p className="mt-4 text-muted-foreground">
              OSHA inspections in dental practices are increasing. Patient
              complaints trigger HIPAA investigations. State boards conduct
              routine audits. The practices that survive these without stress are
              the ones with organized, current documentation. That is what dental
              compliance software does for you.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Revision-tracked SOPs
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Training documentation
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Instant PDF export
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold">
            Get Your Compliance Documentation in Order
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start with the free plan. Create your first three compliance SOPs.
            See how much faster it is than what you are doing now.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/signup">
                Start Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
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
                href="/dental-sop-template"
                className="text-primary underline-offset-4 hover:underline"
              >
                Free Dental SOP Templates
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
