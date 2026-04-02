import type { Metadata } from "next";
import Link from "next/link";
import { PublicNav } from "@/components/shared/public-nav";
import { PublicFooter } from "@/components/shared/public-footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "SOPGenius privacy policy. How we collect, use, and protect your data.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNav />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-gray-500">
            Last updated: April 2, 2026
          </p>

          <div className="mt-10 space-y-10 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                What we collect
              </h2>
              <p className="mt-3">
                When you use SOPGenius, we collect information you provide
                directly: your name, email address, and the content of the SOPs
                you create. We also collect basic usage data such as page views
                and feature usage to improve the product.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                How we use your data
              </h2>
              <ul className="mt-3 list-inside list-disc space-y-1">
                <li>To provide and maintain the SOPGenius service</li>
                <li>To generate SOPs based on your input</li>
                <li>To process payments and manage your subscription</li>
                <li>To send account-related communications</li>
                <li>To improve the product based on aggregate usage patterns</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Third-party services
              </h2>
              <p className="mt-3">We use the following third-party services:</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>
                  <strong className="text-gray-900">Supabase</strong> —
                  database, authentication, and storage
                </li>
                <li>
                  <strong className="text-gray-900">Stripe</strong> — payment
                  processing
                </li>
                <li>
                  <strong className="text-gray-900">Anthropic</strong> — AI
                  generation (your process descriptions are sent to Anthropic to
                  generate SOPs)
                </li>
                <li>
                  <strong className="text-gray-900">Vercel</strong> — hosting
                  and deployment
                </li>
              </ul>
              <p className="mt-2">
                Each service has its own privacy policy governing how it handles
                data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Data retention
              </h2>
              <p className="mt-3">
                We retain your account data and SOPs for as long as your account
                is active. If you delete your account, we will remove your data
                within 30 days, except where retention is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">
                Your rights
              </h2>
              <p className="mt-3">You have the right to:</p>
              <ul className="mt-2 list-inside list-disc space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your SOPs at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900">Contact</h2>
              <p className="mt-3">
                For privacy-related questions, email us at{" "}
                <a
                  href="mailto:support@sopgenius.com"
                  className="text-blue-600 hover:text-blue-700"
                >
                  support@sopgenius.com
                </a>{" "}
                or visit our{" "}
                <Link
                  href="/contact"
                  className="text-blue-600 hover:text-blue-700"
                >
                  contact page
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
