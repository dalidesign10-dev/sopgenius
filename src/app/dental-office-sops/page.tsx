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
  title: "The Complete Guide to Dental Office SOPs | SOPGenius",
  description:
    "Learn which dental office SOPs your practice needs, how to create them, and how to stay compliant with OSHA, HIPAA, and CDC requirements. Practical guide for office managers.",
};

const prioritySops = [
  {
    title: "Infection Control and Sterilization",
    why: "Required by OSHA and CDC. This is the first thing inspectors look for.",
    covers:
      "Instrument processing, surface disinfection, PPE requirements, hand hygiene, dental unit waterlines.",
  },
  {
    title: "Bloodborne Pathogen Exposure Control",
    why: "Federally mandated by OSHA. Must be written, site-specific, and reviewed annually.",
    covers:
      "Exposure determination, engineering controls, post-exposure procedures, hepatitis B vaccination, recordkeeping.",
  },
  {
    title: "HIPAA Privacy and Security",
    why: "Federal law. Violations carry fines from $100 to $50,000 per incident.",
    covers:
      "Patient data handling, electronic records access, breach notification, business associate agreements, staff training.",
  },
  {
    title: "Emergency Medical Response",
    why: "Medical emergencies happen in every practice. Your team needs to know the plan before it happens.",
    covers:
      "Emergency kit contents and checks, syncope protocol, allergic reaction response, CPR procedures, emergency contact numbers.",
  },
  {
    title: "Hazard Communication",
    why: "OSHA requirement. Every practice using chemicals needs a written HazCom program.",
    covers:
      "Safety Data Sheet access, chemical inventory, labeling requirements, staff training, spill procedures.",
  },
  {
    title: "New Patient Intake and Scheduling",
    why: "Consistency here reduces errors, improves patient experience, and protects revenue.",
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
            Practical guide
          </Badge>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            The Complete Guide to Dental Office SOPs
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            You know your practice needs standard operating procedures. The
            question is which ones to create first, what they should cover, and
            how to get your team to actually follow them. This guide covers all
            of it.
          </p>
        </section>

        {/* Why SOPs matter */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            Why Every Dental Office Needs SOPs
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dental office SOPs are not bureaucratic paperwork. They are the
            difference between a practice that runs smoothly when you are out
            sick and one that falls apart. Here is what documented procedures
            actually do for your practice:
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: ShieldCheck,
                title: "Pass Inspections Confidently",
                desc: "OSHA requires written exposure control plans, hazard communication programs, and training documentation. No written SOPs means automatic citations.",
              },
              {
                icon: ClipboardList,
                title: "Reduce Training Time",
                desc: "New hires get up to speed faster when they have clear procedures to follow instead of shadowing someone for weeks.",
              },
              {
                icon: HeartPulse,
                title: "Improve Patient Safety",
                desc: "Consistent sterilization and infection control procedures reduce the risk of cross-contamination and patient harm.",
              },
              {
                icon: Scale,
                title: "Limit Liability",
                desc: "Documented procedures show due diligence. If something goes wrong, you can demonstrate your practice followed established protocols.",
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
              Which Dental Office SOPs to Create First
            </h2>
            <p className="mt-4 text-muted-foreground">
              You cannot document everything at once. Start with the SOPs that
              are legally required or carry the highest risk if your team gets
              them wrong.
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
                      <span className="font-medium">Why it is a priority:</span>{" "}
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
            Compliance Requirements You Cannot Ignore
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three federal agencies set the rules for dental practices. Your
            dental office SOPs need to address requirements from all three.
          </p>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {[
              {
                title: "OSHA",
                items: [
                  "Written Exposure Control Plan",
                  "Hazard Communication Program",
                  "Annual training and documentation",
                  "Injury and illness recordkeeping",
                ],
              },
              {
                title: "HIPAA",
                items: [
                  "Privacy policies and procedures",
                  "Security risk assessment",
                  "Business associate agreements",
                  "Breach notification procedures",
                ],
              },
              {
                title: "CDC",
                items: [
                  "Infection prevention guidelines",
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
              How to Implement SOPs in Your Practice
            </h2>
            <p className="mt-4 text-muted-foreground">
              Creating the document is half the work. Getting your team to use it
              is the other half. Here is what actually works:
            </p>
            <div className="mt-8 space-y-6">
              {[
                {
                  icon: BookOpen,
                  title: "Start with one SOP at a time",
                  desc: "Roll out procedures individually. Give your team a week to learn each one before introducing the next. Dumping 20 SOPs on them at once guarantees none get read.",
                },
                {
                  icon: ClipboardList,
                  title: "Make them easy to find",
                  desc: "SOPs in a binder nobody opens are worthless. Use a digital system where your team can search and access procedures from any workstation.",
                },
                {
                  icon: AlertTriangle,
                  title: "Review and update regularly",
                  desc: "Set a calendar reminder to review SOPs quarterly. Procedures drift. Equipment changes. Staff changes. Your SOPs need to keep up.",
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
              Ready to Document Your Practice?
            </h2>
            <p className="mt-4 text-muted-foreground">
              SOPGenius gives you dental-specific templates and generates
              structured SOPs from plain language descriptions. Start with the
              free plan and build your compliance documentation today.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/signup">
                  Start Free <ArrowRight className="ml-2 h-4 w-4" />
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
                All SOPGenius Features
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
