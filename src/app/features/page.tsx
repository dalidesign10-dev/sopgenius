import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";
import {
  ClipboardCheck,
  Eye,
  AlertTriangle,
  BarChart3,
  Bell,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features — Assign, Track & Manage Every Dental Procedure",
  description:
    "DentiSOP supports documentation workflows across your dental practice. Assign SOPs by role, track who's read what, flag gaps by name, and keep your team accountable every day.",
};

const features = [
  {
    icon: ClipboardCheck,
    title: "Assign Every Procedure by Role",
    description:
      "Every SOP gets assigned to the right people — hygienists, assistants, front desk, dentists. No more hoping someone reads the binder. You decide who's responsible, and the system tracks whether they've done their part.",
    link: { href: "/signup", label: "Start assigning" },
  },
  {
    icon: Eye,
    title: "Read Receipts & Acknowledgements",
    description:
      "Know exactly who opened, read, and acknowledged every procedure. Not just 'sent' — confirmed read. Your compliance binder means nothing if nobody's opened it. Now you can see who has acknowledged the procedure. Acknowledgment tracking helps document communication. It does not replace required training records, supervision, or compliance review.",
    link: { href: "/signup", label: "Start tracking" },
  },
  {
    icon: AlertTriangle,
    title: "Non-Compliance Flags by Staff Name",
    description:
      "See exactly who hasn't read their assigned procedures — by name. No more guessing, no more asking around. Your dashboard shows red flags the moment someone falls behind, so you can act before it becomes a documentation gap.",
    link: { href: "/signup", label: "See the dashboard" },
  },
  {
    icon: BarChart3,
    title: "Clinic Compliance Score",
    description:
      "One number tells you how controlled your clinic is. Weighted across documented procedures (40%), assignments (30%), and confirmed reads (30%). Watch it climb as your team engages — or spot the drop before it costs you.",
    link: { href: "/signup", label: "See your score" },
  },
  {
    icon: Bell,
    title: "Automated Reminders for Unread SOPs",
    description:
      "Stop chasing your team. DentiSOP sends automatic email reminders when assignments go unread. Escalate if needed. Your staff gets nudged, you get peace of mind, and nothing falls through the cracks.",
    link: { href: "/pricing", label: "See plans" },
  },
  {
    icon: ShieldCheck,
    title: "OSHA, HIPAA & CDC — Referenced in Every Procedure",
    description:
      "Every generated SOP is structured around the documentation frameworks that matter: OSHA 29 CFR 1910, HIPAA §164.308, CDC dental guidelines, and state dental board requirements. Documentation support isn't an add-on — it's the foundation.",
    link: { href: "/templates", label: "Browse templates" },
  },
];

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNav />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Your team doesn&apos;t need more documents. They need a system that
            helps your team stay on track.
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            DentiSOP goes beyond generation. Every procedure is assigned by
            role, tracked for reads, and flagged when someone falls behind.
            This is how organized clinics keep procedures visible, assigned, and current.
          </p>

          <div className="mt-16 space-y-16">
            {features.map((feature) => (
              <div key={feature.title} className="group">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {feature.title}
                    </h2>
                    <p className="mt-2 text-gray-600">{feature.description}</p>
                    <Link
                      href={feature.link.href}
                      className="mt-3 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      {feature.link.label} &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enforcement callout */}
          <div className="mt-20 rounded-xl border bg-gray-50 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              If your team doesn&apos;t follow the process, the process
              doesn&apos;t exist.
            </h2>
            <p className="mt-2 text-gray-600">
              DentiSOP helps you stay on top of it. Assign. Track. Manage.
            </p>
            <Link
              href="/signup"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Take Control of Your Clinic
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
