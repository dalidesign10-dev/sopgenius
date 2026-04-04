import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";

export const metadata: Metadata = {
  title: "About DentiSOP — AI SOP Generator for Dental Practices",
  description:
    "DentiSOP is an AI-powered tool that helps dental practices create, manage, and share standard operating procedures for OSHA, HIPAA, and CDC compliance.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNav />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            About DentiSOP
          </h1>

          <div className="mt-10 space-y-10 text-gray-600">
            <p className="text-lg">
              DentiSOP helps dental practices turn compliance requirements and
              clinical workflows into structured, shareable standard operating
              procedures using AI. Instead of staring at a blank document, you
              describe how a process works — sterilization, patient intake, OSHA
              training — and get a professionally formatted SOP back in seconds.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                What we do
              </h2>
              <p className="mt-3">
                We provide a focused tool for creating, managing, and sharing
                SOPs built for dental practices. Whether you need infection
                control procedures, HIPAA privacy protocols, CDC-aligned
                sterilization checklists, or front desk workflows, DentiSOP
                gives you a fast starting point and a clean system for keeping
                everything organized, compliant, and up to date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                How it works
              </h2>
              <ol className="mt-3 list-inside list-decimal space-y-2">
                <li>
                  Describe your dental workflow in plain language or pick a
                  dental-specific template.
                </li>
                <li>
                  DentiSOP generates a structured SOP with steps, roles, and
                  compliance notes aligned to OSHA, HIPAA, and CDC guidelines.
                </li>
                <li>
                  Edit, refine, and share with your team across locations. Export
                  to PDF for compliance binders or Word for collaborative
                  editing.
                </li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Learn more
              </h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    See all features &rarr;
                  </Link>
                </li>
                <li>
                  <Link
                    href="/templates"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Browse dental SOP templates &rarr;
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Get in touch &rarr;
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
