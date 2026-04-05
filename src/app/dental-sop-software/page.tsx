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
  title: "Dental SOP Software That Tracks Documentation by Name | DentiSOP",
  description:
    "Dental SOP software that assigns every procedure by role, tracks who has read what, and flags non-compliance by name. Stop hoping your team follows SOPs — track it.",
};

export default function DentalSopSoftwarePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-blue-50 to-white px-6 py-20 text-center">
          <Badge variant="secondary" className="mb-4">
            Execution tracking for dental practices
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Dental SOP Software That Tracks Every Procedure by Name
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Your team won&apos;t follow a 40-page Word doc buried in a shared
            drive. DentiSOP is dental SOP software that assigns procedures by
            role, tracks read receipts, and flags who is falling behind — by
            name.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/signup">
                Take Control of Your Clinic <ArrowRight className="ml-2 h-4 w-4" />
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
            Why SOPs Without Tracking Fail in Dental Practices
          </h2>
          <p className="mt-4 text-muted-foreground">
            You already have SOPs. The problem is nobody reads them, nobody is
            held accountable, and you have no way to document your team's engagement. Here is
            what we hear from office managers every week:
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              "SOPs exist but you cannot show anyone read them",
              "No way to know which staff members are non-compliant",
              "New hires get verbal training with zero tracking",
              "OSHA inspector asks for training records and you have none",
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
              How DentiSOP Dental SOP Software Tracks Documentation
            </h2>
            <p className="mt-4 text-muted-foreground">
              Assign every procedure to the right role. Track who has read it.
              Flag anyone who has not. Know your clinic compliance score in
              real time.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Assign by Role",
                  desc: "Every SOP is assigned to specific roles — hygienists, assistants, front desk, dentists. Each person sees only the procedures they are responsible for.",
                },
                {
                  step: "2",
                  title: "Track Read Receipts",
                  desc: "DentiSOP logs when each team member opens and acknowledges a procedure. You get a dashboard showing exactly who has read what.",
                },
                {
                  step: "3",
                  title: "Flag Non-Compliance",
                  desc: "Overdue reads and missed assignments are flagged by name. Automated reminders go out so you do not have to chase people down.",
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
            Tracking Features for Dental Practices
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {[
              {
                icon: Users,
                title: "Role-Based Assignments",
                desc: "Assign every SOP to dentists, hygienists, assistants, or front desk staff. Each team member sees their responsibilities and nothing else.",
              },
              {
                icon: CheckCircle,
                title: "Read Receipts and Acknowledgments",
                desc: "Know exactly who has read each procedure and when. No more guessing whether your team actually reviewed the updated sterilization protocol.",
              },
              {
                icon: AlertTriangle,
                title: "Non-Compliance Flags by Name",
                desc: "See which team members have overdue reads or unacknowledged procedures. Address gaps before they become documentation gaps.",
              },
              {
                icon: ShieldCheck,
                title: "Clinic Compliance Score",
                desc: "A real-time score showing your overall compliance posture. Track progress over time and identify which areas need attention.",
              },
              {
                icon: Clock,
                title: "Automated Reminders",
                desc: "DentiSOP sends reminders to team members who have not completed their assigned reads. You stop being the compliance nag.",
              },
              {
                icon: FileText,
                title: "Organized Documentation",
                desc: "Every read receipt, assignment, and acknowledgment is logged. Export documentation records for your team's review.",
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
              Stop Hoping. Start Tracking.
            </h2>
            <p className="mt-4 text-muted-foreground">
              OSHA inspections happen. State board audits happen. When they do,
              you need organized records showing team engagement with every
              required procedure. DentiSOP dental SOP software gives you that
              documentation with names, dates, and tracking scores.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link href="/signup">
                  Take Control of Your Clinic <ArrowRight className="ml-2 h-4 w-4" />
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
            practice needs full documentation tracking. No contracts, no setup fees, cancel anytime.
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
