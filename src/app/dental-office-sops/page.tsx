import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  ClipboardList,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  BookOpen,
  Scale,
  HeartPulse,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Dental Office SOPs: Assign, Track, and Enforce by Role | DentiSOP",
  description:
    "Dental office SOPs that are assigned by role, tracked with read receipts, and enforced with non-compliance flags. Know who has read what — by name.",
};

const prioritySops = [
  {
    title: "Infection Control and Sterilization",
    why: "Required by OSHA and CDC. Assign to clinical staff, track acknowledgment, flag anyone who has not reviewed the latest update.",
    covers:
      "Instrument processing, surface disinfection, PPE requirements, hand hygiene, dental unit waterlines.",
  },
  {
    title: "Bloodborne Pathogen Exposure Control",
    why: "Federally mandated by OSHA. Must be reviewed annually by every team member — DentiSOP tracks that automatically.",
    covers:
      "Exposure determination, engineering controls, post-exposure procedures, hepatitis B vaccination, recordkeeping.",
  },
  {
    title: "HIPAA Privacy and Security",
    why: "Federal law. Violations carry fines from $100 to $50,000 per incident. You need proof every staff member read the policy.",
    covers:
      "Patient data handling, electronic records access, breach notification, business associate agreements, staff training.",
  },
  {
    title: "Emergency Medical Response",
    why: "Every team member needs to know the plan before it happens. Assign by role and confirm readiness with read receipts.",
    covers:
      "Emergency kit contents and checks, syncope protocol, allergic reaction response, CPR procedures, emergency contact numbers.",
  },
  {
    title: "Hazard Communication",
    why: "OSHA requirement. Every practice using chemicals needs a written HazCom program with documented staff training.",
    covers:
      "Safety Data Sheet access, chemical inventory, labeling requirements, staff training, spill procedures.",
  },
  {
    title: "New Patient Intake and Scheduling",
    why: "Front desk consistency reduces errors and protects revenue. Assign to front desk staff and track compliance.",
    covers:
      "Registration forms, medical history review, insurance verification, appointment confirmation, welcome communication.",
  },
];

export default function DentalOfficeSopsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-gradient-to-b from-amber-50 to-white px-6 py-20 text-center">
          <Badge variant="secondary" className="mb-4">
            Enforcement guide for dental practices
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Dental Office SOPs That Are Assigned, Tracked, and Enforced
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            You know your practice needs dental office SOPs. The real question is
            how to make sure every team member actually reads them, follows them,
            and is held accountable when they do not. This guide shows you how.
          </p>
        </section>

        {/* Why SOPs matter */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            Why Dental Office SOPs Fail Without Enforcement
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dental office SOPs are not just paperwork. But without role-based
            assignments, read tracking, and non-compliance flags, they are
            documents that nobody opens. Here is what enforcement actually does
            for your practice:
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: ShieldCheck,
                title: "Prove Compliance by Name",
                desc: "OSHA requires documented training. With read receipts and acknowledgments, you can show exactly who reviewed each procedure and when.",
              },
              {
                icon: ClipboardList,
                title: "Onboard with Accountability",
                desc: "New hires get assigned procedures by role on day one. You see their progress in real time instead of hoping they were trained properly.",
              },
              {
                icon: HeartPulse,
                title: "Enforce Patient Safety Protocols",
                desc: "Assign sterilization and infection control SOPs to clinical staff. Flag anyone who has not acknowledged the latest update.",
              },
              {
                icon: Scale,
                title: "Reduce Liability with a Paper Trail",
                desc: "Every read receipt and compliance flag is logged. If something goes wrong, you have proof your practice enforced established protocols.",
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

        {/* Which SOPs first */}
        <section className="border-y bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold">
              Which Dental Office SOPs to Enforce First
            </h2>
            <p className="mt-4 text-muted-foreground">
              You cannot enforce everything at once. Start with the SOPs that
              are legally required or carry the highest risk — and assign them
              to the right roles immediately.
            </p>
            <div className="mt-10 space-y-6">
              {prioritySops.map((sop, i) => (
                <Card key={sop.title}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {i + 1}
                      </div>
                      <h3 className="text-lg font-semibold">{sop.title}</h3>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Why enforce it first:</span>{" "}
                      <span className="text-muted-foreground">{sop.why}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Covers:</span>{" "}
                      <span className="text-muted-foreground">
                        {sop.covers}
                      </span>
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance requirements */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            Compliance Requirements You Must Enforce
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three federal agencies set the rules for dental practices. Your
            dental office SOPs need to address requirements from all three —
            and you need proof every staff member has read them.
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {[
              {
                title: "OSHA",
                items: [
                  "Written Exposure Control Plan",
                  "Hazard Communication Program",
                  "Annual training with read receipts",
                  "Injury and illness recordkeeping",
                ],
              },
              {
                title: "HIPAA",
                items: [
                  "Privacy policies assigned by role",
                  "Security risk assessment",
                  "Business associate agreements",
                  "Breach notification procedures",
                ],
              },
              {
                title: "CDC",
                items: [
                  "Infection prevention with staff tracking",
                  "Sterilization monitoring",
                  "Hand hygiene protocols",
                  "Dental unit waterline management",
                ],
              },
            ].map((agency) => (
              <Card key={agency.title}>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {agency.title}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {agency.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Implementation */}
        <section className="border-y bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold">
              How to Enforce SOPs in Your Practice
            </h2>
            <p className="mt-4 text-muted-foreground">
              Creating the document is half the work. Enforcing it is the other
              half. Here is what actually works:
            </p>
            <div className="mt-8 space-y-6">
              {[
                {
                  icon: BookOpen,
                  title: "Assign by role, not to everyone at once",
                  desc: "Hygienists get clinical SOPs. Front desk gets intake SOPs. Each person sees only their assignments. DentiSOP handles the routing automatically.",
                },
                {
                  icon: ClipboardList,
                  title: "Track reads with receipts, not honor systems",
                  desc: "Every acknowledgment is logged with a timestamp. Your compliance dashboard shows exactly who has read what and who is behind.",
                },
                {
                  icon: AlertTriangle,
                  title: "Flag non-compliance and send automated reminders",
                  desc: "When someone misses a deadline, DentiSOP flags them by name and sends reminders. You stop being the compliance nag.",
                },
              ].map((tip) => (
                <div key={tip.title} className="flex gap-4">
                  <tip.icon className="mt-1 h-6 w-6 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold">{tip.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {tip.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-amber-50 px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold">
              Ready to Enforce Compliance Across Your Practice?
            </h2>
            <p className="mt-4 text-muted-foreground">
              DentiSOP assigns dental office SOPs by role, tracks every read
              receipt, flags non-compliance by name, and gives you a real-time
              clinic compliance score. Take control today.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/signup">
                  Take Control of Your Clinic <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/dental-sop-template">Browse Templates</Link>
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
                href="/dental-sop-template"
                className="text-primary underline-offset-4 hover:underline"
              >
                Free Dental SOP Templates
              </Link>
              <Link
                href="/dental-compliance-software"
                className="text-primary underline-offset-4 hover:underline"
              >
                Dental Compliance Software
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
