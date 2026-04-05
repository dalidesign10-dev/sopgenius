import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";

export const metadata: Metadata = {
  title: "About DentiSOP — Built for Dental Teams by Someone Who Gets It",
  description:
    "DentiSOP is the operations platform built exclusively for dental practices. Meet the founder, learn the story, and see why dental teams trust DentiSOP to standardize their procedures.",
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

          <div className="mt-10 space-y-12 text-gray-600">
            {/* Founder section */}
            <section className="rounded-2xl border bg-gray-50 p-8">
              <h2 className="text-xl font-semibold text-gray-900">
                Meet the founder
              </h2>
              <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                  D
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    Dali &mdash; Founder &amp; Developer
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">
                    I built DentiSOP because I kept hearing the same story from
                    dental office managers: procedures lived in binders nobody
                    opened, in Google Docs nobody could find, or in the heads of
                    staff who eventually left. Every tool on the market was
                    built for &ldquo;any industry&rdquo; &mdash; none of them
                    understood dental compliance, clinical workflows, or what an
                    OSHA inspector actually expects to see. DentiSOP exists to
                    fix that. One platform, built for dental teams, that turns
                    any procedure into a documented, assigned, and tracked
                    process your whole team follows.
                  </p>
                  <p className="mt-3 text-sm">
                    Questions? Reach me directly at{" "}
                    <a
                      href="mailto:support@dentisop.com"
                      className="text-primary hover:underline"
                    >
                      support@dentisop.com
                    </a>
                    . I read every message.
                  </p>
                </div>
              </div>
            </section>

            {/* Mission */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Why DentiSOP exists
              </h2>
              <p className="mt-3">
                Dental practices operate under OSHA, HIPAA, CDC, and state
                dental board requirements &mdash; all of which demand written
                procedures. Most practices piece together compliance
                documentation using binders, shared drives, and tribal
                knowledge. When a key team member leaves, the knowledge walks
                out with them. When an inspector arrives, the scramble begins.
              </p>
              <p className="mt-3">
                DentiSOP replaces that chaos with a single system. Generate
                compliance-aligned SOPs with AI, assign them to the right
                roles, and track who has read what &mdash; so you always know
                your team is on the same page.
              </p>
            </section>

            {/* How it works */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                How it works
              </h2>
              <ol className="mt-3 list-inside list-decimal space-y-2">
                <li>
                  <strong>Document</strong> &mdash; Describe your workflow or
                  pick a dental template. AI generates a structured,
                  compliance-mapped procedure in seconds.
                </li>
                <li>
                  <strong>Assign</strong> &mdash; Assign every procedure to the
                  right roles: hygienists, assistants, front desk, dentists.
                </li>
                <li>
                  <strong>Manage</strong> &mdash; Track reads, flag
                  non-compliance by name, send automated reminders, and watch
                  your clinic compliance score climb.
                </li>
              </ol>
            </section>

            {/* Commitments */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Our commitments
              </h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <strong>30-day money-back guarantee</strong> on every paid
                  plan. If DentiSOP doesn&apos;t work for your practice, you
                  get a full refund.
                </li>
                <li>
                  <strong>No lock-in.</strong> Cancel from your dashboard at any
                  time. No long-term contracts.
                </li>
                <li>
                  <strong>Real support.</strong> Every email goes to a real
                  person, not a ticket queue. We typically respond within one
                  business day.
                </li>
                <li>
                  <strong>PHI-free by design.</strong> DentiSOP documents
                  procedures, not patient data. No protected health
                  information should be entered into the platform.
                </li>
              </ul>
            </section>

            {/* Links */}
            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Learn more
              </h2>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="text-primary hover:underline"
                  >
                    See all features &rarr;
                  </Link>
                </li>
                <li>
                  <Link
                    href="/templates"
                    className="text-primary hover:underline"
                  >
                    Browse dental SOP templates &rarr;
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-primary hover:underline"
                  >
                    View pricing &rarr;
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-primary hover:underline"
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
