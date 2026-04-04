import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";

export const metadata: Metadata = {
  title: "About DentiSOP — Dental Operations Enforcement Platform",
  description:
    "DentiSOP is the execution enforcement system for dental practices. Assign every procedure, track every read, and know who's compliant — every single day.",
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
              DentiSOP is the execution enforcement system for dental practices.
              We don&apos;t just help you create procedures — we make sure your
              team actually follows them. Every SOP is assigned by role, tracked
              for reads, and flagged when someone falls behind. It&apos;s not a
              document generator. It&apos;s the system your clinic depends on.
            </p>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                What we do
              </h2>
              <p className="mt-3">
                We provide an operations enforcement platform built exclusively
                for dental practices. Document your procedures with AI, assign
                them to the right roles, track who&apos;s read what, and flag
                non-compliance by name. Whether it&apos;s sterilization protocols,
                HIPAA workflows, or front desk procedures — DentiSOP ensures
                your team follows the process, every single day.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                How it works
              </h2>
              <ol className="mt-3 list-inside list-decimal space-y-2">
                <li>
                  <strong>Document</strong> — Describe your workflow or pick a
                  dental template. AI generates a structured, compliance-mapped
                  procedure in seconds.
                </li>
                <li>
                  <strong>Assign</strong> — Assign every procedure to the right
                  roles: hygienists, assistants, front desk, dentists.
                </li>
                <li>
                  <strong>Enforce</strong> — Track reads, flag non-compliance by
                  name, send automated reminders, and watch your clinic
                  compliance score climb.
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
