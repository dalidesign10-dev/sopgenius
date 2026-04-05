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
  title: "Dental Compliance Software That Tracks by Name | DentiSOP",
  description:
    "Dental compliance software that assigns OSHA, HIPAA, and CDC procedures by role, tracks read receipts, flags non-compliance by name, and gives you a real-time clinic compliance score.",
};

export default function DentalComplianceSoftwarePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-red-50 to-white px-6 py-20 text-center">
          <Badge variant="secondary" className="mb-4">
            Compliance tracking platform
          </Badge>
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl">
            Dental Compliance Software That Tracks Every Staff Member by Name
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            An OSHA inspector is not going to accept &quot;we told everyone
            about it.&quot; DentiSOP is dental compliance software that assigns
            procedures by role, tracks who has read what, flags non-compliance
            by name, and gives you a real-time clinic compliance score.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/signup">
                Take Control of Your Clinic <ArrowRight className="ml-2 h-4 w-4" />
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
            Compliance Without Tracking Is Just Paperwork
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dental practices face compliance requirements from multiple agencies.
            Most office managers create the documents but have no way to track
            whether their team actually read them. Here is what makes compliance so
            difficult without tracking:
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              "OSHA requires documentation of annual training — not just that it exists",
              "HIPAA demands documented acknowledgment from every staff member",
              "No way to know which team members are non-compliant right now",
              "State dental boards ask for training records you cannot produce",
              "New hires start working before they have read required procedures",
              "You are the compliance nag — chasing people to read and sign off",
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
              What Each Agency Requires — and How DentiSOP Tracks It
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {[
                {
                  agency: "OSHA",
                  color: "text-red-600",
                  requirements: [
                    "Exposure Control Plan assigned to clinical staff",
                    "HazCom program with read receipts",
                    "Annual training tracked by name",
                    "Post-exposure procedures acknowledged",
                    "Injury logs with compliance flags",
                    "Automated reminders for annual reviews",
                  ],
                },
                {
                  agency: "HIPAA",
                  color: "text-blue-600",
                  requirements: [
                    "Privacy policies assigned by role",
                    "Security risk assessment tracked",
                    "Staff training with read receipts",
                    "Business associate agreements logged",
                    "Breach procedures acknowledged by name",
                    "Non-compliance flagged in real time",
                  ],
                },
                {
                  agency: "CDC",
                  color: "text-green-600",
                  requirements: [
                    "Infection prevention assigned to clinical roles",
                    "Sterilization monitoring with tracking",
                    "Hand hygiene protocols tracked",
                    "PPE procedures with acknowledgments",
                    "Waterline testing assigned and tracked",
                    "Compliance score updated automatically",
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

        {/* How DentiSOP helps */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            How DentiSOP Tracks Compliance Across Your Practice
          </h2>
          <p className="mt-4 text-muted-foreground">
            DentiSOP is not a compliance consultant. It is dental compliance
            software that assigns every procedure by role, tracks who has read
            it, and flags who has not — so you always know your compliance
            posture.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {[
              {
                icon: Users,
                title: "Role-Based Procedure Assignments",
                desc: "Assign OSHA, HIPAA, and CDC procedures to the right roles. Hygienists see clinical SOPs. Front desk sees intake procedures. Nobody is overwhelmed with irrelevant documents.",
              },
              {
                icon: CheckCircle,
                title: "Read Receipts by Name",
                desc: "Every time a team member opens and acknowledges a procedure, it is logged with their name and a timestamp. You have organized records ready for review.",
              },
              {
                icon: CalendarCheck,
                title: "Automated Compliance Reminders",
                desc: "Set review deadlines on every procedure. DentiSOP sends reminders to team members who have not completed their reads. You stop chasing people.",
              },
              {
                icon: FileSearch,
                title: "Non-Compliance Flags by Name",
                desc: "Your dashboard shows exactly who is behind on required reads. Address gaps before an inspector finds them.",
              },
              {
                icon: ShieldCheck,
                title: "Clinic Compliance Score",
                desc: "A real-time score across all procedures, all roles, all team members. Track your compliance posture week over week and identify weak spots instantly.",
              },
              {
                icon: FileText,
                title: "Documentation Reports",
                desc: "Export reports showing every assignment, read receipt, and acknowledgment. Names, dates, and timestamps — organized for your team's review.",
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
              complaints trigger HIPAA investigations. The practices that
              survive these without stress are the ones with organized records showing
              staff engagement with required procedures. That is what dental
              compliance software with tracking does for you.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Read receipts by name
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Non-compliance flags
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Clinic compliance score
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h2 className="text-3xl font-bold">
            Take Control of Your Clinic Compliance
          </h2>
          <p className="mt-4 text-muted-foreground">
            Start with the free plan. Assign your first procedures. See who
            reads them and who does not. Know your compliance score before your
            next inspection.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/signup">
                Take Control of Your Clinic <ArrowRight className="ml-2 h-4 w-4" />
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
